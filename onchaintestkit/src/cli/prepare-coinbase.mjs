#!/usr/bin/env node

/**
 * This script downloads and extracts the Coinbase Wallet extension
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

// Constants for Coinbase Wallet
const COINBASE_VERSION = "3.117.1"
const EXTENSION_ID = "hnfanknocfeofbddgcijnmhnfnkdnaad"
const DOWNLOAD_URL = `https://update.googleapis.com/service/update2/crx?response=redirect&os=win&arch=x64&os_arch=x86_64&nacl_arch=x86-64&prod=chromiumcrx&prodchannel=unknown&prodversion=120.0.0.0&acceptformat=crx3&x=id%3D${EXTENSION_ID}%26uc`
const EXTRACTION_COMPLETE_FLAG = ".extraction_complete"

/**
 * Set up the cache directory structure
 */
async function setupCacheDir(cacheDirName) {
  const projectRoot = process.cwd()
  const cacheDirPath = path.join(projectRoot, "e2e", ".cache", cacheDirName)

  // Ensure the cache directory exists
  await fs.ensureDir(cacheDirPath)

  return cacheDirPath
}

/**
 * Download with retry logic for CI environments
 */
async function downloadWithRetry(url, options, maxRetries = 3) {
  let lastError

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Download attempt ${attempt} of ${maxRetries}...`)
      const response = await fetch(url, options)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      return response
    } catch (error) {
      lastError = error
      console.error(`Attempt ${attempt} failed: ${error.message}`)

      if (attempt < maxRetries) {
        const waitTime = Math.min(1000 * 2 ** (attempt - 1), 10000)
        console.log(`Waiting ${waitTime}ms before retry...`)
        await new Promise(resolve => setTimeout(resolve, waitTime))
      }
    }
  }

  throw new Error(`Failed after ${maxRetries} attempts: ${lastError.message}`)
}

/**
 * Prepares the Coinbase Wallet extension by downloading and extracting it
 */
async function setupCoinbaseExtraction() {
  console.log(`Preparing Coinbase Wallet extension v${COINBASE_VERSION}...`)

  // Set up the cache directory
  const cacheDir = await setupCacheDir("coinbase-extension")
  const extractionPath = path.join(cacheDir, `coinbase-${COINBASE_VERSION}`)
  const flagPath = path.join(extractionPath, EXTRACTION_COMPLETE_FLAG)

  // Download the CRX file
  const crxPath = path.join(cacheDir, `coinbase-${COINBASE_VERSION}.crx`)
  console.log(`Downloading Coinbase Wallet extension to: ${crxPath}`)

  // Check if file already exists
  let cached = false
  if (await fs.pathExists(crxPath)) {
    const stats = await fs.stat(crxPath)
    if (stats.size > 0) {
      console.log(`Using cached download at ${crxPath}`)
      cached = true
    }
  }

  // Download if not cached
  if (!cached) {
    console.log("Downloading from Chrome Web Store...")
    try {
      // Attempt download with retry logic
      const response = await downloadWithRetry(
        DOWNLOAD_URL,
        {
          redirect: "follow",
          follow: 20,
        },
        3,
      )

      const contentType = response.headers.get("content-type")
      console.log(`Response content-type: ${contentType}`)

      const buffer = await response.arrayBuffer()

      await fs.writeFile(crxPath, Buffer.from(buffer))
      console.log("Download complete")

      // Verify the download
      const downloadedStats = await fs.stat(crxPath)
      if (downloadedStats.size === 0) {
        await fs.remove(crxPath)
        throw new Error(
          "Downloaded file is empty. The Chrome Web Store might be blocking automated downloads.",
        )
      }
    } catch (error) {
      throw new Error(`Extension download failed: ${error.message}`)
    }
  }

  // Clean any existing extraction directory
  if (await fs.pathExists(extractionPath)) {
    console.log(`Cleaning existing directory: ${extractionPath}`)
    await fs.emptyDir(extractionPath)
  }

  // Extract the CRX file
  console.log(`Extracting to: ${extractionPath}`)
  try {
    // Read the CRX file
    const crxBuffer = await fs.readFile(crxPath)
    console.log(`CRX file size: ${crxBuffer.length} bytes`)

    // CRX3 files start with "Cr24" magic number
    const crx3Magic = Buffer.from("Cr24")

    let zipStart = -1

    if (crxBuffer.subarray(0, 4).equals(crx3Magic)) {
      console.log("Detected CRX3 format")
      // CRX3 format:
      // 4 bytes: "Cr24" magic
      // 4 bytes: version (3)
      // 4 bytes: header length
      const version = crxBuffer.readUInt32LE(4)
      const headerLength = crxBuffer.readUInt32LE(8)
      console.log(`CRX version: ${version}, header length: ${headerLength}`)

      // ZIP content starts after the header
      zipStart = 12 + headerLength
    } else {
      throw new Error(
        "Invalid CRX file format - expected CRX3 with 'Cr24' header",
      )
    }

    // Extract the ZIP portion
    const zipBuffer = crxBuffer.subarray(zipStart)
    console.log(
      `Extracting ZIP content from offset ${zipStart}, size: ${zipBuffer.length} bytes`,
    )

    const zipPath = path.join(cacheDir, `coinbase-${COINBASE_VERSION}.zip`)
    await fs.writeFile(zipPath, zipBuffer)

    // Now extract the ZIP file
    await extract(zipPath, { dir: extractionPath })

    // Clean up the temporary ZIP file
    await fs.remove(zipPath)

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
      `Coinbase Wallet extension successfully prepared at: ${extractionPath}`,
    )
    return extractionPath
  } catch (error) {
    console.error(`Error extracting CRX: ${error.message}`)
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
    console.log("Preparing Coinbase Wallet extension for tests...")

    // Run the setup function
    const extensionPath = await setupCoinbaseExtraction()
    console.log(
      `Coinbase Wallet extension prepared successfully at: ${extensionPath}`,
    )
    console.log("You can now run the tests!")

    process.exit(0)
  } catch (error) {
    console.error("Failed to prepare Coinbase Wallet extension:")
    console.error(error)
    process.exit(1)
  }
}

// Run the main function with proper promise handling
main().catch(error => {
  console.error("Unhandled error in main function:", error)
  process.exit(1)
})
