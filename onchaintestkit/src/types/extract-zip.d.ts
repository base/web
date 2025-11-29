declare module "extract-zip" {
  interface ExtractEntry {
    fileName: string
    uncompressedSize: number
    type?: string
    lastModifiedDate?: Date
  }

  export default function extractZip(
    source: string,
    options: {
      dir: string
      onEntry?: (entry: ExtractEntry) => void
    },
  ): Promise<void>
}
