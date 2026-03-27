import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { VisuallyHidden, LiveRegion } from './VisuallyHidden';

expect.extend(toHaveNoViolations);

describe('VisuallyHidden', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<VisuallyHidden>Hidden content</VisuallyHidden>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should render content in the DOM but visually hidden', () => {
    const { getByText } = render(<VisuallyHidden>Screen reader only</VisuallyHidden>);
    const element = getByText('Screen reader only');

    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('SPAN');
  });

  it('should have sr-only class equivalent styles', () => {
    const { container } = render(<VisuallyHidden>Test</VisuallyHidden>);
    const span = container.querySelector('span');

    const styles = window.getComputedStyle(span as Element);
    expect(styles.position).toBe('absolute');
  });
});

describe('LiveRegion', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<LiveRegion>Status message</LiveRegion>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes for polite announcements', () => {
    const { getByRole } = render(<LiveRegion>Update successful</LiveRegion>);
    const status = getByRole('status');

    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveAttribute('aria-atomic', 'true');
  });

  it('should have proper ARIA attributes for assertive announcements', () => {
    const { container } = render(<LiveRegion assertive>Critical error!</LiveRegion>);
    const region = container.querySelector('[aria-live="assertive"]');

    expect(region).toBeInTheDocument();
    expect(region).toHaveAttribute('aria-atomic', 'true');
  });

  it('should not render when children is empty', () => {
    const { container } = render(<LiveRegion>{null}</LiveRegion>);
    expect(container.firstChild).toBeNull();
  });

  it('should conditionally render status messages', () => {
    const { rerender, queryByRole } = render(<LiveRegion>{false && 'Hidden'}</LiveRegion>);
    expect(queryByRole('status')).not.toBeInTheDocument();

    rerender(<LiveRegion>{true && 'Visible'}</LiveRegion>);
    expect(queryByRole('status')).toBeInTheDocument();
  });
});
