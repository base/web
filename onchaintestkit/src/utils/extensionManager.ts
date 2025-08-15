import { BrowserContext } from "@playwright/test"

// Type declarations for Chrome management API
declare global {
  interface Window {
    chrome?: {
      management?: {
        getAll: (callback: (extensions: ChromeExtension[]) => void) => void
      }
      runtime?: {
        lastError?: { message: string }
      }
    }
  }
}

interface ChromeExtension {
  id: string
  name: string
  enabled: boolean
  type: string
}

/**
 * Get extension ID from browser context using Chrome management API
 * Simple implementation without retry logic or caching
 */
export async function getExtensionId(
  context: BrowserContext,
  extensionName: string,
): Promise<string> {
  const page = await context.newPage()

  try {
    // Navigate to chrome://extensions to get access to the management API
    await page.goto("chrome://extensions/")

    const extensions = await page.evaluate(() => {
      return new Promise<Array<{ id: string; name: string; enabled: boolean }>>(
        (resolve, reject) => {
          if (!window.chrome?.management?.getAll) {
            reject(new Error("Chrome management API not available"))
            return
          }

          window.chrome.management.getAll((extensions: ChromeExtension[]) => {
            if (window.chrome?.runtime?.lastError) {
              reject(
                new Error(
                  `Chrome management API error: ${window.chrome.runtime.lastError.message}`,
                ),
              )
              return
            }

            const extensionData = extensions
              .filter((ext: ChromeExtension) => ext.type === "extension")
              .map((ext: ChromeExtension) => ({
                id: ext.id,
                name: ext.name,
                enabled: ext.enabled,
              }))

            resolve(extensionData)
          })
        },
      )
    })

    // Find extension by name (case-insensitive contains match)
    const extension = extensions.find(ext =>
      ext.name.toLowerCase().includes(extensionName.toLowerCase()),
    )

    if (!extension) {
      const availableNames = extensions.map(ext => ext.name).join(", ")
      throw new Error(
        `Extension "${extensionName}" not found. Available extensions: ${availableNames}`,
      )
    }

    return extension.id
  } finally {
    await page.close()
  }
}
