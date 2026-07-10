# Setup

## Default Domains

| Type | URL |
| --- | --- |
| REST | `https://open-api.bydoxe.com/api/v1` |
| Public WebSocket | `wss://open-api.bydoxe.com/v1/ws/public` |
| Private WebSocket | `wss://open-api.bydoxe.com/v1/ws/private` |

## CLI Requirement

Use the BYDOXE CLI for REST request construction and execution.

```sh
bydoxe --help
```

During early development, the CLI may be run from source:

```sh
npm install
npm run build
node dist/cli.js --help
```

## Environment Variables

Private requests require credentials configured locally:

```sh
export BYDOXE_ACCESS_KEY="<your-access-key>"
export BYDOXE_SECRET_KEY="<your-secret-key>"
export BYDOXE_PASSPHRASE="<your-passphrase>"
```

Optional endpoint overrides:

```sh
export BYDOXE_REST_BASE_URL="https://open-api.bydoxe.com/api/v1"
export BYDOXE_PUBLIC_WS_URL="wss://open-api.bydoxe.com/v1/ws/public"
export BYDOXE_PRIVATE_WS_URL="wss://open-api.bydoxe.com/v1/ws/private"
```

## Initial Public REST Commands

```sh
bydoxe public time --dry-run
bydoxe spot market symbols --dry-run
bydoxe spot market tickers --symbol BTCUSDT --dry-run --format json
bydoxe spot market orderbook --symbol BTCUSDT --dry-run
bydoxe spot market candles --symbol BTCUSDT --granularity 1m --limit 100 --dry-run
bydoxe future market ticker --symbol BTCUSDT --dry-run
bydoxe future market mark-price --symbol BTCUSDT --dry-run
```

Use `--base-url <url>` only when the user intentionally targets a non-default environment.
