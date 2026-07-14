# Authentication

## REST Credentials

Private REST requests require these headers:

| Header | Purpose |
| --- | --- |
| `ACCESS-KEY` | API key |
| `ACCESS-SIGN` | HMAC SHA256 signature encoded as Base64 |
| `ACCESS-TIMESTAMP` | Millisecond timestamp |
| `ACCESS-PASSPHRASE` | API key passphrase |
| `Content-Type` | Usually `application/json` |

## REST Signature Message

Build the signature message as:

```text
timestamp + method + requestPath + queryString + body
```

For GET requests with query parameters, include the leading `?` in `queryString`.

Example shape:

```text
1659076670000GET/spot/account/assets?coin=USDT
```

## WebSocket Login Signature

Private WebSocket login uses a separate message:

```text
timestamp + "GET" + "/user/verify"
```

## Agent Handling

Use the BYDOXE CLI to load credentials and sign requests. Do not manually construct secret-bearing commands in chat unless a reference explicitly requires it and secrets are represented only as environment variable names.

If credentials are missing, tell the user which environment variables are required without asking them to reveal values.
