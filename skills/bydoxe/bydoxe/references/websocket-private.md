# Private WebSocket

Use this reference for BYDOXE private WebSocket login previews, private subscriptions, and private spot trade message previews. Private WebSocket actions require locally configured credentials.

## Domain

```text
wss://open-api.bydoxe.com/v1/ws/private
```

## Authentication

Private WebSocket login uses this message shape:

```json
{
  "op": "login",
  "args": {
    "apiKey": "<api_key>",
    "passphrase": "<passphrase>",
    "timestamp": "<timestamp>",
    "sign": "<sign>"
  }
}
```

The signature message is:

```text
timestamp + "GET" + "/user/verify"
```

The CLI loads credentials from local environment variables and redacts credential-bearing fields in dry-run output.

## CLI Support

The CLI currently builds WebSocket connection and message previews. Live WebSocket sessions are not implemented yet.

| Purpose | CLI Command | Message Shape | Risk |
| --- | --- | --- | --- |
| Login | `bydoxe websocket private login` | `{"op":"login","args":{...}}` | Credential-bearing preview with redaction |
| Subscribe | `bydoxe websocket private subscribe` | `{"op":"subscribe","args":[...]}` | Read-only private stream |
| Unsubscribe | `bydoxe websocket private unsubscribe` | `{"op":"unsubscribe","args":[...]}` | Read-only subscription control |
| Spot trade | `bydoxe websocket private spot trade` | `{"op":"trade","args":[...]}` | Can place or cancel spot orders when sent |

## Private Subscription Channels

Common private channel families:

| Market | Channels |
| --- | --- |
| USDT futures | `equity`, `account`, `positions`, `fill`, `orders`, `orders-algo`, `positions-history` |
| Spot | `account`, `spot-event` |

Use this argument shape for subscribe and unsubscribe previews:

```json
{
  "instType": "USDT-FUTURES",
  "channel": "orders",
  "instId": "BTCUSDT"
}
```

## Spot Trade Message

Private spot trade currently uses this message shape:

```json
{
  "op": "trade",
  "args": [
    {
      "instType": "SPOT",
      "instId": "BTCUSDT",
      "channel": "place-order",
      "params": {
        "orderType": "limit",
        "side": "buy",
        "size": "0.01",
        "price": "60000"
      }
    }
  ]
}
```

## Examples

```sh
bydoxe websocket private login --dry-run --format json
bydoxe websocket private subscribe --instType USDT-FUTURES --channel orders --instId BTCUSDT --dry-run --format json
bydoxe websocket private unsubscribe --instType SPOT --channel account --instId BTCUSDT --dry-run --format json
bydoxe websocket private spot trade --instId BTCUSDT --side buy --orderType limit --size 0.01 --price 60000 --dry-run --format json
```

## Safety

Private subscription previews are authenticated reads and do not require `CONFIRM`.

Private spot trade previews are write-action payloads. Before any future live execution, show:

- Exact CLI command.
- WebSocket domain and message operation.
- Instrument, channel, side, order type, size, price, and any order identifier.
- Expected order effect.
- Confirmation requirement: exact `CONFIRM`.

If the user asks to send a private spot trade over WebSocket, first use `--dry-run` and then require exact `CONFIRM`.
