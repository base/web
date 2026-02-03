import os from "node:os"
import path from "node:path"
import extract from "extract-zip"
import fs from "fs-extra"
import { EXTENSION_FILENAME, EXTENSION_URL } from "./constants"
/**
 * MetaMask Extension Manager
 * Handles downloading and extracting the MetaMask extension for testing
 */

// Internal helper types
interface FileRequest {
  url: string
  outputPath: string
  useCache?: boolean
}

interface UnpackRequest {
  zipFile: string
  useCache?: boolean
}

/**
 * Downloads a remote file with caching support
 * Returns true if file was served from cache
 */
async function getRemoteFile({
  url,
  outputPath,
  useCache = true,
}: FileRequest): Promise<boolean> {
  // Use cached version if available and requested
  if (useCache && (await fs.pathExists(outputPath))) {
    return true // Served from cache
  }

  try {
    // Make sure target directory exists
    await fs.ensureDir(path.dirname(outputPath))

    // Fetch file content
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Network error: ${res.status} - ${res.statusText}`)
    }

    // Save to disk
    const fileData = await res.arrayBuffer()
    await fs.writeFile(outputPath, Buffer.from(fileData))

    return false // Freshly downloaded
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err)
    throw new Error(`Download operation failed: ${errMsg}`)
  }
}

/**
 * Extracts a zip archive to a folder with the same name
 * Returns the path to the extracted directory
 */
async function unpackZipArchive({
  zipFile,
  useCache = true,
}: UnpackRequest): Promise<string> {
  const targetDir = zipFile.replace(/\.zip$/, "")

  // Return existing directory if allowed
  if (useCache && (await fs.pathExists(targetDir))) {
    return targetDir
  }

  try {
    // Create target directory and extract
    await fs.ensureDir(targetDir)
    await extract(zipFile, { dir: targetDir })
    return targetDir
  } catch (err: unknown) {
    // Clean up partial extraction on error
    try {
      await fs.remove(targetDir)
    } catch {
      // Ignore cleanup errors
    }

    const errMsg = err instanceof Error ? err.message : String(err)
    throw new Error(`Extraction operation failed: ${errMsg}`)
  }
}

/**
 * Creates a cache directory for the test kit
 */
export async function createCacheDir(name: string): Promise<string> {
  const dirPath = path.join(os.tmpdir(), "onchaintestkit", name)
  await fs.mkdir(dirPath, { recursive: true })
  return dirPath
}

/**
 * Downloads a browser extension from a URL
 */
export async function downloadExtension(params: {
  extensionUrl: string
  cacheDir: string
  filename: string
  forceDownload?: boolean
}): Promise<{ filePath: string; fromCache: boolean }> {
  const { extensionUrl, cacheDir, filename, forceDownload = false } = params
  const filePath = path.join(cacheDir, filename)

  const isCached = await getRemoteFile({
    url: extensionUrl,
    outputPath: filePath,
    useCache: !forceDownload,
  })

  return { filePath, fromCache: isCached }
}

/**
 * Extracts a browser extension from a zip file
 */
export async function extractExtension(params: {
  zipFilePath: string
  forceExtract?: boolean
}): Promise<{ extractedPath: string; fromCache: boolean }> {
  const { zipFilePath, forceExtract = false } = params

  const extractedPath = await unpackZipArchive({
    zipFile: zipFilePath,
    useCache: !forceExtract,
  })

  const fromCache = !forceExtract && (await fs.pathExists(extractedPath))

  return { extractedPath, fromCache }
}

/**
 * Sets up the MetaMask extension for testing
 * Downloads and extracts the extension if needed
 */
export async function downloadMetaMask(): Promise<string> {
  try {
    // Prepare cache location
    const cachePath = await createCacheDir("metamask-files")
    const zipPath = path.join(cachePath, EXTENSION_FILENAME)

    // Get extension zip (from cache if possible)
    const { fromCache: zipFromCache } = await downloadExtension({
      extensionUrl: EXTENSION_URL,
      cacheDir: cachePath,
      filename: EXTENSION_FILENAME,
    })

    // Extract the zip (from cache if possible)
    const { extractedPath } = await extractExtension({
      zipFilePath: zipPath,
      forceExtract: !zipFromCache, // Only re-extract if we downloaded a new zip
    })

    return extractedPath
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err)
    throw new Error(`MetaMask extension preparation failed: ${errMsg}`)
  }
}
