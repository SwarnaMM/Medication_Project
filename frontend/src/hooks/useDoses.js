// frontend/src/hooks/useDoses.js
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpcomingDoses, markDoseTaken } from '../store/dosesSlice';

export function useUpcomingDoses() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.doses.items);
  const status = useSelector((state) => state.doses.status);
  const error = useSelector((state) => state.doses.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUpcomingDoses());
    }
  }, [status, dispatch]);

  const refetch = useCallback(() => {
    dispatch(fetchUpcomingDoses());
  }, [dispatch]);

  const markTaken = useCallback(
    async (doseId) => {
      const result = await dispatch(markDoseTaken(doseId));
      if (markDoseTaken.rejected.match(result)) {
        throw new Error(result.payload || 'Failed to mark taken');
      }
      return result.payload;
    },
    [dispatch]
  );

  return { doses: items, status, error, refetch, markTaken };
}
