export enum CharacterFilter {
  All = 'All',
  Starred = 'Starred',
  Others = 'Others',
}

export enum SpecieFilter {
  All = 'All',
  Human = 'Human',
  Alien = 'Alien',
}

export enum StatusFilter {
  All = 'All',
  Alive = 'Alive',
  Dead = 'Dead',
  Unknown = 'Unknown',
}

export enum GenderFilter {
  All = 'All',
  Male = 'Male',
  Female = 'Female',
  Unknown = 'Unknown',
}

export interface FiltersPanel {
  character: CharacterFilter;
  species: SpecieFilter;
  status: StatusFilter;
  gender: GenderFilter;
}

export interface QueryFilter {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
}

export interface PageFilter {
  query: QueryFilter;
  character: CharacterFilter;
  filterCounter: number;
}

export enum SortOrder {
  Ascending = 'asc',
  Descending = 'desc',
}
