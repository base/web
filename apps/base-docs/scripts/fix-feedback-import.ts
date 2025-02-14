import { readFile, writeFile } from 'fs/promises'
import { glob } from 'glob'
import path from 'path'

function calculateRelativePath(fromPath: string): string {
  // Calculate the relative path from the MDX file to the components directory
  const relativePath = path.relative(path.dirname(fromPath), 'docs/components')
    .replace(/\\/g, '/') // Convert Windows paths to forward slashes
  return relativePath.startsWith('.') ? relativePath : './' + relativePath
}

// Pattern to match any FeedbackWidget import
const FEEDBACK_IMPORT_PATTERN = /import\s*{\s*FeedbackWidget\s*}\s*from/

function hasFrontMatter(content: string): boolean {
  // Get the first non-empty line
  const firstLine = content.split('\n').find(line => line.trim().length > 0)
  return firstLine?.trim() === '---'
}

async function fixFeedbackImports() {
  const mdxFiles = await glob('docs/pages/**/*.mdx')
  
  for (const filePath of mdxFiles) {
    const content = await readFile(filePath, 'utf-8')
    const lines = content.split('\n')
    
    // Check for any FeedbackWidget import anywhere in the file
    const hasImportAnywhere = lines.some(line => FEEDBACK_IMPORT_PATTERN.test(line))
    if (!hasImportAnywhere) continue
    
    // Remove any FeedbackWidget import line
    const filteredLines = lines.filter(line => !FEEDBACK_IMPORT_PATTERN.test(line))
    
    // Calculate the relative path for this file
    const relativePath = calculateRelativePath(filePath)
    const importStatement = `import { FeedbackWidget } from '${relativePath}/FeedbackWidget/index.tsx'`
    
    const hasYamlFrontMatter = hasFrontMatter(content)

    if (hasYamlFrontMatter) {
      // Find the end of front matter
      const firstDelimiterIndex = filteredLines.findIndex(line => line.trim() === '---')
      const secondDelimiterIndex = filteredLines.slice(firstDelimiterIndex + 1)
        .findIndex(line => line.trim() === '---') + firstDelimiterIndex + 1

      if (secondDelimiterIndex > firstDelimiterIndex) {
        // Add a blank line after frontmatter if there isn't one
        if (filteredLines[secondDelimiterIndex + 1]?.trim() !== '') {
          filteredLines.splice(secondDelimiterIndex + 1, 0, '')
        }
        // Add import after the blank line
        filteredLines.splice(secondDelimiterIndex + 2, 0, importStatement, '')
      }
    } else {
      // No frontmatter, add at the top
      filteredLines.unshift(importStatement, '')
    }
    
    // Write back to file
    await writeFile(filePath, filteredLines.join('\n'))
    console.log(`Fixed imports in ${filePath}`)
  }
}

fixFeedbackImports().catch(console.error) 