import { useEffect, useState } from 'react';
import { LS, LSKeys } from '~/core/utils/localeStorage';

const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = LS.get(LSKeys.favorites);
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      LS.set(
        LSKeys.favorites,
        favorites.filter((favId) => favId !== id),
      );
      setFavorites((prev) => prev.filter((favId) => favId !== id));
    } else {
      LS.set(LSKeys.favorites, [...favorites, id]);
      setFavorites((prev) => [...prev, id]);
    }
  };

  return { favorites, toggleFavorite };
};

export default useFavorites;
