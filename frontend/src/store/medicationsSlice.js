// frontend/src/store/medicationsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ✅ Vite-compatible env variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const API_KEY = import.meta.env.VITE_API_KEY || 'local-dev-key';

// IndexedDB / LocalStorage setup
const DB_NAME = 'medication-manager';
const DB_STORE = 'medications';

function openIndexedDB() {
  return new Promise((resolve) => {
    if (!('indexedDB' in window)) {
      resolve(null);
      return;
    }

    const request = window.indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(DB_STORE)) {
        db.createObjectStore(DB_STORE);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
  });
}

async function cacheMedications(medications) {
  try {
    const db = await openIndexedDB();
    if (db) {
      const tx = db.transaction(DB_STORE, 'readwrite');
      tx.objectStore(DB_STORE).put(medications, 'all');
      tx.oncomplete = () => db.close();
    } else {
      window.localStorage.setItem('medications_cache', JSON.stringify(medications));
    }
  } catch (error) {
    console.warn('Failed to cache medications', error);
  }
}

async function getCachedMedications() {
  try {
    const db = await openIndexedDB();
    if (db) {
      return await new Promise((resolve) => {
        const tx = db.transaction(DB_STORE, 'readonly');
        const req = tx.objectStore(DB_STORE).get('all');

        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve([]);
      });
    }

    const raw = window.localStorage.getItem('medications_cache');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// --------------------------------------------------------
// Thunks
// --------------------------------------------------------

export const fetchMedications = createAsyncThunk(
  'medications/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/medications`, {
        headers: { 'x-api-key': API_KEY },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      cacheMedications(data);
      return data;

    } catch (error) {
      console.warn('Fetch medications failed, using cache', error);

      const cached = await getCachedMedications();
      if (cached.length) return cached;

      return rejectWithValue(error.message || 'Failed to load medications');
    }
  }
);

export const addMedication = createAsyncThunk(
  'medications/add',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/medications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();

      // Update local cache
      const cached = await getCachedMedications();
      const updated = [...cached, data];
      cacheMedications(updated);

      return data;

    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add medication');
    }
  }
);

// Deactivate medication
export const deactivateMedication = createAsyncThunk(
  'medications/deactivate',
  async (medicationId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/medications/${medicationId}/deactivate`, {
        method: 'POST',
        headers: { 'x-api-key': API_KEY },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      // Update cache: fetch current cached and update
      const cached = await getCachedMedications();
      const updated = (cached || []).map((m) => (m.id === data.id ? data : m));
      cacheMedications(updated);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to deactivate medication');
    }
  }
);

// --------------------------------------------------------
// Slice
// --------------------------------------------------------

const medicationsSlice = createSlice({
  name: 'medications',
  initialState: {
    items: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedications.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMedications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload || [];
      })
      .addCase(fetchMedications.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })

      .addCase(addMedication.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addMedication.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addMedication.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
      
      builder.addCase(deactivateMedication.fulfilled, (state, action) => {
        const updated = action.payload;
        const idx = state.items.findIndex((m) => m.id === updated.id);
        if (idx !== -1) state.items[idx] = updated;
      });
  },
});

export default medicationsSlice.reducer;
