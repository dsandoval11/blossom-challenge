import HeartIcon from '~/assets/heart.svg?react';
import type { CharacterDetailType } from '../types/CharacterDetailType';
import useFavorites from '~/hooks/useFavorites';
import CommentSection from './CommentSection';

interface CharacterDetailProps {
  character: CharacterDetailType;
}

export default function CharacterDetail({ character }: CharacterDetailProps) {
  const { favorites } = useFavorites();

  const characterProperties = [
    { label: 'Specie', value: character.species },
    { label: 'Status', value: character.status },
    { label: 'Gender', value: character.gender },
  ];

  return (
    <>
      <div className="mb-8 flex flex-col gap-4">
        <div className="relative">
          <img
            src={character.image}
            alt={character.name}
            className="h-[75px] w-[75px] rounded-full"
          />
          {favorites.includes(character.id) && (
            <span
              className="absolute top-10 left-13 flex h-8 w-8 items-center justify-center self-center
            rounded-full bg-white"
            >
              <HeartIcon />
            </span>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{character.name}</h2>
        </div>
      </div>

      <div className="space-y-4">
        <div className="divide-y divide-gray-200">
          {characterProperties.map((prop) => (
            <div key={prop.label} className="py-4">
              <p className="text-sm text-gray-500">{prop.label}</p>
              <p className="font-medium">{prop.value}</p>
            </div>
          ))}
        </div>
      </div>

      <CommentSection characterId={character.id} />
    </>
  );
}
