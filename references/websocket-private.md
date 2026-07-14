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

The CLI loads credentials from environment variables first, then from the local credential profile, and redacts credential-bearing fields in dry-run output.

## CLI Support

The CLI currently builds WebSocket connection and message previews. Private WebSocket live execution is intentionally disabled behind a safety gate.

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

If the user asks to send a private spot trade over WebSocket, keep the workflow in preview-only mode. Do not claim private WebSocket trade live execution is supported.

Private WebSocket trade live execution must remain disabled until these gates are implemented:

- Authenticated login handshake verification.
- Bounded read-only private stream smoke tests.
- Separate trade-send implementation with exact `CONFIRM`.
- Explicit opt-in environment gate for live private sessions.

## Read-Only Live Boundary

The companion CLI supports a read-only private WebSocket live path only for private subscribe or unsubscribe sessions when the user explicitly enables `BYDOXE_ENABLE_PRIVATE_WS_READONLY_LIVE=1`. That path stays limited to authenticated read-only streams, must use bounded runtime controls, and requires locally configured credentials.

Do not include `bydoxe websocket private spot trade` in any read-only live workflow. WebSocket trade payloads need a separate high-risk execution path with exact `CONFIRM`.

If the user has not explicitly enabled the private read-only live environment gate, keep private WebSocket live requests in preview-only mode.

Example read-only live command:

```sh
BYDOXE_ENABLE_PRIVATE_WS_READONLY_LIVE=1 bydoxe websocket private subscribe --instType USDT-FUTURES --channel orders --instId BTCUSDT --live --max-messages 2 --timeout-ms 10000 --format json
```

Optional private read-only live smoke:

```sh
BYDOXE_RUN_LIVE_PRIVATE_WS_TESTS=1 BYDOXE_ENABLE_PRIVATE_WS_READONLY_LIVE=1 npm run smoke:websocket-private-live
```

Use the smoke command only in a local environment with credentials. It validates bounded private read-only execution and credential redaction, and it stays skipped during default validation.

The companion CLI smoke uses the live private WebSocket URL `wss://open-api.bydoxe.com/v1/ws/private` by default and validates that URL in the bounded result.
