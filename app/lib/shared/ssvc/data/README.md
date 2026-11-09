# Vendored SSVC data

Unmodified copies of the official [CERTCC/SSVC](https://github.com/CERTCC/SSVC) decision point and decision table definitions that the SSVC dialog editor uses.

- **Source commit:** `bf3213bc0bd2bf3cf1329c9b48f72d7163a682b1` (2026-10-22)
- **Path upstream:** `data/json/decision_points/`, `data/json/decision_tables/`, `data/schema/v2/`
- **License:** MIT (SEI)-style, see [`LICENSE`](./LICENSE) (copy of upstream `data/LICENSE`). Attribution is also listed in the repository `NOTICE`.

## Contents

| Directory | Content |
|---|---|
| `decision_points/` | 15 decision points, one file per `namespace_key_version`, always the **latest** version upstream |
| `decision_tables/` | `cisa:DT_CO:2.0.3`, `ssvc:DT_DP:1.0.0`, `ssvc:DT_SP:1.0.0`, `ssvc:DT_HI:1.0.0`, `ssvc:DT_U:1.0.0`, `ssvc:DT_PSI:1.0.0` |
| `schema/` | `SelectionList_2_0_0`, `DecisionPoint_2_0_0` and `DecisionTable_2_0_0` schemas from `data/schema/v2/`. The unit tests validate the generated `ssvc_v2` objects against the first, the decision points against the second and the decision tables against the third. |

The schemas are the upstream files. `app/lib/app/shared/Core/ssvc-v2.0.json` (the schema bundled for the CSAF templating tools) is not used by the dialog editor. Its `namespace` pattern differs from upstream.

## Check for updates

```sh
cd app
npm run ssvc:check-data                  # compare with upstream main
npm run ssvc:check-data -- --ref <sha>   # compare with a commit or tag
npm run ssvc:check-data -- --write       # also overwrite files whose content differs
```

The script (`app/scripts/updateSsvcData.js`) reports vendored decision points, tables and schemas that differ from upstream and newer versions of a vendored decision point or table. It exits with 1 if there is a finding. It only touches files that already exist. A new version needs the manual steps below.

## Do not edit

The files are copies. Do not edit or reformat them (the folder is excluded from Prettier). To upgrade:

1. Download the new files from the upstream commit and replace the old ones. Remove files of superseded versions.
2. Update the decision point ids in `../models.js` to the new latest versions.
3. Update the commit above.
4. Run `npm run test:unit`. The tests check that tables are complete and valid, that every decision point validates against its schema and that all models use the latest version in this folder.

Latest versions matter: the CSAF 2.1 tests 6.3.13 and 6.3.25 report a decision point that is not the latest version.
