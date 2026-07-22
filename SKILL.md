---
name: bydoxe
description: BYDOXE Open API agent workflow guidance. Use when an AI agent needs help with BYDOXE market data, account lookups, multilingual trading requests, REST or WebSocket workflows, CLI command selection, API authentication, request signing, dry-run previews, or safe handling of orders, transfers, withdrawals, futures settings, TP/SL, trigger orders, and copy trading tasks.
license: Proprietary. LICENSE.md has complete terms.
metadata:
  author: BYDOXE
  version: "0.1.3"
  companion_cli: "@bydoxe/bydoxe-cli"
  compatibility_clients: "Agent Skills-compatible clients including Codex, Claude Code, Cursor, VS Code GitHub Copilot, and other agents that load SKILL.md packages."
---

# BYDOXE

## Overview

Use this skill to turn BYDOXE Open API requests into safe BYDOXE CLI workflows. Prefer the `bydoxe` CLI for REST execution, request preview, credential loading, and structured output.

## Core Workflow

1. Classify the user request as public read, authenticated read, write action, or WebSocket workflow.
2. Read the matching reference file before giving commands or acting.
3. Prefer `--dry-run` when building or reviewing requests.
4. Never ask the user to paste API secrets into chat.
5. Require explicit `CONFIRM` before any write action that can place orders, cancel orders, move funds, withdraw assets, change leverage or margin settings, close positions, modify TP/SL, or change copy trading settings.
6. Use `bydoxe config status` to check credential setup when private access is needed. Do not read local credential files directly.
7. Report the exact CLI command, endpoint class, authentication requirement, and safety status before execution when risk is non-trivial.

## Reference Routing

- Setup, installation, environment variables, and default domains: read [setup.md](references/setup.md).
- Credential setup, key handling, missing credentials, and exposed-secret handling: read [credential-management.md](references/credential-management.md).
- Authentication, HMAC signing, private REST headers, and WebSocket login signing: read [authentication.md](references/authentication.md).
- Safety classification, `CONFIRM` rules, credential handling, and write-action review checklists: read [safety.md](references/safety.md).
- Multilingual request interpretation for Korean, Japanese, Chinese, Vietnamese, and Russian trading language: read [language-support.md](references/language-support.md).
- Output expectations, dry-run previews, JSON handling, and command reporting: read [output.md](references/output.md).
- BYDOXE terms, market categories, order concepts, and account terminology: read [glossary.md](references/glossary.md).
- Server time and common exchange-level endpoints: read [common.md](references/common.md).
- Authenticated account overview and funding balance reads: read [account.md](references/account.md).
- Spot market data requests for symbols, tickers, order books, candles, and trades: read [spot-market.md](references/spot-market.md).
- Authenticated spot balances, spot order reads, deposit records, withdrawal records, transfer records, and deposit addresses: read [spot-account.md](references/spot-account.md).
- Spot order placement, cancellation, cancel-replace, and batch spot order writes: read [spot-trade.md](references/spot-trade.md).
- Futures market data requests for tickers, mark price, depth, candles, funding, open interest, and long/short ratios: read [future-market.md](references/future-market.md).
- Authenticated futures position reads: read [future-position.md](references/future-position.md).
- Authenticated futures account estimates and futures order reads: read [future-account.md](references/future-account.md).
- Futures order placement, modification, cancellation, close-position, and cancel-all writes: read [future-order.md](references/future-order.md).
- Futures trigger order reads and writes: read [future-trigger.md](references/future-trigger.md).
- Futures take-profit and stop-loss writes: read [future-tpsl.md](references/future-tpsl.md).
- Copy trading trader reads, TP/SL changes, settings, follower removal, and position close actions: read [copytrading-trader.md](references/copytrading-trader.md).
- Copy trading follower reads, TP/SL changes, copy settings, position close actions, and cancel-follow actions: read [copytrading-follower.md](references/copytrading-follower.md).
- CFD, OTC, stock, and TradFi-style product areas that appear in internal API schemas but do not yet expose public Open API controller routes: read [pending-product-areas.md](references/pending-product-areas.md).
- Public WebSocket ping, subscribe, unsubscribe, and market stream previews: read [websocket-public.md](references/websocket-public.md).
- Private WebSocket login, subscriptions, and spot trade message previews: read [websocket-private.md](references/websocket-private.md).

## Current CLI Surface

The BYDOXE CLI supports public REST reads, authenticated account and order reads, spot writes, futures writes, trigger orders, TP/SL place/modify/cancel commands, copy trading trader/follower commands, and WebSocket message previews documented in the reference files.

When the companion CLI repository is available, treat `cli-project/docs/command-reference.md` as the generated canonical command surface for endpoint mapping, parameter hints, risk levels, and write validation rules.

Use `cli-project/docs/command-summary.md` as the generated quick status summary for command counts, group coverage, risk profile, and safety scope when the companion CLI repository is available.

Common options:

- `--base-url <url>`
- `--format json`
- `--dry-run`

Treat additional command flags as query parameters unless a later reference file says otherwise.

Do not invent CLI support for endpoints that are not listed in the relevant reference file as currently supported. For planned endpoints, provide the endpoint and a planned command shape instead of executing it.

## Safety Defaults

Public market data reads may be executed without extra confirmation. Authenticated reads may be executed after confirming the user has configured credentials locally.

Write actions are blocked until the user replies with the exact word `CONFIRM` after seeing a concise risk summary and the exact command to run.
