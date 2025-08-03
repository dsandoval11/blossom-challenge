import { create } from 'zustand';
import { LS, LSKeys } from '~/core/utils/localeStorage';

interface RemovedCharactersState {
  removedCharacters: string[];
  removeCharacter: (characterId: string) => void;
}

export const useRemovedCharactersStore = create<RemovedCharactersState>(
  (set) => ({
    removedCharacters: LS.get(LSKeys.removedCharacters) || [],

    removeCharacter: (characterId) =>
      set((state) => {
        const newRemovedCharacters = [...state.removedCharacters, characterId];
        LS.set(LSKeys.removedCharacters, [
          ...(LS.get(LSKeys.removedCharacters) || []),
          characterId,
        ]);
        return { removedCharacters: newRemovedCharacters };
      }),
  }),
);
