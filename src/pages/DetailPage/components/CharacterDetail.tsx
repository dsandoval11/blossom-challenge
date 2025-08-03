import HeartIcon from '~/assets/heart.svg?react';
import TrashIcon from '~/assets/trash.svg?react';
import type { CharacterDetailType } from '../types/CharacterDetailType';
import useFavorites from '~/hooks/useFavorites';
import CommentSection from './CommentSection';
import { useState } from 'react';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { useNavigate } from 'react-router';
import { useRemovedCharactersStore } from '~/core/stores/removeCharacterStore';
import { useTranslation } from 'react-i18next';

interface CharacterDetailProps {
  character: CharacterDetailType;
}

export default function CharacterDetail({ character }: CharacterDetailProps) {
  const { t } = useTranslation();
  const { favorites } = useFavorites();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { removeCharacter } = useRemovedCharactersStore();
  const navigate = useNavigate();

  const characterProperties = [
    { label: t('detail-page.specie'), value: character.species },
    { label: t('detail-page.status'), value: character.status },
    { label: t('detail-page.gender'), value: character.gender },
  ];

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    removeCharacter(character.id);
    setShowDeleteModal(false);
    navigate('/');
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="mb-8 flex flex-col gap-4">
        <div className="relative flex justify-between">
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
          <button
            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-red-100 p-2.5 hover:bg-red-200"
            onClick={handleDeleteClick}
          >
            <TrashIcon className="text-red-600" />
          </button>
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

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        characterName={character.name}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  );
}
