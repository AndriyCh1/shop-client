import { useEffect } from 'react';

export function useSyncWithStorage(key: string, onStorageChange: () => void) {
  useEffect(() => {
    function handleStorageEvent(e: StorageEvent) {
      if (e.key === key) {
        onStorageChange();
      }
    }

    window.addEventListener('storage', handleStorageEvent);

    return () => {
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, [key, onStorageChange]);
}
