import { useState } from 'react';
import Calendar, { BookingSlot } from './Calendar';
import PackageForm from './PackageForm';

export default function BookingPanel() {
  const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null);

  return (
    <div className="bg-white border rounded-lg shadow p-6 max-w-xl mx-auto">
      {!selectedSlot ? (
        <Calendar onSelect={(slot) => setSelectedSlot(slot)} />
      ) : (
        <>
          <div className="mb-4">
            <button
              onClick={() => setSelectedSlot(null)}
              className="text-sm text-blue-600 underline hover:text-blue-800"
            >
              ← Voltar para o calendário
            </button>
          </div>
          <PackageForm slot={selectedSlot} />
        </>
      )}
    </div>
  );
}