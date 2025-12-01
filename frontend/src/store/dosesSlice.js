// frontend/src/store/dosesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ✅ Vite-compatible environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const API_KEY = import.meta.env.VITE_API_KEY || 'local-dev-key';

// Local DB setup
const DB_NAME = 'medication-manager';
const DB_STORE = 'doses';

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

async function cacheDoses(doses) {
  try {
    const db = await openIndexedDB();
    if (db) {
      const tx = db.transaction(DB_STORE, 'readwrite');
      tx.objectStore(DB_STORE).put(doses, 'upcoming');
      tx.oncomplete = () => db.close();
    } else {
      window.localStorage.setItem('doses_cache', JSON.stringify(doses));
    }
  } catch (e) {
    console.warn('Failed to cache doses', e);
  }
}

async function getCachedDoses() {
  try {
    const db = await openIndexedDB();
    if (db) {
      return await new Promise((resolve) => {
        const tx = db.transaction(DB_STORE, 'readonly');
        const req = tx.objectStore(DB_STORE).get('upcoming');
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve([]);
      });
    }
    const raw = window.localStorage.getItem('doses_cache');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Fetch upcoming doses
export const fetchUpcomingDoses = createAsyncThunk(
  'doses/fetchUpcoming',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/doses/upcoming`, {
        headers: { 'x-api-key': API_KEY },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      cacheDoses(data);
      return data;
    } catch (err) {
      console.warn('Fetch doses failed, falling back to cache', err);
      const cached = await getCachedDoses();
      if (cached.length) return cached;

      return rejectWithValue(err.message || 'Failed to load upcoming doses');
    }
  }
);

// Mark dose taken
export const markDoseTaken = createAsyncThunk(
  'doses/markTaken',
  async (doseId, { rejectWithValue }) => {
    try {
      // const res = await fetch(`${API_BASE_URL}/doses/${doseId}/taken`, {
      const res = await fetch(`${API_BASE_URL}/doses/${doseId}/take`, {
        method: 'POST',
        headers: { 'x-api-key': API_KEY },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to mark dose taken');
    }
  }
);

const dosesSlice = createSlice({
  name: 'doses',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingDoses.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUpcomingDoses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload || [];
      })
      .addCase(fetchUpcomingDoses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(markDoseTaken.fulfilled, (state, action) => {
        const updated = action.payload;
        const idx = state.items.findIndex((d) => d.id === updated.id);
        if (idx !== -1) {
          state.items[idx] = updated;
        }
      });
  },
});

export default dosesSlice.reducer;
