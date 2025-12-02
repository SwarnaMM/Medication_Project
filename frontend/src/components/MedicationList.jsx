



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
