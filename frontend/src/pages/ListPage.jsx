// frontend/src/pages/ListPage.jsx
import React from 'react';
import MedicationList from '../components/MedicationList';
import UpcomingDoses from '../components/UpcomingDoses';
import { useMedicationsList } from '../hooks/useMedications';

export default function ListPage({ onSelectMedication }) {
  const { medications, status, error, refetch } = useMedicationsList();

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Your Medications</h1>
        <div className="space-x-2">
          <button
            type="button"
            onClick={refetch}
            className="text-sm px-3 py-1 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white p-4 rounded shadow">
            <MedicationList
              medications={medications}
              loading={status === 'loading'}
              error={error}
              onSelect={onSelectMedication}
            />
          </div>
        </div>

        <aside className="space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">Upcoming Doses</h2>
            <UpcomingDoses />
          </div>

          <div className="bg-white p-4 rounded shadow text-sm text-slate-600">
            <h3 className="font-medium mb-1">Tips</h3>
            <ul className="list-disc pl-5">
              <li>Add instructions when creating a medication.</li>
              <li>Create schedules to generate upcoming doses.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
