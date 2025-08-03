export default function NotFoundPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-gray-50">
      <div className="px-4 text-center">
        <h1 className="mb-4 text-9xl font-bold text-gray-900">404</h1>
        <h2 className="mb-4 text-3xl font-semibold text-gray-700">Not Found</h2>
        <p className="mx-auto mb-8 max-w-md text-gray-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
    </div>
  );
}
