import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const skillRoot = path.join(root, 'skills', 'bydoxe', 'bydoxe');
const skillFile = path.join(skillRoot, 'SKILL.md');
const referencesRoot = path.join(skillRoot, 'references');
const languageSupportFile = path.join(referencesRoot, 'language-support.md');

const expectedDomains = [
  'https://open-api.bydoxe.com/api/v1',
  'wss://open-api.bydoxe.com/v1/ws/public',
  'wss://open-api.bydoxe.com/v1/ws/private',
];
const unfinishedMarkerPattern = new RegExp(
  `\\b(${['TO' + 'DO', 'FIX' + 'ME', 'T' + 'BD'].join('|')})\\b`,
  'u',
);
const requiredSafetyTerms = [
  'place-order',
  'cancel-order',
  'withdraw',
  'transfer',
  'set-leverage',
  'set-margin',
  'set-margin-mode',
  'close-positions',
  'cancel-all',
  'place-plan-order',
  'modify-plan-order',
  'place-tpsl-order',
  'modify-tpsl-order',
  'copy trading',
  'WebSocket spot trade',
  'CONFIRM',
];
const ignoredDirectories = new Set(['.git']);
const scannedExtensions = new Set(['.md', '.mjs', '.yaml', '.yml', '.json']);

const files = await collectFiles(root);
const problems = [
  ...await findMissingRequiredFiles(),
  ...await findBrokenReferenceLinks(),
  ...await findPatternProblems(
    files.filter((file) => file !== languageSupportFile),
    /\p{Script=Hangul}/u,
    'Hangul text',
  ),
  ...await findPatternProblems(files, unfinishedMarkerPattern, 'unfinished marker'),
  ...await findMissingDomainProblems(files),
  ...await findMissingSafetyTerms(),
];

if (problems.length > 0) {
  console.error('Skill validation failed:');
  for (const problem of problems) {
    console.error(`- ${problem}`);
  }
  process.exitCode = 1;
} else {
  console.log('Skill validation passed.');
}

async function collectFiles(directory) {
  const entries = await readdir(directory);
  const results = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry);
    const entryStat = await stat(fullPath);

    if (entryStat.isDirectory()) {
      if (!ignoredDirectories.has(entry)) {
        results.push(...await collectFiles(fullPath));
      }
      continue;
    }

    if (scannedExtensions.has(path.extname(entry))) {
      results.push(fullPath);
    }
  }

  return results;
}

async function findMissingRequiredFiles() {
  const requiredFiles = [
    skillFile,
    path.join(skillRoot, 'agents', 'openai.yaml'),
    path.join(skillRoot, 'LICENSE.md'),
  ];
  const problems = [];

  for (const file of requiredFiles) {
    try {
      const fileStat = await stat(file);
      if (!fileStat.isFile()) {
        problems.push(`Required file is not a file: ${path.relative(root, file)}`);
      }
    } catch {
      problems.push(`Required file is missing: ${path.relative(root, file)}`);
    }
  }

  return problems;
}

async function findBrokenReferenceLinks() {
  const skillText = await readFile(skillFile, 'utf8');
  const links = [...skillText.matchAll(/\]\(references\/([^)]+)\)/g)].map(
    (match) => match[1],
  );
  const problems = [];

  for (const link of links) {
    const referenceFile = path.join(referencesRoot, link);
    try {
      const referenceStat = await stat(referenceFile);
      if (!referenceStat.isFile()) {
        problems.push(`Reference link is not a file: references/${link}`);
      }
    } catch {
      problems.push(`Reference link is missing: references/${link}`);
    }
  }

  return problems;
}

async function findPatternProblems(filesToScan, pattern, label) {
  const problems = [];

  for (const file of filesToScan) {
    const text = await readFile(file, 'utf8');
    if (pattern.test(text)) {
      problems.push(`${label} found in ${path.relative(root, file)}`);
    }
  }

  return problems;
}

async function findMissingDomainProblems(filesToScan) {
  const combinedText = (
    await Promise.all(filesToScan.map((file) => readFile(file, 'utf8')))
  ).join('\n');

  return expectedDomains
    .filter((domain) => !combinedText.includes(domain))
    .map((domain) => `Expected domain is missing: ${domain}`);
}

async function findMissingSafetyTerms() {
  const safetyText = await readFile(
    path.join(referencesRoot, 'safety.md'),
    'utf8',
  );

  return requiredSafetyTerms
    .filter((term) => !safetyText.includes(term))
    .map((term) => `Safety reference is missing required term: ${term}`);
}
