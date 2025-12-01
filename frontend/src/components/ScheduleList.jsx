export default function ScheduleList({ schedules }) {
  if (!schedules || !schedules.length) {
    return <p className="text-gray-500">No schedules available.</p>;
  }

  return (
    <div className="space-y-3">
      {schedules.map((s) => (
        <div key={s.id} className="bg-white p-4 shadow rounded border">
          <p>
            <strong>Recurrence:</strong> {s.recurrence}
          </p>

          <p>
            <strong>Times:</strong> {Array.isArray(s.times) ? s.times.join(", ") : String(s.times)}
          </p>

          <p>
            <strong>Days:</strong>{" "}
            {Array.isArray(s.days_of_week) && s.days_of_week.length > 0
              ? s.days_of_week.join(", ")
              : "Daily"}
          </p>

          <p className="text-sm text-gray-500">
            {s.created_at ? `Created: ${new Date(s.created_at).toLocaleString()}` : null}
          </p>
        </div>
      ))}
    </div>
  );
}
