# Futures Position REST

Use this reference for authenticated futures position reads. These endpoints require credentials but do not open, close, or modify positions.

## Safety

Authentication is required. Never ask the user to paste API keys, secrets, or passphrases into chat.

Position reads do not require `CONFIRM`. Closing positions, changing leverage, changing margin, placing orders, and cancelling orders are write actions and require exact `CONFIRM`.

Be careful with natural-language requests such as "close", "liquidate", "clean up", or "settle" a position. Ask whether the user wants a read-only position summary or an actual position-closing action.

## Commands

| Purpose | CLI Command | Endpoint |
| --- | --- | --- |
| Single-symbol position | `bydoxe future position single` | `GET /future/position/single-position` |
| All positions | `bydoxe future position all` | `GET /future/position/all-position` |
| Position history | `bydoxe future position history` | `GET /future/position/history-position` |

## Examples

Single position:

```sh
bydoxe future position single --symbol BTCUSDT --format json
```

All positions:

```sh
bydoxe future position all --format json
```

Position history:

```sh
bydoxe future position history --symbol BTCUSDT --limit 20 --format json
```

Dry-run:

```sh
bydoxe future position all --dry-run --format json
```

## Parameters

| Command | Parameter | Required | Notes |
| --- | --- | --- | --- |
| `future position single` | `symbol` | Yes | Trading pair such as `BTCUSDT` |
| `future position all` | none | No | Returns all current positions |
| `future position history` | `symbol` | No | Optional filter |
| `future position history` | `limit` | No | Defaults to the API limit when omitted |
| `future position history` | `idLessThan` | No | Pagination cursor |
| `future position history` | `startTime`, `endTime` | No | Millisecond timestamp filters |

## Important Response Fields

| Field | Meaning |
| --- | --- |
| `symbol` | Futures trading pair |
| `holdSide` or `posSide` | Long or short side when returned |
| `total` or `size` | Position size when returned |
| `available` | Position amount available to close when returned |
| `averageOpenPrice` | Average entry price when returned |
| `unrealizedPL` | Unrealized profit and loss when returned |
| `leverage` | Position leverage when returned |
| `marginMode` | Margin mode when returned |
