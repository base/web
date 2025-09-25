import fs from "fs-extra"

export async function removeTempDir(dirPath: string): Promise<Error | null> {
  try {
    await fs.remove(dirPath)
    return null
  } catch (error) {
    // Only log and return error, don't throw
    console.warn(`Warning: Failed to clean up temp directory ${dirPath}`, error)
    return error as Error
  }
}
