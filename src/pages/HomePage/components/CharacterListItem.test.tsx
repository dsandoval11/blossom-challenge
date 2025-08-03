import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import CharacterListItem from './CharacterListItem';
import { renderWithRouter } from '~/core/test/utils';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: '1' }),
  };
});

const mockProps = {
  id: '1',
  name: 'Rick Sanchez',
  species: 'Human',
  image: 'https://example.com/rick.jpg',
  onFavoriteToggle: vi.fn(),
};

describe('CharacterListItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders character information correctly', () => {
    renderWithRouter(<CharacterListItem {...mockProps} />);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByAltText('Rick Sanchez')).toHaveAttribute(
      'src',
      'https://example.com/rick.jpg',
    );
  });

  it('applies selected styling when character has the same id as the route param', () => {
    renderWithRouter(<CharacterListItem {...mockProps} />);
    const listItem = screen.getByRole('listitem');
    expect(listItem).toHaveClass('bg-purple-100');
  });

  it('shows filled heart when character is favorite', () => {
    renderWithRouter(<CharacterListItem {...mockProps} favorite={true} />);
    const favoriteButton = screen.getByRole('button');
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toContainElement(screen.getByTestId('heart-icon'));
  });

  it('shows empty heart when character is not favorite', () => {
    renderWithRouter(<CharacterListItem {...mockProps} favorite={false} />);
    const favoriteButton = screen.getByRole('button');
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toContainElement(
      screen.getByTestId('heart-empty-icon'),
    );
  });

  it('navigates to character detail when clicked', () => {
    renderWithRouter(<CharacterListItem {...mockProps} />);
    const listItem = screen.getByRole('listitem');
    fireEvent.click(listItem);
    expect(mockNavigate).toHaveBeenCalledWith('character/1');
  });

  it('calls onFavoriteToggle when heart button is clicked', () => {
    const mockToggle = vi.fn();
    renderWithRouter(
      <CharacterListItem {...mockProps} onFavoriteToggle={mockToggle} />,
    );
    const favoriteButton = screen.getByRole('button');
    fireEvent.click(favoriteButton);

    expect(mockToggle).toHaveBeenCalledWith('1');
  });

  it('prevents navigation when heart button is clicked', () => {
    const mockToggle = vi.fn();
    renderWithRouter(
      <CharacterListItem {...mockProps} onFavoriteToggle={mockToggle} />,
    );
    const favoriteButton = screen.getByRole('button');
    fireEvent.click(favoriteButton);
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockToggle).toHaveBeenCalledWith('1');
  });
});
