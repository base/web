import { glob } from 'glob'
import fs from 'fs/promises'
import path from 'path'
import chokidar from 'chokidar'

function calculateRelativePath(fromPath: string): string {
  // Calculate the relative path from the MDX file to the components directory
  const relativePath = path.relative(path.dirname(fromPath), 'docs/components')
    .replace(/\\/g, '/') // Convert Windows paths to forward slashes
  return relativePath.startsWith('.') ? relativePath : './' + relativePath
}

const FEEDBACK_COMPONENT = '\n<FeedbackWidget />\n'

function hasFrontMatter(content: string): boolean {
  // Get the first non-empty line
  const firstLine = content.split('\n').find(line => line.trim().length > 0)
  return firstLine?.trim() === '---'
}

async function processFile(file: string, createBackup = false) {
  try {
    // Skip index.mdx file
    if (file.endsWith('pages/index.mdx')) {
      return false
    }

    // Read the file content
    let content = await fs.readFile(file, 'utf-8')

    // Skip if the FeedbackWidget is already imported or included
    if (content.includes('FeedbackWidget')) {
      return false // Return false to indicate no changes were made
    }

    // Calculate the relative path for this file
    const relativePath = calculateRelativePath(file)
    const FEEDBACK_IMPORT = `import { FeedbackWidget } from '${relativePath}/FeedbackWidget/index.tsx'\n`

    const hasYamlFrontMatter = hasFrontMatter(content)
    
    if (hasYamlFrontMatter) {
      // Find the end of front matter
      const lines = content.split('\n')
      const firstDelimiterIndex = lines.findIndex(line => line.trim() === '---')
      const secondDelimiterIndex = lines.slice(firstDelimiterIndex + 1)
        .findIndex(line => line.trim() === '---') + firstDelimiterIndex + 1

      if (secondDelimiterIndex > firstDelimiterIndex) {
        // Reconstruct the content with the import after frontmatter
        const beforeImport = lines.slice(0, secondDelimiterIndex + 1).join('\n')
        const afterImport = lines.slice(secondDelimiterIndex + 1).join('\n')
        content = beforeImport + '\n' + FEEDBACK_IMPORT + afterImport
      }
    } else {
      // No frontmatter, add import at the top
      content = FEEDBACK_IMPORT + content
    }

    // Add the FeedbackWidget component at the end
    content += FEEDBACK_COMPONENT

    // Create a backup if requested (build mode)
    if (createBackup) {
      await fs.writeFile(`${file}.backup`, content, 'utf-8')
    }

    // Write the modified content back to the file
    await fs.writeFile(file, content, 'utf-8')
    return true // Return true to indicate changes were made
  } catch (error) {
    console.error(`Error processing file ${file}:`, error)
    return false
  }
}

async function convertMdToMdx(file: string) {
  try {
    const mdxFile = file.replace('.md', '.mdx')
    const content = await fs.readFile(file, 'utf-8')
    await fs.writeFile(mdxFile, content, 'utf-8')
    await fs.unlink(file)
    console.log(`Converted ${file} to MDX`)
    return mdxFile
  } catch (error) {
    console.error(`Error converting ${file} to MDX:`, error)
    return null
  }
}

async function buildMode() {
  try {
    let changesCount = 0

    // Convert all MD files to MDX
    const mdFiles = await glob('docs/**/*.md')
    for (const file of mdFiles) {
      const mdxFile = await convertMdToMdx(file)
      if (mdxFile) {
        const changed = await processFile(mdxFile, true)
        if (changed) {
          console.log(`Injected FeedbackWidget into ${mdxFile}`)
          changesCount++
        }
      }
    }

    // Process existing MDX files
    const mdxFiles = await glob('docs/**/*.mdx')
    for (const file of mdxFiles) {
      const changed = await processFile(file, true)
      if (changed) {
        console.log(`Injected FeedbackWidget into ${file}`)
        changesCount++
      }
    }

    if (changesCount > 0) {
      console.log(`Build mode: Feedback widget injected into ${changesCount} file(s)`)
    } else {
      console.log('Build mode: No changes needed')
    }
  } catch (error) {
    console.error('Error in build mode:', error)
    process.exit(1)
  }
}

function devMode() {
  console.log('Starting dev mode: watching for file changes...')
  
  const watcher = chokidar.watch('docs/**/*.{md,mdx}', {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
  })

  watcher
    .on('add', async (file) => {
      if (file.endsWith('.md')) {
        const mdxFile = await convertMdToMdx(file)
        if (mdxFile) {
          const changed = await processFile(mdxFile, false)
          if (changed) console.log(`Injected FeedbackWidget into ${mdxFile}`)
        }
      } else if (file.endsWith('.mdx')) {
        const changed = await processFile(file, false)
        if (changed) console.log(`Injected FeedbackWidget into ${file}`)
      }
    })
    .on('change', async (file) => {
      if (file.endsWith('.mdx') && !file.endsWith('.backup')) {
        const changed = await processFile(file, false)
        if (changed) console.log(`Injected FeedbackWidget into ${file}`)
      }
    })

  // Handle process termination
  process.on('SIGINT', () => {
    watcher.close()
    process.exit(0)
  })
}

// Determine mode based on command line argument
const mode = process.argv[2]
if (mode === '--dev') {
  devMode()
} else {
  buildMode()
} 