# Spot Market REST

Use this reference for unauthenticated spot market data. These endpoints are read-only and do not require `CONFIRM`.

## Current CLI Support

The current BYDOXE CLI supports these spot market reads:

| Command | Endpoint |
| --- | --- |
| `bydoxe spot market symbols` | `GET /spot/market/symbols` |
| `bydoxe spot market tickers` | `GET /spot/market/tickers` |
| `bydoxe spot market orderbook` | `GET /spot/market/orderbook` |
| `bydoxe spot market candles` | `GET /spot/market/candles` |

Use `--dry-run --format json` when reviewing request construction.

## Endpoint Map

| Purpose | Endpoint | Key Parameters | CLI Status |
| --- | --- | --- | --- |
| Coin metadata | `GET /spot/market/coins` | `coin` optional | Planned |
| Trading pair rules | `GET /spot/market/symbols` | `symbol` optional | Supported |
| Spot ticker | `GET /spot/market/tickers` | `symbol` optional | Supported |
| Order book | `GET /spot/market/orderbook` | `symbol` required | Supported |
| Recent candles | `GET /spot/market/candles` | `symbol`, `granularity` required; `startTime`, `endTime`, `limit` optional | Supported |
| Historical candles | `GET /spot/market/history-candles` | `symbol`, `granularity` required; `startTime`, `endTime`, `limit` optional | Planned |
| Recent trades | `GET /spot/market/fills` | `symbol` required; `limit` optional | Planned |
| Historical trades | `GET /spot/market/fills-history` | `symbol` required; `limit`, `fromId`, `startTime`, `endTime` optional | Planned |

## Command Examples

Symbols:

```sh
bydoxe spot market symbols --symbol BTCUSDT --format json
bydoxe spot market symbols --dry-run --format json
```

Tickers:

```sh
bydoxe spot market tickers --symbol BTCUSDT --format json
bydoxe spot market tickers --symbol BTCUSDT --dry-run --format json
```

Order book:

```sh
bydoxe spot market orderbook --symbol BTCUSDT --format json
```

Candles:

```sh
bydoxe spot market candles --symbol BTCUSDT --granularity 1h --limit 100 --format json
```

Planned command shapes:

```sh
bydoxe spot market coins --coin BTC --format json
bydoxe spot market fills --symbol BTCUSDT --limit 50 --format json
bydoxe spot market fills-history --symbol BTCUSDT --startTime 1763400000000 --endTime 1763459280833 --limit 100 --format json
```

Do not execute planned command shapes until the CLI implements them.

## Parameter Notes

Use uppercase symbols without separators, such as `BTCUSDT`.

Spot candles use `granularity`, not `interval`. Common examples include `1m`, `5m`, `15m`, `1h`, `4h`, and `1d`.

`startTime` and `endTime` are millisecond timestamps.

## Important Response Fields

Ticker fields:

| Field | Meaning |
| --- | --- |
| `lastPr` | Latest spot price |
| `bidPr` / `askPr` | Best bid and ask prices |
| `bidSz` / `askSz` | Best bid and ask sizes |
| `change24h` | 24-hour price change percentage |
| `baseVolume` / `quoteVolume` | 24-hour volume in base and quote assets |

Order book fields:

| Field | Meaning |
| --- | --- |
| `asks` | Sell orders as `[price, quantity]`, ascending by price |
| `bids` | Buy orders as `[price, quantity]`, descending by price |
| `ts` | Order book timestamp in milliseconds |

Candle array order:

```text
[openTime, open, high, low, close, volume, quoteVolume]
```

## Safety

Spot market endpoints are read-only market data. They do not place orders, transfer assets, or reveal account balances.

If the user asks to buy, sell, cancel, transfer, or withdraw based on market data, switch to the relevant trade/account reference and require `CONFIRM` for write actions.
