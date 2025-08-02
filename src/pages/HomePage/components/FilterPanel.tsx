import { useState } from 'react';
import {
  CharacterFilter,
  SpecieFilter,
  CHARACTER_BUTTONS,
  SPECIE_BUTTONS,
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
  const [characterFilter, setCharacterFilter] = useState<CharacterFilter>(
    CharacterFilter.All,
  );
  const [specieFilter, setSpecieFilter] = useState<SpecieFilter>(
    SpecieFilter.All,
  );

  const disableFilterButton =
    characterFilter === CharacterFilter.All &&
    specieFilter === SpecieFilter.All;
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
                  ${characterFilter === button ? 'bg-primary-100 text-primary-600' : 'border border-gray-200 bg-white'}
                  flex-1 rounded-lg p-2.5 text-sm hover:text-gray-700`}
              onClick={() => setCharacterFilter(button)}
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
                  ${specieFilter === button ? 'bg-primary-100 text-primary-600' : 'border border-gray-200 bg-white'}
                  flex-1 rounded-lg p-2.5 text-sm hover:text-gray-700`}
              onClick={() => setSpecieFilter(button)}
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
        onClick={() => onFilterChange?.({ characterFilter, specieFilter })}
        disabled={disableFilterButton}
      >
        Filter
      </button>
    </div>
  );
}
