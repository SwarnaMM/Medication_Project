



import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchUpcomingDoses,
  markDoseTaken,
} from "../store/dosesSlice";
import { fetchMedications } from "../store/medicationsSlice";

export default function UpcomingDoses() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((s) => s.doses);
  const { items: medications } = useSelector((s) => s.medications);

  useEffect(() => {
    dispatch(fetchUpcomingDoses());
    // ensure meds are loaded to show names
    if (!medications || medications.length === 0) {
      dispatch(fetchMedications());
    }
  }, []);

  if (status === "loading") return <p>Loading upcoming doses...</p>;

  return (
    <div className="space-y-3">
      {items.length === 0 && <p className="text-gray-500">No upcoming doses.</p>}

      {items.map((dose) => {
        const med = medications.find((m) => m.id === dose.medication_id);
        const medName = med ? med.name : dose.medication_id;

        return (
          <div key={dose.id} className="p-4 bg-white shadow rounded border">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{medName}</h3>
                <p className="text-sm text-gray-500">Dose at {new Date(dose.dose_time).toLocaleString()}</p>
              </div>

              <div className="text-right">
                <p className="text-sm">{dose.taken ? "Taken" : "Pending"}</p>
                {!dose.taken && (
                  <button
                    className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
                    onClick={() => dispatch(markDoseTaken(dose.id))}
                  >
                    Mark Taken
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
