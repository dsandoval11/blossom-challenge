import { create } from 'zustand';
import {
  CharacterFilter,
  type PageFilter,
} from '~/pages/HomePage/types/FilterType';

interface FilterState {
  filters: PageFilter;
  updateFilters: (newFilters: Partial<PageFilter>) => void;
  resetFilters: () => void;
}

const initialFilters: PageFilter = {
  query: {
    name: '',
    status: '',
    species: '',
    gender: '',
  },
  characterFilter: CharacterFilter.All,
  filterCounter: 0,
};

export const useFilterStore = create<FilterState>((set, get) => ({
  filters: initialFilters,

  updateFilters: (newFilters) =>
    set((state) => {
      const updated = { ...state.filters, ...newFilters };
      let count = 0;
      if (updated.characterFilter !== CharacterFilter.All) count++;
      if (updated.query.species && updated.query.species !== '') count++;

      return {
        filters: {
          ...updated,
          filterCounter: count,
        },
      };
    }),

  resetFilters: () =>
    set(() => ({
      filters: initialFilters,
    })),
}));
