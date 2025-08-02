import { Link, Outlet, useLocation } from 'react-router';
import { useQuery } from '@apollo/client';
import CharacterListItem from './components/CharacterListItem';
import SearchInput from './components/SearchInput';
import { GET_CHARACTERS } from '~/graphql/queries/characters';
import useFavorites from '~/hooks/useFavorites';
import type { CharactersData } from './types/CharacterType';
import { CharacterFilter, type QueryFilter } from './types/FilterType';
import { useState } from 'react';

export default function Home() {
  const [filters, setFilters] = useState<{
    query: QueryFilter;
    characterFilter: CharacterFilter;
    filterCounter: number;
  }>({
    query: {},
    characterFilter: CharacterFilter.All,
    filterCounter: 0,
  });
  const { data, loading, error } = useQuery<CharactersData>(GET_CHARACTERS, {
    variables: { page: 1, filter: filters.query },
  });
  const { favorites, toggleFavorite } = useFavorites();
  const location = useLocation();

  const handleFilterChange = ({
    queryFilter,
    characterFilter,
  }: {
    queryFilter: QueryFilter;
    characterFilter: CharacterFilter;
  }) => {
    let filterCounter = 0;
    filterCounter += characterFilter !== CharacterFilter.All ? 1 : 0;
    filterCounter += queryFilter.species !== '' ? 1 : 0;
    setFilters({ query: queryFilter, characterFilter, filterCounter });
  };

  const starredCharacters = [
    CharacterFilter.Starred,
    CharacterFilter.All,
  ].includes(filters.characterFilter)
    ? data?.characters?.results?.filter((character) =>
        favorites.includes(character.id),
      ) || []
    : [];

  const otherCharacters = [
    CharacterFilter.Others,
    CharacterFilter.All,
  ].includes(filters.characterFilter)
    ? data?.characters?.results?.filter(
        (character) => !favorites.includes(character.id),
      ) || []
    : [];

  return (
    <div className="flex h-screen font-sans">
      <aside
        className={`
          ${location.pathname !== '/' && 'hidden md:block'}
          w-full overflow-y-auto bg-white p-4 drop-shadow-2xl md:w-96`}
      >
        <h1 className="mt-6 mb-4 ml-2 text-xl font-semibold">
          <Link to="/">Rick and Morty list</Link>
        </h1>

        <SearchInput onFilterChange={handleFilterChange} />

        {filters.filterCounter > 0 && (
          <div className="flex justify-between px-5 pb-4">
            <span className="flex items-center text-sm font-bold text-blue-600">
              {otherCharacters.length + starredCharacters.length || 0} Results
            </span>
            <span className="bg-secondary-600/20 text-secondary-700 rounded-full px-3 py-0.5">
              {filters.filterCounter} Filter
            </span>
          </div>
        )}

        {!loading && starredCharacters.length > 0 && (
          <div className="mb-4">
            <h2 className="mb-2 ml-5 text-sm text-gray-400 uppercase">
              Starred Characters ({starredCharacters.length})
            </h2>
            <ul className="divide-y divide-gray-200">
              {starredCharacters.map((character) => (
                <CharacterListItem
                  key={character.id}
                  id={character.id}
                  name={character.name}
                  species={character.species}
                  image={character.image}
                  favorite
                  onFavoriteToggle={toggleFavorite}
                />
              ))}
            </ul>
          </div>
        )}

        {otherCharacters.length > 0 && (
          <>
            <h2 className="mb-2 ml-5 text-sm text-gray-400 uppercase">
              Characters ({otherCharacters.length || 0})
            </h2>
            <ul className="divide-y divide-gray-200">
              {otherCharacters.map((character) => (
                <CharacterListItem
                  key={character.id}
                  id={character.id}
                  name={character.name}
                  species={character.species}
                  image={character.image}
                  onFavoriteToggle={toggleFavorite}
                />
              ))}
            </ul>
          </>
        )}
      </aside>

      {location.pathname === '/' && (
        <main className="hidden flex-1 flex-col bg-white px-6 py-6 md:flex">
          <div className="flex h-screen flex-1 items-center justify-center">
            <p className="text-lg text-gray-500">
              Select a character to see details
            </p>
          </div>
        </main>
      )}
      <Outlet />
    </div>
  );
}
