



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
