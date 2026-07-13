# Futures Account REST

Use this reference for authenticated futures account reads, risk estimates, and futures order reads. These endpoints require credentials but do not place, cancel, or modify orders.

## Safety

Authentication is required. Never ask the user to paste API keys, secrets, or passphrases into chat.

Read-only endpoints in this file do not require `CONFIRM`. Setting leverage, setting margin, changing margin mode, placing orders, cancelling orders, closing positions, trigger orders, and TP/SL changes are write actions and require exact `CONFIRM`.

## Account and Estimate Commands

| Purpose | CLI Command | Endpoint |
| --- | --- | --- |
| Futures account | `bydoxe future account info` | `GET /future/account` |
| Maximum open amount | `bydoxe future account max-open` | `GET /future/account/max-open` |
| Liquidation price estimate | `bydoxe future account liq-price` | `GET /future/account/liq-price` |
| Open count estimate | `bydoxe future account open-count` | `GET /future/account/open-count` |

## Futures Order Read Commands

| Purpose | CLI Command | Endpoint |
| --- | --- | --- |
| Order detail | `bydoxe future order detail` | `GET /future/order/detail` |
| Order fills | `bydoxe future order fills` | `GET /future/order/fills` |
| Fill history | `bydoxe future order fill-history` | `GET /future/order/fill-history` |
| Pending orders | `bydoxe future order orders-pending` | `GET /future/order/orders-pending` |
| Order history | `bydoxe future order orders-history` | `GET /future/order/orders-history` |

## Examples

Futures account:

```sh
bydoxe future account info --symbol BTCUSDT --format json
```

Maximum open amount:

```sh
bydoxe future account max-open --symbol BTCUSDT --posSide LONG --orderType LIMIT --openPrice 60000 --format json
```

Liquidation price estimate:

```sh
bydoxe future account liq-price --symbol BTCUSDT --posSide LONG --orderType LIMIT --openAmount 0.01 --openPrice 60000 --format json
```

Pending orders:

```sh
bydoxe future order orders-pending --symbol BTCUSDT --limit 100 --format json
```

Order history:

```sh
bydoxe future order orders-history --symbol BTCUSDT --limit 100 --format json
```

Dry-run:

```sh
bydoxe future account info --symbol BTCUSDT --dry-run --format json
```

## Parameter Notes

| Parameter | Meaning |
| --- | --- |
| `symbol` | Futures trading pair such as `BTCUSDT` |
| `posSide` | Position side used by estimate endpoints |
| `orderType` | `LIMIT` or `MARKET` for estimate endpoints |
| `openAmount` | Intended open amount for liquidation estimate |
| `openPrice` | Intended open price for limit-based estimates |
| `leverage` | Leverage value used by open count estimate |
| `limit` | Number of records to return |
| `idLessThan` | Pagination cursor |
| `startTime` / `endTime` | Millisecond timestamp filters |
| `orderId` / `clientOid` | Order identifiers |
| `orderSource` | Order source filter for history when supported |

## Important Response Fields

Futures account:

| Field | Meaning |
| --- | --- |
| `available` | Available futures balance |
| `locked` | Balance locked in orders |
| `accountEquity` | Total account equity |
| `unrealizedPL` | Unrealized profit and loss |
| `longLever` / `shortLever` | Current leverage settings |
| `marginMode` | Margin mode |

Order reads:

| Field | Meaning |
| --- | --- |
| `symbol` | Futures trading pair |
| `orderId` | Exchange order identifier |
| `clientOid` | Client order identifier |
| `side` or `posSide` | Order or position side when returned |
| `price` | Order or fill price |
| `size` | Order or fill size |
| `status` | Order status when returned |

## Futures Account Write Commands

These commands change futures risk settings. They require `--dry-run` review first and exact `--confirm CONFIRM` for live execution.

| Purpose | CLI Command | Endpoint | Risk |
| --- | --- | --- | --- |
| Change leverage | `bydoxe future account set-leverage` | `POST /future/account/set-leverage` | Changes long and/or short leverage |
| Adjust margin | `bydoxe future account set-margin` | `POST /future/account/set-margin` | Adds or removes position margin |
| Change margin mode | `bydoxe future account set-margin-mode` | `POST /future/account/set-margin-mode` | Changes cross or isolated behavior |

Dry-run examples:

```sh
bydoxe future account set-leverage --symbol BTCUSDT --longLeverage 5 --shortLeverage 5 --dry-run --format json
bydoxe future account set-margin --body '{"symbol":"BTCUSDT","holdSide":"LONG","amount":100}' --dry-run --format json
bydoxe future account set-margin-mode --symbol BTCUSDT --marginMode isolated --dry-run --format json
```

Required pre-confirmation summary:

- Exact CLI command.
- Symbol, position side, leverage, margin amount, or margin mode.
- Current value if known and intended new value.
- Expected risk effect.
- Statement that live execution requires exact `CONFIRM`.
