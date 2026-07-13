import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const skillRoot = path.join(root, 'skills', 'bydoxe', 'bydoxe');
const skillFile = path.join(skillRoot, 'SKILL.md');
const referencesRoot = path.join(skillRoot, 'references');
const languageSupportFile = path.join(referencesRoot, 'language-support.md');
const cliProjectRoot =
  process.env.BYDOXE_CLI_PROJECT_DIR ?? path.resolve(root, '..', 'cli-project');

const expectedDomains = [
  'https://open-api.bydoxe.com/api/v1',
  'wss://open-api.bydoxe.com/v1/ws/public',
  'wss://open-api.bydoxe.com/v1/ws/private',
];
const commandSourceFiles = [
  'src/commands/public-rest.ts',
  'src/commands/private-rest.ts',
  'src/commands/write-rest.ts',
  'src/commands/websocket.ts',
];
const cliCommandGroupLabels = {
  'public-rest': 'Public REST',
  'private-rest': 'Authenticated REST',
  'write-rest': 'Write REST',
  websocket: 'WebSocket',
};
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
const referenceSectionRequirements = {
  'account.md': [
    'Safety',
    'Commands',
    'Examples',
    'Parameters',
    'Important Response Fields',
  ],
  'authentication.md': [
    'REST Credentials',
    'REST Signature Message',
    'WebSocket Login Signature',
    'Agent Handling',
  ],
  'common.md': [
    'Safety',
    'Commands',
    'Server Time',
    'Trade Fee',
    'Response Envelope',
  ],
  'copytrading-follower.md': [
    'Safety',
    'Read Commands',
    'Write Commands',
    'Read Examples',
    'Write Dry-Run Examples',
    'Required Pre-Confirmation Summary',
    'Parameter Notes',
  ],
  'copytrading-trader.md': [
    'Safety',
    'Read Commands',
    'Write Commands',
    'Read Examples',
    'Write Dry-Run Examples',
    'Required Pre-Confirmation Summary',
    'Parameter Notes',
  ],
  'future-account.md': [
    'Safety',
    'Account and Estimate Commands',
    'Futures Order Read Commands',
    'Examples',
    'Parameter Notes',
    'Important Response Fields',
    'Futures Account Write Commands',
  ],
  'future-market.md': [
    'Current CLI Support',
    'Endpoint Map',
    'Command Examples',
    'Parameter Notes',
    'Important Response Fields',
    'Safety',
  ],
  'future-order.md': [
    'Safety',
    'Commands',
    'Dry-Run Examples',
    'Required Pre-Confirmation Summary',
    'Body Guidance',
  ],
  'future-position.md': [
    'Safety',
    'Commands',
    'Examples',
    'Parameters',
    'Important Response Fields',
  ],
  'future-tpsl.md': [
    'Commands',
    'Dry-Run Examples',
    'Required Pre-Confirmation Summary',
    'Safety',
  ],
  'future-trigger.md': [
    'Commands',
    'Dry-Run Examples',
    'Required Pre-Confirmation Summary',
    'Safety',
  ],
  'glossary.md': ['API Areas', 'Trading Terms', 'Safety Terms'],
  'language-support.md': [
    'Core Rule',
    'Intent Mapping',
    'Ambiguity Rules',
    'Confirmation Rule',
    'Response Language',
  ],
  'output.md': ['Preferred CLI Options', 'Dry-Run Shape', 'Reporting Rules'],
  'safety.md': [
    'Classification',
    'Credential Rules',
    'Write Action Rule',
    'Required Write-Action Coverage',
    'Public Read Rule',
  ],
  'setup.md': [
    'Default Domains',
    'CLI Requirement',
    'Environment Variables',
    'Initial Public REST and WebSocket Commands',
  ],
  'spot-account.md': [
    'Safety',
    'Commands',
    'Examples',
    'Parameter Notes',
    'Important Response Fields',
    'Spot Account Write Commands',
  ],
  'spot-market.md': [
    'Current CLI Support',
    'Endpoint Map',
    'Command Examples',
    'Parameter Notes',
    'Important Response Fields',
    'Safety',
  ],
  'spot-trade.md': [
    'Safety',
    'Commands',
    'Dry-Run Examples',
    'Required Pre-Confirmation Summary',
    'Body Guidance',
  ],
  'websocket-private.md': [
    'Domain',
    'Authentication',
    'CLI Support',
    'Private Subscription Channels',
    'Spot Trade Message',
    'Examples',
    'Safety',
  ],
  'websocket-public.md': [
    'Domain',
    'CLI Support',
    'Public Channel Argument',
    'Public Channels',
    'Examples',
    'Safety',
  ],
};
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
  ...await findReferenceSectionProblems(),
  ...await findCliGeneratedArtifactProblems(),
  ...await findCliReferenceSyncProblems(files),
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

