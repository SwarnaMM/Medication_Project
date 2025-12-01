// frontend/src/hooks/useMedications.js
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMedications, addMedication } from '../store/medicationsSlice';

export function useMedicationsList() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.medications.items);
  const status = useSelector((state) => state.medications.status);
  const error = useSelector((state) => state.medications.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMedications());
    }
  }, [status, dispatch]);

  const refetch = useCallback(() => {
    dispatch(fetchMedications());
  }, [dispatch]);

  const createMedication = useCallback(
    async (payload) => {
      const resultAction = await dispatch(addMedication(payload));
      if (addMedication.rejected.match(resultAction)) {
        throw new Error(resultAction.payload || 'Failed to add medication');
      }
      return resultAction.payload;
    },
    [dispatch]
  );

  return {
    medications: items,
    status,
    error,
    refetch,
    createMedication,
  };
}

export function useMedicationById(id) {
  const items = useSelector((state) => state.medications.items);
  const medication = items.find((m) => m.id === id);
  return medication || null;
}
