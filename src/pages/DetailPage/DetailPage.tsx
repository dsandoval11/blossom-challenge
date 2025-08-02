import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import CharacterDetail from './components/CharacterDetail';
import { GET_CHARACTER_BY_ID } from '~/graphql/queries/characters';

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(GET_CHARACTER_BY_ID, {
    variables: { id },
  });

  return (
    <>
      {loading && <p>Loading...</p>}
      {data && <CharacterDetail character={data?.character} />}
    </>
  );
}
