// // frontend/src/components/MedicationDetail.jsx
// // frontend/src/components/MedicationDetail.jsx

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScheduleList from "./ScheduleList";
import ScheduleForm from "./ScheduleForm";
import {
  fetchSchedulesForMedication,
  createSchedule,
  generateDoses,
} from "../store/scheduleSlice";
import {
  fetchMedications as fetchMeds,
  deactivateMedication,
} from "../store/medicationsSlice";
import { useNavigate } from "react-router-dom";   // ✅ ADDED

export default function MedicationDetail({ medicationId }) {
  const dispatch = useDispatch();
  const { items: medications } = useSelector((s) => s.medications);
  const { items: schedules } = useSelector((s) => s.schedule);
  const [scheduleMsg, setScheduleMsg] = useState("");
  const [formKey, setFormKey] = useState(0);
  const navigate = useNavigate();   // ✅ ADDED

  const med = medications.find((m) => m.id === medicationId);

  useEffect(() => {
    dispatch(fetchMeds());
    dispatch(fetchSchedulesForMedication(medicationId));
  }, [dispatch, medicationId]);

  const handleCreateSchedule = async (payload) => {
    setScheduleMsg("");
    try {
      const res = await dispatch(createSchedule(payload));

      if (res.meta.requestStatus === "fulfilled") {
        const newSchedule = res.payload;
        setScheduleMsg(
          `✓ Schedule created successfully! Generating ${newSchedule.times.length} dose(s)...`
        );
        dispatch(generateDoses(newSchedule.id));
        dispatch(fetchSchedulesForMedication(medicationId));
        setFormKey((k) => k + 1); // Reset form
        setTimeout(() => setScheduleMsg(""), 3000);
      } else {
        setScheduleMsg(`Error: ${res.payload || "Failed to create schedule"}`);
      }
    } catch (err) {
      setScheduleMsg(`Error: ${String(err.message || err)}`);
    }
  };

  const handleDeactivate = async () => {
    if (!confirm("Are you sure you want to deactivate this medication?"))
      return;

    const res = await dispatch(deactivateMedication(med.id));

    if (res.meta && res.meta.requestStatus === "fulfilled") {
      dispatch(fetchMeds());
      dispatch(fetchSchedulesForMedication(medicationId));

      navigate("/");   // ✅ ADDED → redirect after deactivation
    } else {
      alert("Failed to deactivate medication");
    }
  };

  // if (!med) return <p>Loading medication...</p>;

if (!med) {
  navigate("/");   // ✅ redirect if medication is removed
  return null;
}

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded shadow border">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">{med.name}</h2>
            {med.instructions && (
              <p className="text-sm text-gray-700 mt-2">{med.instructions}</p>
            )}
            <p className="text-xs text-gray-500 mt-3">
              Status: {med.is_active ? "Active" : "Inactive"}
            </p>
          </div>

          <div className="ml-4">
            {med.is_active && (
              <button
                className="text-sm bg-red-600 text-white px-3 py-1 rounded"
                onClick={handleDeactivate}
              >
                Deactivate
              </button>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3">Schedules</h3>
        <ScheduleList schedules={schedules} />
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3">Add New Schedule</h3>
        {scheduleMsg && (
          <div
            className={`mb-4 p-3 rounded text-sm ${
              scheduleMsg.startsWith("✓")
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {scheduleMsg}
          </div>
        )}
        <ScheduleForm
          key={formKey}
          medicationId={medicationId}
          medications={medications}
          onSubmit={handleCreateSchedule}
        />
      </div>
    </div>
  );
}
