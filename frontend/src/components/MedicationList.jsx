// // frontend/src/components/MedicationList.jsx
// import React from 'react';

// export default function MedicationList({ medications, loading, error, onSelect }) {
//   return (
//     <div className="bg-white shadow rounded-xl p-4">
//       <div className="flex items-center justify-between mb-3">
//         <h2 className="text-lg font-semibold text-slate-800">Medications</h2>
//       </div>

//       {loading && <p className="text-sm text-slate-500">Loading medications...</p>}
//       {error && (
//         <p className="text-sm text-red-500 mb-2" data-testid="med-list-error">
//           {error}
//         </p>
//       )}

//       {!loading && medications.length === 0 && (
//         <p className="text-sm text-slate-500">No medications yet. Add one to get started.</p>
//       )}

//       <ul className="divide-y divide-slate-100">
//         {medications.map((med) => (
//           <li
//             key={med.id}
//             className="py-2 cursor-pointer hover:bg-slate-50 px-2 rounded-lg flex items-center justify-between"
//             onClick={() => onSelect && onSelect(med)}
//             data-testid="medication-item"
//           >
//             <div>
//               <p className="font-medium text-slate-800">{med.name}</p>
//               {med.instructions && (
//                 <p className="text-xs text-slate-500 line-clamp-2">{med.instructions}</p>
//               )}
//             </div>
//             {!med.is_active && (
//               <span className="text-xs rounded-full px-2 py-0.5 bg-slate-100 text-slate-500">
//                 Inactive
//               </span>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }



import { Link } from "react-router-dom";

export default function MedicationList({ medications = [], loading = false, error = null, onSelect }) {
  if (loading) return <p className="text-gray-500">Loading medications...</p>;

  if (error) return <p className="text-red-500">{String(error)}</p>;

  if (!medications.length) {
    return <p className="text-gray-500">No medications found.</p>;
  }

  return (
    <div className="space-y-3">
      {medications.map((med) => (
        <Link
          key={med.id}
          to={`/detail/${med.id}`}
          className="block p-4 bg-white shadow rounded border hover:bg-blue-50"
          onClick={() => onSelect && onSelect(med)}
        >
          <h3 className="text-lg font-semibold">{med.name}</h3>

          {med.instructions && (
            <p className="text-sm text-gray-700 mt-1 line-clamp-2">{med.instructions}</p>
          )}

          <div className="mt-3 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {med.created_at ? `Created: ${new Date(med.created_at).toLocaleString()}` : null}
            </p>

            <p className="text-sm">
              Status: {" "}
              {med.is_active ? (
                <span className="text-green-600">Active</span>
              ) : (
                <span className="text-red-600">Inactive</span>
              )}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
