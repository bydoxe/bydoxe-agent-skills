# Futures Order Writes

Use this reference for authenticated futures order writes. Every command in this file requires `--dry-run` review first and exact `--confirm CONFIRM` for live execution.

## Safety

Futures write actions can open, modify, cancel, or close leveraged exposure. Never proceed from ambiguous language such as "close", "clean up", or "liquidate" without confirming the exact intended action.

Live execution requires:

```text
CONFIRM
```

## Commands

| Purpose | CLI Command | Endpoint | Risk |
| --- | --- | --- | --- |
| Place order | `bydoxe future order place` | `POST /future/order/place-order` | Opens or increases futures exposure |
| Reversal order | `bydoxe future order click-backhand` | `POST /future/order/click-backhand` | Places a reversal order |
| Batch place | `bydoxe future order batch-place` | `POST /future/order/batch-place-order` | Places multiple futures orders |
| Modify order | `bydoxe future order modify` | `POST /future/order/modify-order` | Changes an existing order |
| Cancel order | `bydoxe future order cancel` | `POST /future/order/cancel-order` | Cancels one futures order |
| Batch cancel | `bydoxe future order batch-cancel` | `POST /future/order/batch-cancel-orders` | Cancels multiple futures orders |
| Close positions | `bydoxe future order close-positions` | `POST /future/order/close-positions` | Closes futures positions |
| Cancel all orders | `bydoxe future order cancel-all` | `POST /future/order/cancel-all-orders` | Cancels all futures orders |

## Dry-Run Examples

```sh
bydoxe future order place --body '{"symbol":"BTCUSDT","side":"BUY","orderType":"LIMIT","price":"60000","size":"0.01"}' --dry-run --format json
bydoxe future order cancel --body '{"symbol":"BTCUSDT","orderId":"future-order-id"}' --dry-run --format json
bydoxe future order close-positions --body '{"symbol":"BTCUSDT","holdSide":"LONG"}' --dry-run --format json
bydoxe future order cancel-all --dry-run --format json
```

## Required Pre-Confirmation Summary

Before live execution, show:

- Exact CLI command.
- Symbol, side, hold side, order type, quantity, price, trigger or condition if any.
- Order ID, client order ID, or number of orders for cancel/modify/batch actions.
- Position side and expected exposure reduction for close-position actions.
- Leverage and margin context if known.
- Expected effect.
- Confirmation requirement: exact `CONFIRM`.

## Body Guidance

Prefer `--body` JSON for futures order writes.

```sh
bydoxe future order place --body '{"symbol":"BTCUSDT","side":"BUY","orderType":"MARKET","size":"0.01"}' --dry-run --format json
```
