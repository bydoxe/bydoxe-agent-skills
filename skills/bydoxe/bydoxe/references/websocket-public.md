# Public WebSocket

Use this reference for BYDOXE public WebSocket connection previews, ping/pong handling, and public market subscriptions. Public WebSocket messages do not require credentials.

## Domain

```text
wss://open-api.bydoxe.com/v1/ws/public
```

The scanned gateway source previously showed a possible double-slash path variant. Prefer the documented domain above unless live BYDOXE documentation or deployment testing proves otherwise.

## CLI Support

The CLI currently builds WebSocket connection and message previews. Live WebSocket sessions are not implemented yet.

| Purpose | CLI Command | Message Shape |
| --- | --- | --- |
| Ping | `bydoxe websocket public ping` | String `ping` |
| Subscribe | `bydoxe websocket public subscribe` | `{"op":"subscribe","args":[...]}` |
| Unsubscribe | `bydoxe websocket public unsubscribe` | `{"op":"unsubscribe","args":[...]}` |

## Public Channel Argument

Use this argument shape for subscribe and unsubscribe previews:

```json
{
  "instType": "SPOT",
  "channel": "ticker",
  "instId": "BTCUSDT"
}
```

## Public Channels

Common public channel families:

| Market | Channels |
| --- | --- |
| Spot | `ticker`, `trade`, `books`, candle channels |
| USDT futures | `ticker`, `trade`, candle channels |

Common futures candle channels include `candle1m`, `candle5m`, `candle15m`, `candle30m`, `candle1h`, `candle4h`, `candle6h`, `candle12h`, `candle1d`, `candle1w`, and `candle1M`.

## Examples

```sh
bydoxe websocket public ping --dry-run --format json
bydoxe websocket public subscribe --instType SPOT --channel ticker --instId BTCUSDT --dry-run --format json
bydoxe websocket public subscribe --instType USDT-FUTURES --channel candle1m --instId BTCUSDT --dry-run --format json
bydoxe websocket public unsubscribe --instType SPOT --channel ticker --instId BTCUSDT --dry-run --format json
```

## Safety

Public WebSocket subscriptions are read-only market data actions and do not require `CONFIRM`.

If a user asks for a long-running live stream, explain that the current CLI only builds message previews and does not maintain a live WebSocket session yet.
