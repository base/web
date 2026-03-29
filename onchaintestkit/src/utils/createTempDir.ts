import { tmpdir } from "os"
import { join } from "path"
import { mkdtemp } from "fs/promises"

export async function createTempDir(prefix: string): Promise<string> {
  return mkdtemp(join(tmpdir(), prefix))
}
