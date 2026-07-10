# Spot Account REST

Use this reference for authenticated spot account reads, deposit/withdrawal records, transfer records, deposit addresses, and spot order reads. These endpoints require credentials but do not create orders or move funds.

## Safety

Authentication is required. Never ask the user to paste API keys, secrets, or passphrases into chat.

The endpoints in this file are read-only and do not require `CONFIRM`. Transfers, withdrawals, withdrawal cancellations, order placement, order cancellation, and cancel-replace actions are write actions and require exact `CONFIRM`.

## Commands

| Purpose | CLI Command | Endpoint |
| --- | --- | --- |
| Spot assets | `bydoxe spot account assets` | `GET /spot/account/assets` |
| Transfer coin info | `bydoxe spot account transfer-coin-info` | `GET /spot/account/transfer-coin-info` |
| Withdrawal records | `bydoxe spot account withdrawal-records` | `GET /spot/account/withdrawal-records` |
| Deposit records | `bydoxe spot account deposit-records` | `GET /spot/account/deposit-records` |
| Transfer records | `bydoxe spot account transfer-records` | `GET /spot/account/transfer-records` |
| Deposit address | `bydoxe spot account deposit-address` | `GET /spot/account/deposit-address` |
| Open spot orders | `bydoxe spot trade unfilled-orders` | `GET /spot/trade/unfilled-orders` |
| Spot order history | `bydoxe spot trade history-orders` | `GET /spot/trade/history-orders` |
| Spot order fills | `bydoxe spot trade fills` | `GET /spot/trade/fills` |

## Examples

Spot assets:

```sh
bydoxe spot account assets --coin USDT --assetType all --format json
```

Deposit address:

```sh
bydoxe spot account deposit-address --coin USDT --chain TRC20 --format json
```

Withdrawal records:

```sh
bydoxe spot account withdrawal-records --coin USDT --limit 100 --format json
```

Spot order history:

```sh
bydoxe spot trade history-orders --symbol BTCUSDT --limit 100 --format json
```

Dry-run:

```sh
bydoxe spot account assets --coin USDT --dry-run --format json
```

## Parameter Notes

Common parameters include:

| Parameter | Meaning |
| --- | --- |
| `coin` | Asset symbol such as `USDT` |
| `symbol` | Trading pair such as `BTCUSDT` |
| `assetType` | Spot asset filter, such as `hold_only` or `all` |
| `chain` | Blockchain network for deposit address or transfer metadata |
| `limit` | Number of records to return |
| `startTime` / `endTime` | Millisecond timestamp filters |
| `orderId` / `clientOid` | Order identifiers for order reads when supported |

## Important Response Fields

Spot assets:

| Field | Meaning |
| --- | --- |
| `coin` | Asset symbol |
| `available` | Available spot balance |
| `frozen` | Balance frozen in orders |
| `locked` | Locked balance |
| `uTime` | Last update time in milliseconds |

Order reads:

| Field | Meaning |
| --- | --- |
| `symbol` | Trading pair |
| `orderId` | Exchange order identifier |
| `side` | Buy or sell side |
| `price` | Order or fill price |
| `size` | Order or fill quantity |
| `status` | Order status when returned by the endpoint |
