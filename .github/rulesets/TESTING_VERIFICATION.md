# Branch Protection Rulesets - Testing and Verification Guide

This document provides comprehensive testing procedures to verify that branch protection rulesets are working correctly after they have been applied to the repository.

## Table of Contents

- [Pre-Application Checklist](#pre-application-checklist)
- [Post-Application Verification](#post-application-verification)
- [Test Scenarios](#test-scenarios)
- [Expected Behaviors](#expected-behaviors)
- [Troubleshooting Common Issues](#troubleshooting-common-issues)

## Pre-Application Checklist

Before applying the rulesets, verify:

- [ ] You have repository admin access
- [ ] Existing branch protection rules have been documented
- [ ] Team members have been notified of upcoming changes
- [ ] Workflows mentioned in status checks exist and are active:
  - [ ] `build` workflow (node.js.yml)
  - [ ] `test` workflow (main.yml)
  - [ ] `e2e` workflow (e2e-tests.yml)
  - [ ] `bearer` workflow (bearer.yml)
  - [ ] `codeql` workflow (codeql.yml)

## Post-Application Verification

After applying rulesets via GitHub UI or API, verify the configuration:

### 1. Verify Rulesets Exist and Are Active

**Via GitHub UI:**
1. Navigate to: `Settings` → `Rules` → `Rulesets`
2. Confirm you see:
   - ✅ Master Branch Protection (Active)
   - ✅ Release Branch Protection (Active)
   - ✅ Tag Protection (Active)

**Via GitHub CLI:**
```bash
gh api /repos/kushmanmb-org/web/rulesets \
  | jq '.[] | {name, enforcement, target}'
```

Expected output should show all three rulesets with `"enforcement": "active"`.

### 2. Verify Branch Targets

**Master Branch Protection:**
```bash
gh api /repos/kushmanmb-org/web/rulesets \
  | jq '.[] | select(.name == "Master Branch Protection") | .conditions'
```

Should target: `refs/heads/master`

**Release Branch Protection:**
```bash
gh api /repos/kushmanmb-org/web/rulesets \
  | jq '.[] | select(.name == "Release Branch Protection") | .conditions'
```

Should target: `refs/heads/release/*`

**Tag Protection:**
```bash
gh api /repos/kushmanmb-org/web/rulesets \
  | jq '.[] | select(.name == "Tag Protection") | .conditions'
```

Should target: `refs/tags/v*`

### 3. Verify Status Check Requirements

Check that required status checks are configured:

```bash
gh api /repos/kushmanmb-org/web/rulesets \
  | jq '.[] | select(.name == "Master Branch Protection") | .rules[] | select(.type == "required_status_checks")'
```

Should include: `build`, `test`, `e2e`, `bearer`, `codeql`

## Test Scenarios

### Test 1: Direct Push to Master (Should Fail)

**Purpose**: Verify that direct pushes to master are blocked.

**Steps**:
```bash
# Ensure you're on master branch
git checkout master
git pull origin master

# Try to make a direct push
git commit --allow-empty -m "Test: direct push to master"
git push origin master
```

**Expected Result**: ❌ Push should be rejected with an error message about branch protection rules.

**Success Criteria**: 
- Push fails
- Error message mentions "protected branch" or "ruleset"
- No changes appear on master branch

---

### Test 2: Force Push to Master (Should Fail)

**Purpose**: Verify that force pushes are blocked.

**Steps**:
```bash
git checkout master
git commit --allow-empty -m "Test: force push"
git push --force origin master
```

**Expected Result**: ❌ Force push should be rejected.

**Success Criteria**:
- Push fails with force push error
- Branch history remains intact

---

### Test 3: Delete Master Branch (Should Fail)

**Purpose**: Verify that master branch cannot be deleted.

**Steps**:
```bash
git push origin :master
# or
git push origin --delete master
```

**Expected Result**: ❌ Deletion should be rejected.

**Success Criteria**:
- Delete operation fails
- Master branch still exists

---

### Test 4: Pull Request Without Reviews (Should Block Merge)

**Purpose**: Verify that PRs require approval before merging.

**Steps**:
1. Create a test branch:
   ```bash
   git checkout -b test/pr-without-review
   echo "test" > test-file.txt
   git add test-file.txt
   git commit -m "test: PR without review"
   git push origin test/pr-without-review
   ```

2. Create PR via GitHub UI or CLI:
   ```bash
   gh pr create --title "Test: PR without review" --body "Testing review requirements"
   ```

3. Try to merge immediately without approval

**Expected Result**: ❌ Merge button should be disabled or show "Review required".

**Success Criteria**:
- Cannot merge without approval
- PR shows "Review required" status
- Status checks (if any exist) must pass

**Cleanup**:
```bash
gh pr close --delete-branch
```

---

### Test 5: Pull Request With Status Check Failures (Should Block Merge)

**Purpose**: Verify that failing status checks prevent merging.

**Steps**:
1. Create a branch with intentional test failure:
   ```bash
   git checkout -b test/failing-checks
   # Make changes that would fail tests
   git commit -m "test: failing status checks"
   git push origin test/failing-checks
   ```

2. Create PR and wait for status checks to run

**Expected Result**: ❌ Merge should be blocked until checks pass.

**Success Criteria**:
- PR shows failing status checks
- Merge button is disabled
- Clear indication of which checks failed

**Cleanup**:
```bash
gh pr close --delete-branch
```

---

### Test 6: Pull Request With Stale Reviews (Should Dismiss)

**Purpose**: Verify that new commits dismiss previous approvals.

**Steps**:
1. Create PR and get approval
2. Push new commit to the PR branch
3. Check if approval is dismissed

**Expected Result**: ✅ Previous approval should be dismissed.

**Success Criteria**:
- Approval is automatically dismissed
- New approval required after new commits

---

### Test 7: Unsigned Commit (Should Fail)

**Purpose**: Verify that unsigned commits are rejected.

**Steps**:
```bash
git checkout -b test/unsigned-commit

# Temporarily disable commit signing
git config --local commit.gpgsign false

echo "test" > unsigned-test.txt
git add unsigned-test.txt
git commit -m "test: unsigned commit"
git push origin test/unsigned-commit
```

Create PR and check if merge is blocked due to unsigned commits.

**Expected Result**: ⚠️ Merge blocked due to unsigned commits.

**Success Criteria**:
- PR shows "Required signatures" check failed
- Cannot merge until commits are signed

**Cleanup**:
```bash
git config --local commit.gpgsign true
gh pr close --delete-branch
```

---

### Test 8: Merge Commit (Should Fail with Linear History)

**Purpose**: Verify that merge commits are prevented (linear history required).

**Steps**:
1. Create PR with multiple commits
2. Try to use "Create a merge commit" option

**Expected Result**: ⚠️ Merge commit option should be disabled or fail.

**Success Criteria**:
- Only "Squash and merge" or "Rebase and merge" available
- "Create a merge commit" is disabled

---

### Test 9: Code Owner Approval Required

**Purpose**: Verify that changes to code owner files require approval from code owners.

**Steps**:
1. Create PR that modifies files in `apps/web/` directory
2. Request review from someone who is NOT a code owner
3. Try to merge with only non-code-owner approval

**Expected Result**: ❌ Merge blocked until code owner approves.

**Success Criteria**:
- PR shows "Code owner review required"
- Cannot merge with only non-code-owner approval

---

### Test 10: Release Branch Protection

**Purpose**: Verify release branches are protected similarly to master.

**Steps**:
```bash
git checkout master
git pull origin master
git checkout -b release/v1.0.0
git push origin release/v1.0.0

# Try direct push to release branch
echo "test" > release-test.txt
git add release-test.txt
git commit -m "test: direct push to release"
git push origin release/v1.0.0
```

**Expected Result**: ❌ Direct push should fail (must use PR).

**Success Criteria**:
- Direct push rejected
- Must create PR to update release branch

**Cleanup**:
```bash
git push origin :release/v1.0.0
```

---

### Test 11: Tag Protection

**Purpose**: Verify that version tags cannot be deleted and must be signed.

**Steps**:
```bash
# Create unsigned tag (should fail on push)
git tag v0.0.1-test
git push origin v0.0.1-test

# Try to delete tag
git push origin :v0.0.1-test
```

**Expected Results**:
- Unsigned tag push may be blocked
- Tag deletion should be blocked

**Success Criteria**:
- Only signed tags can be created
- Tags cannot be deleted without bypass permission

**Cleanup**: Use admin permissions if needed

---

### Test 12: Branch Must Be Up to Date

**Purpose**: Verify branches must be current before merging.

**Steps**:
1. Create PR from feature branch
2. Have someone else merge a different PR to master
3. Try to merge your PR without updating

**Expected Result**: ❌ Merge blocked until branch is updated.

**Success Criteria**:
- "Branch out of date" message shown
- Must update branch before merging

---

### Test 13: Valid Pull Request (Should Succeed)

**Purpose**: Verify that a properly prepared PR can be merged successfully.

**Steps**:
1. Create a well-formed branch:
   ```bash
   git checkout master
   git pull origin master
   git checkout -b test/valid-pr
   
   # Make valid changes
   echo "# Test Documentation" > TEST.md
   git add TEST.md
   git commit -s -m "docs: add test documentation"
   git push origin test/valid-pr
   ```

2. Create PR:
   ```bash
   gh pr create \
     --title "docs: add test documentation" \
     --body "This PR adds test documentation."
   ```

3. Wait for status checks to pass
4. Get required approval(s)
5. Ensure branch is up to date
6. Merge the PR

**Expected Result**: ✅ PR merges successfully.

**Success Criteria**:
- All status checks pass
- Required reviews obtained
- Merge completes successfully
- Commits appear on master with proper signatures

**Cleanup**:
```bash
git checkout master
git pull origin master
git branch -D test/valid-pr
```

## Expected Behaviors

### Summary Table

| Test Scenario | Expected Outcome | Priority |
|--------------|------------------|----------|
| Direct push to master | ❌ Blocked | Critical |
| Force push to master | ❌ Blocked | Critical |
| Delete master branch | ❌ Blocked | Critical |
| PR without reviews | ❌ Blocked | High |
| PR with failing checks | ❌ Blocked | High |
| Unsigned commits | ⚠️ Blocked | High |
| Merge commits | ⚠️ Blocked | Medium |
| Stale review dismissal | ✅ Dismissed | Medium |
| Code owner approval | ❌ Blocked without | High |
| Out of date branch | ❌ Blocked | Medium |
| Valid PR | ✅ Merges | Critical |

## Troubleshooting Common Issues

### Issue: Status checks not enforced

**Possible Causes**:
- Workflow names don't match required check names
- Workflows haven't run yet on the branch
- Checks are still in progress

**Solutions**:
1. Verify workflow names in `.github/workflows/` match required checks
2. Trigger workflows manually if needed: `gh workflow run <workflow-name>`
3. Wait for checks to complete

### Issue: Can't get approval from code owner

**Possible Causes**:
- Code owner not available
- CODEOWNERS file not properly configured

**Solutions**:
1. Check `.github/CODEOWNERS` file
2. Verify code owner has access to repository
3. Contact repository admin for temporary bypass if critical

### Issue: "Branch out of date" but can't update

**Possible Causes**:
- Merge conflicts exist
- Branch protection preventing force push after rebase

**Solutions**:
1. Rebase locally: `git pull --rebase origin master`
2. Resolve conflicts
3. Push: `git push origin your-branch --force-with-lease`

### Issue: Commits not signed

**Solutions**:
1. Set up GPG or SSH signing:
   ```bash
   git config --global commit.gpgsign true
   git config --global user.signingkey <your-key-id>
   ```
2. Re-sign existing commits:
   ```bash
   git rebase --exec 'git commit --amend --no-edit -n -S' -i <base-branch>
   ```

## Continuous Monitoring

After initial verification, continue to monitor:

- **Weekly**: Review bypass requests and exceptions
- **Monthly**: Check status check pass/fail rates
- **Quarterly**: Review and update rulesets as needed
- **Per Release**: Verify tag protection working correctly

## Documentation References

- [POLICY.md](../../POLICY.md) - Full repository policy
- [APPLY_RULESETS.md](./APPLY_RULESETS.md) - How to apply rulesets
- [README.md](./README.md) - Rulesets overview

## Feedback

If you encounter issues or have suggestions for additional tests:
1. Document the issue with reproduction steps
2. Open an issue in the repository
3. Tag repository maintainers

---

**Last Updated**: February 2026  
**Version**: 1.0.0
