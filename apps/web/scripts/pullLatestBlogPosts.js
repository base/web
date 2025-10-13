const fs = require('fs').promises;
const path = require('path');
const { JSDOM } = require('jsdom');

/**
 * @typedef {Object} MirrorPost
 * @property {string} title - The title of the blog post
 * @property {string} url - The URL of the blog post
 * @property {string} imageUrl - The URL of the cover image
 * @property {string} publicImagePath - The local path where the image is saved
 */

/**
 * Sanitizes a filename by removing invalid characters
 * @param {string} title - The title to sanitize
 * @returns {string} The sanitized filename
 */
function sanitizeFilename(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
    .substring(0, 100); // Limit length to 100 characters
}

/**
 * Sanitizes an image URL
 * @param {string} url - The image URL to sanitize
 * @returns {Promise<string>} The sanitized image URL
 */
async function sanitizeImageUrl(url) {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname === 'images.mirror-media.xyz') {
      return `${parsedUrl.origin}${parsedUrl.pathname}`;
    }
  } catch (error) {
    console.error('Error parsing image URL:', error);
  }
  return url;
}

/**
 * Sanitizes a post URL
 * @param {string} url - The post URL to sanitize
 * @returns {string} The sanitized post URL
 */
function sanitizePostUrl(url) {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname === 'base.mirror.xyz') {
      return `${parsedUrl.origin}${parsedUrl.pathname}`;
    }
    throw new Error('Invalid domain');
  } catch (error) {
    console.error('Error parsing post URL:', error);
    return '';
  }
}

/**
 * Removes duplicate posts based on URL
 * @param {MirrorPost[]} posts - The array of posts to deduplicate
 * @returns {MirrorPost[]} The array of unique posts
 */
function removeDuplicates(posts) {
  const uniqueUrls = new Set();
  return posts.filter((post) => {
    if (!uniqueUrls.has(post.url)) {
      uniqueUrls.add(post.url);
      return true;
    }
    return false;
  });
}

/**
 * Downloads an image from a URL and saves it to a file
 * @param {string} url - The URL of the image to download
 * @param {string} outputPath - The path where the image should be saved
 * @returns {Promise<string>} The path where the image was saved
 */
async function downloadImage(url, outputPath) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.writeFile(outputPath, buffer);
  console.log(`Image downloaded: ${outputPath}`);
  return outputPath;
}

/**
 * Fetches blog posts from the Mirror blog
 * @param {string} blogUrl - The URL of the Mirror blog
 * @returns {Promise<MirrorPost[]>} An array of fetched blog posts
 */
async function fetchMirrorBlog(blogUrl) {
  try {
    const response = await fetch(blogUrl);
    const html = await response.text();

    const dom = new JSDOM(html);
    const document = dom.window.document;

    /** @type {NodeListOf<Element>} */
    const postElements = document.querySelectorAll('div[class*="bc5nci6t"]');
    console.log('Number of post elements found:', postElements.length);

    if (postElements.length === 0) {
      console.error('No post elements found. DOM structure might have changed.');
      return [];
    }

    /** @type {MirrorPost[]} */
    const posts = [];

    for (const [index, postElement] of Array.from(postElements).entries()) {
      const titleElement = postElement.querySelector('h4');
      const linkElement = postElement.querySelector('a[href^="https://base.mirror.xyz/"]');
      const imageElement = postElement.querySelector('img[alt="Card Header"]');

      if (titleElement && linkElement && imageElement) {
        const title = titleElement.textContent?.trim() || '';
        const unsanitizedUrl = linkElement.getAttribute('href') || '';
        const url = sanitizePostUrl(unsanitizedUrl);
        const imageUrl = await sanitizeImageUrl(imageElement.getAttribute('src') || '');

        if (url) {
          posts.push({ title, url, imageUrl, publicImagePath: '' });
        } else {
          console.error(`Invalid URL for post ${index + 1}`);
        }
      } else {
        console.error(`Missing elements for post ${index + 1}`);
      }
    }

    const uniquePosts = removeDuplicates(posts);
    console.log('Number of unique posts:', uniquePosts.length);

    return uniquePosts;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return [];
  }
}

/**
 * Main function to fetch blog posts, download images, and save results
 */
async function main() {
  const blogUrl = 'https://base.mirror.xyz/';
  const posts = await fetchMirrorBlog(blogUrl);

  // Ensure the images directory exists
  await fs.mkdir(path.join('public', 'images', 'blog'), { recursive: true });

  // Download images for unique posts
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const sanitizedTitle = sanitizeFilename(post.title);
    const fileName = `${sanitizedTitle}-cover.png`;

    const publicImagePath = path.join('public', 'images', 'blog', fileName);
    await downloadImage(post.imageUrl, publicImagePath);
    post.publicImagePath = publicImagePath.replace('public', '');
  }

  // Save the results as JSON
  await fs.writeFile('scripts/blog_posts.json', JSON.stringify(posts, null, 2));

  console.log('Blog posts fetched, images saved, and results stored in blog_posts.json');
}

main().catch(console.error);
