# Setup

## Default Domains

| Type | URL |
| --- | --- |
| REST | `https://open-api.bydoxe.com/api/v1` |
| Public WebSocket | `wss://open-api.bydoxe.com/v1/ws/public` |
| Private WebSocket | `wss://open-api.bydoxe.com/v1/ws/private` |

## CLI Requirement

Use the BYDOXE CLI for REST request construction, REST execution, and WebSocket message previews.

```sh
bydoxe --help
```

When available, use `cli-project/docs/command-reference.md` as the generated CLI command reference for endpoint mapping, parameter hints, risk levels, and write validation rules.

When available, use `cli-project/docs/command-summary.md` as the generated quick status summary for command counts, group coverage, risk profile, and safety scope.

During early development, the CLI may be run from source:

```sh
npm install
npm run build
node dist/cli.js --help
```

## Credential Setup

Private requests require credentials configured locally for the companion CLI. Use [credential-management.md](credential-management.md) for the full key handling policy.

The current supported setup uses environment variables:

```sh
export BYDOXE_ACCESS_KEY="<your-access-key>"
export BYDOXE_SECRET_KEY="<your-secret-key>"
export BYDOXE_PASSPHRASE="<your-passphrase>"
```

Do not paste real values into chat. Use placeholders in examples and configure real values only in the user's local shell, local secret manager, or approved runtime environment.

Optional endpoint overrides:

```sh
export BYDOXE_REST_BASE_URL="https://open-api.bydoxe.com/api/v1"
export BYDOXE_PUBLIC_WS_URL="wss://open-api.bydoxe.com/v1/ws/public"
export BYDOXE_PRIVATE_WS_URL="wss://open-api.bydoxe.com/v1/ws/private"
```

## Initial Public REST and WebSocket Commands

```sh
bydoxe public time --dry-run
bydoxe spot market symbols --dry-run
bydoxe spot market tickers --symbol BTCUSDT --dry-run --format json
bydoxe spot market orderbook --symbol BTCUSDT --dry-run
bydoxe spot market candles --symbol BTCUSDT --granularity 1m --limit 100 --dry-run
bydoxe future market ticker --symbol BTCUSDT --dry-run
bydoxe future market mark-price --symbol BTCUSDT --dry-run
bydoxe websocket public subscribe --instType SPOT --channel ticker --instId BTCUSDT --dry-run --format json
bydoxe websocket private login --dry-run --format json
```

Use `--base-url <url>` only when the user intentionally targets a non-default environment.
Use `--ws-url <url>` only when the user intentionally targets a non-default WebSocket environment.
