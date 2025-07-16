import { useState } from 'react';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';

const TIME_SLOTS = ['10:30', '14:00', '17:30'];

export type BookingSlot = {
  date: string; // 'yyyy-MM-dd'
  time: string; // 'HH:mm'
};

export default function Calendar({ onSelect }: { onSelect: (slot: BookingSlot) => void }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const today = startOfToday();

  // Dummy data simulating 3-slot-per-day system
  const availableSlots: Record<string, string[]> = {};
  for (let i = 0; i < 30; i++) {
    const date = format(addDays(today, i), 'yyyy-MM-dd');
    availableSlots[date] = TIME_SLOTS; // in real case, fetch from Firebase
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSlotClick = (time: string) => {
  if (selectedDate) {
    const slot = { date: format(selectedDate, 'yyyy-MM-dd'), time };
    console.log('Selected slot:', slot); // ✅ Add this line
    onSelect(slot);
  }
};

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Escolha uma data</h2>
      <div className="grid grid-cols-7 gap-2 text-sm">
        {[...Array(30)].map((_, i) => {
          const date = addDays(today, i);
          const dateStr = format(date, 'yyyy-MM-dd');
          const isSelected = selectedDate && isSameDay(date, selectedDate);
          return (
            <button
              key={dateStr}
              onClick={() => handleDateClick(date)}
              className={`p-2 rounded text-center border hover:bg-blue-100 transition ${
                isSelected ? 'bg-blue-500 text-white font-bold' : 'bg-white'
              }`}
            >
              {format(date, 'dd/MM')}
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Escolha o horário</h3>
          <div className="flex justify-center gap-4">
            {(availableSlots[format(selectedDate, 'yyyy-MM-dd')] || []).map((time) => (
              <button
                key={time}
                onClick={() => handleSlotClick(time)}
                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition"
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}