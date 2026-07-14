# Safety

## Classification

Classify every request before acting.

| Class | Examples | Confirmation |
| --- | --- | --- |
| Public read | Server time, tickers, symbols, order book, candles | Not required |
| Authenticated read | Balances, positions, order history, fills, deposit records | Confirm credentials are configured locally |
| Write action | Place order, cancel order, transfer, withdraw, set leverage, set margin, close position, WebSocket spot trade | Requires `CONFIRM` |
| High-risk write action | Withdrawals, market orders, close positions, leverage changes, copy trading changes, WebSocket trade payloads | Requires `CONFIRM` and a stricter review summary |

## Credential Rules

- Never ask the user to paste API keys, secrets, or passphrases into chat.
- Tell the user to configure credentials locally through `bydoxe config set`, environment variables, or a secure environment manager.
- Use `bydoxe config status` for masked setup checks. Do not read local credential files directly.
- Do not print secrets in command examples, logs, dry-run previews, or summaries.
- Use [credential-management.md](credential-management.md) when explaining setup, missing credentials, exposed credentials, or private API connection checks.

## Write Action Rule

Before any write action, show:

- The exact CLI command.
- Whether it is a spot, futures, account, withdrawal, copy trading, or WebSocket trade action.
- The target symbol, asset, account, order ID, position, or follower/trader identifier.
- Side, order type, quantity, price, trigger price, leverage, margin, or other material parameter.
- The expected effect.
- Whether dry-run or preview was used.

Then wait for the user to reply with the exact word:

```text
CONFIRM
```

Do not treat casual approval, partial approval, or a translated equivalent as confirmation for write actions.

Do not ask for `CONFIRM` until all material parameters are known and an exact command has been shown. If a request is missing symbol, side, order type, quantity, price, account, order ID, position side, follower/trader identifier, or other required context, ask for the missing information or propose a read-only lookup first.

For "all", "full balance", "close everything", or equivalent requests, do not infer the quantity. Use an authenticated read command to inspect balances, positions, or open orders first, then build a dry-run write preview with explicit values.

## Batch Body Review

Batch write commands need extra review because one command can place, modify, or cancel multiple orders.

Before asking for `CONFIRM` on a batch write, show:

- Number of batch items.
- Symbols covered by the batch.
- Side and order type coverage when the body contains order placement or replacement.
- Total visible quantity when all quantities are explicit.
- Identifier count for batch cancellations.
- Any missing or ambiguous nested value.

Use generated command reference validation rules when the companion CLI exposes validation for the target write body. If validation is not listed for the target command, keep the workflow in dry-run review mode and ask for explicit missing values before live execution.

## Required Write-Action Coverage

Keep these high-risk actions covered by `CONFIRM` guidance:

- `place-order`
- `cancel-order`
- `withdraw`
- `transfer`
- `set-leverage`
- `set-margin`
- `set-margin-mode`
- `close-positions`
- `cancel-all`
- `place-plan-order`
- `modify-plan-order`
- `place-tpsl-order`
- `modify-tpsl-order`
- copy trading settings, follower removal, position close, and cancel-follow actions
- WebSocket spot trade payloads

## Public Read Rule

Public market data reads may run without explicit confirmation. Prefer `--dry-run` when the user asks to review the request, debug an endpoint, or generate a command for later use.
