/* ISC License (ISC). Copyright 2017 Michal Zalecki */

/**
 * How to use
 *
 * import * as storage from './storage';
 *
 * function login(token) {
 *  storage.local.setItem('token', token);
 *  // do your other login things
 * }
 *
 */
export function storageFactory(getStorage: () => Storage): Storage {
  let inMemoryStorage: { [key: string]: string } = {};

  function isSupported() {
    try {
      const testKey = '__local_test_key__';
      getStorage().setItem(testKey, testKey);
      getStorage().removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  function clear(): void {
    if (isSupported()) {
      getStorage().clear();
    } else {
      inMemoryStorage = {};
    }
  }

  function getItem(name: string): string | null {
    if (isSupported()) {
      return getStorage().getItem(name);
    }
    if ('name' in inMemoryStorage) {
      return inMemoryStorage[name];
    }
    return null;
  }

  function key(index: number): string | null {
    if (isSupported()) {
      return getStorage().key(index);
    } else {
      return Object.keys(inMemoryStorage)[index] || null;
    }
  }

  function removeItem(name: string): void {
    if (isSupported()) {
      getStorage().removeItem(name);
    } else {
      delete inMemoryStorage[name];
    }
  }

  function setItem(name: string, value: string): void {
    if (isSupported()) {
      getStorage().setItem(name, value);
    } else {
      inMemoryStorage[name] = String(value); // not everyone uses TypeScript
    }
  }

  function length(): number {
    if (isSupported()) {
      return getStorage().length;
    } else {
      return Object.keys(inMemoryStorage).length;
    }
  }

  return {
    getItem,
    setItem,
    removeItem,
    clear,
    key,
    get length() {
      return length();
    },
  };
}

export const local = storageFactory(() => localStorage);
export const session = storageFactory(() => sessionStorage);
