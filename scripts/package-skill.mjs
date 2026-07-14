import { createHash } from 'node:crypto';
import {
  cp,
  mkdir,
  readFile,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { spawn } from 'node:child_process';

const root = process.cwd();
const changelog = await readFile(path.join(root, 'CHANGELOG.md'), 'utf8');
const versionMatch = changelog.match(/^##\s+([0-9]+\.[0-9]+\.[0-9]+)\s+-\s+/m);

if (!versionMatch) {
  throw new Error('Unable to determine release version from CHANGELOG.md.');
}

const version = versionMatch[1];
const packageName = `bydoxe-agent-skills-${version}`;
const distRoot = path.join(root, 'dist');
const stagingRoot = path.join(distRoot, '.staging');
const packageRoot = path.join(stagingRoot, packageName);
const tarPath = path.join(distRoot, `${packageName}.tar.gz`);
const zipPath = path.join(distRoot, `${packageName}.zip`);
const checksumsPath = path.join(distRoot, `${packageName}.sha256`);

const includedPaths = [
  'SKILL.md',
  'agents/openai.yaml',
  'references',
  'LICENSE.md',
  'README.md',
  'DISCLAIMER.md',
  'CHANGELOG.md',
];

await rm(distRoot, { recursive: true, force: true });
await mkdir(packageRoot, { recursive: true });

for (const relativePath of includedPaths) {
  const source = path.join(root, relativePath);
  const target = path.join(packageRoot, relativePath);
  await mkdir(path.dirname(target), { recursive: true });
  await cp(source, target, { recursive: true });
}

await run('tar', ['-czf', tarPath, '-C', stagingRoot, packageName]);

const artifacts = [tarPath];
const zipAvailable = await commandExists('zip');

if (zipAvailable) {
  await run('zip', ['-qr', zipPath, packageName], { cwd: stagingRoot });
  artifacts.push(zipPath);
}

const checksums = [];

for (const artifactPath of artifacts) {
  const digest = createHash('sha256')
    .update(await readFile(artifactPath))
    .digest('hex');
  checksums.push(`${digest}  ${path.basename(artifactPath)}`);
}

await writeFile(checksumsPath, `${checksums.join('\n')}\n`);
await rm(stagingRoot, { recursive: true, force: true });

console.log(`Created ${path.relative(root, tarPath)}`);

if (zipAvailable) {
  console.log(`Created ${path.relative(root, zipPath)}`);
} else {
  console.log('Skipped zip artifact because the zip command is unavailable.');
}

console.log(`Created ${path.relative(root, checksumsPath)}`);

for (const artifactPath of [...artifacts, checksumsPath]) {
  const fileStat = await stat(artifactPath);
  console.log(`${path.basename(artifactPath)} ${fileStat.size} bytes`);
}

async function commandExists(command) {
  try {
    await run(command, ['--version'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

async function run(command, args, options = {}) {
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd ?? root,
      stdio: options.stdio ?? 'inherit',
    });

    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} exited with code ${code}`));
    });
  });
}
