import { useState } from 'react';
import Calendar, { BookingSlot } from './Calendar';
import PackageForm from './PackageForm';

export default function BookingPanel() {
  const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 text-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <Calendar onSelect={setSelectedSlot} />
        </div>
        <div>
          {selectedSlot ? (
            <PackageForm slot={selectedSlot} />
          ) : (
            <p className="text-center text-gray-500">Selecione uma data e horário para continuar.</p>
          )}
        </div>
      </div>
    </div>
  );
}