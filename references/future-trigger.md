# Futures Trigger REST

Use this reference for authenticated futures trigger order reads and writes. Read commands require credentials but do not require `CONFIRM`. Write commands require `--dry-run` review first and exact `--confirm CONFIRM` for live execution.

## Commands

| Purpose | CLI Command | Endpoint | Risk |
| --- | --- | --- | --- |
| Pending trigger orders | `bydoxe future trigger orders-pending` | `GET /future/order/orders-plan-pending` | Read-only |
| Trigger order history | `bydoxe future trigger orders-history` | `GET /future/order/orders-plan-history` | Read-only |
| Place trigger order | `bydoxe future trigger place` | `POST /future/order/place-plan-order` | Creates a conditional futures order |
| Modify trigger order | `bydoxe future trigger modify` | `POST /future/order/modify-plan-order` | Changes a conditional futures order |
| Cancel trigger order | `bydoxe future trigger cancel` | `POST /future/order/cancel-plan-order` | Cancels one or more trigger orders |

## Read Examples

```sh
bydoxe future trigger orders-pending --limit 100 --symbol BTCUSDT --format json
bydoxe future trigger orders-history --limit 100 --symbol BTCUSDT --format json
```

## Dry-Run Examples

```sh
bydoxe future trigger place --body '{"symbol":"BTCUSDT","side":"BUY","triggerPrice":"61000","orderType":"LIMIT","price":"60900","size":"0.01"}' --dry-run --format json
bydoxe future trigger modify --body '{"symbol":"BTCUSDT","orderId":"trigger-order-id","triggerPrice":"61500"}' --dry-run --format json
bydoxe future trigger cancel --body '{"symbol":"BTCUSDT","orderId":"trigger-order-id"}' --dry-run --format json
```

## Required Pre-Confirmation Summary

Before live execution, show:

- Exact CLI command.
- Symbol, side, trigger price, execution price, order type, and size.
- Trigger order ID for modify or cancel actions.
- Expected effect when the trigger condition is met.
- Confirmation requirement: exact `CONFIRM`.

## Safety

Reading pending or historical trigger orders is an authenticated read. Creating, modifying, or canceling trigger orders is a write action even if the order does not execute immediately. Treat write commands as future order placement or order modification.
