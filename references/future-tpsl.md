# Futures TP/SL Writes

Use this reference for authenticated futures take-profit and stop-loss writes. Every command in this file requires `--dry-run` review first and exact `--confirm CONFIRM` for live execution.

## Commands

| Purpose | CLI Command | Endpoint | Risk |
| --- | --- | --- | --- |
| Place TP/SL order | `bydoxe future tpsl place` | `POST /future/order/place-tpsl-order` | Creates take-profit or stop-loss protection |
| Modify TP/SL order | `bydoxe future tpsl modify` | `POST /future/order/modify-tpsl-order` | Changes existing TP/SL conditions |
| Cancel TP/SL order | `bydoxe future tpsl cancel` | `POST /future/order/cancel-tpsl-order` | Cancels existing TP/SL protection |

## Dry-Run Examples

```sh
bydoxe future tpsl place --body '{"symbol":"BTCUSDT","planType":"TAKE_PROFIT","holdSide":"LONG","orderType":"MARKET","triggerPrice":"62000","triggerPriceType":"LAST","size":"0.01"}' --dry-run --format json
bydoxe future tpsl modify --body '{"symbol":"BTCUSDT","orderId":"tpsl-order-id","orderType":"MARKET","triggerPrice":"62500","size":"0.01"}' --dry-run --format json
bydoxe future tpsl cancel --body '{"symbol":"BTCUSDT","orderIdList":[{"orderId":"tpsl-order-id"}]}' --dry-run --format json
```

## Required Pre-Confirmation Summary

Before live execution, show:

- Exact CLI command.
- Symbol, position side, TP/SL plan type, trigger price, trigger price type, order type, size, and order IDs when modifying or cancelling.
- Whether the action creates or changes take-profit, stop-loss, or both.
- Expected effect if the trigger fires.
- Confirmation requirement: exact `CONFIRM`.

## Safety

TP/SL changes affect risk management and exit behavior. Cancelling TP/SL can remove protective exits. If the user says "take profit", "stop loss", "cut loss", or equivalent multilingual phrases, confirm whether they want an explanation, a read-only lookup, or a live TP/SL write action.
