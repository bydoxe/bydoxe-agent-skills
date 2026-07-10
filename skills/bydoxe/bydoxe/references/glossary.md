# Glossary

## API Areas

| Term | Meaning |
| --- | --- |
| Public REST | Unauthenticated market or server data endpoints |
| Private REST | Authenticated endpoints that require API credentials and signatures |
| Public WebSocket | Realtime public market data streams |
| Private WebSocket | Realtime account, order, and position streams requiring login |
| Spot | Asset exchange markets such as BTC/USDT |
| Futures | Derivatives markets with positions, leverage, and margin |
| Copy Trading | Trader and follower workflows for mirrored trading behavior |

## Trading Terms

| Term | Meaning |
| --- | --- |
| Symbol | Market identifier, such as `BTCUSDT` |
| Order book | Current bid and ask depth |
| Ticker | Current or 24h market summary |
| Candle | OHLCV interval data |
| Mark price | Futures reference price used for risk and liquidation logic |
| Position | Futures exposure for a symbol |
| TP/SL | Take-profit or stop-loss plan |
| Trigger order | Conditional order activated by a trigger price |
| Leverage | Futures exposure multiplier |
| Margin mode | Futures margin isolation or sharing behavior |

## Safety Terms

| Term | Meaning |
| --- | --- |
| Dry-run | Request preview without sending a live API call |
| Preview | Human-readable summary of the request and expected effect |
| `CONFIRM` | Exact user confirmation required before write actions |
