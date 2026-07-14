# Output

## Preferred CLI Options

Use JSON output when data will be parsed or summarized:

```sh
bydoxe spot market tickers --symbol BTCUSDT --format json
```

Use dry-run output when reviewing commands or preparing risky workflows:

```sh
bydoxe spot market tickers --symbol BTCUSDT --dry-run --format json
```

## Dry-Run Shape

Dry-run output should include:

- `dryRun: true`
- The command being previewed
- HTTP method
- Full URL
- Request path
- Query string
- Body, if any
- Headers with secrets omitted or represented only as non-secret header names

## Reporting Rules

For public reads, summarize the result and mention the symbol or endpoint used.

For authenticated reads, mention that local credentials were required but do not reveal credential values.

For write actions, provide a pre-execution summary and wait for `CONFIRM` before execution.

When an API response uses the BYDOXE envelope, preserve these fields when useful:

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1763459280000,
  "data": {}
}
```
