import * as fs from 'fs';
import * as path from 'path';

export type EcosystemApp = {
  name: string;
  description: string;
  url: string;
  imageUrl: string;
  category: string;
  subcategory: string;
};

function validateApp(app: unknown): app is EcosystemApp {
  if (!app || typeof app !== 'object') return false;

  const requiredFields: (keyof EcosystemApp)[] = [
    'name',
    'description',
    'url',
    'imageUrl',
    'category',
    'subcategory',
  ];

  return requiredFields.every((field) => {
    const typedApp = app as Record<string, unknown>;
    return field in typedApp && typeof typedApp[field] === 'string';
  });
}

export function generateEcosystem(): boolean {
  const ecosystemDir = path.join(process.cwd(), 'src/data/ecosystem');
  const outputFile = path.join(process.cwd(), 'src/data/ecosystem.json');

  try {
    const apps = fs
      .readdirSync(ecosystemDir)
      .filter((file) => fs.statSync(path.join(ecosystemDir, file)).isDirectory())
      .map((dir) => {
        const metadataPath = path.join(ecosystemDir, dir, 'metadata.json');
        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8')) as unknown;

        if (!validateApp(metadata)) {
          throw new Error(`Invalid metadata format in ${metadataPath}`);
        }

        return metadata;
      });

    fs.writeFileSync(outputFile, JSON.stringify(apps, null, 2) + '\n');
    console.log('Ecosystem file generated successfully!');
    return true;
  } catch (error) {
    console.error('Error generating ecosystem file:', error);
    return false;
  }
}

// For backwards compatibility with CLI usage
if (require.main === module) {
  process.exit(generateEcosystem() ? 0 : 1);
}
