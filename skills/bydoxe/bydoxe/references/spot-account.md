# Spot Account REST

Use this reference for authenticated spot account reads, deposit/withdrawal records, transfer records, deposit addresses, and spot order reads. These endpoints require credentials but do not create orders or move funds.

## Safety

Authentication is required. Never ask the user to paste API keys, secrets, or passphrases into chat.

Read-only endpoints in this file do not require `CONFIRM`. Transfers, withdrawals, withdrawal cancellations, order placement, order cancellation, and cancel-replace actions are write actions and require exact `CONFIRM`.

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
| Spot order information | `bydoxe spot trade order-info` | `POST /spot/trade/order-info` |

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

Spot order information:

```sh
bydoxe spot trade order-info --orderId spot-order-id --format json
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

`spot trade order-info` is a read-only POST endpoint. It does not require `CONFIRM`; build its body from flags or pass `--body` JSON.

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

## Spot Account Write Commands

These commands move funds or affect withdrawals. They require `--dry-run` review first and exact `--confirm CONFIRM` for live execution.

| Purpose | CLI Command | Endpoint | Risk |
| --- | --- | --- | --- |
| Transfer funds | `bydoxe spot account transfer` | `POST /spot/account/transfer` | Moves funds between accounts |
| Withdraw assets | `bydoxe spot account withdraw` | `POST /spot/account/withdraw` | Sends assets out of the exchange |
| Cancel withdrawal | `bydoxe spot account cancel-withdraw` | `POST /spot/account/cancel-withdraw` | Cancels a withdrawal request |

Dry-run examples:

```sh
bydoxe spot account transfer --body '{"coin":"USDT","amount":"100","fromType":"spot","toType":"funding"}' --dry-run --format json
bydoxe spot account withdraw --body '{"coin":"USDT","chain":"TRC20","address":"example","amount":"10"}' --dry-run --format json
bydoxe spot account cancel-withdraw --body '{"withdrawId":"withdrawal-id"}' --dry-run --format json
```

Required pre-confirmation summary:

- Exact CLI command.
- Asset, amount, source account, destination account, chain, and destination address when applicable.
- Withdrawal or transfer identifier for cancellation.
- Expected effect and whether funds leave the exchange.
- Statement that live execution requires exact `CONFIRM`.
