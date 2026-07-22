# Community skills

Contributed skills live here, under `skills/community/<category>/<name>/SKILL.md`.

They are held to the **same schema and validation** as core skills — a skill that fails
`node tools/di.mjs validate` cannot merge. The difference is the review bar and labelling:

| | `skills/core/` | `skills/community/` |
|---|---|---|
| Ownership | maintainer-curated | contributor-authored |
| Schema validation | required | required |
| Evidence + sources | required | required |
| Review depth | full maintainer review | lighter review, clearly community-labelled |
| Certification | validated + reviewed | validated (+ review as capacity allows) |

## Add one

```bash
node tools/di.mjs new-skill <category> <name>   # scaffolds here by default
# edit the SKILL.md, then:
node tools/di.mjs validate
node tools/di.mjs certify <category>.<name>      # automated gate
node tools/di.mjs build-index                    # commit the refreshed index
```

See [CONTRIBUTING.md](../../CONTRIBUTING.md) and [GOVERNANCE.md](../../GOVERNANCE.md).
Promising, well-evidenced community skills may be promoted into `core/` over time.
