// src/components/Calendar.tsx
import { useState, useEffect } from 'react';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const TIME_SLOTS = ['10:30', '14:00', '17:30'];

export type BookingSlot = {
  date: string; // 'yyyy-MM-dd'
  time: string; // 'HH:mm'
};

export default function Calendar({ onSelect }: { onSelect: (slot: BookingSlot) => void }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({});

  const today = startOfToday();

  useEffect(() => {
    const fetchBookings = async () => {
      const snapshot = await getDocs(collection(db, 'bookings'));
      const bookings: Record<string, string[]> = {};
      snapshot.forEach((doc) => {
        const { date, time } = doc.data();
        if (!bookings[date]) bookings[date] = [];
        bookings[date].push(time);
      });
      setBookedSlots(bookings);
    };

    fetchBookings();
  }, []);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSlotClick = (time: string) => {
    if (selectedDate) {
      onSelect({ date: format(selectedDate, 'yyyy-MM-dd'), time });
    }
  };

  const getAvailableSlots = (dateStr: string) => {
    const booked = bookedSlots[dateStr] || [];
    return TIME_SLOTS.filter((slot) => !booked.includes(slot));
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
          <div className="flex flex-wrap justify-center gap-4">
            {TIME_SLOTS.map((time) => {
              const dateStr = format(selectedDate, 'yyyy-MM-dd');
              const isBooked = bookedSlots[dateStr]?.includes(time);
              return (
                <button
                  key={time}
                  onClick={() => !isBooked && handleSlotClick(time)}
                  disabled={isBooked}
                  className={`py-2 px-4 rounded transition font-medium ${
                    isBooked
                      ? 'bg-red-300 text-white cursor-not-allowed'
                      : 'bg-pink-500 text-white hover:bg-pink-600'
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}