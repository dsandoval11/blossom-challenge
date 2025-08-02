import { Outlet, useLocation } from 'react-router';
import { useQuery } from '@apollo/client';
import CharacterListItem from './components/CharacterListItem';
import SearchInput from './components/SearchInput';
import { GET_CHARACTERS } from '~/graphql/queries/characters';
import useFavorites from '~/hooks/useFavorites';
import type { CharactersData } from './types/CharacterType';

export default function Home() {
  const { data, loading, error } = useQuery<CharactersData>(GET_CHARACTERS);
  const { favorites, toggleFavorite } = useFavorites();
  const location = useLocation();

  return (
    <div className="flex h-screen font-sans">
      <aside
        className={`
          ${location.pathname !== '/' && 'hidden md:block'}
          w-full overflow-y-auto bg-white p-4 drop-shadow-2xl md:w-96`}
      >
        <h1 className="mt-6 mb-4 ml-2 text-xl font-semibold">
          Rick and Morty list
        </h1>

        <SearchInput />

        {!loading && favorites.length > 0 && (
          <div className="mb-4">
            <h2 className="mb-2 ml-5 text-sm text-gray-400 uppercase">
              Starred Characters ({favorites.length})
            </h2>
            <ul className="divide-y divide-gray-200">
              {data?.characters.results
                .filter((character) => favorites.includes(character.id))
                .map((character) => (
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

        <div>
          <h2 className="mb-2 ml-5 text-sm text-gray-400 uppercase">
            Characters (
            {Math.max(
              (data?.characters.results.length || 0) - (favorites.length || 0),
              0,
            )}
            )
          </h2>
          <ul className="divide-y divide-gray-200">
            {data?.characters.results
              .filter((character) => !favorites.includes(character.id))
              .map((character) => (
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
        </div>
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
