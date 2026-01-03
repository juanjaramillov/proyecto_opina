import React, { useState, useEffect } from 'react';
import PageShell from '../components/layout/PageShell';
import HeroSignalCard from '../components/home/HeroSignalCard';
import HomeCarousel, { CardData } from '../components/home/HomeCarousel';

const MOCK_PULSES: CardData[] = [
  {
    id: 'p1',
    topic: 'Semana Laboral 40h',
    category: 'Laboral',
    chipA: 'Productividad',
    chipB: 'Bienestar',
    metric: '62%',
    trend: 'up',
    period: 'Últimos 7 días',
    series: [45, 48, 52, 55, 58, 60, 62],
    insight: 'El apoyo a la reducción de jornada muestra una correlación directa con sectores de servicios y tecnología. En regiones industriales, la aceptación es menor pero crece sostenidamente.'
  },
  {
    id: 'p2',
    topic: 'Reforma de Pensiones',
    category: 'Economía',
    chipA: 'Jubilación',
    chipB: 'Ahorro',
    metric: '48%',
    trend: 'stable',
    period: 'Últimos 7 días',
    series: [50, 49, 48, 48, 47, 48, 48],
    insight: 'La incertidumbre sobre el destino de los fondos mantiene la opinión dividida. El segmento 35-50 años muestra mayor preocupación por la propiedad de los fondos.'
  },
  {
    id: 'p3',
    topic: 'Seguridad Pública',
    category: 'Social',
    chipA: 'Delincuencia',
    chipB: 'Espacios',
    metric: '85%',
    trend: 'up',
    period: 'Últimos 7 días',
    series: [70, 72, 75, 78, 80, 82, 85],
    insight: 'La percepción de inseguridad domina la agenda. Hay un consenso transversal sobre la necesidad de mayor dotación policial y recuperación de espacios públicos.'
  }
];

const Home: React.FC = () => {
  const [pulseIndex, setPulseIndex] = useState(0);

  // Auto-rotate carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % MOCK_PULSES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleFetchInsight = (id: string) => {
    console.log('Fetching insight for', id);
    // Logic to refresh insight usually goes here
  };

  const handleCopyInsight = (id: string) => {
    console.log('Copying insight for', id);
    // Logic to copy to clipboard
  };

  return (
    <PageShell>
      <div className="min-h-screen">
        <main>
          {/* Hero Section */}
          <div className="relative isolate px-6 pt-14 lg:px-8">
            <div className="mx-auto max-w-2xl py-12 sm:py-20 lg:py-24">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
                  La tecnología es el lenguaje, <span className="text-primary">tu opinión la señal</span>.
                </h1>
                <p className="mt-6 text-lg leading-8 text-slate-600">
                  Transformamos el ruido social en señales claras. Participa en debates relevantes y descubre qué piensa realmente Chile, sin filtros ni sesgos.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a href="#" className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all">
                    Empezar ahora
                  </a>
                  <a href="#" className="text-sm font-semibold leading-6 text-slate-900 flex items-center gap-1 hover:text-primary transition-colors">
                    Ver demo <span aria-hidden="true" className="material-symbols-outlined text-sm">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Signal Card (Standalone Feature) */}
          <div className="mx-auto max-w-4xl px-6 mb-16">
            <HeroSignalCard
              title="Pacto Fiscal: ¿Nueva oportunidad?"
              description="El debate se reabre. Analizamos la recepción de las nuevas propuestas tributarias en tiempo real."
              category="Economía"
              responses={1240}
              href="/signals/pacto-fiscal"
            />
          </div>

          {/* Pulse Carousel */}
          <HomeCarousel
            cards={MOCK_PULSES}
            currentIndex={pulseIndex}
            onGoTo={setPulseIndex}
            onFetchInsight={handleFetchInsight}
            onCopyInsight={handleCopyInsight}
          />

          {/* Value Proposition Grid (Optional / Reconstructed generic) */}
          <div className="bg-slate-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-base font-semibold leading-7 text-primary">Plataforma Inteligente</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Todo lo que necesitas para entender el entorno
                </p>
              </div>
              <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                  <div className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 text-slate-900">
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                        <span className="material-symbols-outlined text-white">analytics</span>
                      </div>
                      Análisis en Tiempo Real
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-slate-600">
                      Monitorea tendencias y cambios de opinión al instante. Nuestra IA procesa miles de señales para entregarte insights accionables.
                    </dd>
                  </div>
                  <div className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 text-slate-900">
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                        <span className="material-symbols-outlined text-white">verified</span>
                      </div>
                      Datos Verificados
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-slate-600">
                      Olvídate de los bots y las fake news. Validamos la identidad de los usuarios para asegurar que cada opinión cuente y sea real.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

        </main>
      </div>
    </PageShell>
  );
};

export default Home;
