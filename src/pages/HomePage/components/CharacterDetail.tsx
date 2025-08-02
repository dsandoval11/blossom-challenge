import HeartIcon from '../../../assets/heart.svg?react';
import HeartEmptyIcon from '../../../assets/heart-empty.svg?react';

export default function CharacterDetail() {
  return (
    <>
      <div className="mb-8 flex flex-col gap-4">
        <div className="relative">
          <img
            src="https://rickandmortyapi.com/api/character/avatar/10.jpeg"
            alt="Abadango Cluster Princess"
            className="h-[75px] w-[75px] rounded-full"
          />
          <span
            className="absolute top-10 left-13 flex h-8 w-8 items-center justify-center self-center
            rounded-full bg-white"
          >
            {true ? <HeartIcon /> : <HeartEmptyIcon />}
          </span>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Abadango Cluster Princess</h2>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Specie</p>
          <p className="font-medium">Alien</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p className="font-medium">Alive</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Occupation</p>
          <p className="font-medium">Princess</p>
        </div>
      </div>
    </>
  );
}
