# Release Readiness Checklist

This checklist defines the minimum review path before publishing or tagging a BYDOXE Agent Skills release.

Use [distribution.md](distribution.md) for versioning, skill package distribution, companion CLI compatibility, and installer-owned credential configuration policy.

## Required Local Checks

- Run `node scripts/validate-skill.mjs`.
- Run `node scripts/package-skill.mjs`.
- Run the root wrapper `scripts/validate-agent-skill.sh` when this repository is used from the workspace root.
- Confirm the companion CLI repository is present when checking command reference synchronization.
- Confirm validation still passes when the companion CLI repository is absent from a standalone skill package environment.

## Companion CLI Sync

- Use `cli-project/docs/command-catalog.json` as the machine-readable command surface when the companion CLI repository is available.
- Use `cli-project/docs/command-reference.md` as the generated command reference for endpoint mapping, parameter hints, risk levels, and write validation rules.
- Use `cli-project/docs/command-summary.md` as the generated command coverage and safety summary.
- Run CLI validation before skill validation after command registry changes.
- Confirm the skill validation catches stale command reference or command summary artifacts.

## Skill Package Review

- Top-level `SKILL.md` must route users to the correct reference file.
- `agents/openai.yaml` must remain present.
- `SKILL.md` frontmatter must remain compatible with the Agent Skills specification.
- Every file in `references` must have required sections enforced by validation.
- `language-support.md` is the only reference file allowed to contain multilingual examples.
- All other project artifacts must remain English-only.

## Safety Review

- Write actions must require dry-run review before exact `CONFIRM`.
- The safety reference must cover orders, cancellations, withdrawals, transfers, leverage, margin, TP/SL, trigger orders, copy trading changes, and WebSocket spot trade payloads.
- Private WebSocket trade live execution must remain unsupported.
- Private read-only WebSocket live guidance must require explicit local opt-in gates and bounded runtime controls.
- Private read-only WebSocket live smoke must use the live private WebSocket URL `wss://open-api.bydoxe.com/v1/ws/private` unless an approved endpoint override is explicitly configured.
- The skill must never ask users to paste API secrets into chat.
- Agents must use `bydoxe config status` for credential setup checks and must not read local credential files directly.

## Documentation Review

- README status and layout must match the packaged skill tree.
- `CHANGELOG.md` must describe user-visible skill and safety guidance changes.
- `DISCLAIMER.md` and `LICENSE.md` must remain present.
- `dist/bydoxe-agent-skills-<version>.tar.gz`, `dist/bydoxe-agent-skills-<version>.zip`, and the SHA-256 checksum file must be regenerated for the release.
- References must prefer generated CLI artifacts over hand-maintained command lists when the companion CLI repository is available.
- Documentation must instruct installers or operators to configure private API credentials locally through the companion CLI environment.
- Documentation must link credential setup and exposed-secret handling to `references/credential-management.md`.
- Installation documentation must include `npx skills add bydoxe/bydoxe-agent-skills` and avoid implying Codex-only support.

## Release Decision

Release is ready only when:

- Required local checks pass.
- Companion CLI synchronization is verified or explicitly unavailable in a standalone package context.
- Safety review has no open blocker.
- Documentation review is complete.
- The release version matches the companion BYDOXE CLI release version.
- The release commit is tagged from a clean working tree.
