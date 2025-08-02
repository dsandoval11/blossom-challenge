import CharacterListItem from './components/CharacterListItem';
import SearchInput from './components/SearchInput';
import characters from './charactersMock.json';
import CharacterDetail from './components/CharacterDetail';

export default function Home() {
  return (
    <div className="flex h-screen font-sans">
      <aside className="w-full overflow-y-auto bg-white p-4 md:w-96">
        <h1 className="mt-6 mb-4 ml-2 text-xl font-semibold">
          Rick and Morty list
        </h1>

        <SearchInput />

        <div className="mb-4">
          <h2 className="mb-2 ml-5 text-sm text-gray-400 uppercase">
            Starred Characters (2)
          </h2>
          <ul className="space-y-2">
            {characters.characters
              .filter((character) => character.favorite)
              .map((character) => (
                <CharacterListItem
                  key={character.id}
                  id={character.id}
                  name={character.name}
                  species={character.species}
                  favorite
                />
              ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-2 ml-5 text-sm text-gray-400 uppercase">
            Characters (4)
          </h2>
          <ul className="space-y-2">
            {characters.characters
              .filter((character) => !character.favorite)
              .map((character) => (
                <CharacterListItem
                  key={character.id}
                  id={character.id}
                  name={character.name}
                  species={character.species}
                />
              ))}
          </ul>
        </div>
      </aside>

      <main className=" hidden flex-1 flex-col bg-white px-25 py-10 drop-shadow-2xl md:flex">
        <CharacterDetail />
      </main>
    </div>
  );
}
