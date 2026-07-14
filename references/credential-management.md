# Credential Management

Use this reference whenever a user asks how to connect BYDOXE private API access, where to store keys, why authentication failed, or whether they can paste credentials into chat.

## Core Rule

Do not collect, store, echo, transform, summarize, or transmit BYDOXE API secrets in chat.

The skill package never contains credentials. The AI agent should only tell the user how to configure credentials in their own local environment for the companion BYDOXE CLI.

## Required Values

Private BYDOXE REST and private WebSocket workflows require:

```sh
export BYDOXE_ACCESS_KEY="<your-access-key>"
export BYDOXE_SECRET_KEY="<your-secret-key>"
export BYDOXE_PASSPHRASE="<your-passphrase>"
```

Use placeholder values only. Never ask the user to replace placeholders inside the chat message with real secrets.

## Current Supported Configuration

The current companion CLI reads credentials from local environment variables.

Recommended shell setup:

```sh
export BYDOXE_ACCESS_KEY="<your-access-key>"
export BYDOXE_SECRET_KEY="<your-secret-key>"
export BYDOXE_PASSPHRASE="<your-passphrase>"
```

The user may place these exports in a local shell profile or secure environment manager if their operating environment permits it.

Do not recommend committing credentials to a repository, issue, README, release note, prompt, chat transcript, shared terminal log, or packaged skill archive.

## Planned Secure CLI Profile

Some exchange CLIs support an interactive command such as `config set` that stores credentials in a local user config file. BYDOXE Agent Skills should not claim `bydoxe config set` exists until the companion CLI implements and documents that command.

If a user asks for a saved local profile, explain that the current supported path is environment variables and that a future CLI credential profile can be added later.

## Agent Handling

When credentials are missing:

- Say that private commands require local BYDOXE credentials.
- List the required environment variable names.
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

Use dry-run commands to verify local credential loading without exposing secret values:

```sh
bydoxe account funding-assets --dry-run --format json
bydoxe websocket private login --dry-run --format json
```

If dry-run output contains credential-bearing fields, they must be redacted by the companion CLI.
