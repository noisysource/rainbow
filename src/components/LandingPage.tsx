import { useState } from 'react';
import Calendar from './calendar';
import BookingPanel from './BookingPanel';

export default function LandingPage() {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const [showBooking, setShowBooking] = useState(false);

  const t = {
    pt: {
      heroTitle: 'Arco-Íris da Pequenada',
      heroSubtitle: 'Educação, Diversão e Momentos Felizes para Crianças!',
      cta: 'Ver Serviços',
      servicesTitle: 'Os Nossos Serviços',
      aboutTitle: 'Sobre Nós',
      aboutText: 'Criamos experiências inesquecíveis através de festas, campos de férias e apoio escolar.',
      contactTitle: 'Contacto',
    },
    en: {
      heroTitle: 'Arco-Íris da Pequenada',
      heroSubtitle: 'Education, Fun, and Unforgettable Moments for Kids!',
      cta: 'See Services',
      servicesTitle: 'Our Services',
      aboutTitle: 'About Us',
      aboutText: 'We create unforgettable experiences through parties, summer camps and after-school tutoring.',
      contactTitle: 'Contact',
    },
  };

  return (
    <div className="font-fredoka bg-white text-gray-800">
      {/* Language toggle */}
      <div className="flex justify-end p-2 pr-4">
        <button
          className="text-xs text-pink-600 underline hover:text-pink-800 transition"
          onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
        >
          {lang === 'pt' ? 'EN' : 'PT'}
        </button>
      </div>

      {/* Hero */}
      <section className="text-center py-8 px-4 bg-gradient-to-r from-pink-100 to-blue-100">
        <img src="/logo.png" alt="Logo" className="h-16 mx-auto mb-4 object-contain" />
        <h1 className="text-3xl font-bold mb-2 text-pink-600">{t[lang].heroTitle}</h1>
        <p className="text-base text-gray-700 mb-4">{t[lang].heroSubtitle}</p>
        <a
          href="#services"
          className="inline-block bg-pink-500 text-white py-2 px-5 rounded-full shadow hover:bg-pink-600 text-sm"
        >
          {t[lang].cta}
        </a>
      </section>

      {/* Services */}
      <section id="services" className="py-8 px-4 text-center">
        <h2 className="text-2xl font-semibold mb-6 text-blue-600">{t[lang].servicesTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          <div
            className="p-4 border rounded-xl shadow-sm bg-pink-50 text-sm"
            onClick={() => {
              setShowBooking(true);
              document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
            }}>
            <h3 className="text-lg font-bold mb-1">🎈 {lang === 'pt' ? 'Festas' : 'Parties'}</h3>
            <p>{lang === 'pt' ? 'Festas únicas com muita animação.' : 'Unique and fun birthday parties.'}</p>
          </div>
          <div className="p-4 border rounded-xl shadow-sm bg-yellow-50 text-sm">
            <h3 className="text-lg font-bold mb-1">🏕️ Kids Camp</h3>
            <p>{lang === 'pt' ? 'Férias de verão inesquecíveis.' : 'Unforgettable summer holiday camps.'}</p>
          </div>
          <div className="p-4 border rounded-xl shadow-sm bg-blue-50 text-sm">
            <h3 className="text-lg font-bold mb-1">📚 Sala de Estudo</h3>
            <p>{lang === 'pt' ? 'Apoio escolar com método e carinho.' : 'Tutoring with care and structure.'}</p>
          </div>
        </div>
      </section>

      <section id="booking">
        {showBooking && <BookingPanel />}
      </section>

      {/* About */}
      <section className="py-6 px-4 text-center bg-gray-50 text-sm">
        <h2 className="text-xl font-semibold mb-2 text-blue-600">{t[lang].aboutTitle}</h2>
        <p className="max-w-xl mx-auto text-gray-700">{t[lang].aboutText}</p>
      </section>

      {/* Contact */}
      <section className="py-6 px-4 text-center text-sm">
        <h2 className="text-xl font-semibold mb-2 text-blue-600">{t[lang].contactTitle}</h2>
        <p className="mb-1">
          Email:{' '}
          <a href="mailto:arcoirisdapequenada@gmail.com" className="text-pink-600 underline hover:text-pink-800">
            arcoirisdapequenada@gmail.com
          </a>
        </p>
        <p className="text-gray-700">Coimbra – Avenida da Guarda Inglesa, Lote E</p>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-500 py-4 bg-gray-100">
        © {new Date().getFullYear()} Arco-Íris da Pequenada
      </footer>
    </div>
  );
}