import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      results {
        id
        name
        image
        species
      }
    }
  }
`;

export const GET_CHARACTER_BY_ID = gql`
  query GetCharacterById($id: ID!) {
    character(id: $id) {
      id
      name
      image
      species
      status
      gender
    }
  }
`;

export const GET_CHARACTERS_BY_IDS = gql`
  query GetCharactersByIds($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      id
      name
      image
      species
    }
  }
`;
