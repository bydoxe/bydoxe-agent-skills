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
- Tell the user to configure credentials locally through environment variables or a secure environment manager.
- Do not print secrets in command examples, logs, dry-run previews, or summaries.

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

## Public Read Rule

Public market data reads may run without explicit confirmation. Prefer `--dry-run` when the user asks to review the request, debug an endpoint, or generate a command for later use.
