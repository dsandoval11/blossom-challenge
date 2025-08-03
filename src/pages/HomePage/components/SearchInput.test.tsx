import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SearchInput from './SearchInput';

const mockUpdateFilters = vi.fn();
vi.mock('~/core/stores/filterStore', () => ({
  useFilterStore: () => ({
    filters: {
      query: { name: '', status: '', species: '', gender: '' },
      character: 'All',
    },
    updateFilters: mockUpdateFilters,
  }),
}));

vi.mock('./FilterPanel', () => ({
  default: ({ visible, onClose, onFilterChange }: any) => (
    <div
      data-testid="filter-panel"
      style={{ display: visible ? 'block' : 'none' }}
    >
      <button onClick={onClose}>Close</button>
      <button
        data-testid="filter-button"
        onClick={() => onFilterChange({ name: 'test' })}
      >
        Filter
      </button>
    </div>
  ),
}));

describe('SearchInput', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search input with placeholder', () => {
    render(<SearchInput />);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  it('displays search icon', () => {
    render(<SearchInput />);
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('shows filter icon when panel is closed', () => {
    render(<SearchInput />);
    expect(screen.getByTestId('filter-icon')).toBeInTheDocument();
  });

  it('toggles filter panel visibility when filter button is clicked', () => {
    render(<SearchInput />);
    const filterButton = screen.getByRole('button');
    fireEvent.click(filterButton);
    expect(screen.getByTestId('filter-selected-icon')).toBeInTheDocument();
  });

  it('calls updateFilters when input loses focus', () => {
    render(<SearchInput />);
    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'Rick' } });
    fireEvent.blur(input);
    expect(mockUpdateFilters).toHaveBeenCalledWith({
      query: { name: 'Rick', status: '', species: '', gender: '' },
      character: 'All',
    });
  });

  it('calls updateFilters when Enter key is pressed', () => {
    render(<SearchInput />);
    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'Morty' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(mockUpdateFilters).toHaveBeenCalledWith({
      query: { name: 'Morty', status: '', species: '', gender: '' },
      character: 'All',
    });
  });

  it('hides filter panel when filter is applied', () => {
    render(<SearchInput />);
    const filterButton = screen.getByRole('button');
    fireEvent.click(filterButton);
    const applyButton = screen.getByTestId('filter-button');
    fireEvent.click(applyButton);
    expect(screen.getByTestId('filter-icon')).toBeInTheDocument();
  });
});
