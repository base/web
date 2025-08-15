#!/usr/bin/env node

/**
 * This script downloads and extracts the MetaMask extension
 * to be used by Playwright tests.
 *
 * Run this before running tests in CI to ensure the extension
 * is ready and to avoid race conditions during test execution.
 */

import path from "path"
import { fileURLToPath } from "url"
import extract from "extract-zip"
import fs from "fs-extra"
import fetch from "node-fetch"

// Support for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Add global imports to fix linter errors
/* global process, console, URL, Buffer */

// Constants for MetaMask
const METAMASK_VERSION = "12.8.1"
const DOWNLOAD_URL = `https://github.com/MetaMask/metamask-extension/releases/download/v${METAMASK_VERSION}/metamask-chrome-${METAMASK_VERSION}.zip`
const EXTRACTION_COMPLETE_FLAG = ".extraction_complete"

/**
 * Set up the cache directory structure
 */
async function setupCacheDir(cacheDirName) {
  // Use current project's e2e/.cache directory
  const projectRoot = process.cwd()
  const cacheDirPath = path.join(projectRoot, "e2e", ".cache", cacheDirName)

  // Ensure the cache directory exists
  await fs.ensureDir(cacheDirPath)

  return cacheDirPath
}

/**
 * Prepares the MetaMask extension by downloading and extracting it
 */
async function setupMetaMaskExtraction() {
  console.log(`Preparing MetaMask extension v${METAMASK_VERSION}...`)

  // Set up the cache directory
  const cacheDir = await setupCacheDir("metamask-extension")
  const extractionPath = path.join(cacheDir, `metamask-${METAMASK_VERSION}`)
  const flagPath = path.join(extractionPath, EXTRACTION_COMPLETE_FLAG)

  // Download the zip file
  const zipPath = path.join(cacheDir, `metamask-${METAMASK_VERSION}.zip`)
  console.log(`Downloading MetaMask extension to: ${zipPath}`)

  // Check if file already exists
  let cached = false
  if (await fs.pathExists(zipPath)) {
    const stats = await fs.stat(zipPath)
    if (stats.size > 0) {
      console.log(`Using cached download at ${zipPath}`)
      cached = true
    }
  }

  // Download if not cached
  if (!cached) {
    console.log(`Downloading from ${DOWNLOAD_URL}`)
    try {
      // Attempt download
      const response = await fetch(DOWNLOAD_URL, {
        redirect: "follow",
        follow: 20, // Allow up to 20 redirects
      })

      // Verify the final URL is trusted
      const finalUrl = response.url
      const finalUrlObj = new URL(finalUrl)

      // Function to check if a hostname is a valid subdomain of a base domain
      const isValidSubdomainOf = (hostname, baseDomain) => {
        if (hostname === baseDomain) return true

        const suffix = `.${baseDomain}`
        if (!hostname.endsWith(suffix)) return false

        // Check that what comes before is a valid subdomain (no dots immediately before the suffix)
        const subdomainPart = hostname.slice(0, -suffix.length)
        return subdomainPart.length > 0 && !subdomainPart.endsWith(".")
      }

      const hostname = finalUrlObj.hostname.toLowerCase()

      // Check if hostname is from GitHub or GitHubUserContent domains
      const isAllowed =
        isValidSubdomainOf(hostname, "github.com") ||
        isValidSubdomainOf(hostname, "githubusercontent.com")

      if (!isAllowed) {
        throw new Error(`Redirect to untrusted host: ${finalUrlObj.hostname}`)
      }

      if (!response.ok) {
        throw new Error(`Failed to download: ${response.statusText}`)
      }

      const buffer = await response.arrayBuffer()
      await fs.writeFile(zipPath, Buffer.from(buffer))
      console.log("Download complete")
    } catch (error) {
      throw new Error(`Extension download failed: ${error.message}`)
    }
  }

  // Clean any existing extraction directory
  if (await fs.pathExists(extractionPath)) {
    console.log(`Cleaning existing directory: ${extractionPath}`)
    await fs.emptyDir(extractionPath)
  }

  // Extract the zip
  console.log(`Extracting to: ${extractionPath}`)
  try {
    await extract(zipPath, { dir: extractionPath })

    // Verify extraction succeeded
    const manifestPath = path.join(extractionPath, "manifest.json")
    if (!(await fs.pathExists(manifestPath))) {
      throw new Error(
        `Extraction failed: manifest.json not found at ${manifestPath}`,
      )
    }

    // Create flag file to indicate successful extraction
    await fs.writeFile(flagPath, new Date().toISOString())

    console.log(
      `MetaMask extension successfully prepared at: ${extractionPath}`,
    )
    return extractionPath
  } catch (error) {
    console.error(`Error extracting zip: ${error.message}`)
    // Clean up on failure
    try {
      await fs.emptyDir(extractionPath)
    } catch (cleanupError) {
      console.error(`Failed to clean up: ${cleanupError.message}`)
    }

    throw new Error(`Extraction failed: ${error.message}`)
  }
}

async function main() {
  try {
    console.log("Preparing MetaMask extension for tests...")

    // Run the setup function
    const extensionPath = await setupMetaMaskExtraction()
    console.log(`MetaMask extension prepared successfully at: ${extensionPath}`)
    console.log("You can now run the tests!")

    process.exit(0)
  } catch (error) {
    console.error("Failed to prepare MetaMask extension:")
    console.error(error)
    process.exit(1)
  }
}

// Run the main function with proper promise handling
main().catch(error => {
  console.error("Unhandled error in main function:", error)
  process.exit(1)
})
