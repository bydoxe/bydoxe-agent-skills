# BYDOXE Agent Skills

BYDOXE Agent Skills helps Agent Skills-compatible AI tools understand and operate BYDOXE workflows through the companion BYDOXE CLI.

Install this skill package when you want an AI assistant in Codex, Claude Code, Cursor, VS Code GitHub Copilot, or another Agent Skills-compatible client to translate user requests into safe BYDOXE CLI workflows for market data, account review, trading preparation, futures workflows, copy trading, and WebSocket previews.

The skill is designed for multilingual users and preview-first operation:

- It maps natural-language requests to BYDOXE CLI commands.
- It keeps private API credentials in the user's local CLI environment.
- It tells the agent to use dry-run previews before sensitive actions.
- It requires exact `CONFIRM` before write actions.
- It routes agents to generated CLI references when the companion CLI repository is available.

## Installation

Requires Node.js 18+.

Install the skill for the active agent workspace:

```sh
npx skills add bydoxe/bydoxe-agent-skills
```

Install globally when your agent supports global skills:

```sh
npx skills add bydoxe/bydoxe-agent-skills -g
```

This package is designed for Agent Skills-compatible clients, including Codex, Claude Code, Cursor, VS Code GitHub Copilot, and other tools that load `SKILL.md` packages.

Install the companion CLI separately:

```sh
npm install -g @bydoxe/bydoxe-cli
```

## What The Skill Helps With

- Public market data requests for spot and futures markets.
- Authenticated account, balance, position, order, and copy trading review.
- Spot order, futures order, TP/SL, trigger order, transfer, withdrawal, leverage, margin, and copy trading change preparation.
- Public WebSocket subscription previews and bounded live guidance.
- Private WebSocket login and subscription previews.
- Private read-only WebSocket live guidance behind explicit local opt-in gates.
- Korean, Japanese, Chinese, Vietnamese, and Russian intent interpretation for common trading terms.

## Typical Requests

An AI assistant using this skill should be able to handle requests like:

```text
Show the BTCUSDT ticker.
Check my futures positions.
Prepare a market buy order for BTCUSDT.
Show my copy trading follower settings.
Preview a public WebSocket ticker subscription.
```

For write actions, the assistant should first produce a dry-run preview and risk summary. It should ask for exact `CONFIRM` only after the user has reviewed the material command details.

## User Safety Rules

- Do not paste API secrets into AI chat sessions.
- Configure private credentials locally for the companion BYDOXE CLI.
- Treat order placement, cancellation, withdrawals, transfers, leverage, margin, TP/SL, trigger orders, copy trading changes, and WebSocket spot trade payloads as high-risk workflows.
- Keep private WebSocket spot trade live execution unsupported.
- Keep private read-only WebSocket live execution behind local opt-in gates and bounded runtime controls.

## Companion CLI

This skill expects the BYDOXE CLI to provide request construction, credential loading, signing, dry-run previews, and structured output.

```sh
bydoxe --help
bydoxe spot market tickers --symbol BTCUSDT --dry-run --format json
bydoxe future position all --dry-run --format json
```

Each installer or operator must configure private API credentials in the local CLI environment:

```sh
export BYDOXE_ACCESS_KEY="<your-access-key>"
export BYDOXE_SECRET_KEY="<your-secret-key>"
export BYDOXE_PASSPHRASE="<your-passphrase>"
```

The skill package must never include credentials.

## Included References

```text
SKILL.md
agents/openai.yaml
references/
  setup.md
  safety.md
  authentication.md
  glossary.md
  language-support.md
  output.md
  common.md
  account.md
  spot-market.md
  spot-account.md
  spot-trade.md
  future-market.md
  future-position.md
  future-account.md
  future-order.md
  future-trigger.md
  future-tpsl.md
  copytrading-trader.md
  copytrading-follower.md
  websocket-public.md
  websocket-private.md
```

## Distribution

The current BYDOXE Agent Skills release target is version `0.1.1`, matching the companion BYDOXE CLI patch release target. The project is distributed as an Agent Skills-compatible skill package through GitHub and release archives.

Use [docs/distribution.md](docs/distribution.md) for versioning, skill package distribution, companion CLI compatibility, and installer-owned credential configuration policy.

Use [docs/release-readiness.md](docs/release-readiness.md) before publishing or tagging a release.

## Maintainer Checks

```sh
node scripts/validate-skill.mjs
```

The validation script checks required skill files, `SKILL.md` reference links, required reference sections, default domains, safety coverage terms, CLI command reference sync when the CLI project is available, unfinished markers, and English-only artifacts outside the multilingual language reference.
