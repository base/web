import { CDPSession, Page } from "@playwright/test"

export interface VirtualAuthenticatorOptions {
  protocol?: "ctap2" | "u2f"
  transport?: "usb" | "nfc" | "ble" | "internal"
  hasResidentKey?: boolean
  hasUserVerification?: boolean
  isUserVerified?: boolean
  automaticPresenceSimulation?: boolean
}

export interface WebAuthnCredential {
  credentialId: string
  isResidentCredential: boolean
  rpId: string
  privateKey: string
  userHandle: string
  signCount: number
}

export interface WebAuthnCredentialAddedEvent {
  authenticatorId: string
  credential: {
    credentialId: string
    isResidentCredential: boolean
    rpId?: string
    privateKey: string
    userHandle?: string
    signCount: number
  }
}

export class PasskeyAuthenticator {
  private authenticatorId?: string
  private cdpSession?: CDPSession
  private isInitialized = false
  private page: Page
  constructor(page: Page) {
    this.page = page
  }

  /**
   * Set a new Playwright Page for this authenticator and re-create the CDPSession.
   * This allows reusing the authenticator across different popups/pages.
   */
  async setPage(page: Page) {
    this.page = page
    // Re-create the CDPSession for the new page
    this.cdpSession = await this.page.context().newCDPSession(this.page)
    await this.cdpSession.send("WebAuthn.enable")

    // Note: isInitialized and authenticatorId are NOT reset here.
    // You may want to call initialize() again if you need a new authenticator for the new page.
  }

  async initialize(options: VirtualAuthenticatorOptions = {}): Promise<void> {
    this.cdpSession = await this.page.context().newCDPSession(this.page)
    await this.cdpSession.send("WebAuthn.enable")
    const defaultOptions = {
      protocol: "ctap2" as const,
      transport: "usb" as const,
      hasResidentKey: true,
      hasUserVerification: true,
      isUserVerified: true,
      automaticPresenceSimulation: true,
    }
    const finalOptions = { ...defaultOptions, ...options }
    const result = await this.cdpSession.send(
      "WebAuthn.addVirtualAuthenticator",
      { options: finalOptions },
    )
    this.authenticatorId = result.authenticatorId
    this.isInitialized = true
  }

  async simulateSuccessfulPasskeyInput(
    operationTrigger: () => Promise<void>,
  ): Promise<void> {
    if (!this.isInitialized || !this.authenticatorId || !this.cdpSession) {
      throw new Error("Authenticator not initialized")
    }
    const cdpSession = this.cdpSession
    const authenticatorId = this.authenticatorId
    await cdpSession.send("WebAuthn.setUserVerified", {
      authenticatorId,
      isUserVerified: true,
    })
    await cdpSession.send("WebAuthn.setAutomaticPresenceSimulation", {
      authenticatorId,
      enabled: true,
    })
    const eventPromise = new Promise<void>((resolve, reject) => {
      const addedHandler = (_event: WebAuthnCredentialAddedEvent) => {
        cdpSession.off("WebAuthn.credentialAdded", addedHandler)
        cdpSession.off("WebAuthn.credentialAsserted", assertedHandler)
        resolve()
      }
      const assertedHandler = (_event: unknown) => {
        cdpSession.off("WebAuthn.credentialAdded", addedHandler)
        cdpSession.off("WebAuthn.credentialAsserted", assertedHandler)
        resolve()
      }
      cdpSession.on("WebAuthn.credentialAdded", addedHandler)
      cdpSession.on("WebAuthn.credentialAsserted", assertedHandler)
      setTimeout(async () => {
        cdpSession.off("WebAuthn.credentialAdded", addedHandler)
        cdpSession.off("WebAuthn.credentialAsserted", assertedHandler)
        try {
          await this.getCredentials()
        } catch (_err) {}
        reject(new Error("WebAuthn operation timed out"))
      }, 30000)
    })
    try {
      await operationTrigger()
      await eventPromise
    } finally {
      await cdpSession.send("WebAuthn.setAutomaticPresenceSimulation", {
        authenticatorId,
        enabled: false,
      })
    }
  }

  async getCredentials(): Promise<WebAuthnCredential[]> {
    if (!this.isInitialized || !this.authenticatorId || !this.cdpSession) {
      throw new Error("Authenticator not initialized")
    }
    const cdpSession = this.cdpSession
    const authenticatorId = this.authenticatorId
    const result = await cdpSession.send("WebAuthn.getCredentials", {
      authenticatorId,
    })
    return result.credentials.map(
      (cred: {
        credentialId: string
        isResidentCredential: boolean
        rpId?: string
        privateKey: string
        userHandle?: string
        signCount: number
      }) => ({
        credentialId: cred.credentialId,
        isResidentCredential: cred.isResidentCredential,
        rpId: cred.rpId || "",
        privateKey: cred.privateKey,
        userHandle: cred.userHandle || "",
        signCount: cred.signCount,
      }),
    )
  }

  async exportCredentials(): Promise<WebAuthnCredential[]> {
    return this.getCredentials()
  }

  async importCredential(cred: WebAuthnCredential): Promise<void> {
    if (!this.isInitialized || !this.authenticatorId || !this.cdpSession) {
      throw new Error("Authenticator not initialized")
    }
    await this.cdpSession.send("WebAuthn.addCredential", {
      authenticatorId: this.authenticatorId,
      credential: {
        credentialId: cred.credentialId,
        isResidentCredential: cred.isResidentCredential,
        rpId: cred.rpId,
        privateKey: cred.privateKey,
        userHandle: cred.userHandle,
        signCount: cred.signCount,
      },
    })
  }
}
