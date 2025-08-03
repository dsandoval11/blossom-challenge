export interface Character {
  id: string;
  name: string;
  species: string;
  image: string;
}

export interface CharactersData {
  characters: {
    results: Character[];
  };
}

export interface CharactersDataFav {
  charactersByIds: Character[];
}
