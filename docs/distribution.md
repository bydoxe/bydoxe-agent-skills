# Distribution Policy

This document defines the release and distribution policy for BYDOXE Agent Skills.

## Release Versioning

The first public release of BYDOXE Agent Skills must use the same version as the first BYDOXE CLI release.

Initial release target:

```text
0.1.0
```

After the first release, the maintainer may choose future versions based on implementation scope, safety guidance changes, companion CLI compatibility, and documentation updates.

Recommended versioning rules:

- Patch releases for documentation fixes, validation fixes, and small compatibility updates.
- Minor releases for new references, new command coverage, new language guidance, or meaningful workflow improvements.
- Major releases for breaking skill layout changes, breaking command routing assumptions, credential handling changes, or safety model changes.

## Skill Package Distribution

BYDOXE Agent Skills is intended to be distributed as a skill package.

The package must include:

- `skills/bydoxe/bydoxe/SKILL.md`
- `skills/bydoxe/bydoxe/agents/openai.yaml`
- `skills/bydoxe/bydoxe/references`
- `skills/bydoxe/bydoxe/LICENSE.md`
- `README.md`
- `DISCLAIMER.md`
- `CHANGELOG.md`

The package must not include:

- API credentials
- Local shell profiles
- Generated logs
- Temporary test output
- Workspace-only planning notes

## Credential Configuration

BYDOXE private API credentials must be configured by each installer or operator through the companion CLI environment.

The skill package must never ship with credentials, placeholder secrets that look real, shared test keys, or account-specific configuration.

Agents must instruct users to configure credentials locally rather than paste secrets into chat.

Expected companion CLI environment variables:

```sh
export BYDOXE_ACCESS_KEY="<your-access-key>"
export BYDOXE_SECRET_KEY="<your-secret-key>"
export BYDOXE_PASSPHRASE="<your-passphrase>"
```

Private read-only WebSocket live smoke also requires explicit local opt-in:

```sh
export BYDOXE_RUN_LIVE_PRIVATE_WS_TESTS=1
export BYDOXE_ENABLE_PRIVATE_WS_READONLY_LIVE=1
```

## Companion CLI Compatibility

The first release should be paired with the same-version BYDOXE CLI release.

For the first release:

```text
BYDOXE CLI 0.1.0
BYDOXE Agent Skills 0.1.0
```

When the companion CLI is available, generated CLI artifacts should remain the source of truth for command coverage:

- `cli-project/docs/command-catalog.json`
- `cli-project/docs/command-reference.md`
- `cli-project/docs/command-summary.md`

## Publish Readiness

Publishing is deferred until the skill package distribution account or registry target is prepared.

Before publishing:

- Complete the release readiness checklist.
- Confirm skill package ownership and release access.
- Confirm the version matches the companion BYDOXE CLI release for the first release.
- Confirm private credential setup remains installer-owned.
- Confirm private WebSocket trade live execution remains unsupported.
