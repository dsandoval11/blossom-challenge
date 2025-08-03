import { useTranslation } from 'react-i18next';

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-1 items-center justify-center bg-gray-50">
      <div className="px-4 text-center">
        <h1 className="mb-4 text-9xl font-bold text-gray-900">404</h1>
        <h2 className="mb-4 text-3xl font-semibold text-gray-700">
          {t('404-page.title')}
        </h2>
        <p className="mx-auto mb-8 max-w-md text-gray-500">
          {t('404-page.message')}
        </p>
      </div>
    </div>
  );
}
