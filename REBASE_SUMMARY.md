# Dependabot PR Rebase Summary

## Task
Rebase Dependabot PR #30 "chore(deps): bump the npm_and_yarn group across 1 directory with 14 updates" onto the latest master branch.

## What was Done

### 1. Identified the Dependabot PR
- PR #30 was created by Dependabot on February 10, 2026
- Base commit: `14b6072c` (PR #67 - Merge pull request #67 from kushmanmb-org/copilot/update-key-tree-derivation)
- Dependabot commit: `21f6ea41` - bumps 14 npm packages

### 2. Identified the Latest Master
- Latest master commit: `c05cbf21` (PR #81 - Merge pull request #81 from kushmanmb-org/copilot/add-gasless-quote-request)
- This is 1 commit ahead of the Dependabot PR's base

### 3. Performed the Rebase
- Used `git cherry-pick` to apply the Dependabot commit onto the latest master
- Result: New commit `e7feeab0` with the same dependency updates, now based on latest master
- Auto-merged `package.json` successfully with no conflicts

### 4. Dependency Updates Applied

The following packages were updated:

| Package | From | To |
| --- | --- | --- |
| next | 15.5.7 | 15.5.10 |
| cloudinary | 2.5.1 | 2.7.0 |
| @babel/helpers | 7.26.9 | 7.28.6 |
| brace-expansion | 1.1.11 | 1.1.12 |
| diff | 4.0.2 | 4.0.4 |
| form-data | 4.0.2 | 4.0.5 |
| h3 | 1.15.1 | 1.15.5 |
| hono | 4.8.5 | 4.12.0 |
| js-yaml | 3.14.1 | 3.14.2 |
| jws | 3.2.2 | 3.2.3 |
| mdast-util-to-hast | 13.2.0 | 13.2.1 |
| sha.js | 2.4.11 | 2.4.12 |
| tmp | 0.2.3 | 0.2.5 |
| undici | 5.28.5 | 5.29.0 |

Note: The yarn.lock actually resolved `next` to version `15.5.12` (latest available).

### 5. Files Modified
- `apps/web/package.json` - Updated next and cloudinary versions
- `libs/base-ui/package.json` - Updated cloudinary version
- `package.json` - Updated next version
- `yarn.lock` - Updated all transitive dependencies (326 lines changed)

## Security Notes
Several of these updates include security fixes:
- **next 15.5.10**: Addresses CVE-2025-59471, CVE-2025-59472, and CVE-2026-23864
- **cloudinary 2.7.0**: Fixes parameter injection vulnerability
- **tmp 0.2.5**: Fixes GHSA-52f5-9888-hmc6

## Next Steps
The rebased dependency updates are now incorporated into this PR. When this PR is merged, the changes will be on the latest master and the original Dependabot PR #30 can be closed as its changes have been incorporated.
