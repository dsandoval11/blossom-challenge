import { useState } from 'react';
import FilterIcon from '~/assets/filter.svg?react';
import FilterSelectedIcon from '~/assets/filter-selected.svg?react';
import SearchIcon from '~/assets/search.svg?react';
import FilterPanel from './FilterPanel';
import {
  CharacterFilter,
  SpecieFilter,
  type QueryFilter,
} from '../types/FilterType';

interface SearchInputProps {
  onFilterChange?: ({
    queryFilter,
    characterFilter,
  }: {
    queryFilter: QueryFilter;
    characterFilter: CharacterFilter;
  }) => void;
}

export default function SearchInput({ onFilterChange }: SearchInputProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const toggleFilterPanel = () => {
    setVisible(!visible);
  };

  const handleFilterChange = (
    filters: QueryFilter & { characterFilter: CharacterFilter },
  ) => {
    setVisible(false);
    onFilterChange?.({
      queryFilter: {
        name: searchTerm,
        status: filters.status,
        species: filters.species === SpecieFilter.All ? '' : filters.species,
        gender: filters.gender,
      },
      characterFilter: filters.characterFilter,
    });
  };

  return (
    <div className="relative mb-6 flex h-13 w-full">
      <SearchIcon className="absolute top-1/2 left-5 -translate-y-1/2" />
      <input
        type="text"
        placeholder="Search or filter results"
        className="w-full rounded-lg bg-gray-100 px-12 py-2 outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
        onFilterChange={({ characterFilter, specieFilter: species }) => {
          handleFilterChange({
            status: '',
            species,
            gender: '',
            characterFilter,
          });
        }}
      />
    </div>
  );
}
