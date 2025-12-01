import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScheduleList from "../components/ScheduleList";
import { fetchSchedulesForMedication } from "../store/scheduleSlice";
import { fetchMedications } from "../store/medicationsSlice";

export default function ViewSchedulesPage() {
  const dispatch = useDispatch();
  const [medicationId, setMedicationId] = useState("");
  const [searched, setSearched] = useState(false);
  const { items: schedules, status } = useSelector((s) => s.schedule);
  const { items: medications } = useSelector((s) => s.medications);

  useEffect(() => {
    // Load all medications on mount for reference
    dispatch(fetchMedications());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!medicationId.trim()) {
      alert("Please enter a medication ID");
      return;
    }
    setSearched(true);
    dispatch(fetchSchedulesForMedication(medicationId));
  };

  const selectedMed = medications.find((m) => m.id === medicationId);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">View Schedules for Medication</h2>

        <form onSubmit={handleSearch} className="space-y-4 mb-6">
          <div>
            <label className="block font-medium mb-1">Search by Medication ID or select from list</label>
            <div className="space-y-2">
              <div>
                <input
                  type="text"
                  placeholder="Paste medication ID here..."
                  className="border p-2 rounded w-full"
                  value={medicationId}
                  onChange={(e) => setMedicationId(e.target.value)}
                />
              </div>

              <div>
                <select
                  className="border p-2 rounded w-full"
                  onChange={(e) => {
                    setMedicationId(e.target.value);
                    if (e.target.value) setSearched(true);
                  }}
                  value={medicationId}
                >
                  <option value="">-- Or select a medication --</option>
                  {medications.map((med) => (
                    <option key={med.id} value={med.id}>
                      {med.name} (ID: {med.id.substring(0, 12)}...)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search Schedules
          </button>
        </form>

        {searched && (
          <div className="space-y-4">
            {selectedMed && (
              <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                <p className="text-sm"><strong>Medication:</strong> {selectedMed.name}</p>
                <p className="text-sm text-slate-600">ID: {medicationId}</p>
              </div>
            )}

            {status === "loading" && <p className="text-slate-500">Loading schedules...</p>}

            {status === "succeeded" && (
              <>
                {schedules && schedules.length > 0 ? (
                  <>
                    <h3 className="text-lg font-semibold">Schedules ({schedules.length})</h3>
                    <ScheduleList schedules={schedules} />
                  </>
                ) : (
                  <p className="text-slate-500">No schedules found for this medication.</p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
