// // frontend/src/components/MedicationForm.jsx
// import React, { useState } from 'react';

// const initialForm = {
//   name: '',
//   instructions: '',
//   recurrence: 'daily',
//   times: '08:00,20:00',
//   days_of_week: '1,3,5',
// };

// export default function MedicationForm({ onSubmit, submitting }) {
//   const [form, setForm] = useState(initialForm);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((f) => ({ ...f, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     if (!form.name.trim()) {
//       setError('Name is required');
//       return;
//     }

//     const payload = {
//       name: form.name.trim(),
//       instructions: form.instructions.trim() || undefined,
//       schedule: {
//         recurrence: form.recurrence,
//         times: form.times
//           .split(',')
//           .map((t) => t.trim())
//           .filter(Boolean),
//       },
//     };

//     if (form.recurrence === 'weekly') {
//       payload.schedule.days_of_week = form.days_of_week
//         .split(',')
//         .map((d) => parseInt(d.trim(), 10))
//         .filter((n) => !Number.isNaN(n));
//     }

//     try {
//       await onSubmit(payload);
//       setForm(initialForm);
//     } catch (err) {
//       setError(err.message || 'Failed to submit');
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white shadow rounded-xl p-4 space-y-4"
//       data-testid="medication-form"
//     >
//       <h2 className="text-lg font-semibold text-slate-800">Add Medication</h2>

//       {error && <p className="text-sm text-red-500">{error}</p>}

//       <div>
//         <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
//         <input
//           type="text"
//           name="name"
//           className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           value={form.name}
//           onChange={handleChange}
//           placeholder="Paracetamol"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-slate-700 mb-1">
//           Instructions (optional)
//         </label>
//         <textarea
//           name="instructions"
//           className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           rows={3}
//           value={form.instructions}
//           onChange={handleChange}
//           placeholder="e.g. Take after food"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-slate-700 mb-1">
//             Recurrence type
//           </label>
//           <select
//             name="recurrence"
//             value={form.recurrence}
//             onChange={handleChange}
//             className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="daily">Daily</option>
//             <option value="weekly">Weekly</option>
//             <option value="times_per_day">Multiple times per day</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-slate-700 mb-1">
//             Times (HH:MM, comma separated)
//           </label>
//           <input
//             type="text"
//             name="times"
//             value={form.times}
//             onChange={handleChange}
//             className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             placeholder="08:00,20:00"
//           />
//         </div>
//       </div>

//       {form.recurrence === 'weekly' && (
//         <div>
//           <label className="block text-sm font-medium text-slate-700 mb-1">
//             Days of week (1=Mon...7=Sun)
//           </label>
//           <input
//             type="text"
//             name="days_of_week"
//             value={form.days_of_week}
//             onChange={handleChange}
//             className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             placeholder="1,3,5"
//           />
//         </div>
//       )}

//       <button
//         type="submit"
//         disabled={submitting}
//         className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60"
//       >
//         {submitting ? 'Saving...' : 'Save medication'}
//       </button>
//     </form>
//   );
// }




import { useState } from "react";

export default function MedicationForm({ onSubmit, submitting = false }) {
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const payload = {
      name: name.trim(),
      instructions: instructions.trim() || undefined,
    };
    onSubmit(payload);
    setName("");
    setInstructions("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 rounded shadow border"
    >
      <div>
        <label className="block mb-1 font-medium">Medication Name</label>
        <input
          type="text"
          placeholder="Enter name"
          className="w-full border rounded p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Instructions (optional)</label>
        <textarea
          placeholder="e.g. Take after food"
          className="w-full border rounded p-2"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          rows={3}
        />
      </div>

      <div className="flex items-center justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {submitting ? "Saving..." : "Save Medication"}
        </button>
      </div>
    </form>
  );
}
