# Account REST

Use this reference for authenticated account overview reads. These endpoints require local BYDOXE API credentials but do not change balances, orders, or positions.

## Safety

Authentication is required. Never ask the user to paste API keys, secrets, or passphrases into chat.

These commands are read-only and do not require `CONFIRM`. If the user asks to transfer, withdraw, place orders, cancel orders, or change futures settings, switch to the relevant write-action reference and require exact `CONFIRM`.

## Commands

| Purpose | CLI Command | Endpoint |
| --- | --- | --- |
| Funding assets | `bydoxe account funding-assets` | `GET /account/funding-assets` |
| All account balances | `bydoxe account all-balance` | `GET /account/all-account-balance` |

## Examples

Funding assets for one coin:

```sh
bydoxe account funding-assets --coin USDT --format json
```

Dry-run:

```sh
bydoxe account funding-assets --coin USDT --dry-run --format json
```

All account balance overview:

```sh
bydoxe account all-balance --format json
```

## Parameters

| Command | Parameter | Required | Notes |
| --- | --- | --- | --- |
| `account funding-assets` | `coin` | No | Coin symbol such as `USDT` |
| `account all-balance` | none | No | Returns account-type overview |

## Important Response Fields

Funding assets:

| Field | Meaning |
| --- | --- |
| `coin` | Asset symbol |
| `available` | Available funding balance |
| `frozen` | Frozen funding balance |
| `usdtValue` | USDT equivalent value |

All balances:

| Field | Meaning |
| --- | --- |
| `accountType` | Account type such as spot or future |
| `usdtBalance` | Total USDT equivalent balance for that account type |
