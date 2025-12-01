

// frontend\src\App.jsx
import React from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

import ListPage from "./pages/ListPage";
import AddMedicationPage from "./pages/AddMedicationPage";
import DetailPage from "./pages/DetailPage";
import DosesPage from "./pages/DosesPage";
import ViewSchedulesPage from "./pages/ViewSchedulesPage";

function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">MM</div>
            <div>
              <h1 className="text-lg font-semibold text-slate-800">Medication Manager</h1>
              <p className="text-xs text-slate-500">Manage medications, schedules and doses</p>
            </div>
          </div>

          <nav className="space-x-4 text-sm">
            <Link className="text-slate-600 hover:text-indigo-600" to="/">Medications</Link>
            <Link className="text-slate-600 hover:text-indigo-600" to="/add">Add</Link>
            <Link className="text-slate-600 hover:text-indigo-600" to="/doses">Doses</Link>
            <Link className="text-slate-600 hover:text-indigo-600" to="/schedules">Schedules</Link>
          </nav>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <Routes>
          <Route
            path="/"
            element={
              <ListPage
                onSelectMedication={(med) => navigate(`/detail/${med.id}`)}
              />
            }
          />
          <Route path="/add" element={<AddMedicationPage />} />
          <Route path="/doses" element={<DosesPage />} />
          <Route path="/schedules" element={<ViewSchedulesPage />} />
          <Route path="/detail/:id" element={<DetailPageWrapper />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function DetailPageWrapper() {
  const { id } = useParams();
  return <DetailPage medicationId={id} />;
}

export default App;
