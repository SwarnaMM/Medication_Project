// frontend/src/pages/DosesPage.jsx
import React from 'react';
import UpcomingDoses from '../components/UpcomingDoses';
import { useUpcomingDoses } from '../hooks/useDoses';

export default function DosesPage() {
  const { doses, status, error, refetch, markTaken } = useUpcomingDoses();

  const handleMarkTaken = async (dose) => {
    try {
      await markTaken(dose.id);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Upcoming Doses</h1>
        <div>
          <button
            type="button"
            onClick={refetch}
            className="text-sm px-3 py-1 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <UpcomingDoses
          doses={doses}
          loading={status === 'loading'}
          error={error}
          onMarkTaken={handleMarkTaken}
        />
      </div>
    </div>
  );
}
