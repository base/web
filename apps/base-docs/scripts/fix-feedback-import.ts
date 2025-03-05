import { readFile, writeFile } from 'fs/promises'
import { glob } from 'glob'
import path from 'path'

// Improved error handling with custom error class
class MDXImportFixerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MDXImportFixerError';
  }
}

// Type definition for configuration
interface ImportFixerConfig {
  componentBasePath: string;
  importPattern: RegExp;
  componentName: string;
  componentFile: string;
}

// Default configuration with strong typing
const DEFAULT_CONFIG: ImportFixerConfig = {
  componentBasePath: 'docs/components',
  importPattern: /import\s*{\s*FeedbackWidget\s*}\s*from/,
  componentName: 'FeedbackWidget',
  componentFile: 'index.tsx'
};

function calculateRelativePath(fromPath: string, basePath: string = DEFAULT_CONFIG.componentBasePath): string {
  try {
    // More robust path calculation with additional checks
    const normalizedFromPath = path.normalize(fromPath);
    const normalizedBasePath = path.normalize(basePath);
    
    const relativePath = path.relative(path.dirname(normalizedFromPath), normalizedBasePath)
      .replace(/\\/g, '/'); // Consistent path separators
    
    return relativePath.startsWith('.') ? relativePath : './' + relativePath;
  } catch (error) {
    throw new MDXImportFixerError(`Failed to calculate relative path: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

function detectFrontMatterDelimiters(content: string): { start: number; end: number } | null {
  const lines = content.split('\n');
  const startIndex = lines.findIndex(line => line.trim() === '---');
  
  if (startIndex === -1) return null;
  
  const endIndex = lines.slice(startIndex + 1)
    .findIndex(line => line.trim() === '---');
  
  return endIndex !== -1 
    ? { start: startIndex, end: endIndex + startIndex + 1 } 
    : null;
}

async function fixFeedbackImports(config: ImportFixerConfig = DEFAULT_CONFIG) {
  try {
    // Use more robust glob pattern
    const mdxFiles = await glob('docs/pages/**/*.{mdx,md}', { 
      ignore: ['**/node_modules/**', '**/.git/**'] 
    });
    
    if (mdxFiles.length === 0) {
      console.warn('No MDX files found to process.');
      return;
    }
    
    let processedFiles = 0;
    
    for (const filePath of mdxFiles) {
      try {
        const content = await readFile(filePath, 'utf-8');
        const lines = content.split('\n');
        
        // More precise import checking
        const hasImportAnywhere = lines.some(line => 
          config.importPattern.test(line.trim())
        );
        
        if (!hasImportAnywhere) continue;
        
        // Remove existing imports
        const filteredLines = lines.filter(line => 
          !config.importPattern.test(line.trim())
        );
        
        // Create import statement
        const relativePath = calculateRelativePath(filePath);
        const importStatement = `import { ${config.componentName} } from '${relativePath}/${config.componentName}/${config.componentFile}'`;
        
        // Handle front matter insertion
        const frontMatterDelimiters = detectFrontMatterDelimiters(content);
        
        if (frontMatterDelimiters) {
          // Insert after front matter
          filteredLines.splice(
            frontMatterDelimiters.end + 1, 
            0, 
            '', // Blank line for readability
            importStatement
          );
        } else {
          // No front matter, add at the top
          filteredLines.unshift(importStatement, '');
        }
        
        // Write updated content
        await writeFile(filePath, filteredLines.join('\n'), 'utf-8');
        
        processedFiles++;
        console.log(`Updated imports in ${filePath}`);
      } catch (fileError) {
        console.error(`Error processing file ${filePath}:`, fileError);
        // Continue processing other files
      }
    }
    
    console.log(`Processed ${processedFiles} files successfully.`);
  } catch (error) {
    console.error('Fatal error in import fixing process:', error);
    throw new MDXImportFixerError(`Import fixing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Export for potential use in other scripts
export { 
  fixFeedbackImports, 
  calculateRelativePath, 
  DEFAULT_CONFIG,
  MDXImportFixerError 
};

// Optional: Immediate execution if run directly
if (require.main === module) {
  fixFeedbackImports().catch(console.error);
}
