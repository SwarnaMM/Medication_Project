// frontend/src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import medicationsReducer from './medicationsSlice';
import dosesReducer from './dosesSlice';
import scheduleReducer from "./scheduleSlice";

const store = configureStore({
  reducer: {
    medications: medicationsReducer,
    doses: dosesReducer,
    schedule: scheduleReducer,
  },
});

export default store;
