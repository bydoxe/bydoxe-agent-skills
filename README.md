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
- Spot market reference
- Futures market reference

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
    spot-market.md
    future-market.md
```

## CLI Dependency

This skill expects the BYDOXE CLI to provide request construction, credential loading, signing, dry-run previews, and structured output.

```sh
bydoxe --help
bydoxe spot market tickers --symbol BTCUSDT --dry-run --format json
```

## Safety

Do not paste API secrets into AI chat sessions. Configure credentials locally in the shell or a secure environment manager.

Any write action that can change balances, orders, positions, leverage, margin settings, withdrawals, or copy trading settings requires explicit `CONFIRM` after a command and risk summary.
