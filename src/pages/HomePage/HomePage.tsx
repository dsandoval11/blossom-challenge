import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { useQuery } from '@apollo/client';
import CharacterListItem from './components/CharacterListItem';
import SearchInput from './components/SearchInput';
import { GET_CHARACTERS } from '~/graphql/queries/characters';
import useFavorites from '~/hooks/useFavorites';
import type { CharactersData } from './types/CharacterType';
import { SortOrder } from './types/FilterType';
import SortAZIcon from '~/assets/arrow-down-az.svg?react';
import SortZAIcon from '~/assets/arrow-down-za.svg?react';
import { useFilteredCharacters } from '~/hooks/useFilteredCharacters';
import { useFilterStore } from '~/core/stores/filterStore';
import { Spinner } from '~/core/components/Spinner';

export default function Home() {
  const location = useLocation();
  const { filters } = useFilterStore();
  const [sort, setSort] = useState<SortOrder>(SortOrder.Ascending);
  const { data, loading, error } = useQuery<CharactersData>(GET_CHARACTERS, {
    variables: { page: 1, filter: filters.query },
  });
  const { favorites, toggleFavorite } = useFavorites();
  const { starredCharacters, otherCharacters } = useFilteredCharacters({
    characters: data?.characters.results,
    characterFilter: filters.character,
    favorites,
    sort,
  });

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

        <SearchInput />

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

        {loading && <Spinner />}

        {otherCharacters.length + starredCharacters.length > 0 && !loading && (
          <div className="mb-4 flex px-5">
            <span className="flex items-center text-sm font-medium text-gray-400">
              Sort by:
            </span>
            <div className="ml-2">
              <button
                className="bg-primary-600 hover:bg-primary-700 flex h-6 w-6 items-center justify-center 
              rounded-full text-white focus:ring-2"
                onClick={() => {
                  setSort(
                    sort === SortOrder.Ascending
                      ? SortOrder.Descending
                      : SortOrder.Ascending,
                  );
                }}
              >
                {sort === SortOrder.Ascending ? (
                  <SortAZIcon width={16} height={16} />
                ) : (
                  <SortZAIcon width={16} height={16} />
                )}
              </button>
            </div>
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

        {!loading && otherCharacters.length > 0 && (
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
