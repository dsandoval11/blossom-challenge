import HeartIcon from '../../../assets/heart.svg?react';
import HeartEmptyIcon from '../../../assets/heart-empty.svg?react';

type CharacterListItemProps = {
  id: number;
  name: string;
  species: string;
  selected?: boolean;
};

export function CharacterListItem({
  id,
  name,
  species,
  selected,
}: CharacterListItemProps) {
  return (
    <li
      className={`flex h-18.5 w-full gap-4 rounded-lg p-[16px_20px]
      hover:bg-gray-100 ${selected ? 'bg-purple-100' : ''}`}
    >
      <img
        className="h-8 w-8 self-center rounded-full"
        src={`https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`}
        alt=""
      />
      <div className="flex-1">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500">{species}</p>
      </div>
      <span className="flex h-8 w-8 items-center justify-center self-center rounded-full bg-white">
        {selected ? <HeartIcon /> : <HeartEmptyIcon />}
      </span>
    </li>
  );
}
