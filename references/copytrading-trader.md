# Copy Trading Trader REST

Use this reference for authenticated copy trading trader reads and writes. Separate read-only lookup requests from actions that change TP/SL, trader settings, followers, or positions.

## Safety

Authentication is required. Never ask the user to paste API keys, secrets, or passphrases into chat.

Read-only trader endpoints do not require `CONFIRM`. Write actions require `--dry-run` review first and exact `--confirm CONFIRM` for live execution.

High-risk trader write actions include:

- Modifying tracked order TP/SL.
- Closing tracked positions.
- Changing trader copy trading settings.
- Removing a follower.

## Read Commands

| Purpose | CLI Command | Endpoint |
| --- | --- | --- |
| Current tracked orders | `bydoxe copytrading trader current-orders` | `GET /copy/mix-trader/order-current-track` |
| Historical tracked orders | `bydoxe copytrading trader history-orders` | `GET /copy/mix-trader/order-history-track` |
| Order total detail | `bydoxe copytrading trader total-detail` | `GET /copy/mix-trader/order-total-detail` |
| Profit history summary | `bydoxe copytrading trader profit-summary` | `GET /copy/mix-trader/profit-history-summarys` |
| Profit history details | `bydoxe copytrading trader profit-history` | `GET /copy/mix-trader/profit-history-details` |
| Profit details | `bydoxe copytrading trader profit-details` | `GET /copy/mix-trader/profit-details` |
| Followers | `bydoxe copytrading trader followers` | `GET /copy/mix-trader/query-followers` |

## Write Commands

| Purpose | CLI Command | Endpoint | Risk |
| --- | --- | --- | --- |
| Modify tracked order TP/SL | `bydoxe copytrading trader modify-tpsl` | `POST /copy/mix-trader/order-modify-tpsl` | Changes tracked order exit behavior |
| Close tracked positions | `bydoxe copytrading trader close-positions` | `POST /copy/mix-trader/order-close-positions` | Closes copy trading trader positions |
| Configure trader settings | `bydoxe copytrading trader config` | `POST /copy/mix-trader/config-trader-setting` | Changes trader copy settings |
| Remove follower | `bydoxe copytrading trader remove-follower` | `POST /copy/mix-trader/remove-follower` | Removes a follower from copy trading |

## Read Examples

```sh
bydoxe copytrading trader current-orders --symbol BTCUSDT --dry-run --format json
bydoxe copytrading trader history-orders --symbol BTCUSDT --pageNo 1 --pageSize 20 --dry-run --format json
bydoxe copytrading trader followers --pageNo 1 --pageSize 20 --dry-run --format json
```

## Write Dry-Run Examples

```sh
bydoxe copytrading trader modify-tpsl --body '{"symbol":"BTCUSDT","trackingNo":"track-1","stopSurplusPrice":"62000","stopLossPrice":"58000"}' --dry-run --format json
bydoxe copytrading trader close-positions --body '{"symbol":"BTCUSDT","trackingNo":"track-1"}' --dry-run --format json
bydoxe copytrading trader config --body '{"symbol":"BTCUSDT","copyTradeMode":"fixed"}' --dry-run --format json
bydoxe copytrading trader remove-follower --body '{"followerId":"follower-1"}' --dry-run --format json
```

## Required Pre-Confirmation Summary

Before live execution, show:

- Exact CLI command.
- Trader-side action type.
- Symbol, tracking number, follower identifier, position side, and TP/SL values when present.
- Current setting and intended new setting when known.
- Expected effect on followers, copied positions, or tracked orders.
- Confirmation requirement: exact `CONFIRM`.

## Parameter Notes

| Parameter | Meaning |
| --- | --- |
| `symbol` | Futures trading pair such as `BTCUSDT` |
| `trackingNo` | Copy trading tracking identifier when supplied by BYDOXE |
| `followerId` | Follower identifier for removal actions |
| `pageNo` / `pageSize` | Pagination controls |
| `startTime` / `endTime` | Millisecond timestamp filters |
| `stopSurplusPrice` | Take-profit trigger price when supported |
| `stopLossPrice` | Stop-loss trigger price when supported |
