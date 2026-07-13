# Common REST

Use this reference for server time and exchange-level common endpoints. Classify each request before acting because not every common endpoint is public.

## Safety

| Endpoint | Class | Confirmation |
| --- | --- | --- |
| `GET /public/time` | Public read | Not required |
| `GET /common/trade-fee` | Authenticated read | Confirm local credentials are configured |

Do not ask the user to paste API keys, secrets, or passphrases into chat. Use local BYDOXE CLI credential loading for authenticated reads.

## Commands

| Purpose | CLI Command | Endpoint |
| --- | --- | --- |
| Server time | `bydoxe public time` | `GET /public/time` |
| Trade fee | `bydoxe common trade-fee` | `GET /common/trade-fee` |

## Server Time

Purpose: get the current BYDOXE server time for timestamp synchronization.

Authentication: not required.

Endpoint:

```text
GET /public/time
```

Examples:

```sh
bydoxe public time --format json
bydoxe public time --dry-run --format json
```

Parameters: none.

Important response fields:

| Field | Meaning |
| --- | --- |
| `data.serverTime` | Current server time in milliseconds |
| `requestTime` | BYDOXE response timestamp in milliseconds |

## Trade Fee

Purpose: get maker and taker fee rates for spot or futures trading.

Authentication: required.

Endpoint:

```text
GET /common/trade-fee
```

Parameters:

| Parameter | Required | Values |
| --- | --- | --- |
| `tradeType` | Yes | `SPOT` or `FUTURE` |

Examples:

```sh
bydoxe common trade-fee --tradeType SPOT --format json
bydoxe common trade-fee --tradeType FUTURE --format json
bydoxe common trade-fee --tradeType SPOT --dry-run --format json
```

Important response fields:

| Field | Meaning |
| --- | --- |
| `data.makerFeeRate` | Maker fee rate in decimal format |
| `data.takerFeeRate` | Taker fee rate in decimal format |

## Response Envelope

BYDOXE REST responses usually use this envelope:

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1732000000000,
  "data": {}
}
```
