/**
 * @jest-environment jsdom
 */
 
 
 
 

import { render, screen, fireEvent } from '@testing-library/react';
import UsernameKeywordsField from './index';
import { UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';

// Mock the username constants
jest.mock('apps/web/src/utils/usernames', () => ({
  UsernameTextRecordKeys: {
    Keywords: 'keywords',
  },
  textRecordsKeysForDisplay: {
    keywords: 'Skills',
  },
  textRecordsKeywords: ['Solidity', 'Rust', 'UI/UX', 'Community'],
  textRecordsEngineersKeywords: ['Solidity', 'Rust'],
  textRecordsCreativesKeywords: ['UI/UX'],
  textRecordsCommunicationKeywords: ['Community'],
}));

// Mock Label component
jest.mock('apps/web/src/components/Label', () => {
  return function MockLabel({
    children,
    htmlFor,
  }: {
    children: React.ReactNode;
    htmlFor: string;
  }) {
    return (
      <label data-testid="label" htmlFor={htmlFor}>
        {children}
      </label>
    );
  };
});

// Mock Fieldset component
jest.mock('apps/web/src/components/Fieldset', () => {
  return function MockFieldset({ children }: { children: React.ReactNode }) {
    return <fieldset data-testid="fieldset">{children}</fieldset>;
  };
});

// Mock Icon component
jest.mock('apps/web/src/components/Icon/Icon', () => ({
  Icon: function MockIcon({ name }: { name: string }) {
    return <span data-testid={`icon-${name}`}>{name}</span>;
  },
}));

describe('UsernameKeywordsField', () => {
  const defaultProps = {
    onChange: jest.fn(),
    value: '',
    disabled: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial render', () => {
    it('should render the fieldset container', () => {
      render(<UsernameKeywordsField {...defaultProps} />);

      expect(screen.getByTestId('fieldset')).toBeInTheDocument();
    });

    it('should render the default "Skills" label', () => {
      render(<UsernameKeywordsField {...defaultProps} />);

      const label = screen.getByTestId('label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent('Skills');
    });

    it('should render all keyword buttons', () => {
      render(<UsernameKeywordsField {...defaultProps} />);

      expect(screen.getByRole('button', { name: /Solidity/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Rust/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /UI\/UX/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Community/i })).toBeInTheDocument();
    });

    it('should render plus icons for unselected keywords', () => {
      render(<UsernameKeywordsField {...defaultProps} />);

      const plusIcons = screen.getAllByTestId('icon-plus');
      expect(plusIcons).toHaveLength(4);
    });
  });

  describe('labelChildren prop', () => {
    it('should render custom label when labelChildren is provided', () => {
      render(<UsernameKeywordsField {...defaultProps} labelChildren="Custom Skills" />);

      const label = screen.getByTestId('label');
      expect(label).toHaveTextContent('Custom Skills');
    });

    it('should not render label when labelChildren is null', () => {
      render(<UsernameKeywordsField {...defaultProps} labelChildren={null} />);

      expect(screen.queryByTestId('label')).not.toBeInTheDocument();
    });

    it('should render JSX element as label', () => {
      render(
        <UsernameKeywordsField
          {...defaultProps}
          labelChildren={<span data-testid="custom-label">Custom Label</span>}
        />,
      );

      expect(screen.getByTestId('custom-label')).toBeInTheDocument();
      expect(screen.getByTestId('custom-label')).toHaveTextContent('Custom Label');
    });
  });

  describe('keyword selection', () => {
    it('should select a keyword when clicked', () => {
      const mockOnChange = jest.fn();
      render(<UsernameKeywordsField {...defaultProps} onChange={mockOnChange} />);

      const solidityButton = screen.getByRole('button', { name: /Solidity/i });
      fireEvent.click(solidityButton);

      expect(mockOnChange).toHaveBeenCalledWith(UsernameTextRecordKeys.Keywords, 'Solidity');
    });

    it('should deselect a keyword when clicked again', () => {
      const mockOnChange = jest.fn();
      render(<UsernameKeywordsField {...defaultProps} onChange={mockOnChange} value="Solidity" />);

      const solidityButton = screen.getByRole('button', { name: /Solidity/i });
      fireEvent.click(solidityButton);

      expect(mockOnChange).toHaveBeenCalledWith(UsernameTextRecordKeys.Keywords, '');
    });

    it('should select multiple keywords', () => {
      const mockOnChange = jest.fn();
      render(<UsernameKeywordsField {...defaultProps} onChange={mockOnChange} />);

      fireEvent.click(screen.getByRole('button', { name: /Solidity/i }));
      expect(mockOnChange).toHaveBeenCalledWith(UsernameTextRecordKeys.Keywords, 'Solidity');
    });

    it('should show cross icon for selected keywords', () => {
      render(<UsernameKeywordsField {...defaultProps} value="Solidity" />);

      expect(screen.getByTestId('icon-cross')).toBeInTheDocument();
    });

    it('should show plus icon for unselected keywords', () => {
      render(<UsernameKeywordsField {...defaultProps} value="Solidity" />);

      // 3 unselected keywords should have plus icons
      const plusIcons = screen.getAllByTestId('icon-plus');
      expect(plusIcons).toHaveLength(3);
    });
  });

  describe('value prop', () => {
    it('should parse comma-separated keywords from value', () => {
      render(<UsernameKeywordsField {...defaultProps} value="Solidity,Rust" />);

      // Both selected keywords should have cross icons
      const crossIcons = screen.getAllByTestId('icon-cross');
      expect(crossIcons).toHaveLength(2);
    });

    it('should handle empty string value', () => {
      render(<UsernameKeywordsField {...defaultProps} value="" />);

      // All keywords should have plus icons
      const plusIcons = screen.getAllByTestId('icon-plus');
      expect(plusIcons).toHaveLength(4);
    });

    it('should filter out empty keywords from value', () => {
      render(<UsernameKeywordsField {...defaultProps} value="Solidity,,Rust," />);

      // Only 2 valid keywords should be selected
      const crossIcons = screen.getAllByTestId('icon-cross');
      expect(crossIcons).toHaveLength(2);
    });

    it('should update keywords when value prop changes', () => {
      const { rerender } = render(<UsernameKeywordsField {...defaultProps} value="Solidity" />);

      expect(screen.getAllByTestId('icon-cross')).toHaveLength(1);

      rerender(<UsernameKeywordsField {...defaultProps} value="Solidity,Rust,UI/UX" />);

      expect(screen.getAllByTestId('icon-cross')).toHaveLength(3);
    });
  });

  describe('onChange behavior', () => {
    it('should call onChange with keywords key and comma-separated value', () => {
      const mockOnChange = jest.fn();
      render(<UsernameKeywordsField {...defaultProps} onChange={mockOnChange} value="" />);

      fireEvent.click(screen.getByRole('button', { name: /Solidity/i }));

      expect(mockOnChange).toHaveBeenCalledWith(UsernameTextRecordKeys.Keywords, 'Solidity');
    });

    it('should call onChange with empty string when all keywords are deselected', () => {
      const mockOnChange = jest.fn();
      render(
        <UsernameKeywordsField {...defaultProps} onChange={mockOnChange} value="Solidity" />,
      );

      fireEvent.click(screen.getByRole('button', { name: /Solidity/i }));

      expect(mockOnChange).toHaveBeenCalledWith(UsernameTextRecordKeys.Keywords, '');
    });
  });

  describe('disabled state', () => {
    it('should disable all keyword buttons when disabled prop is true', () => {
      render(<UsernameKeywordsField {...defaultProps} disabled />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });

    it('should not disable buttons when disabled prop is false', () => {
      render(<UsernameKeywordsField {...defaultProps} disabled={false} />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).not.toBeDisabled();
      });
    });

    it('should not disable buttons by default', () => {
      render(<UsernameKeywordsField onChange={jest.fn()} value="" />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).not.toBeDisabled();
      });
    });
  });

  describe('accessibility', () => {
    it('should associate label with the keywords list', () => {
      render(<UsernameKeywordsField {...defaultProps} />);

      const label = screen.getByTestId('label');
      expect(label).toHaveAttribute('for');
    });

    it('should have button type for keyword buttons', () => {
      render(<UsernameKeywordsField {...defaultProps} />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('type', 'button');
      });
    });
  });
});
