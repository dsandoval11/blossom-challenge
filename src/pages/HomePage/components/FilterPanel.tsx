import { useState } from 'react';
import {
  CharacterFilter,
  SpecieFilter,
  type FiltersPanel,
  StatusFilter,
  GenderFilter,
} from '../types/FilterType';
import BackArrowIcon from '~/assets/back-arrow.svg?react';
import { useTranslation } from 'react-i18next';

interface FilterPanelProps {
  visible?: boolean;
  onClose?: () => void;
  onFilterChange?: ({}: {
    character: CharacterFilter;
    species: SpecieFilter;
    status: StatusFilter;
    gender: GenderFilter;
  }) => void;
}

const initialFilterState: FiltersPanel = {
  character: CharacterFilter.All,
  species: SpecieFilter.All,
  status: StatusFilter.All,
  gender: GenderFilter.All,
};

export default function FilterPanel({
  visible = false,
  onFilterChange,
  onClose = () => {},
}: FilterPanelProps) {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<FiltersPanel>(initialFilterState);
  const [lastAppliedFilters, setLastAppliedFilters] =
    useState<FiltersPanel>(initialFilterState);

  const disableFilterButton = Object.keys(filters).every(
    (key) =>
      filters[key as keyof FiltersPanel] ===
      lastAppliedFilters[key as keyof FiltersPanel],
  );

  const handleFilterClick = () => {
    onFilterChange?.({
      character: filters.character,
      species: filters.species,
      status: filters.status,
      gender: filters.gender,
    });

    setLastAppliedFilters({ ...filters });
  };

  const filterSections = [
    {
      title: t('filter-panel.character'),
      filterKey: 'character',
      buttons: Object.values(CharacterFilter),
      currentValue: filters.character,
    },
    {
      title: t('filter-panel.specie'),
      filterKey: 'species',
      buttons: Object.values(SpecieFilter),
      currentValue: filters.species,
    },
    {
      title: t('filter-panel.status'),
      filterKey: 'status',
      buttons: Object.values(StatusFilter),
      currentValue: filters.status,
    },
    {
      title: t('filter-panel.gender'),
      filterKey: 'gender',
      buttons: Object.values(GenderFilter),
      currentValue: filters.gender,
    },
  ];

  return (
    <div
      data-testid="filter-panel-container"
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
          {t('filter-panel.title')}
        </h2>
      </div>
      {filterSections.map(({ title, filterKey, buttons, currentValue }) => (
        <div key={filterKey} data-testid={filterKey}>
          <h2 className="mb-2 text-sm text-gray-400">{title}</h2>
          <div className="grid grid-cols-3 gap-2">
            {buttons.map((button) => (
              <button
                key={button}
                className={`
                ${currentValue === button ? 'bg-primary-100 text-primary-600' : 'border border-gray-200 bg-white'}
                rounded-lg p-2.5 text-sm hover:text-gray-700`}
                onClick={() => setFilters({ ...filters, [filterKey]: button })}
              >
                {button}
              </button>
            ))}
          </div>
        </div>
      ))}

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
        {t('filter-panel.button')}
      </button>
    </div>
  );
}
