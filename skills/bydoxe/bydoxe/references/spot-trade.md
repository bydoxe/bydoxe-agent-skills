# Spot Trade Writes

Use this reference for authenticated spot order writes. Every command in this file requires `--dry-run` review first and exact `--confirm CONFIRM` for live execution.

## Safety

Never ask the user to paste API keys, secrets, or passphrases into chat. Use locally configured credentials.

Do not treat casual approval as confirmation. Live execution requires:

```text
CONFIRM
```

## Commands

| Purpose | CLI Command | Endpoint | Risk |
| --- | --- | --- | --- |
| Place order | `bydoxe spot trade place-order` | `POST /spot/trade/place-order` | Places a spot order |
| Cancel order | `bydoxe spot trade cancel-order` | `POST /spot/trade/cancel-order` | Cancels one spot order |
| Cancel and replace | `bydoxe spot trade cancel-replace-order` | `POST /spot/trade/cancel-replace-order` | Cancels an order and places a replacement |
| Batch cancel and replace | `bydoxe spot trade batch-cancel-replace-order` | `POST /spot/trade/batch-cancel-replace-order` | Changes multiple orders |
| Batch place | `bydoxe spot trade batch-orders` | `POST /spot/trade/batch-orders` | Places multiple orders |
| Batch cancel | `bydoxe spot trade batch-cancel-orders` | `POST /spot/trade/batch-cancel-orders` | Cancels multiple orders |
| Cancel symbol orders | `bydoxe spot trade cancel-symbol-order` | `POST /spot/trade/cancel-symbol-order` | Cancels open orders for a symbol |

## Dry-Run Examples

```sh
bydoxe spot trade place-order --body '{"symbol":"BTCUSDT","orderType":"MARKET","tradeType":"BUY","amount":"0.001"}' --dry-run --format json
bydoxe spot trade cancel-order --body '{"symbol":"BTCUSDT","orderId":"spot-order-id"}' --dry-run --format json
bydoxe spot trade cancel-symbol-order --body '{"symbol":"BTCUSDT"}' --dry-run --format json
```

## Required Pre-Confirmation Summary

Before live execution, show:

- Exact CLI command.
- Symbol, side, order type, quantity, price, and quote/base amount.
- Order ID or client order ID for cancellations.
- Number of orders for batch actions.
- Expected effect.
- Confirmation requirement: exact `CONFIRM`.

## Body Guidance

Prefer `--body` JSON for order writes so numeric values and nested batch structures remain explicit.

```sh
bydoxe spot trade place-order --body '{"symbol":"BTCUSDT","orderType":"LIMIT","tradeType":"BUY","price":"60000","amount":"0.001"}' --dry-run --format json
```
