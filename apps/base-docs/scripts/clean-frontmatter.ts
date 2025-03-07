import { glob } from 'glob'
import fs from 'fs/promises'

function hasFrontMatter(content: string): boolean {
  // Get the first non-empty line
  const firstLine = content.split('\n').find(line => line.trim().length > 0)
  return firstLine?.trim() === '---'
}

function cleanFrontMatter(content: string): string {
  if (!hasFrontMatter(content)) return content

  // Split content into lines and remove empty lines at the start
  const lines = content.split('\n')
  
  // Find the first '---' delimiter
  const firstDelimiterIndex = lines.findIndex(line => line.trim() === '---')
  
  if (firstDelimiterIndex > 0) {
    // Remove empty lines before frontmatter and ensure it starts at the beginning
    return [
      '---',
      ...lines.slice(firstDelimiterIndex + 1)
    ].join('\n')
  }
  
  return content
}

async function processFile(file: string) {
  try {
    // Read the file content
    let content = await fs.readFile(file, 'utf-8')

    // Clean up frontmatter if needed
    const cleanedContent = cleanFrontMatter(content)

    // Only write if changes were made
    if (cleanedContent !== content) {
      await fs.writeFile(file, cleanedContent, 'utf-8')
      console.log(`Cleaned frontmatter in ${file}`)
      return true
    }
    return false
  } catch (error) {
    console.error(`Error processing file ${file}:`, error)
    return false
  }
}

async function main() {
  try {
    let changesCount = 0

    // Process MDX files
    const mdxFiles = await glob('docs/**/*.mdx')
    for (const file of mdxFiles) {
      const changed = await processFile(file)
      if (changed) changesCount++
    }

    if (changesCount > 0) {
      console.log(`Cleaned frontmatter in ${changesCount} file(s)`)
    } else {
      console.log('No files needed frontmatter cleaning')
    }
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

main() 