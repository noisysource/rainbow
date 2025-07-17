// src/components/PackageForm.tsx
import { useState, useEffect } from 'react';
import type { BookingSlot } from './Calendar';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const BASE_PRICE = 130;
const EXTRAS = [
  { id: 'hotdogs', label: 'Hot Dogs (€1.50 cada)', price: 1.5 },
  { id: 'mousse', label: 'Mousse de Chocolate (8 por €4)', price: 0.5 },
  { id: 'fruit', label: 'Prato de Fruta (€3)', price: 3 },
  { id: 'balloons', label: 'Balões e Decoração (€10)', price: 10 },
];

export default function PackageForm({ slot }: { slot: BookingSlot }) {
  const [numKids, setNumKids] = useState(14);
  const [selectedExtras, setSelectedExtras] = useState<Record<string, number>>({});
  const [total, setTotal] = useState(BASE_PRICE);

  useEffect(() => {
    let extrasTotal = 0;
    for (const [key, qty] of Object.entries(selectedExtras)) {
      const item = EXTRAS.find((e) => e.id === key);
      if (item) extrasTotal += item.price * qty;
    }
    const extraKids = Math.max(numKids - 14, 0);
    setTotal(BASE_PRICE + extraKids * 7 + extrasTotal);
  }, [numKids, selectedExtras]);

  const handleExtrasChange = (id: string, qty: number) => {
    setSelectedExtras((prev) => ({ ...prev, [id]: qty }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const bookingData = {
    date: slot.date,
    time: slot.time,
    numKids,
    extras: selectedExtras,
    total,
    createdAt: new Date(),
  };

  try {
    await addDoc(collection(db, 'bookings'), bookingData);
    alert('Reserva enviada com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar reserva:', error);
    alert('Erro ao enviar reserva. Tente novamente.');
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <h3 className="text-lg font-semibold text-center mb-2">
        Reserva para {slot.date} às {slot.time}
      </h3>

      <label className="block text-sm">
        Nº de Crianças:
        <input
          type="number"
          min={1}
          value={numKids}
          onChange={(e) => setNumKids(Number(e.target.value))}
          className="border p-2 rounded w-full mt-1"
        />
      </label>

      {EXTRAS.map((extra) => (
        <label key={extra.id} className="block text-sm">
          {extra.label}
          <input
            type="number"
            min={0}
            value={selectedExtras[extra.id] || 0}
            onChange={(e) => handleExtrasChange(extra.id, Number(e.target.value))}
            className="border p-2 rounded w-full mt-1"
          />
        </label>
      ))}

      <div className="text-right font-semibold text-pink-600">
        Total: €{total.toFixed(2)}
      </div>

      <button
        type="submit"
        className="bg-pink-500 text-white py-2 px-6 rounded hover:bg-pink-600 w-full"
      >
        Reservar
      </button>
    </form>
  );
}