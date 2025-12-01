// frontend/src/pages/DetailPage.jsx
import React from 'react';
import MedicationDetail from '../components/MedicationDetail';

export default function DetailPage({ medicationId }) {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <MedicationDetail medicationId={medicationId} />
    </div>
  );
}
