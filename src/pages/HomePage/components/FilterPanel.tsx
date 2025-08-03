import { useState } from 'react';
import {
  CharacterFilter,
  SpecieFilter,
  CHARACTER_BUTTONS,
  SPECIE_BUTTONS,
  type FiltersPanel,
} from '../types/FilterType';
import BackArrowIcon from '~/assets/back-arrow.svg?react';

interface FilterPanelProps {
  visible?: boolean;
  onClose?: () => void;
  onFilterChange?: ({}: {
    characterFilter: CharacterFilter;
    specieFilter: SpecieFilter;
  }) => void;
}

export default function FilterPanel({
  visible = false,
  onFilterChange,
  onClose = () => {},
}: FilterPanelProps) {
  const [filters, setFilters] = useState<FiltersPanel>({
    character: CharacterFilter.All,
    specie: SpecieFilter.All,
  });

  const [lastAppliedFilters, setLastAppliedFilters] = useState<FiltersPanel>({
    character: CharacterFilter.All,
    specie: SpecieFilter.All,
  });

  const disableFilterButton =
    filters.character === lastAppliedFilters.character &&
    filters.specie === lastAppliedFilters.specie;

  const handleFilterClick = () => {
    onFilterChange?.({
      characterFilter: filters.character,
      specieFilter: filters.specie,
    });
    setLastAppliedFilters({ ...filters });
  };

  return (
    <div
      className={`
        ${visible ? 'flex' : 'hidden'}
        absolute top-14 flex w-full flex-col gap-6 rounded-lg bg-white p-6 shadow-md
        max-sm:fixed max-sm:inset-0
      `}
    >
      <div className="mb-4 hidden items-center max-sm:flex">
        <button onClick={onClose}>
          <BackArrowIcon />
        </button>
        <h2 className="absolute left-1/2 -translate-x-1/2 text-sm font-bold">
          Filters
        </h2>
      </div>
      <div>
        <h2 className="mb-2 text-sm text-gray-400 ">Characters</h2>
        <div className="flex gap-2">
          {CHARACTER_BUTTONS.map((button) => (
            <button
              key={button}
              className={`
                  ${filters.character === button ? 'bg-primary-100 text-primary-600' : 'border border-gray-200 bg-white'}
                  flex-1 rounded-lg p-2.5 text-sm hover:text-gray-700`}
              onClick={() => setFilters({ ...filters, character: button })}
            >
              {button}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-sm text-gray-400">Specie</h2>
        <div className="flex gap-2">
          {SPECIE_BUTTONS.map((button) => (
            <button
              key={button}
              className={`
                  ${filters.specie === button ? 'bg-primary-100 text-primary-600' : 'border border-gray-200 bg-white'}
                  flex-1 rounded-lg p-2.5 text-sm hover:text-gray-700`}
              onClick={() => setFilters({ ...filters, specie: button })}
            >
              {button}
            </button>
          ))}
        </div>
      </div>

      <button
        className={`
          ${
            disableFilterButton
              ? 'cursor-default bg-gray-200 text-gray-500'
              : 'bg-primary-600 text-white'
          }
          w-full rounded-lg py-2 text-sm max-sm:fixed max-sm:right-6 max-sm:bottom-6 max-sm:left-6 max-sm:w-auto`}
        onClick={handleFilterClick}
        disabled={disableFilterButton}
      >
        Filter
      </button>
    </div>
  );
}
