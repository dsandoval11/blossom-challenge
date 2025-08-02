export enum LSKeys {
  favorites = 'favorites',
}

export const LS = {
  get: (key: LSKeys) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('localStorage get error', error);
      return null;
    }
  },
  set: (key: LSKeys, value: object) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('localStorage set error', error);
    }
  },
  remove: (key: LSKeys) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('localStorage remove error', error);
    }
  },
};
