// frontend/src/tests/MedicationsSlice.test.js
import reducer, { fetchMedications } from '../store/medicationsSlice';

describe('medicationsSlice', () => {
  it('should return initial state', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
      items: [],
      status: 'idle',
      error: null,
    });
  });

  it('handles fetchMedications.fulfilled', () => {
    const previous = {
      items: [],
      status: 'loading',
      error: null,
    };
    const payload = [{ id: '1', name: 'Test Med', is_active: true }];
    const action = { type: fetchMedications.fulfilled.type, payload };
    const next = reducer(previous, action);
    expect(next.items).toHaveLength(1);
    expect(next.status).toBe('succeeded');
  });
});
