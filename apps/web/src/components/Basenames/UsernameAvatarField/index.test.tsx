/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/function-component-definition */
/* eslint-disable @next/next/no-img-element */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UsernameAvatarField from './index';
import { UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';

// Mock URL.createObjectURL
const mockCreateObjectURL = jest.fn();
global.URL.createObjectURL = mockCreateObjectURL;

// Mock utility functions
const mockValidateBasenameAvatarFile = jest.fn();
const mockValidateBasenameAvatarUrl = jest.fn();
const mockGetBasenameAvatarUrl = jest.fn();
const mockGetBasenameImage = jest.fn();

jest.mock('apps/web/src/utils/usernames', () => ({
  UsernameTextRecordKeys: {
    Avatar: 'avatar',
    Description: 'description',
    Keywords: 'keywords',
  },
  validateBasenameAvatarFile: (...args: unknown[]) => mockValidateBasenameAvatarFile(...args),
  validateBasenameAvatarUrl: (...args: unknown[]) => mockValidateBasenameAvatarUrl(...args),
  getBasenameAvatarUrl: (...args: unknown[]) => mockGetBasenameAvatarUrl(...args),
  getBasenameImage: (...args: unknown[]) => mockGetBasenameImage(...args),
}));

// Mock ImageWithLoading component
jest.mock('apps/web/src/components/ImageWithLoading', () => {
  return function MockImageWithLoading({
    src,
    alt,
  }: {
    src: string;
    alt: string;
  }) {
    return <img data-testid="image-with-loading" src={typeof src === 'string' ? src : 'mock-image'} alt={alt} />;
  };
});

// Mock Fieldset component
jest.mock('apps/web/src/components/Fieldset', () => {
  return function MockFieldset({ children }: { children: React.ReactNode }) {
    return <fieldset data-testid="fieldset">{children}</fieldset>;
  };
});

// Mock FileInput component
jest.mock('apps/web/src/components/FileInput', () => {
  const { forwardRef } = jest.requireActual('react');
  return forwardRef(function MockFileInput(
    {
      onChange,
      disabled,
      id,
      className,
    }: {
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
      disabled: boolean;
      id: string;
      className: string;
    },
    ref: React.Ref<HTMLInputElement>
  ) {
    return (
      <input
        type="file"
        data-testid="file-input"
        ref={ref}
        onChange={onChange}
        disabled={disabled}
        id={id}
        className={className}
      />
    );
  });
});

// Mock Input component
jest.mock('apps/web/src/components/Input', () => {
  return function MockInput({
    type,
    value,
    placeholder,
    onChange,
    className,
  }: {
    type: string;
    value: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className: string;
  }) {
    return (
      <input
        type={type}
        data-testid="url-input"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={className}
      />
    );
  };
});

// Mock Hint component
jest.mock('apps/web/src/components/Hint', () => {
  const MockHint = function MockHint({
    children,
    variant,
  }: {
    children: React.ReactNode;
    variant: string;
  }) {
    return (
      <div data-testid="hint" data-variant={variant}>
        {children}
      </div>
    );
  };
  return {
    __esModule: true,
    default: MockHint,
    HintVariants: {
      Error: 'error',
      Muted: 'muted',
    },
  };
});

// Mock Dropdown components
jest.mock('apps/web/src/components/Dropdown', () => {
  return function MockDropdown({ children }: { children: React.ReactNode }) {
    return <div data-testid="dropdown">{children}</div>;
  };
});

jest.mock('apps/web/src/components/DropdownToggle', () => {
  return function MockDropdownToggle({ children }: { children: React.ReactNode }) {
    return <div data-testid="dropdown-toggle">{children}</div>;
  };
});

jest.mock('apps/web/src/components/DropdownMenu', () => {
  const MockDropdownMenu = function ({ children }: { children: React.ReactNode }) {
    return <div data-testid="dropdown-menu">{children}</div>;
  };
  return {
    __esModule: true,
    default: MockDropdownMenu,
    DropdownMenuAlign: {
      Center: 'center',
    },
  };
});

jest.mock('apps/web/src/components/DropdownItem', () => {
  return function MockDropdownItem({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) {
    return (
      <button type="button" data-testid="dropdown-item" onClick={onClick}>
        {children}
      </button>
    );
  };
});

// Mock cameraIcon
jest.mock('./cameraIcon.svg', () => ({
  default: { src: '/mock-camera-icon.svg', height: 24, width: 24 },
}));

describe('UsernameAvatarField', () => {
  const defaultProps = {
    onChangeFile: jest.fn(),
    onChange: jest.fn(),
    currentAvatarUrl: '',
    disabled: false,
    username: 'testuser',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateObjectURL.mockReturnValue('blob:mock-url');
    mockGetBasenameImage.mockReturnValue({ src: '/default-image.png' });
    mockGetBasenameAvatarUrl.mockReturnValue(undefined);
    mockValidateBasenameAvatarFile.mockReturnValue({ valid: true, message: '' });
    mockValidateBasenameAvatarUrl.mockReturnValue({ valid: true, message: 'Valid URL' });
  });

  describe('initial render', () => {
    it('should render the avatar image with username as alt text', () => {
      render(<UsernameAvatarField {...defaultProps} />);

      const images = screen.getAllByTestId('image-with-loading');
      const avatarImage = images.find((img) => img.getAttribute('alt') === 'testuser');
      expect(avatarImage).toBeInTheDocument();
      expect(avatarImage).toHaveAttribute('alt', 'testuser');
    });

    it('should render the file input', () => {
      render(<UsernameAvatarField {...defaultProps} />);

      expect(screen.getByTestId('file-input')).toBeInTheDocument();
    });

    it('should render the dropdown with avatar options', () => {
      render(<UsernameAvatarField {...defaultProps} />);

      expect(screen.getByTestId('dropdown')).toBeInTheDocument();
      expect(screen.getByTestId('dropdown-toggle')).toBeInTheDocument();
      expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
    });

    it('should render three dropdown items for avatar options', () => {
      render(<UsernameAvatarField {...defaultProps} />);

      const items = screen.getAllByTestId('dropdown-item');
      expect(items).toHaveLength(3);
      expect(items[0]).toHaveTextContent('Upload File');
      expect(items[1]).toHaveTextContent('Use IPFS URL');
      expect(items[2]).toHaveTextContent('Use default avatar');
    });

    it('should not render URL input initially', () => {
      render(<UsernameAvatarField {...defaultProps} />);

      expect(screen.queryByTestId('url-input')).not.toBeInTheDocument();
    });

    it('should not render error hint initially', () => {
      render(<UsernameAvatarField {...defaultProps} />);

      expect(screen.queryByTestId('hint')).not.toBeInTheDocument();
    });
  });

  describe('disabled state', () => {
    it('should disable file input when disabled prop is true', () => {
      render(<UsernameAvatarField {...defaultProps} disabled />);

      expect(screen.getByTestId('file-input')).toBeDisabled();
    });
  });

  describe('file upload functionality', () => {
    it('should call onChangeFile with valid file when file is selected', async () => {
      mockValidateBasenameAvatarFile.mockReturnValue({ valid: true, message: '' });

      render(<UsernameAvatarField {...defaultProps} />);

      const file = new File(['test'], 'test.png', { type: 'image/png' });
      const fileInput = screen.getByTestId('file-input');

      fireEvent.change(fileInput, { target: { files: [file] } });

      await waitFor(() => {
        expect(mockValidateBasenameAvatarFile).toHaveBeenCalledWith(file);
        expect(defaultProps.onChangeFile).toHaveBeenCalledWith(file);
      });
    });

    it('should call onChangeFile with undefined and show error when file is invalid', async () => {
      mockValidateBasenameAvatarFile.mockReturnValue({
        valid: false,
        message: 'Only supported image are PNG, SVG, JPEG & WebP',
      });

      render(<UsernameAvatarField {...defaultProps} />);

      const file = new File(['test'], 'test.gif', { type: 'image/gif' });
      const fileInput = screen.getByTestId('file-input');

      fireEvent.change(fileInput, { target: { files: [file] } });

      await waitFor(() => {
        expect(defaultProps.onChangeFile).toHaveBeenCalledWith(undefined);
        const hint = screen.getByTestId('hint');
        expect(hint).toHaveTextContent('Only supported image are PNG, SVG, JPEG & WebP');
      });
    });

    it('should not process file if no files are selected', () => {
      render(<UsernameAvatarField {...defaultProps} />);

      const fileInput = screen.getByTestId('file-input');
      fireEvent.change(fileInput, { target: { files: null } });

      expect(mockValidateBasenameAvatarFile).not.toHaveBeenCalled();
    });

    it('should not process file if files array is empty', () => {
      render(<UsernameAvatarField {...defaultProps} />);

      const fileInput = screen.getByTestId('file-input');
      fireEvent.change(fileInput, { target: { files: [] } });

      expect(mockValidateBasenameAvatarFile).not.toHaveBeenCalled();
    });
  });

  describe('URL input functionality', () => {
    it('should show URL input when "Use IPFS URL" is clicked', () => {
      render(<UsernameAvatarField {...defaultProps} />);

      const items = screen.getAllByTestId('dropdown-item');
      const ipfsUrlItem = items[1];
      fireEvent.click(ipfsUrlItem);

      expect(screen.getByTestId('url-input')).toBeInTheDocument();
      expect(screen.getByTestId('url-input')).toHaveAttribute('placeholder', 'ipfs://...');
    });

    it('should call onChange with valid URL', async () => {
      mockValidateBasenameAvatarUrl.mockReturnValue({ valid: true, message: 'Valid IPFS URL' });

      render(<UsernameAvatarField {...defaultProps} />);

      // Show URL input
      const items = screen.getAllByTestId('dropdown-item');
      fireEvent.click(items[1]);

      const urlInput = screen.getByTestId('url-input');
      fireEvent.change(urlInput, { target: { value: 'ipfs://QmTest123' } });

      await waitFor(() => {
        expect(mockValidateBasenameAvatarUrl).toHaveBeenCalledWith('ipfs://QmTest123');
        expect(defaultProps.onChange).toHaveBeenCalledWith(
          UsernameTextRecordKeys.Avatar,
          'ipfs://QmTest123'
        );
      });
    });

    it('should show error and not update onChange with invalid URL', async () => {
      mockValidateBasenameAvatarUrl.mockReturnValue({ valid: false, message: 'Invalid IPFS URL' });

      render(<UsernameAvatarField {...defaultProps} currentAvatarUrl="previous-url" />);

      // Show URL input
      const items = screen.getAllByTestId('dropdown-item');
      fireEvent.click(items[1]);

      const urlInput = screen.getByTestId('url-input');
      fireEvent.change(urlInput, { target: { value: 'invalid-url' } });

      await waitFor(() => {
        expect(defaultProps.onChange).toHaveBeenCalledWith(
          UsernameTextRecordKeys.Avatar,
          'previous-url'
        );
        const hint = screen.getByTestId('hint');
        expect(hint).toHaveTextContent('Invalid IPFS URL');
      });
    });

    it('should not validate empty URL', async () => {
      render(<UsernameAvatarField {...defaultProps} />);

      // Show URL input
      const items = screen.getAllByTestId('dropdown-item');
      fireEvent.click(items[1]);

      const urlInput = screen.getByTestId('url-input');
      fireEvent.change(urlInput, { target: { value: '' } });

      await waitFor(() => {
        expect(mockValidateBasenameAvatarUrl).not.toHaveBeenCalled();
      });
    });
  });

  describe('dropdown actions', () => {
    it('should hide URL input and clear error when "Upload File" is clicked', () => {
      render(<UsernameAvatarField {...defaultProps} />);

      // First show URL input
      const items = screen.getAllByTestId('dropdown-item');
      fireEvent.click(items[1]);
      expect(screen.getByTestId('url-input')).toBeInTheDocument();

      // Then click Upload File
      fireEvent.click(items[0]);
      expect(screen.queryByTestId('url-input')).not.toBeInTheDocument();
    });

    it('should reset to default avatar when "Use default avatar" is clicked', () => {
      render(<UsernameAvatarField {...defaultProps} />);

      const items = screen.getAllByTestId('dropdown-item');
      const defaultAvatarItem = items[2];
      fireEvent.click(defaultAvatarItem);

      expect(defaultProps.onChange).toHaveBeenCalledWith(UsernameTextRecordKeys.Avatar, '');
    });

    it('should clear file when "Use IPFS URL" is clicked', async () => {
      mockValidateBasenameAvatarFile.mockReturnValue({ valid: true, message: '' });

      render(<UsernameAvatarField {...defaultProps} />);

      // First upload a file
      const file = new File(['test'], 'test.png', { type: 'image/png' });
      const fileInput = screen.getByTestId('file-input');
      fireEvent.change(fileInput, { target: { files: [file] } });

      await waitFor(() => {
        expect(defaultProps.onChangeFile).toHaveBeenCalledWith(file);
      });

      // Reset mock to track new calls
      defaultProps.onChangeFile.mockClear();

      // Then click Use IPFS URL - this should clear the file
      const items = screen.getAllByTestId('dropdown-item');
      fireEvent.click(items[1]);

      // File should have been cleared (avatarFile set to undefined)
      expect(screen.getByTestId('url-input')).toBeInTheDocument();
    });
  });

  describe('avatar image source selection', () => {
    it('should use file URL when valid file is uploaded', async () => {
      mockValidateBasenameAvatarFile.mockReturnValue({ valid: true, message: '' });
      mockCreateObjectURL.mockReturnValue('blob:test-file-url');

      render(<UsernameAvatarField {...defaultProps} />);

      const file = new File(['test'], 'test.png', { type: 'image/png' });
      const fileInput = screen.getByTestId('file-input');
      fireEvent.change(fileInput, { target: { files: [file] } });

      await waitFor(() => {
        const images = screen.getAllByTestId('image-with-loading');
        const avatarImage = images.find((img) => img.getAttribute('alt') === 'testuser');
        expect(avatarImage).toHaveAttribute('src', 'blob:test-file-url');
      });
    });

    it('should use URL when valid URL is entered', async () => {
      mockValidateBasenameAvatarUrl.mockReturnValue({ valid: true, message: 'Valid URL' });
      mockGetBasenameAvatarUrl.mockReturnValue('https://ipfs.io/ipfs/QmTest123');

      render(<UsernameAvatarField {...defaultProps} />);

      // Show URL input and enter URL
      const items = screen.getAllByTestId('dropdown-item');
      fireEvent.click(items[1]);

      const urlInput = screen.getByTestId('url-input');
      fireEvent.change(urlInput, { target: { value: 'ipfs://QmTest123' } });

      await waitFor(() => {
        const images = screen.getAllByTestId('image-with-loading');
        const avatarImage = images.find((img) => img.getAttribute('alt') === 'testuser');
        expect(avatarImage).toHaveAttribute('src', 'https://ipfs.io/ipfs/QmTest123');
      });
    });

    it('should use current avatar URL when provided', () => {
      mockGetBasenameAvatarUrl.mockImplementation((url: string) =>
        url ? `https://gateway.com/${url}` : undefined
      );

      render(<UsernameAvatarField {...defaultProps} currentAvatarUrl="current-avatar" />);

      const images = screen.getAllByTestId('image-with-loading');
      const avatarImage = images.find((img) => img.getAttribute('alt') === 'testuser');
      expect(avatarImage).toHaveAttribute('src', 'https://gateway.com/current-avatar');
    });

    it('should use default image when no avatar is set', () => {
      mockGetBasenameImage.mockReturnValue({ src: '/default-profile.png' });
      mockGetBasenameAvatarUrl.mockReturnValue(undefined);

      render(<UsernameAvatarField {...defaultProps} />);

      expect(mockGetBasenameImage).toHaveBeenCalledWith('testuser');
    });
  });

  describe('error handling', () => {
    it('should clear error when switching to URL input', async () => {
      mockValidateBasenameAvatarFile.mockReturnValue({
        valid: false,
        message: 'Invalid file',
      });

      render(<UsernameAvatarField {...defaultProps} />);

      // Upload invalid file to show error
      const file = new File(['test'], 'test.gif', { type: 'image/gif' });
      const fileInput = screen.getByTestId('file-input');
      fireEvent.change(fileInput, { target: { files: [file] } });

      await waitFor(() => {
        expect(screen.getByTestId('hint')).toBeInTheDocument();
      });

      // Click Use IPFS URL - should clear error
      const items = screen.getAllByTestId('dropdown-item');
      fireEvent.click(items[1]);

      expect(screen.queryByTestId('hint')).not.toBeInTheDocument();
    });

    it('should clear error when using default avatar', async () => {
      mockValidateBasenameAvatarFile.mockReturnValue({
        valid: false,
        message: 'Invalid file',
      });

      render(<UsernameAvatarField {...defaultProps} />);

      // Upload invalid file to show error
      const file = new File(['test'], 'test.gif', { type: 'image/gif' });
      const fileInput = screen.getByTestId('file-input');
      fireEvent.change(fileInput, { target: { files: [file] } });

      await waitFor(() => {
        expect(screen.getByTestId('hint')).toBeInTheDocument();
      });

      // Click Use default avatar - should clear error
      const items = screen.getAllByTestId('dropdown-item');
      fireEvent.click(items[2]);

      expect(screen.queryByTestId('hint')).not.toBeInTheDocument();
    });
  });
});
