import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Create schedule
export const createSchedule = createAsyncThunk(
  "schedule/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/schedules/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Load schedules per medication
export const fetchSchedulesForMedication = createAsyncThunk(
  "schedule/fetchForMedication",
  async (medicationId, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/schedules/medication/${medicationId}`,
        {
          headers: { "x-api-key": API_KEY },
        }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Generate doses for schedule
export const generateDoses = createAsyncThunk(
  "schedule/generateDoses",
  async (scheduleId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/doses/generate/${scheduleId}`, {
        method: "POST",
        headers: { "x-api-key": API_KEY },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedulesForMedication.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSchedulesForMedication.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload || [];
      })
      .addCase(fetchSchedulesForMedication.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createSchedule.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default scheduleSlice.reducer;