async function findReferenceSectionProblems() {
  const referenceFiles = (await readdir(referencesRoot))
    .filter((file) => file.endsWith('.md'))
    .sort();
  const expectedFiles = Object.keys(referenceSectionRequirements).sort();
  const problems = [];

  for (const file of referenceFiles) {
    if (!referenceSectionRequirements[file]) {
      problems.push(`Reference file has no section requirements: ${file}`);
    }
  }

  for (const file of expectedFiles) {
    if (!referenceFiles.includes(file)) {
      problems.push(`Section requirements reference a missing file: ${file}`);
      continue;
    }

    const referenceText = await readFile(path.join(referencesRoot, file), 'utf8');
    const sections = extractSecondLevelHeadings(referenceText);
    const missingSections = referenceSectionRequirements[file].filter(
      (section) => !sections.includes(section),
    );

    for (const section of missingSections) {
      problems.push(`Reference ${file} is missing required section: ${section}`);
    }
  }

  return problems;
}

function extractSecondLevelHeadings(markdown) {
  return [...markdown.matchAll(/^## (.+)$/gm)].map((match) => match[1].trim());
}

async function findCliReferenceSyncProblems(filesToScan) {
  const cliProjectExists = await isDirectory(cliProjectRoot);
  if (!cliProjectExists) {
    return process.env.BYDOXE_CLI_PROJECT_DIR
      ? [`CLI project directory is missing: ${cliProjectRoot}`]
      : [];
  }

  const cliCommands = await collectCliRegistryCommands(cliProjectRoot);
  const duplicateCommands = findDuplicates(cliCommands);
  const skillText = (
    await Promise.all(
      filesToScan
        .filter((file) => file.startsWith(skillRoot))
        .map((file) => readFile(file, 'utf8')),
    )
  ).join('\n');
  const missingCommands = unique(cliCommands).filter(
    (command) => !skillText.includes(`\`${command}\``),
  );

  return [
    ...duplicateCommands.map((command) => `Duplicate CLI command: ${command}`),
    ...missingCommands.map(
      (command) => `Skill references are missing CLI command: ${command}`,
    ),
  ];
}

async function findCliGeneratedArtifactProblems() {
  const cliProjectExists = await isDirectory(cliProjectRoot);
  if (!cliProjectExists) {
    return [];
  }

  const artifactPaths = {
    catalog: path.join(cliProjectRoot, 'docs', 'command-catalog.json'),
    reference: path.join(cliProjectRoot, 'docs', 'command-reference.md'),
    summary: path.join(cliProjectRoot, 'docs', 'command-summary.md'),
  };
  const problems = [];

  for (const [name, file] of Object.entries(artifactPaths)) {
    if (!await isFile(file)) {
      problems.push(
        `CLI generated ${name} artifact is missing: ${path.relative(cliProjectRoot, file)}`,
      );
    }
  }

  if (problems.length > 0) return problems;

  const catalog = await readCliCommandCatalog(artifactPaths.catalog);
  if (!catalog) {
    return [
      `CLI generated catalog artifact is invalid: ${
        path.relative(cliProjectRoot, artifactPaths.catalog)
      }`,
    ];
  }

  const referenceText = await readFile(artifactPaths.reference, 'utf8');
  const summaryText = await readFile(artifactPaths.summary, 'utf8');
  const expectedCommandCount = catalog.commands.length;
  const catalogCommands = catalog.commands.filter((command) =>
    command && typeof command === 'object' && typeof command.command === 'string',
  );
  const invalidCommandCount = catalog.commands.length - catalogCommands.length;

  if (catalog.commandCount !== expectedCommandCount) {
    problems.push(
      `CLI command catalog count mismatch: commandCount=${catalog.commandCount}, commands=${expectedCommandCount}`,
    );
  }
  if (invalidCommandCount > 0) {
    problems.push(
      `CLI command catalog has invalid command entries: ${invalidCommandCount}`,
    );
  }
  if (!referenceText.includes(`Command count: \`${catalog.commandCount}\``)) {
    problems.push('CLI command reference is missing the catalog command count.');
  }
  if (!summaryText.includes(`Command count: \`${catalog.commandCount}\``)) {
    problems.push('CLI command summary is missing the catalog command count.');
  }
  problems.push(
    ...findCliReferenceFreshnessProblems(referenceText, catalogCommands),
    ...findCliSummaryFreshnessProblems(summaryText, catalog, catalogCommands),
  );

  return problems;
}

function findCliReferenceFreshnessProblems(referenceText, commands) {
  return commands
    .filter((command) => !referenceText.includes(`\`${command.command}\``))
    .map((command) =>
      `CLI command reference is missing catalog command: ${command.command}`,
    );
}

function findCliSummaryFreshnessProblems(summaryText, catalog, commands) {
  const problems = [];
  const packageNeedles = [
    ['package name', `Package: \`${catalog.packageName}\``],
    ['package version', `Version: \`${catalog.packageVersion}\``],
    ['schema version', `Schema version: \`${catalog.schemaVersion}\``],
  ];
  const writeCommands = commands.filter((command) => command.group === 'write-rest');
  const writeValidationCount = writeCommands.filter((command) => command.validation).length;
  const confirmCommandCount = commands.filter((command) =>
    command.group === 'write-rest' || command.requiresConfirm,
  ).length;

  for (const [label, needle] of packageNeedles) {
    if (!summaryText.includes(needle)) {
      problems.push(`CLI command summary is missing catalog ${label}.`);
    }
  }

  for (const [group, label] of Object.entries(cliCommandGroupLabels)) {
    const groupCount = commands.filter((command) => command.group === group).length;
    if (!summaryText.includes(`| ${label} | \`${groupCount}\``)) {
      problems.push(
        `CLI command summary has stale group count for ${label}: expected ${groupCount}`,
      );
    }
  }

  const validationNeedle =
    `Write commands with local validation rules: \`${writeValidationCount}/${writeCommands.length}\``;
  if (!summaryText.includes(validationNeedle)) {
    problems.push(
      `CLI command summary has stale write validation count: expected ${writeValidationCount}/${writeCommands.length}`,
    );
  }

  const confirmationNeedle =
    `Commands requiring exact confirmation: \`${confirmCommandCount}\``;
  if (!summaryText.includes(confirmationNeedle)) {
    problems.push(
      `CLI command summary has stale confirmation count: expected ${confirmCommandCount}`,
    );
  }

  return problems;
}

async function collectCliRegistryCommands(projectRoot) {
  const catalogCommands = await collectCliCatalogCommands(projectRoot);
  if (catalogCommands) return catalogCommands;

  const commands = [];

  for (const relativeFile of commandSourceFiles) {
    const sourceFile = path.join(projectRoot, relativeFile);
    try {
      const sourceText = await readFile(sourceFile, 'utf8');
      commands.push(...extractCommands(sourceText));
    } catch {
      commands.push(`missing-source:${relativeFile}`);
    }
  }

  return commands.map((command) =>
    command.startsWith('missing-source:') ? command : `bydoxe ${command}`,
  );
}

async function collectCliCatalogCommands(projectRoot) {
  const catalogPath = path.join(projectRoot, 'docs', 'command-catalog.json');

  try {
    const catalog = await readCliCommandCatalog(catalogPath);
    if (!catalog) return undefined;

    return catalog.commands.map((command) =>
      typeof command.command === 'string'
        ? command.command
        : 'invalid-catalog-command',
    );
  } catch {
    return undefined;
  }
}

async function readCliCommandCatalog(catalogPath) {
  try {
    const catalog = JSON.parse(await readFile(catalogPath, 'utf8'));
    if (!catalog || typeof catalog !== 'object' || !Array.isArray(catalog.commands)) {
      return undefined;
    }

    return catalog;
  } catch {
    return undefined;
  }
}

function extractCommands(sourceText) {
  const commands = [];
  const commandPattern = /command:\s*\[([^\]]+)\]/g;

  for (const match of sourceText.matchAll(commandPattern)) {
    const parts = [...match[1].matchAll(/'([^']+)'/g)].map((part) => part[1]);
    if (parts.length > 0) {
      commands.push(parts.join(' '));
    }
  }

  return commands;
}

async function isDirectory(directory) {
  try {
    const directoryStat = await stat(directory);
    return directoryStat.isDirectory();
  } catch {
    return false;
  }
}

async function isFile(file) {
  try {
    const fileStat = await stat(file);
    return fileStat.isFile();
  } catch {
    return false;
  }
}

function findDuplicates(values) {
  const seen = new Set();
  const duplicates = new Set();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }
    seen.add(value);
  }

  return [...duplicates];
}

function unique(values) {
  return [...new Set(values)];
}
