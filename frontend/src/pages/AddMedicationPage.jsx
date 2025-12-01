// frontend/src/pages/AddMedicationPage.jsx
import React, { useState } from 'react';
import MedicationForm from '../components/MedicationForm';
import { useMedicationsList } from '../hooks/useMedications';
import { useNavigate } from 'react-router-dom';

export default function AddMedicationPage() {
  const { createMedication } = useMedicationsList();
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const [createdMedId, setCreatedMedId] = useState(null);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    setSuccessMsg('');
    try {
      const med = await createMedication(payload);
      if (med && med.id) {
        setSuccessMsg(`✓ Medication "${med.name}" created! ID: ${med.id}`);
        setCreatedMedId(med.id);
      } else {
        setSuccessMsg('Medication added.');
      }
    } catch (err) {
      setSuccessMsg(`Error: ${String(err.message || err)}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Add Medication</h2>
        <MedicationForm onSubmit={handleSubmit} submitting={submitting} />

        {successMsg && (
          <div className={`mt-4 p-3 rounded text-sm ${
            successMsg.startsWith('✓') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
          }`} data-testid="add-med-success">
            {successMsg}
          </div>
        )}
        <p className="text-xs text-slate-500 mt-6">Tip: After creating a medication, go to its detail page to add schedules and generate doses.</p>

        {createdMedId && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded space-y-3">
            <p className="text-sm text-blue-900"><strong>What's next?</strong></p>
            <div className="space-x-2">
              <button
                onClick={() => navigate(`/detail/${createdMedId}`)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View & Schedule Medicine
              </button>
              <button
                onClick={() => {
                  setCreatedMedId(null);
                  setSuccessMsg("");
                }}
                className="bg-slate-200 text-slate-700 px-4 py-2 rounded hover:bg-slate-300"
              >
                Add Another Medicine
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-slate-200 text-slate-700 px-4 py-2 rounded hover:bg-slate-300"
              >
                Back to List
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
