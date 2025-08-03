import WarningIcon from '~/assets/warning.svg?react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  characterName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDeleteModal({
  isOpen,
  characterName,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="bg-opacity-50 absolute inset-0 bg-black/30"
        onClick={onCancel}
      />

      <div className="relative mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="text-center">
          <div
            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center
            rounded-full bg-red-100"
          >
            <WarningIcon className="h-6 w-6 text-red-600" />
          </div>

          <h3 className="mb-2 text-lg font-medium text-gray-900">
            Delete Character
          </h3>

          <p className="text-md mb-6 text-gray-500">
            Are you sure you want to delete
            <span className="font-semibold text-gray-900">{` ${characterName}`}</span>
            ?
          </p>

          <div className="flex space-x-3">
            <button
              className="flex-1 rounded-md border border-gray-300 bg-white 
                px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="bg-primary-600 hover:bg-primary-700 flex-1 rounded-md 
                border border-transparent px-4 py-2 text-sm font-medium text-white"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
