import { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const PRICES = {
  A: 130,
  B: 195,
  C: 215,
  extras: {
    "Simple Snack": 65,
    "Complete Snack": 85,
    "Face Painting": 30,
    "Balloon Decoration": 50
  },
  includedChildren: 14,
  extraChild: 7
};

export const PackageForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    date: '',
    pack: 'A',
    children: 14,
    extras: [] as string[]
  });
  const [total, setTotal] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    let t = PRICES[form.pack as 'A' | 'B' | 'C'] || 0;
    const extraKids = Math.max(0, form.children - PRICES.includedChildren);
    t += extraKids * PRICES.extraChild;
    t += form.extras.reduce((sum, e) => sum + (PRICES.extras[e] || 0), 0);
    setTotal(t);
  }, [form]);

  const update = (key: string, value: any) => setForm(f => ({ ...f, [key]: value }));

  const toggleExtra = (e: string) =>
    setForm(f => ({
      ...f,
      extras: f.extras.includes(e)
        ? f.extras.filter(x => x !== e)
        : [...f.extras, e]
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'bookings'), { ...form, total });
      alert('Booking submitted!');
      setForm({ name: '', email: '', date: '', pack: 'A', children: 14, extras: [] });
      formRef.current?.reset();
    } catch (err) {
      console.error(err);
      alert('Error submitting booking.');
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <label>Name: <input name="name" onChange={e => update('name', e.target.value)} required /></label>
      <label>Email: <input type="email" name="email" onChange={e => update('email', e.target.value)} required /></label>
      <label>Date: <input type="date" name="date" onChange={e => update('date', e.target.value)} required /></label>
      <label>Pack:
        <select name="pack" onChange={e => update('pack', e.target.value)}>
          <option value="A">A (€130)</option>
          <option value="B">B (€195)</option>
          <option value="C">C (€215)</option>
        </select>
      </label>
      <label>Children:
        <input type="number" name="children" defaultValue={14} min={1} onChange={e => update('children', parseInt(e.target.value))} />
      </label>
      <fieldset>
        <legend>Extras:</legend>
        {Object.keys(PRICES.extras).map(extra => (
          <label key={extra}>
            <input type="checkbox" name="extras" value={extra} onChange={() => toggleExtra(extra)} />
            {extra} (€{PRICES.extras[extra]})
          </label>
        ))}
      </fieldset>
      <p><strong>Total: €{total}</strong></p>
      <button type="submit">Submit Booking</button>
    </form>
  );
};