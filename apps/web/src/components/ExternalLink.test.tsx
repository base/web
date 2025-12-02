import * as React from 'react';
import { render, screen } from '@testing-library/react';
import ExternalLink from '../ExternalLink';

describe('ExternalLink', () => {
  test('external link: _blank by default, rel merged, aria-label auto with new tab note, icon shown', () => {
    render(
      <ExternalLink href="https://example.com" name="Example">
        Example
      </ExternalLink>
    );
    const link = screen.getByRole('link', { name: /visit example \(opens in new tab\)/i });

    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link.getAttribute('rel')?.split(' ')).toEqual(
      expect.arrayContaining(['noopener', 'noreferrer'])
    );

    // Иконка декоративная, но символ в дереве есть
    expect(screen.getByText('↗︎')).toBeInTheDocument();
  });

  test('internal link: no target, no rel, aria-label auto without new tab note, no icon', () => {
    render(<ExternalLink href="/docs">Docs</ExternalLink>);
    const link = screen.getByRole('link', { name: /visit docs/i });

    expect(link).toHaveAttribute('href', '/docs');
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');

    // Иконки быть не должно
    expect(screen.queryByText('↗︎')).toBeNull();
  });

  test('explicit aria-label has priority', () => {
    render(
      <ExternalLink href="https://example.com" aria-label="Custom label">
        Example
      </ExternalLink>
    );
    const link = screen.getByRole('link', { name: 'Custom label' });
    expect(link).toBeInTheDocument();
  });

  test('explicit target has priority over auto logic', () => {
    render(
      <ExternalLink href="https://example.com" target="_self">
        Example
      </ExternalLink>
    );
    const link = screen.getByRole('link', { name: /visit example/i });
    expect(link).toHaveAttribute('target', '_self');
    // rel не навешивается если не _blank
    expect(link).not.toHaveAttribute('rel');
  });

  test('openExternalInNewTab={false} disables _blank but keeps icon (auto)', () => {
    render(
      <ExternalLink href="https://example.com" openExternalInNewTab={false}>
        Example
      </ExternalLink>
    );
    const link = screen.getByRole('link', { name: /visit example/i });
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
    // По умолчанию showIcon="auto" → для внешних показываем иконку
    expect(screen.getByText('↗︎')).toBeInTheDocument();
  });

  test('rel is merged with user-provided tokens', () => {
    render(
      <ExternalLink href="https://example.com" rel="nofollow">
        Example
      </ExternalLink>
    );
    const link = screen.getByRole('link', { name: /visit example \(opens in new tab\)/i });
    const rel = link.getAttribute('rel')!;
    // Должны присутствовать все токены
    expect(rel.split(' ')).toEqual(
      expect.arrayContaining(['nofollow', 'noopener', 'noreferrer'])
    );
  });

  test('internalDomains treat subdomains as internal', () => {
    render(
      <ExternalLink href="https://docs.example.com/guide" internalDomains={['example.com']}>
        Docs
      </ExternalLink>
    );
    const link = screen.getByRole('link', { name: /visit docs/i });
    // Не должно быть _blank и rel
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  });

  test('protocol-relative external URL handled correctly', () => {
    render(<ExternalLink href="//example.com/page">Example</ExternalLink>);
    const link = screen.getByRole('link', { name: /visit example \(opens in new tab\)/i });
    expect(link).toHaveAttribute('target', '_blank');
  });
});
