# Futures TP/SL Writes

Use this reference for authenticated futures take-profit and stop-loss writes. Every command in this file requires `--dry-run` review first and exact `--confirm CONFIRM` for live execution.

## Commands

| Purpose | CLI Command | Endpoint | Risk |
| --- | --- | --- | --- |
| Place TP/SL order | `bydoxe future tpsl place` | `POST /future/order/place-tpsl-order` | Creates take-profit or stop-loss protection |
| Modify TP/SL order | `bydoxe future tpsl modify` | `POST /future/order/modify-tpsl-order` | Changes existing TP/SL conditions |

## Dry-Run Examples

```sh
bydoxe future tpsl place --body '{"symbol":"BTCUSDT","planType":"TAKE_PROFIT","triggerPrice":"62000","holdSide":"LONG","size":"0.01"}' --dry-run --format json
bydoxe future tpsl modify --body '{"symbol":"BTCUSDT","orderId":"tpsl-order-id","triggerPrice":"62500"}' --dry-run --format json
```

## Required Pre-Confirmation Summary

Before live execution, show:

- Exact CLI command.
- Symbol, position side, TP/SL plan type, trigger price, size, and order ID when modifying.
- Whether the action creates or changes take-profit, stop-loss, or both.
- Expected effect if the trigger fires.
- Confirmation requirement: exact `CONFIRM`.

## Safety

TP/SL changes affect risk management and exit behavior. If the user says "take profit", "stop loss", "cut loss", or equivalent multilingual phrases, confirm whether they want an explanation or a live TP/SL write action.
