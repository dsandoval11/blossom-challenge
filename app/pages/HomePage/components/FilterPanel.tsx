export default function FilterPanel({ visible = false }) {
  const characterButton = ['All', 'Starred', 'Others'];
  const selectedCharacter = 'All';
  const selectedSpecie = 'All';
  const specieButton = ['All', 'Human', 'Alien'];

  return (
    <div
      className={`absolute top-14 flex ${visible ? 'flex' : 'hidden'} h-69.5 w-86 flex-col gap-6 rounded-lg bg-white p-4 shadow-md`}
    >
      <div>
        <h2 className="mb-2 text-sm text-gray-400 ">Characters</h2>
        <div className="flex gap-2">
          {characterButton.map((button) => (
            <button
              key={button}
              className={`
                  ${selectedCharacter === button ? 'bg-primary-100 text-primary-600' : 'border border-gray-200 bg-white'}
                  flex-1 rounded-lg p-2.5 text-sm hover:text-gray-700`}
            >
              {button}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-sm text-gray-400">Specie</h2>
        <div className="flex gap-2">
          {specieButton.map((button) => (
            <button
              key={button}
              className={`
                  ${selectedSpecie === button ? 'bg-primary-100 text-primary-600' : 'border border-gray-200 bg-white'}
                  flex-1 rounded-lg p-2.5 text-sm hover:text-gray-700`}
            >
              {button}
            </button>
          ))}
        </div>
      </div>

      <button
        className={`
          ${
            selectedCharacter === 'All' && selectedSpecie === 'All'
              ? 'cursor-default bg-gray-200 text-gray-500'
              : 'bg-primary-600 text-white'
          }
          mt-4 w-full rounded-lg py-2 text-sm`}
      >
        Filters
      </button>
    </div>
  );
}
