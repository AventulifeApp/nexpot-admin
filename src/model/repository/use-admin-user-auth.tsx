import { useCallback } from 'react';

export const useAdminUserAuthRepo = () => {
  const fetch = useCallback(() => {}, []);

  const create = useCallback(() => {}, []);

  const remove = useCallback(() => {}, []);

  const update = useCallback(() => {}, []);

  const select = useCallback(() => {}, []);

  return {
    fetch,
    create,
    remove,
    update,
    select,
  };
};