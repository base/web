// @ts-check
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

type RedirectRule = {
  source: string;
  destination: string;
  statusCode?: number;
};

type ServeConfig = {
  rewrites: RedirectRule[];
  redirects: RedirectRule[];
};

type FailedUrl = {
  source: string;
  destination: string;
  fullUrl: string;
  statusCode?: number;
};

async function checkUrl(url: string): Promise<{ exists: boolean; statusCode?: number }> {
  if (!url || typeof url !== 'string') {
    console.error('Invalid URL provided:', url);
    return { exists: false };
  }

  try {
    const response = await fetch(`https://docs.base.org${url}`);
    return { exists: response.status === 200, statusCode: response.status };
  } catch (err) {
    const error = err as Error;
    console.error(`Error checking ${url}:`, error.message);
    return { exists: false };
  }
}

function exportToCsv(failedUrls: FailedUrl[], outputPath: string): void {
  const csvHeader = 'Source,Destination,Full URL,Status Code\n';
  const csvRows = failedUrls
    .map(
      (url) => `"${url.source}","${url.destination}","${url.fullUrl}",${url.statusCode || 'N/A'}`,
    )
    .join('\n');

  fs.writeFileSync(outputPath, csvHeader + csvRows);
  console.log(`\nFailed URLs exported to: ${outputPath}`);
}

async function main(): Promise<void> {
  try {
    // Read serve.json
    const serveConfigPath = path.join(__dirname, '../docs/public/serve.json');
    const rawConfig = fs.readFileSync(serveConfigPath, 'utf8');
    const serveConfig = JSON.parse(rawConfig) as ServeConfig;

    const failedUrls: FailedUrl[] = [];
    let checked = 0;
    const total = serveConfig.redirects.length;

    console.log(`Found ${total} redirects to check`);
    console.log('\nChecking URLs...\n');

    // Check each redirect
    for (const rule of serveConfig.redirects) {
      checked++;
      process.stdout.write(
        `Progress: ${checked}/${total} (${Math.round((checked / total) * 100)}%)\r`,
      );

      const { exists, statusCode } = await checkUrl(rule.destination);
      if (!exists) {
        failedUrls.push({
          source: rule.source,
          destination: rule.destination,
          fullUrl: `https://docs.base.org${rule.destination}`,
          statusCode,
        });
      }
    }

    console.log('\n\nResults:');
    console.log('--------');
    console.log(`Total redirects checked: ${total}`);
    console.log(`Failed URLs: ${failedUrls.length}`);

    if (failedUrls.length > 0) {
      // Export to CSV
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const outputPath = path.join(__dirname, `failed-redirects-${timestamp}.csv`);
      exportToCsv(failedUrls, outputPath);

      console.log('\nFailed URLs:');
      failedUrls.forEach((url) => {
        console.log(`- ${url.source} → ${url.destination} (${url.statusCode || 'Error'})`);
      });
      process.exit(1);
    } else {
      console.log('\nAll URLs are valid! 🎉');
      process.exit(0);
    }
  } catch (err) {
    const error = err as Error;
    console.error('Script failed:', error.message);
    process.exit(1);
  }
}

main().catch((err) => {
  const error = err as Error;
  console.error('Unhandled error:', error.message);
  process.exit(1);
});
