import { useState } from 'react';
import FilterIcon from '../../../assets/filter.svg?react';
import FilterSelectedIcon from '../../../assets/filter-selected.svg?react';
import SearchIcon from '../../../assets/search.svg?react';
import FilterPanel from './FilterPanel';

export default function SearchInput() {
  const [visible, setVisible] = useState<boolean>(false);

  const toggleFilterPanel = () => {
    setVisible(!visible);
  };

  return (
    <div className="relative mb-6 flex h-13 w-full">
      <SearchIcon className="absolute top-1/2 left-5 -translate-y-1/2" />
      <input
        type="text"
        placeholder="Search or filter results"
        className="w-full rounded-lg bg-gray-100 px-12 py-2 outline-none"
      />
      <button
        className="hover:bg-primary-100 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-lg p-2.5"
        onClick={toggleFilterPanel}
      >
        {visible ? <FilterSelectedIcon /> : <FilterIcon />}
      </button>
      <FilterPanel visible={visible} />
    </div>
  );
}
