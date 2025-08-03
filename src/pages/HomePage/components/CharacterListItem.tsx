import HeartIcon from '../../../assets/heart.svg?react';
import HeartEmptyIcon from '../../../assets/heart-empty.svg?react';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';

interface CharacterListItemProps {
  id: string;
  name: string;
  species: string;
  image: string;
  selected?: boolean;
  favorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
}

export default function CharacterListItem({
  id,
  name,
  species,
  image,
  favorite = false,
  onFavoriteToggle,
}: CharacterListItemProps) {
  const navigate = useNavigate();
  const { id: paramId } = useParams<{ id: string }>();
  const [selected, setSelected] = useState<boolean>(paramId === id);

  useEffect(() => {
    setSelected(paramId === id);
  }, [paramId]);

  return (
    <li
      className={`flex w-full cursor-pointer gap-4 rounded-lg px-5 py-4
       ${selected ? 'bg-purple-100' : 'hover:bg-gray-100'}`}
      onClick={() => navigate(`character/${id}`)}
    >
      <img
        className="h-8 w-8 self-center rounded-full"
        src={image}
        alt={name}
      />
      <div className="flex-1">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500">{species}</p>
      </div>
      <span
        role="button"
        className="flex h-8 w-8 items-center justify-center self-center rounded-full bg-white"
        onClick={(e) => {
          e.stopPropagation();
          onFavoriteToggle?.(id);
        }}
      >
        {favorite ? (
          <HeartIcon data-testid="heart-icon" />
        ) : (
          <HeartEmptyIcon data-testid="heart-empty-icon" />
        )}
      </span>
    </li>
  );
}
