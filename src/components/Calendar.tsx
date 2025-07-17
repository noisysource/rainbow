// src/components/Calendar.tsx
import { useState, useEffect } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  addDays,
  isSameMonth,
  isBefore,
  startOfToday,
  getDay,
} from 'date-fns';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const TIME_SLOTS = ['10:30', '14:00', '17:30'];
const HOLIDAYS_PT = [
  '04-25', '05-01', '06-10', '07-04', '12-01', '12-08', '12-25'
];

export type BookingSlot = {
  date: string;
  time: string;
};

export default function Calendar({ onSelect }: { onSelect: (slot: BookingSlot) => void }) {
  const [bookings, setBookings] = useState<Record<string, Record<string, string>>>({});
  const [currentMonth, setCurrentMonth] = useState(startOfToday());
  const today = startOfToday();

  useEffect(() => {
    const fetchBookings = async () => {
      const snapshot = await getDocs(collection(db, 'bookings'));
      const bookingsMap: Record<string, Record<string, string>> = {};
      snapshot.forEach((doc) => {
        const { date, time, status } = doc.data();
        if (!bookingsMap[date]) bookingsMap[date] = {};
        bookingsMap[date][time] = status || 'confirmed';
      });
      setBookings(bookingsMap);
    };
    fetchBookings();
  }, []);

  const isHoliday = (date: Date) => HOLIDAYS_PT.includes(format(date, 'MM-dd'));

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        className="text-xl"
        disabled={isBefore(subMonths(currentMonth, 1), startOfMonth(today))}
      >←</button>
      <h2 className="text-xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
      <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="text-xl">→</button>
    </div>
  );

  const renderDays = () => {
    const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    return (
      <div className="grid grid-cols-7 mb-1">
        {days.map((day, i) => (
          <div key={i} className="text-sm font-medium text-center text-gray-600">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    let day = monthStart;
    const rows = [];
    let days = [];

    while (day <= monthEnd) {
      for (let i = 0; i < 7; i++) {
        const dateStr = format(day, 'yyyy-MM-dd');
        const isPast = isBefore(day, today);
        const weekend = getDay(day) === 0 || getDay(day) === 6;
        const holiday = isHoliday(day);

        if (isSameMonth(day, monthStart)) {
          days.push(
            <div
              key={dateStr}
              className={`p-2 text-center text-sm border rounded h-28 w-full flex flex-col justify-start ${
                isPast ? 'bg-gray-200 cursor-not-allowed' :
                holiday ? 'border-pink-500 border-2 font-semibold' :
                weekend ? 'bg-gray-100' : 'bg-white'
              }`}
            >
              <div className="font-bold text-xs mb-1">{format(day, 'd')}</div>
              <div className="flex flex-col gap-1">
                {TIME_SLOTS.map((slot) => {
                  const status = bookings[dateStr]?.[slot] || 'free';
                  let icon = '🟢';
                  let disabled = false;

                  if (status === 'confirmed') {
                    icon = '❌';
                    disabled = true;
                  } else if (status === 'pending') {
                    icon = '🟡';
                  }

                  return (
                    <button
                      key={slot}
                      onClick={() => !disabled && onSelect({ date: dateStr, time: slot })}
                      disabled={disabled || isPast}
                      className="text-xs rounded px-1 py-0.5 flex justify-center items-center gap-1 border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
                      title={status === 'pending' ? 'Reservado (por confirmar)' : status === 'confirmed' ? 'Indisponível' : 'Disponível'}
                    >
                      {slot} <span>{icon}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        } else {
          days.push(<div key={dateStr}></div>);
        }
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-1 mb-1">
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="max-w-5xl mx-auto">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
