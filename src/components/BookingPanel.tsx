import { useState } from 'react';
import Calendar, { BookingSlot } from './Calendar';
import PackageForm from './PackageForm';

export default function BookingPanel() {
    const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null);

    return (
        <div className="bg-white border rounded-lg shadow p-6 max-w-xl mx-auto">
            {!selectedSlot ? (
                <Calendar onSelect={(slot) => {
                    console.log('Slot selected from BookingPanel:', slot);
                    setSelectedSlot(slot);
                }} />
            ) : (
                <PackageForm slot={selectedSlot} />
            )}
        </div>
    );
}