import { useState } from 'react';

export default function LandingPage() {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');

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
    <div className="font-fredoka min-h-screen bg-white text-gray-800">
      {/* Language toggle */}
      <div className="flex justify-end p-4">
        <button
          className="text-sm text-pink-600 underline hover:text-pink-800 transition"
          onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
        >
          {lang === 'pt' ? 'EN' : 'PT'}
        </button>
      </div>

      {/* Hero */}
      <section className="text-center py-16 px-4 bg-gradient-to-r from-pink-100 to-blue-100">
        <img src="/logo.svg" alt="Logo" className="w-24 mx-auto mb-6" />
        <h1 className="text-5xl font-bold mb-4 text-pink-600">{t[lang].heroTitle}</h1>
        <p className="text-xl text-gray-700 mb-8">{t[lang].heroSubtitle}</p>
        <a
          href="#services"
          className="inline-block bg-pink-500 text-white py-3 px-8 rounded-full shadow hover:bg-pink-600 transition"
        >
          {t[lang].cta}
        </a>
      </section>

      {/* Services */}
      <section id="services" className="py-16 px-6 text-center bg-white">
        <h2 className="text-4xl font-semibold mb-12 text-blue-600">{t[lang].servicesTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-8 border rounded-2xl shadow hover:shadow-md transition bg-pink-50">
            <h3 className="text-2xl font-bold mb-3">🎈 Festas</h3>
            <p className="text-gray-700">
              {lang === 'pt'
                ? 'Festas únicas com muita animação.'
                : 'Unique and fun birthday parties.'}
            </p>
          </div>
          <div className="p-8 border rounded-2xl shadow hover:shadow-md transition bg-yellow-50">
            <h3 className="text-2xl font-bold mb-3">🏕️ Kids Camp</h3>
            <p className="text-gray-700">
              {lang === 'pt'
                ? 'Férias de verão inesquecíveis.'
                : 'Unforgettable summer holiday camps.'}
            </p>
          </div>
          <div className="p-8 border rounded-2xl shadow hover:shadow-md transition bg-blue-50">
            <h3 className="text-2xl font-bold mb-3">📚 Sala de Estudo</h3>
            <p className="text-gray-700">
              {lang === 'pt'
                ? 'Apoio escolar com método e carinho.'
                : 'Tutoring with care and structure.'}
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 px-6 text-center bg-gray-50">
        <h2 className="text-4xl font-semibold mb-6 text-blue-600">{t[lang].aboutTitle}</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-700">{t[lang].aboutText}</p>
      </section>

      {/* Contact */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-4xl font-semibold mb-6 text-blue-600">{t[lang].contactTitle}</h2>
        <p className="text-lg mb-2">
          Email:{' '}
          <a
            href="mailto:arcoirisdapequenada@gmail.com"
            className="text-pink-600 underline hover:text-pink-800"
          >
            arcoirisdapequenada@gmail.com
          </a>
        </p>
        <p className="text-gray-700">Coimbra – Avenida da Guarda Inglesa, Lote E</p>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-8 bg-gray-100">
        © {new Date().getFullYear()} Arco-Íris da Pequenada
      </footer>
    </div>
  );
}