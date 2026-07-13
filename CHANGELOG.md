# Changelog

## 0.1.0 - Unreleased

- Add initial BYDOXE Agent Skills repository scaffold.
- Add core BYDOXE skill instructions.
- Add setup, safety, authentication, glossary, and output references.
- Add Codex skill UI metadata.
- Add multilingual request interpretation reference.
- Add common, spot market, and futures market REST references.
- Add authenticated account, spot account, futures position, and futures account references.
- Add write-action references for spot trading, spot account writes, futures orders, futures account writes, triggers, and TP/SL.
- Add copy trading trader and follower references with read/write separation and `CONFIRM` guidance.
- Add public and private WebSocket references for message previews, login signing, subscriptions, and private spot trade safety.
- Add skill validation checks for reference links, domains, safety coverage, unfinished markers, and language rules.
- Add validation that CLI registry commands are covered by Agent Skill references when the CLI project is available.
- Add validation for required sections in each Agent Skill reference file.
- Tighten write-action safety guidance so `CONFIRM` is requested only after material parameters, exact commands, and dry-run previews are available.
- Update public WebSocket guidance for bounded live sessions with `--live`, `--max-messages`, and `--timeout-ms`.
- Update spot and futures market references for expanded public REST CLI coverage.
- Update futures market reference for complete public REST CLI coverage.
- Add spot order information and futures trigger order read references.
- Prefer the generated CLI command catalog for Agent Skill command coverage validation.
- Clarify that private WebSocket live execution is preview-only behind safety gates.
- Point agent workflows to the generated CLI command reference when the companion CLI repository is available.
- Document the read-only private WebSocket live boundary for later CLI support.
- Add batch write body review guidance for nested order structures.
- Point agent workflows to the generated CLI command summary when available.
- Clarify that internal private WebSocket executor code is not user-facing live support.
- Prefer generated nested validation rules for supported batch write bodies.
- Validate companion CLI generated catalog, reference, and summary artifacts when available.
- Document the opt-in private WebSocket read-only live gate.
- Document full local write validation coverage through generated CLI references.
