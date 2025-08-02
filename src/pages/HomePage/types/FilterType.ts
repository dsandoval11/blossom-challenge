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

export const CHARACTER_BUTTONS = Object.values(CharacterFilter);
export const SPECIE_BUTTONS = Object.values(SpecieFilter);
