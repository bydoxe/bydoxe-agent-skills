# Futures Market REST

Use this reference for unauthenticated futures market data. These endpoints are read-only and do not require `CONFIRM`.

Futures market data can influence high-risk trading decisions. If the user moves from analysis to order placement, leverage changes, margin changes, TP/SL, trigger orders, or position closing, stop and apply the write-action safety rules.

## Current CLI Support

The current BYDOXE CLI supports these futures market reads:

| Command | Endpoint |
| --- | --- |
| `bydoxe future market ticker` | `GET /future/market/24h-ticker` |
| `bydoxe future market mark-price` | `GET /future/market/mark-price` |
| `bydoxe future market book-ticker` | `GET /future/market/book-ticker` |
| `bydoxe future market fills` | `GET /future/market/fills` |
| `bydoxe future market fills-history` | `GET /future/market/fills-history` |
| `bydoxe future market depth` | `GET /future/market/depth` |
| `bydoxe future market candles` | `GET /future/market/candles` |
| `bydoxe future market history-fund-rate` | `GET /future/market/history-fund-rate` |
| `bydoxe future market history-candles` | `GET /future/market/history-candles` |
| `bydoxe future market history-index-candles` | `GET /future/market/history-index-candles` |
| `bydoxe future market history-mark-candles` | `GET /future/market/history-mark-candles` |
| `bydoxe future market funding-info` | `GET /future/market/funding-info` |
| `bydoxe future market open-interest` | `GET /future/market/open-interest` |
| `bydoxe future market taker-buy-sell` | `GET /future/market/taker-buy-sell` |
| `bydoxe future market account-long-short` | `GET /future/market/account-long-short` |
| `bydoxe future market top-trader-position-long-short` | `GET /future/market/top-trader-position-long-short` |
| `bydoxe future market top-trader-account-long-short` | `GET /future/market/top-trader-account-long-short` |
| `bydoxe future market query-position-tier` | `GET /future/market/query-position-tier` |

Use `--dry-run --format json` when reviewing request construction.

## Endpoint Map

| Purpose | Endpoint | Key Parameters | CLI Status |
| --- | --- | --- | --- |
| Taker buy/sell volume | `GET /future/market/taker-buy-sell` | `symbol`, `period` | Supported |
| Account long/short ratio | `GET /future/market/account-long-short` | `symbol`, `period` | Supported |
| Top trader position long/short ratio | `GET /future/market/top-trader-position-long-short` | `symbol`, `period` | Supported |
| Top trader account long/short ratio | `GET /future/market/top-trader-account-long-short` | `symbol`, `period` | Supported |
| 24h ticker | `GET /future/market/24h-ticker` | `symbol` optional | Supported |
| Mark price | `GET /future/market/mark-price` | `symbol` optional | Supported |
| Best bid/ask | `GET /future/market/book-ticker` | `symbol` optional | Supported |
| Recent trades | `GET /future/market/fills` | `symbol` required; `limit` optional | Supported |
| Historical trades | `GET /future/market/fills-history` | `symbol` required; `limit`, `idLessThan`, `startTime`, `endTime` optional | Supported |
| Open interest | `GET /future/market/open-interest` | `symbol` required | Supported |
| Funding configuration | `GET /future/market/funding-info` | none | Supported |
| Historical funding rates | `GET /future/market/history-fund-rate` | `symbol` required; `limit`, `startTime`, `endTime` optional | Supported |
| Recent candles | `GET /future/market/candles` | `symbol`, `interval` required; `limit`, `startTime`, `endTime` optional | Supported |
| Historical candles | `GET /future/market/history-candles` | `symbol`, `interval` required; `limit`, `startTime`, `endTime` optional | Supported |
| Historical index candles | `GET /future/market/history-index-candles` | `symbol`, `interval` required; `limit`, `startTime`, `endTime` optional | Supported |
| Historical mark candles | `GET /future/market/history-mark-candles` | `symbol`, `interval` required; `limit`, `startTime`, `endTime` optional | Supported |
| Position tiers | `GET /future/market/query-position-tier` | `symbol` required | Supported |
| Order book depth | `GET /future/market/depth` | `symbol` required; `limit` optional | Supported |

## Command Examples

Ticker:

```sh
bydoxe future market ticker --symbol BTCUSDT --format json
bydoxe future market ticker --symbol BTCUSDT --dry-run --format json
```

Mark price:

```sh
bydoxe future market mark-price --symbol BTCUSDT --format json
```

Depth, candles, funding, and open interest:

```sh
bydoxe future market book-ticker --symbol BTCUSDT --format json
bydoxe future market fills --symbol BTCUSDT --limit 100 --format json
bydoxe future market fills-history --symbol BTCUSDT --limit 500 --format json
bydoxe future market depth --symbol BTCUSDT --limit 500 --format json
bydoxe future market candles --symbol BTCUSDT --interval 1h --limit 500 --format json
bydoxe future market history-candles --symbol BTCUSDT --interval 1h --limit 500 --format json
bydoxe future market history-index-candles --symbol BTCUSDT --interval 1h --limit 500 --format json
bydoxe future market history-mark-candles --symbol BTCUSDT --interval 1h --limit 500 --format json
bydoxe future market funding-info --format json
bydoxe future market history-fund-rate --symbol BTCUSDT --limit 100 --format json
bydoxe future market open-interest --symbol BTCUSDT --format json
bydoxe future market query-position-tier --symbol BTCUSDT --format json
```

Long/short and taker flow:

```sh
bydoxe future market taker-buy-sell --symbol BTCUSDT --period 1h --format json
bydoxe future market account-long-short --symbol BTCUSDT --period 1h --format json
bydoxe future market top-trader-position-long-short --symbol BTCUSDT --period 1h --format json
bydoxe future market top-trader-account-long-short --symbol BTCUSDT --period 1h --format json
```

## Parameter Notes

Use uppercase symbols without separators, such as `BTCUSDT`.

Futures candles use `interval`, not `granularity`. Supported examples include `1m`, `3m`, `5m`, `15m`, `30m`, `2h`, `4h`, `6h`, `8h`, `12h`, `1d`, `3d`, `1w`, and `1M`.

Long/short and taker buy/sell endpoints use `period`. Supported examples include `5m`, `15m`, `30m`, `1h`, `2h`, `4h`, `6h`, `8h`, `12h`, and `1d`.

`startTime` and `endTime` are millisecond timestamps.

## Important Response Fields

24h ticker fields:

| Field | Meaning |
| --- | --- |
| `lastPrice` | Most recent futures trade price |
| `priceChangePercent` | 24-hour price change percentage |
| `weightedAvgPrice` | 24-hour weighted average price |
| `volume` / `quoteVolume` | 24-hour base and quote volume |

Mark price fields:

| Field | Meaning |
| --- | --- |
| `markPrice` | Price used for liquidation and unrealized PnL |
| `indexPrice` | Spot index price from multiple exchanges |
| `lastFundingRate` | Most recent funding rate |
| `nextFundingTime` | Next funding time in milliseconds |

Depth fields:

| Field | Meaning |
| --- | --- |
| `asks` | Ask levels as `[price, quantity]` |
| `bids` | Bid levels as `[price, quantity]` |
| `ts` | Depth timestamp in milliseconds |

Candle array order:

```text
[openTime, open, high, low, close, volume, quoteVolume]
```

## Safety

Futures market endpoints are read-only. They do not open positions, close positions, change leverage, or change margin.

Terms such as "close", "liquidate", "short", "long", "set leverage", or "add margin" may imply write actions. If the user asks to act on futures market data, switch to the relevant trading/account reference and require `CONFIRM`.
