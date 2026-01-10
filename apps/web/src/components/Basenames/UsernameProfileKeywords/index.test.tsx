/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import UsernameProfileKeywords from './index';

// Mock the usernames module
jest.mock('apps/web/src/utils/usernames', () => ({
  textRecordsEngineersKeywords: ['Solidity', 'Rust', 'Security', 'Javascript', 'Typescript'],
  textRecordsCreativesKeywords: ['UI/UX', 'Prototyping', 'Music', 'Design', 'Animation'],
  textRecordsCommunicationKeywords: ['Community', 'Product management', 'Strategy', 'Marketing'],
  textRecordsKeysForDisplay: {
    Keywords: 'Skills',
  },
  UsernameTextRecordKeys: {
    Keywords: 'Keywords',
  },
}));

describe('UsernameProfileKeywords', () => {
  describe('rendering', () => {
    it('should render the section title correctly', () => {
      render(<UsernameProfileKeywords keywords="Solidity" />);

      expect(screen.getByText('Skills')).toBeInTheDocument();
    });

    it('should render a single keyword', () => {
      render(<UsernameProfileKeywords keywords="Solidity" />);

      expect(screen.getByText('Solidity')).toBeInTheDocument();
    });

    it('should render multiple keywords separated by commas', () => {
      render(<UsernameProfileKeywords keywords="Solidity,Rust,Security" />);

      expect(screen.getByText('Solidity')).toBeInTheDocument();
      expect(screen.getByText('Rust')).toBeInTheDocument();
      expect(screen.getByText('Security')).toBeInTheDocument();
    });

    it('should filter out empty keywords', () => {
      render(<UsernameProfileKeywords keywords="Solidity,,Rust,," />);

      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(2);
      expect(screen.getByText('Solidity')).toBeInTheDocument();
      expect(screen.getByText('Rust')).toBeInTheDocument();
    });

    it('should render keywords as list items', () => {
      render(<UsernameProfileKeywords keywords="Solidity,Rust" />);

      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(2);
    });
  });

  describe('keyword styling based on category', () => {
    it('should apply engineer styling for engineer keywords', () => {
      render(<UsernameProfileKeywords keywords="Solidity" />);

      const keyword = screen.getByText('Solidity');
      expect(keyword).toHaveClass('border-[#7FD057]');
      expect(keyword).toHaveClass('bg-[#7FD057]/20');
      expect(keyword).toHaveClass('text-[#195D29]');
    });

    it('should apply creative styling for creative keywords', () => {
      render(<UsernameProfileKeywords keywords="UI/UX" />);

      const keyword = screen.getByText('UI/UX');
      expect(keyword).toHaveClass('border-[#F8BDF5]');
      expect(keyword).toHaveClass('bg-[#F8BDF5]/20');
      expect(keyword).toHaveClass('text-[#741A66]');
    });

    it('should apply communication styling for communication keywords', () => {
      render(<UsernameProfileKeywords keywords="Community" />);

      const keyword = screen.getByText('Community');
      expect(keyword).toHaveClass('border-[#45E1E5]');
      expect(keyword).toHaveClass('bg-[#45E1E5]/20');
      expect(keyword).toHaveClass('text-[#004774]');
    });

    it('should apply base styling without category colors for unknown keywords', () => {
      render(<UsernameProfileKeywords keywords="CustomKeyword" />);

      const keyword = screen.getByText('CustomKeyword');
      // Should have base classes but not category-specific colors
      expect(keyword).toHaveClass('rounded-xl');
      expect(keyword).toHaveClass('border');
      expect(keyword).toHaveClass('px-3');
      expect(keyword).toHaveClass('py-2');
      expect(keyword).toHaveClass('text-sm');
      expect(keyword).toHaveClass('font-bold');
      // Should NOT have category-specific colors
      expect(keyword).not.toHaveClass('border-[#7FD057]');
      expect(keyword).not.toHaveClass('border-[#F8BDF5]');
      expect(keyword).not.toHaveClass('border-[#45E1E5]');
    });
  });

  describe('mixed keywords from different categories', () => {
    it('should apply correct styling for each keyword category', () => {
      render(<UsernameProfileKeywords keywords="Solidity,UI/UX,Community" />);

      // Engineer keyword
      const solidityKeyword = screen.getByText('Solidity');
      expect(solidityKeyword).toHaveClass('border-[#7FD057]');

      // Creative keyword
      const uiuxKeyword = screen.getByText('UI/UX');
      expect(uiuxKeyword).toHaveClass('border-[#F8BDF5]');

      // Communication keyword
      const communityKeyword = screen.getByText('Community');
      expect(communityKeyword).toHaveClass('border-[#45E1E5]');
    });

    it('should render all keywords when mixing known and unknown keywords', () => {
      render(<UsernameProfileKeywords keywords="Solidity,CustomSkill,Community" />);

      expect(screen.getByText('Solidity')).toBeInTheDocument();
      expect(screen.getByText('CustomSkill')).toBeInTheDocument();
      expect(screen.getByText('Community')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle empty keywords string', () => {
      render(<UsernameProfileKeywords keywords="" />);

      expect(screen.getByText('Skills')).toBeInTheDocument();
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    });

    it('should handle keywords with only commas', () => {
      render(<UsernameProfileKeywords keywords=",,," />);

      expect(screen.getByText('Skills')).toBeInTheDocument();
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    });

    it('should handle whitespace in keywords', () => {
      render(<UsernameProfileKeywords keywords="Product management" />);

      expect(screen.getByText('Product management')).toBeInTheDocument();
    });

    it('should handle keywords with special characters', () => {
      render(<UsernameProfileKeywords keywords="UI/UX" />);

      expect(screen.getByText('UI/UX')).toBeInTheDocument();
    });
  });

  describe('layout structure', () => {
    it('should render within a div container', () => {
      const { container } = render(<UsernameProfileKeywords keywords="Solidity" />);

      expect(container.firstChild?.nodeName).toBe('DIV');
    });

    it('should render title as h2 element', () => {
      render(<UsernameProfileKeywords keywords="Solidity" />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Skills');
    });

    it('should render keywords list with ul element', () => {
      render(<UsernameProfileKeywords keywords="Solidity" />);

      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('should apply flex layout classes to keywords list', () => {
      render(<UsernameProfileKeywords keywords="Solidity,Rust" />);

      const list = screen.getByRole('list');
      expect(list).toHaveClass('flex');
      expect(list).toHaveClass('flex-wrap');
      expect(list).toHaveClass('gap-2');
    });

    it('should apply styling classes to section title', () => {
      render(<UsernameProfileKeywords keywords="Solidity" />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('font-bold');
      expect(heading).toHaveClass('uppercase');
      expect(heading).toHaveClass('text-[#5B616E]');
    });
  });

  describe('keyword element classes', () => {
    it('should apply transition class to keywords', () => {
      render(<UsernameProfileKeywords keywords="Solidity" />);

      const keyword = screen.getByText('Solidity');
      expect(keyword).toHaveClass('transition-all');
    });

    it('should apply flex and gap classes to keywords', () => {
      render(<UsernameProfileKeywords keywords="Solidity" />);

      const keyword = screen.getByText('Solidity');
      expect(keyword).toHaveClass('flex');
      expect(keyword).toHaveClass('items-center');
      expect(keyword).toHaveClass('gap-2');
    });
  });
});
