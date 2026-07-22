# Pending Product Areas

Use this reference when a user asks about CFD, OTC, stock, TradFi-style symbols, MoFi, or other product areas that appear in internal BYDOXE API schemas but are not yet exposed through public Open API controller routes.

## Current Status

The companion CLI and this skill do not currently expose executable commands for these areas.

Observed internal schema areas include:

- CFD access, listings, margin, orders, positions, settlement, swap rates, and wallets.
- OTC ads, orders, currencies, seller records, verification files, and OTC wallets.
- Stock listings, position tiers, and TradFi-style symbol metadata.
- Grade fee tier and user balance snapshot models that may affect reporting workflows.

These are not public CLI command groups until the API project exposes stable Open API endpoints and DTOs for them.

## Agent Handling

When the user asks for these areas:

- Do not invent CLI commands.
- Say that public Open API command support is pending.
- Offer to use currently supported spot, futures, copy trading, account, or WebSocket commands if relevant.
- If the user provides a new official endpoint document later, review that document before proposing command shapes.

## Planned Command Group Names

Use these names only as planning labels, not executable commands:

- `bydoxe cfd ...`
- `bydoxe otc ...`
- `bydoxe stock ...`
- `bydoxe tradfi ...`

## Safety

Assume future CFD, OTC, stock, and TradFi write operations are high risk. Any future order, settlement, transfer, withdrawal, leverage, margin, or position-changing command must require dry-run review and exact `CONFIRM`.
