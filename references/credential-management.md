# Credential Management

Use this reference whenever a user asks how to connect BYDOXE private API access, where to store keys, why authentication failed, or whether they can paste credentials into chat.

## Core Rule

Do not collect, store, echo, transform, summarize, or transmit BYDOXE API secrets in chat.

The skill package never contains credentials. The AI agent should only tell the user how to configure credentials in their own local environment for the companion BYDOXE CLI.

The agent must not inspect `~/.bydoxe/config` or any other local secret file directly. Use `bydoxe config status` to check whether credentials are configured.

## Required Values

Private BYDOXE REST and private WebSocket workflows require:

```sh
bydoxe config set
```

The underlying credential values are access key, secret key, and passphrase. Never ask the user to paste those values into chat.

## Current Supported Configuration

The current companion CLI supports a local credential profile and environment variables.

Recommended local profile setup:

```sh
bydoxe config set
bydoxe config status
```

The local profile is stored by the CLI at `~/.bydoxe/config` with restricted file permissions. Agents must not read this file directly. Use `bydoxe config status` and rely only on its masked output.

Environment variables are also supported and take priority over the local profile:

```sh
export BYDOXE_ACCESS_KEY="<your-access-key>"
export BYDOXE_SECRET_KEY="<your-secret-key>"
export BYDOXE_PASSPHRASE="<your-passphrase>"
```

Do not recommend committing credentials to a repository, issue, README, release note, prompt, chat transcript, shared terminal log, or packaged skill archive.

## Local Profile Commands

Use these commands when helping users configure private access:

```sh
bydoxe config set
bydoxe config status
bydoxe config clear
```

Agent behavior:

- Use `bydoxe config set` to guide the user through local setup.
- Use `bydoxe config status` to verify setup without exposing secrets.
- Use `bydoxe config clear` only when the user explicitly asks to remove the local profile.
- Do not open, print, summarize, or transform the local credential file.

## Agent Handling

When credentials are missing:

- Say that private commands require local BYDOXE credentials.
- Ask the user to run `bydoxe config set`, or list the environment variable names if they prefer environment-based setup.
- Offer a public read-only command if the user's request can be answered without private access.
- Do not ask the user to paste actual values.

When credentials appear in chat:

- Tell the user not to share secrets in chat.
- Do not repeat the values.
- Recommend rotating the exposed keys in the BYDOXE account console if real credentials were shared.
- Continue only with placeholder examples.

## Private Workflow Boundary

Authenticated read commands may run after confirming credentials are configured locally.

Write actions still require dry-run review first and exact `CONFIRM` before live execution. Credential configuration never counts as trading confirmation.

Private read-only WebSocket live sessions also require explicit local opt-in gates and bounded runtime controls.

## Setup Check Commands

Use status and dry-run commands to verify local credential loading without exposing secret values:

```sh
bydoxe config status
bydoxe account funding-assets --dry-run --format json
bydoxe websocket private login --dry-run --format json
```

If dry-run output contains credential-bearing fields, they must be redacted by the companion CLI.
