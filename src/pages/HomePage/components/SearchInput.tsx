import { useState } from 'react';
import FilterIcon from '~/assets/filter.svg?react';
import FilterSelectedIcon from '~/assets/filter-selected.svg?react';
import SearchIcon from '~/assets/search.svg?react';
import FilterPanel from './FilterPanel';
import {
  CharacterFilter,
  GenderFilter,
  SpecieFilter,
  StatusFilter,
  type QueryFilter,
} from '../types/FilterType';
import { useFilterStore } from '~/core/stores/filterStore';

export default function SearchInput() {
  const [visible, setVisible] = useState<boolean>(false);
  const { filters, updateFilters } = useFilterStore();

  const toggleFilterPanel = () => {
    setVisible(!visible);
  };

  const handleFilterChange = (
    newFilters: Partial<QueryFilter & { character: CharacterFilter }>,
  ) => {
    setVisible(false);
    updateFilters({
      query: {
        name: newFilters.name ?? filters.query.name ?? '',
        status:
          newFilters.status === StatusFilter.All
            ? ''
            : (newFilters.status ?? filters.query.status ?? ''),
        species:
          newFilters.species === SpecieFilter.All
            ? ''
            : (newFilters.species ?? filters.query.species ?? ''),
        gender:
          newFilters.gender === GenderFilter.All
            ? ''
            : (newFilters.gender ?? filters.query.gender ?? ''),
      },
      character:
        newFilters.character ?? filters.character ?? CharacterFilter.All,
    });
  };

  return (
    <div className="relative mb-6 flex h-13 w-full">
      <SearchIcon className="absolute top-1/2 left-5 -translate-y-1/2" />
      <input
        type="text"
        placeholder="Search or filter results"
        className="w-full rounded-lg bg-gray-100 px-12 py-2 outline-none"
        onBlur={(e) => {
          handleFilterChange({ name: e.target.value });
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleFilterChange({ name: e.currentTarget.value });
          }
        }}
      />
      <button
        className={`
        ${visible ? 'bg-primary-100' : 'hover:bg-gray-200'}
        absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-lg p-2.5`}
        onClick={toggleFilterPanel}
      >
        {visible ? <FilterSelectedIcon /> : <FilterIcon />}
      </button>
      <FilterPanel
        visible={visible}
        onClose={toggleFilterPanel}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}
