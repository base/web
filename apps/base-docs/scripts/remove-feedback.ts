import { glob } from 'glob'
import fs from 'fs/promises'

async function removeFeedbackWidget(file: string) {
  try {
    // Read the file content
    let content = await fs.readFile(file, 'utf-8')

    // Skip if the file doesn't contain FeedbackWidget
    if (!content.includes('FeedbackWidget')) {
      return false
    }

    // Remove the import statement
    content = content.replace(/import\s*{\s*FeedbackWidget\s*}\s*from\s*['"].*?['"]\s*\n?/g, '')

    // Remove the FeedbackWidget component
    content = content.replace(/<FeedbackWidget\s*\/>\s*\n?/g, '')

    // Clean up any double newlines that might have been created
    content = content.replace(/\n{3,}/g, '\n\n')

    // Write the modified content back to the file
    await fs.writeFile(file, content, 'utf-8')
    return true
  } catch (error) {
    console.error(`Error processing file ${file}:`, error)
    return false
  }
}

async function main() {
  try {
    let changesCount = 0

    // Process both MD and MDX files
    const markdownFiles = await glob('docs/**/*.{md,mdx}')
    for (const file of markdownFiles) {
      const changed = await removeFeedbackWidget(file)
      if (changed) {
        console.log(`Removed FeedbackWidget from ${file}`)
        changesCount++
      }
    }

    if (changesCount > 0) {
      console.log(`Feedback widget removed from ${changesCount} file(s)`)
    } else {
      console.log('No files need modification')
    }
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

main() 
