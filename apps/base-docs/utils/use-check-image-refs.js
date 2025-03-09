import { findBrokenImageReferences } from './check-image-refs.js'

function runCheck() {
  return (async () => {
    try {
      const result = await findBrokenImageReferences({
        markdownPath: 'docs/pages/guides/general-development/example.md'
      })

      if (result.broken.length)
        console.error('Broken image references found:', result.broken)
      else
        console.log('No broken image references found.')
    } catch (error) {
      console.error('Error while checking images:', error)
    }
  })()
}

runCheck()