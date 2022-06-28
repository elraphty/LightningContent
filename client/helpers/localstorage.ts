export const getFromStorage = (key: string): string | null => {
  let data: string | null = '';
  if (typeof window !== 'undefined') {
      data = window.localStorage.getItem(key);
  }
  return data;
};

export const setToStorage = (key: string, value: any) => {
  if (typeof window !== 'undefined') {
      return window.localStorage.setItem(key, value);
  }
};

export const removeFromStorage = (key: string) => {
  if (typeof window !== 'undefined') {
      return window.localStorage.removeItem(key);
  }
};
