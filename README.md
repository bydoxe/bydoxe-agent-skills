# BYDOXE Agent Skills

BYDOXE Agent Skills helps AI agents use the BYDOXE Open API through safe, CLI-first workflows.

The skill package guides agents through market data lookup, account inquiry, authentication handling, dry-run previews, structured output, and explicit confirmation for risky actions such as orders, withdrawals, transfers, futures settings, TP/SL, trigger orders, and copy trading changes.

## Status

This repository is in the initial skill scaffold phase.

Implemented:

- BYDOXE skill metadata and routing instructions
- Setup reference
- Safety reference
- Authentication reference
- Glossary reference
- Language support reference
- Output reference
- Common public and exchange-level reference
- Authenticated account reference
- Spot market reference
- Authenticated spot account reference
- Spot trade write reference
- Futures market reference
- Authenticated futures position reference
- Authenticated futures account reference
- Futures order write reference
- Futures trigger order write reference
- Futures TP/SL write reference
- Copy trading trader reference
- Copy trading follower reference
- Public WebSocket reference
- Private WebSocket reference

## Layout

```text
skills/bydoxe/bydoxe/
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

## CLI Dependency

This skill expects the BYDOXE CLI to provide request construction, credential loading, signing, dry-run previews, and structured output.

```sh
bydoxe --help
bydoxe spot market tickers --symbol BTCUSDT --dry-run --format json
```

## Validation

```sh
node scripts/validate-skill.mjs
```

The validation script checks required skill files, `SKILL.md` reference links, default domains, safety coverage terms, CLI command reference sync when the CLI project is available, unfinished markers, and English-only artifacts outside the multilingual language reference.

## Safety

Do not paste API secrets into AI chat sessions. Configure credentials locally in the shell or a secure environment manager.

Any write action that can change balances, orders, positions, leverage, margin settings, withdrawals, or copy trading settings requires explicit `CONFIRM` after a command and risk summary.
