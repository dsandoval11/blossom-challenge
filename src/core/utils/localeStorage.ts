export enum LSKeys {
  favorites = 'favorites',
  comments = 'comments_post_',
  removedCharacters = 'removed_characters',
}

export const LS = {
  get: (key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('localStorage get error', error);
      return null;
    }
  },
  set: (key: string, value: object) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('localStorage set error', error);
    }
  },
  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('localStorage remove error', error);
    }
  },
};
