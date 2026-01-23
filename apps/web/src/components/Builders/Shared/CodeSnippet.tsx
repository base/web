'use client';

import { useEffect, useMemo, useState } from 'react';

export function CodeSnippet({ code }: { code: string }) {
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    // Only run on the client side
    if (typeof window !== 'undefined') {
      async function highlightCode() {
        const { createHighlighter } = await import('shiki');

        const highlighter = await createHighlighter({
          themes: ['github-light', 'github-dark'],
          langs: ['tsx'],
        });

        const formattedCode = highlighter.codeToHtml(code, {
          lang: 'tsx',
          themes: {
            light: 'github-light',
            dark: 'github-dark',
          },
          defaultColor: false,
        });

        // Remove Shiki formatting
        const cleanedCode = formattedCode.replace(
          /<pre[^>]*class="([^"]*)"[^>]*>/,
          (_match: string, className: string) =>
            `<pre class="${className}" style="margin: 0; padding: 0; background: transparent">`,
        );

        setHighlightedCode(cleanedCode);
      }

      void highlightCode();
    }
  }, [code]);

  const htmlContent = useMemo(() => ({ __html: highlightedCode }), [highlightedCode]);

  if (!highlightedCode) {
    return (
      <div className="h-full overflow-auto rounded-lg transition-colors">
        <div className="text-dark-palette-foregroundMuted">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="code-snippet h-full overflow-auto rounded-lg transition-colors ligatures-none"
      // eslint-disable-next-line react/no-danger -- necessary for shiki
      dangerouslySetInnerHTML={htmlContent}
    />
  );
}
