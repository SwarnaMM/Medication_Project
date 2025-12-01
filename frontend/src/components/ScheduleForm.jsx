import { useState } from "react";

export default function ScheduleForm({ medicationId, onSubmit, medications = [] }) {
  const [selectedMedId, setSelectedMedId] = useState(medicationId || "");
  const [recurrence, setRecurrence] = useState("daily");
  const [times, setTimes] = useState(["08:00", "20:00"]);
  const [daysOfWeek, setDaysOfWeek] = useState([]);

  const toggleDay = (day) => {
    setDaysOfWeek((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

  const addTime = () => setTimes([...times, "08:00"]);

  const removeTime = (i) => {
    if (times.length > 1) setTimes(times.filter((_, idx) => idx !== i));
  };

  const updateTime = (i, value) => {
    const updated = [...times];
    updated[i] = value;
    setTimes(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedMedId) {
      alert('Please select a medication');
      return;
    }

    if (times.length === 0) {
      alert('Please add at least one time');
      return;
    }

    const payload = {
      medication_id: selectedMedId,
      recurrence,
      times,
      days_of_week: recurrence === "weekly" ? daysOfWeek : []
    };

    onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 border shadow rounded space-y-4"
    >
      <div>
        <label className="block font-medium mb-1">Select Medication</label>
        <select
          className="border p-2 rounded w-full"
          value={selectedMedId}
          onChange={(e) => setSelectedMedId(e.target.value)}
        >
          <option value="">-- Choose a medication --</option>
          {medications.map((med) => (
            <option key={med.id} value={med.id}>
              {med.name} (ID: {med.id.substring(0, 8)}...)
            </option>
          ))}
        </select>
        {selectedMedId && (
          <p className="text-xs text-slate-500 mt-1">Selected ID: {selectedMedId}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Recurrence</label>
        <select
          className="border p-2 rounded w-full"
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="multiple_times_per_day">Multiple times per day</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-2">Times (HH:MM)</label>

        {times.map((t, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="time"
              className="border p-2 rounded flex-1"
              value={t}
              onChange={(e) => updateTime(i, e.target.value)}
            />
            {times.length > 1 && (
              <button
                type="button"
                className="text-red-600 underline text-sm"
                onClick={() => removeTime(i)}
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className="text-blue-600 underline text-sm"
          onClick={addTime}
        >
          + Add Time
        </button>
      </div>

      {recurrence === "weekly" && (
        <div>
          <label className="block font-medium mb-2">Days of Week</label>

          <div className="grid grid-cols-7 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (d, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggleDay(i)}
                  className={`p-2 border rounded text-sm ${
                    daysOfWeek.includes(i)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {d}
                </button>
              )
            )}
          </div>
        </div>
      )}

      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        type="submit"
      >
        Save Schedule
      </button>
    </form>
  );
}
