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

export interface QueryFilter {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
}

export const CHARACTER_BUTTONS = Object.values(CharacterFilter);
export const SPECIE_BUTTONS = Object.values(SpecieFilter);
