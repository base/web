import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button, ButtonVariants, ButtonSizes } from './Button';

expect.extend(toHaveNoViolations);

describe('Button Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes when loading', async () => {
    const { container, getByRole } = render(<Button isLoading>Loading</Button>);
    const button = getByRole('button');

    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveAttribute('aria-disabled', 'true');

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes when disabled', async () => {
    const { container, getByRole } = render(<Button disabled>Disabled</Button>);
    const button = getByRole('button');

    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toBeDisabled();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have loading status with proper role and label', () => {
    const { getByRole } = render(<Button isLoading>Loading</Button>);
    const status = getByRole('status');

    expect(status).toHaveAttribute('aria-label', 'Loading');
  });

  it('should have focus visible styles', () => {
    const { container } = render(<Button>Focus Test</Button>);
    const button = container.querySelector('button');

    expect(button?.className).toContain('focus-visible:outline');
  });

  it('should work with all button variants', async () => {
    const variants = Object.values(ButtonVariants);

    for (const variant of variants) {
      const { container, unmount } = render(<Button variant={variant}>Test</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      unmount();
    }
  });

  it('should work with all button sizes', async () => {
    const sizes = Object.values(ButtonSizes);

    for (const size of sizes) {
      const { container, unmount } = render(<Button size={size}>Test</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      unmount();
    }
  });

  it('should be keyboard accessible', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Button onClick={handleClick}>Click me</Button>);
    const button = getByRole('button');

    // Simulate keyboard interaction
    button.focus();
    expect(document.activeElement).toBe(button);
  });
});
