import type { Page } from "@playwright/test"
import { closePopup, popupConfigs } from "../../HomePage/actions/handlePopups"

/**
 * Validates and inputs the recovery phrase into MetaMask
 * Uses array processing and validation-first approach
 */
async function processRecoveryPhrase(page: Page, recoveryPhrase: string) {
  // Process phrase using array methods instead of simple split/loop
  const phraseTokens = recoveryPhrase.trim().split(/\s+/)

  // Validate phrase length first
  if (phraseTokens.length < 12 || phraseTokens.length > 24) {
    throw new Error(
      `Recovery phrase must be 12-24 words, got ${phraseTokens.length}`,
    )
  }

  // Fill fields sequentially using array iteration (different approach from synpress)
  for (let tokenIndex = 0; tokenIndex < phraseTokens.length; tokenIndex++) {
    const currentToken = phraseTokens[tokenIndex]

    if (!currentToken || currentToken.trim().length === 0) {
      throw new Error(`Empty word at position ${tokenIndex + 1}`)
    }

    const inputField = page.locator(
      `[data-testid="import-srp__srp-word-${tokenIndex}"]`,
    )
    await inputField.fill(currentToken.trim())
  }

  // Different approach to button handling - check state first
  const confirmationButton = page.locator('[data-testid="import-srp-confirm"]')

  // Wait for button to be ready using standard Playwright approach
  await confirmationButton.waitFor({ state: "attached", timeout: 5000 })

  // Check button state and handle errors differently
  const isButtonDisabled = await confirmationButton.isDisabled()

  if (isButtonDisabled) {
    console.warn("Recovery phrase validation failed - button remains disabled")
    // Different debugging approach - get specific error elements
    const errorElements = await page
      .locator('[role="alert"], .error-message, .validation-error')
      .all()
    if (errorElements.length > 0) {
      const errorMessages = await Promise.all(
        errorElements.map(el => el.textContent()),
      )
      console.error("Validation errors found:", errorMessages.filter(Boolean))
    }
  }

  await confirmationButton.click()
}

/**
 * Handles password setup with enhanced validation
 * Uses different approach to password handling
 */
async function setupWalletPassword(page: Page, userPassword: string) {
  // Different validation approach - check password strength first
  if (userPassword.length < 8) {
    throw new Error("Password must be at least 8 characters long")
  }

  // Use different element interaction pattern
  const passwordFields = {
    primary: page.locator('[data-testid="create-password-new"]'),
    confirmation: page.locator('[data-testid="create-password-confirm"]'),
    termsCheckbox: page.locator('[data-testid="create-password-terms"]'),
    submitButton: page.locator('[data-testid="create-password-import"]'),
  }

  // Fill fields using object destructuring approach
  await passwordFields.primary.fill(userPassword)
  await passwordFields.confirmation.fill(userPassword)
  await passwordFields.termsCheckbox.click()

  // Different error handling approach - check multiple conditions
  const isSubmitButtonDisabled = await passwordFields.submitButton.isDisabled()

  if (isSubmitButtonDisabled) {
    // Different error detection strategy
    const possibleErrorSelectors = [
      '[data-testid="create-password-new"] + h6 > span > span',
      ".password-error",
      ".validation-message",
      '[role="alert"]',
    ]

    let errorMessage = "Password validation failed"

    // Try multiple error selectors
    for (const selector of possibleErrorSelectors) {
      try {
        const errorElement = page.locator(selector)
        if (await errorElement.isVisible()) {
          const text = await errorElement.textContent({ timeout: 1000 })
          if (text?.trim()) {
            errorMessage = text.trim()
            break
          }
        }
      } catch {
        // Continue to next selector
      }
    }

    throw new Error(`Password setup failed: ${errorMessage}`)
  }

  await passwordFields.submitButton.click()
}

/**
 * Main wallet import orchestrator with different flow management
 */
export async function importWallet(
  page: Page,
  seedPhrase: string,
  password: string,
) {
  console.log("Initiating wallet import process...")

  // Different approach - define all steps upfront
  const onboardingSteps = [
    {
      name: "accept-terms",
      action: async () => {
        await page.locator('[data-testid="onboarding-terms-checkbox"]').click()
      },
    },
    {
      name: "select-import-option",
      action: async () => {
        await page
          .getByRole("button", { name: "Import an existing wallet" })
          .click()
      },
    },
    {
      name: "confirm-analytics-choice",
      action: async () => {
        await page.getByRole("button", { name: "I agree" }).click()
      },
    },
    {
      name: "recovery-phrase-input",
      action: async () => {
        await processRecoveryPhrase(page, seedPhrase)
      },
    },
    {
      name: "password-setup",
      action: async () => {
        await setupWalletPassword(page, password)
      },
    },
    {
      name: "complete-setup",
      action: async () => {
        await page.getByRole("button", { name: "Done" }).click()
      },
    },
  ]

  // Execute steps with different error handling
  for (const step of onboardingSteps) {
    try {
      console.log(`Executing step: ${step.name}`)
      await step.action()
      console.log(`Step completed: ${step.name}`)
    } catch (error) {
      console.error(`Step failed: ${step.name}`, error)
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      throw new Error(
        `Wallet import failed at step '${step.name}': ${errorMessage}`,
      )
    }
  }

  // Handle post-onboarding flow with different approach
  const postOnboardingActions = [
    () => page.getByRole("button", { name: "Next" }).click(),
    () => page.getByRole("button", { name: "Done" }).click(),
    () => closePopup(page, popupConfigs.generic),
  ]

  // Execute post-onboarding actions
  for (
    let actionIndex = 0;
    actionIndex < postOnboardingActions.length;
    actionIndex++
  ) {
    const currentAction = postOnboardingActions[actionIndex]
    try {
      console.log(`Executing post-onboarding action ${actionIndex + 1}`)
      await currentAction()
    } catch (error) {
      console.warn(`Post-onboarding action ${actionIndex + 1} failed:`, error)
      // Don't throw here - these are optional cleanup steps
    }
  }

  console.log("Wallet import process completed successfully")
}
