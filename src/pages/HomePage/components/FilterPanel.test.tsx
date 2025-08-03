import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import FilterPanel from './FilterPanel';
import {
  CharacterFilter,
  SpecieFilter,
  StatusFilter,
  GenderFilter,
} from '../types/FilterType';

const defaultProps = {
  visible: true,
  onClose: vi.fn(),
  onFilterChange: vi.fn(),
};

describe('FilterPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all filter sections when visible', () => {
    render(<FilterPanel {...defaultProps} />);
    expect(screen.getByTestId('character')).toBeInTheDocument();
    expect(screen.getByTestId('species')).toBeInTheDocument();
    expect(screen.getByTestId('status')).toBeInTheDocument();
    expect(screen.getByTestId('gender')).toBeInTheDocument();
  });

  it('does not show when not visible', () => {
    render(<FilterPanel {...defaultProps} visible={false} />);
    const listItem = screen.getByTestId('filter-panel-container');
    expect(listItem).toHaveClass('hidden');
  });

  it('renders all character filter buttons', () => {
    render(<FilterPanel {...defaultProps} />);
    const buttonSection = screen.getByTestId('character');
    Object.values(CharacterFilter).forEach((filter) => {
      const button = within(buttonSection).getByRole('button', {
        name: filter,
      });
      expect(button).toBeInTheDocument();
    });
  });

  it('renders all species filter buttons', () => {
    render(<FilterPanel {...defaultProps} />);
    const buttonSection = screen.getByTestId('species');
    Object.values(SpecieFilter).forEach((filter) => {
      const button = within(buttonSection).getByRole('button', {
        name: filter,
      });
      expect(button).toBeInTheDocument();
    });
  });

  it('renders all status filter buttons', () => {
    render(<FilterPanel {...defaultProps} />);
    const buttonSection = screen.getByTestId('status');
    Object.values(StatusFilter).forEach((filter) => {
      const button = within(buttonSection).getByRole('button', {
        name: filter,
      });
      expect(button).toBeInTheDocument();
    });
  });

  it('renders all gender filter buttons', () => {
    render(<FilterPanel {...defaultProps} />);
    const buttonSection = screen.getByTestId('gender');
    Object.values(GenderFilter).forEach((filter) => {
      const button = within(buttonSection).getByRole('button', {
        name: filter,
      });
      expect(button).toBeInTheDocument();
    });
  });
});
