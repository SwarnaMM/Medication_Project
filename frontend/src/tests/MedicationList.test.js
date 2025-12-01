// frontend/src/tests/MedicationList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MedicationList from '../components/MedicationList';

describe('MedicationList', () => {
  it('renders empty state', () => {
    render(<MedicationList medications={[]} loading={false} error={null} />);

    expect(
      screen.getByText(/No medications yet\. Add one to get started\./i)
    ).toBeInTheDocument();
  });

  it('renders medications and handles click', () => {
    const meds = [
      { id: '1', name: 'Med A', instructions: 'Test', is_active: true },
      { id: '2', name: 'Med B', instructions: '', is_active: false },
    ];
    const onSelect = jest.fn();

    render(
      <MedicationList
        medications={meds}
        loading={false}
        error={null}
        onSelect={onSelect}
      />
    );

    const items = screen.getAllByTestId('medication-item');
    expect(items).toHaveLength(2);

    fireEvent.click(items[0]);
    expect(onSelect).toHaveBeenCalledWith(meds[0]);
  });

  it('shows error when provided', () => {
    render(
      <MedicationList
        medications={[]}
        loading={false}
        error="Failed"
      />
    );
    expect(screen.getByTestId('med-list-error')).toHaveTextContent('Failed');
  });
});
