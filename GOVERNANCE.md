# Governance

## Structure

- **Core** (`skills/core/`, `knowledge/`, `engine/`, `schemas/`) — maintainer-curated. Changes require review by a maintainer and passing CI.
- **Community** (`skills/community/`, planned) — contributed skills. Identical schema validation; a lighter review bar, clearly labelled.

## Contribution flow

PR → automated validation (schema + referential integrity + index freshness) → maintainer review → merge. A skill that fails validation cannot merge — no exceptions.

## Quality, not popularity

Skill quality is scored on six criteria (evidence, clarity, implementation, accessibility, reusability, maintainability), each 1–5, assigned in review. There are no stars, votes, or popularity rankings; certification means *validated + reviewed*.

## Evidence standards

Every principle, rule, and decision must classify its sources: `official_standard` > `official_design_system` > `research` > `industry_practice` > `community_reference`. Content must be original synthesis. Copying proprietary documentation, large passages, or proprietary component code is grounds for rejection.

## Versioning and deprecation

- Skills and knowledge objects use semver. Breaking changes bump the major version.
- Deprecation is explicit: `status: deprecated` plus a `supersedes`/successor pointer. Deprecated content is never silently deleted while anything references it.
- Schema changes require an RFC issue with a comment period before merging, since they affect every consumer.

## Decision making

While the project is young, the maintainer decides after public discussion in issues. As contributors grow, the intent is a small technical steering group with rotating review duty.
