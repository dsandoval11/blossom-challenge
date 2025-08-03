import { useMemo } from 'react';
import type { Character } from '~/pages/HomePage/types/CharacterType';
import { CharacterFilter, SortOrder } from '~/pages/HomePage/types/FilterType';

interface UseFilteredCharactersProps {
  characters: Character[] | undefined;
  characterFilter: CharacterFilter;
  favorites: string[];
  sort: SortOrder;
}

export const useFilteredCharacters = ({
  characters,
  characterFilter,
  favorites,
  sort,
}: UseFilteredCharactersProps) => {
  const sortCharacters = (characterList: Character[], sortOrder: SortOrder) => {
    return characterList.sort((a, b) => {
      if (sortOrder === SortOrder.Ascending) {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    });
  };

  const getFilteredAndSortedCharacters = (isStarred: boolean): Character[] => {
    if (!characters) return [];

    const shouldInclude = [
      isStarred ? CharacterFilter.Starred : CharacterFilter.Others,
      CharacterFilter.All,
    ].includes(characterFilter);

    if (!shouldInclude) return [];

    const filtered = characters.filter((character) =>
      isStarred
        ? favorites.includes(character.id)
        : !favorites.includes(character.id),
    );

    return sortCharacters(filtered, sort);
  };

  const starredCharacters = useMemo(
    () => getFilteredAndSortedCharacters(true),
    [characters, characterFilter, favorites, sort],
  );

  const otherCharacters = useMemo(
    () => getFilteredAndSortedCharacters(false),
    [characters, characterFilter, favorites, sort],
  );

  return {
    starredCharacters,
    otherCharacters,
  };
};
