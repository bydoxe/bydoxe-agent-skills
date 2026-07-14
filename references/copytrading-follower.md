# Copy Trading Follower REST

Use this reference for authenticated copy trading follower reads and writes. Separate follower lookup requests from actions that change copy settings, TP/SL, positions, or follow relationships.

## Safety

Authentication is required. Never ask the user to paste API keys, secrets, or passphrases into chat.

Read-only follower endpoints do not require `CONFIRM`. Write actions require `--dry-run` review first and exact `--confirm CONFIRM` for live execution.

High-risk follower write actions include:

- Changing follower TP/SL.
- Changing copy trading settings.
- Closing follower copy trading positions.
- Cancelling a follow relationship.

## Read Commands

| Purpose | CLI Command | Endpoint |
| --- | --- | --- |
| Current copied orders | `bydoxe copytrading follower current-orders` | `GET /copy/mix-follower/query-current-orders` |
| Historical copied orders | `bydoxe copytrading follower history-orders` | `GET /copy/mix-follower/query-history-orders` |
| Copy trading settings | `bydoxe copytrading follower settings` | `GET /copy/mix-follower/query-copy-trade-settings` |
| My traders | `bydoxe copytrading follower traders` | `GET /copy/mix-follower/query-my-traders` |

## Write Commands

| Purpose | CLI Command | Endpoint | Risk |
| --- | --- | --- | --- |
| Set follower TP/SL | `bydoxe copytrading follower setting-tpsl` | `POST /copy/mix-follower/setting-tpsl` | Changes copied position exit behavior |
| Configure copy trade | `bydoxe copytrading follower setting-copy-trade` | `POST /copy/mix-follower/setting-copy-trade` | Changes copy sizing or copy behavior |
| Close copied positions | `bydoxe copytrading follower close-positions` | `POST /copy/mix-follower/close-positions` | Closes copied positions |
| Cancel follow | `bydoxe copytrading follower cancel-follow` | `POST /copy/mix-follower/cancel-follow` | Stops following a trader |

## Read Examples

```sh
bydoxe copytrading follower current-orders --symbol BTCUSDT --dry-run --format json
bydoxe copytrading follower history-orders --symbol BTCUSDT --pageNo 1 --pageSize 20 --dry-run --format json
bydoxe copytrading follower settings --traderId trader-1 --dry-run --format json
bydoxe copytrading follower traders --dry-run --format json
```

## Write Dry-Run Examples

```sh
bydoxe copytrading follower setting-tpsl --body '{"symbol":"BTCUSDT","trackingNo":"track-1","stopSurplusPrice":"62000","stopLossPrice":"58000"}' --dry-run --format json
bydoxe copytrading follower setting-copy-trade --body '{"traderId":"trader-1","symbol":"BTCUSDT","copyAmount":"100"}' --dry-run --format json
bydoxe copytrading follower close-positions --body '{"symbol":"BTCUSDT","trackingNo":"track-1"}' --dry-run --format json
bydoxe copytrading follower cancel-follow --body '{"traderId":"trader-1"}' --dry-run --format json
```

## Required Pre-Confirmation Summary

Before live execution, show:

- Exact CLI command.
- Follower-side action type.
- Trader identifier, symbol, tracking number, position side, copy amount, and TP/SL values when present.
- Whether the action changes future copied orders, existing copied positions, or the follow relationship.
- Current setting and intended new setting when known.
- Confirmation requirement: exact `CONFIRM`.

## Parameter Notes

| Parameter | Meaning |
| --- | --- |
| `traderId` | Trader identifier for settings, follow, or cancel-follow actions |
| `symbol` | Futures trading pair such as `BTCUSDT` |
| `trackingNo` | Copy trading tracking identifier when supplied by BYDOXE |
| `copyAmount` | Follower copy amount when supported |
| `pageNo` / `pageSize` | Pagination controls |
| `startTime` / `endTime` | Millisecond timestamp filters |
| `stopSurplusPrice` | Take-profit trigger price when supported |
| `stopLossPrice` | Stop-loss trigger price when supported |
