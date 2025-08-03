import { Link, useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import CharacterDetail from './components/CharacterDetail';
import { GET_CHARACTER_BY_ID } from '~/graphql/queries/characters';
import BackArrowIcon from '~/assets/back-arrow.svg?react';
import { Spinner } from '~/core/components/Spinner';

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(GET_CHARACTER_BY_ID, {
    variables: { id },
  });

  return (
    <>
      {loading && <Spinner />}
      {error && (
        <div className="flex h-screen flex-1 items-center justify-center">
          <p className="text-lg text-gray-500">Character not found</p>
        </div>
      )}
      {data && data.character && (
        <main className="flex-1 flex-col bg-white px-6 py-6 md:flex md:px-25 md:py-10">
          <Link to="/">
            <BackArrowIcon className="mb-6 md:hidden" />
          </Link>
          <CharacterDetail character={data?.character} />
        </main>
      )}
    </>
  );
}
