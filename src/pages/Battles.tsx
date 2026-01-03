import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PageShell from '../components/layout/PageShell';

type BattleChoice = 'A' | 'B';

type BattleSide = {
  title: string;
  subtitle: string;
  tag: string;
};

type Battle = {
  id: string;
  category: string;
  mode: 'Knockout' | 'Progresiva';
  question: string;
  sideA: BattleSide;
  sideB: BattleSide;
  stats: {
    totalVotes: number;
    aPct: number;
    bPct: number;
  };
};

type OverlayState = {
  show: boolean;
  aPct: number;
  bPct: number;
};

const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));
const fmtCL = (n: number) => {
  try { return n.toLocaleString('es-CL'); } catch { return String(n); }
};

const Battles: React.FC = () => {
  // --- Demo battles (mismo espíritu del componente original) ---
  const battles: Battle[] = useMemo(() => ([
    {
      id: 'b1',
      category: 'Social',
      mode: 'Knockout',
      question: '¿Qué debería ser prioridad inmediata?',
      sideA: { title: 'Seguridad', subtitle: 'Control + presencia', tag: 'Más orden' },
      sideB: { title: 'Costo de vida', subtitle: 'Ingresos + precios', tag: 'Más alivio' },
      stats: { totalVotes: 21480, aPct: 54, bPct: 46 }
    },
    {
      id: 'b2',
      category: 'Economía',
      mode: 'Progresiva',
      question: '¿Qué impulsa más el crecimiento?',
      sideA: { title: 'Bajar impuestos', subtitle: 'Incentivos a invertir', tag: 'Pro empresa' },
      sideB: { title: 'Subir inversión pública', subtitle: 'Infraestructura y empleo', tag: 'Pro Estado' },
      stats: { totalVotes: 17820, aPct: 49, bPct: 51 }
    },
    {
      id: 'b3',
      category: 'Trabajo',
      mode: 'Knockout',
      question: '¿Qué prefieres para tu semana?',
      sideA: { title: 'Híbrido', subtitle: '2–3 días remoto', tag: 'Balance' },
      sideB: { title: 'Presencial', subtitle: 'Cultura + foco', tag: 'Equipo' },
      stats: { totalVotes: 15240, aPct: 63, bPct: 37 }
    },
    {
      id: 'b4',
      category: 'Deportes',
      mode: 'Progresiva',
      question: '¿Qué define a un gran equipo?',
      sideA: { title: 'Táctica', subtitle: 'Orden + plan', tag: 'Cerebro' },
      sideB: { title: 'Talento', subtitle: 'Individualidades', tag: 'Magia' },
      stats: { totalVotes: 9840, aPct: 42, bPct: 58 }
    }
  ]), []);

  // --- Carousel state ---
  const [idx, setIdx] = useState(0);

  // --- Vote / overlay state ---
  const [overlay, setOverlay] = useState<OverlayState>({ show: false, aPct: 0, bPct: 0 });
  const [locked, setLocked] = useState(false);

  // --- Timers ---
  const carouselTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const overlayTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const current = battles[idx];

  const clearAllOverlayTimers = useCallback(() => {
    overlayTimersRef.current.forEach(t => clearTimeout(t));
    overlayTimersRef.current = [];
  }, []);

  const clearCarouselTimer = useCallback(() => {
    if (carouselTimerRef.current) clearTimeout(carouselTimerRef.current);
    carouselTimerRef.current = null;
  }, []);

  const handleNext = useCallback(() => {
    setIdx((p) => (p + 1) % battles.length);
  }, [battles.length]);

  const handleVote = useCallback((choice: BattleChoice) => {
    // choice se mantiene para futuro (telemetría), pero no lo usamos en el demo sin backend
    void choice;

    if (locked) return;
    setLocked(true);

    // Simulación de resultado post-voto (casi igual al actual, pero controlado)
    const baseA = current.stats.aPct;
    const drift = (Math.random() * 8 - 4); // -4..+4
    const aPct = clamp(Math.round(baseA + drift), 5, 95);
    const bPct = 100 - aPct;

    setOverlay({ show: true, aPct, bPct });

    clearAllOverlayTimers();

    // 1) Mantener overlay un tiempo corto
    overlayTimersRef.current.push(setTimeout(() => {
      // 2) Ocultar overlay y desbloquear
      setOverlay({ show: false, aPct, bPct });
      setLocked(false);
      // 3) Pasar a la siguiente batalla
      handleNext();
    }, 1200));
  }, [locked, current.stats.aPct, clearAllOverlayTimers, handleNext]);

  // --- Carousel effect ---
  useEffect(() => {
    // Si está mostrando overlay, no rotamos
    if (overlay.show) return;

    clearCarouselTimer();
    carouselTimerRef.current = setTimeout(() => {
      handleNext();
    }, 4500);

    return () => {
      clearCarouselTimer();
    };
  }, [idx, overlay.show, handleNext, clearCarouselTimer]);

  // Limpieza al desmontar
  useEffect(() => {
    return () => {
      clearCarouselTimer();
      clearAllOverlayTimers();
    };
  }, [clearCarouselTimer, clearAllOverlayTimers]);

  const pill = (active: boolean) => ({
    appearance: 'none' as const,
    border: active ? '1px solid #0b1324' : '1px solid #e5e7eb',
    background: active ? '#0b1324' : '#ffffff',
    color: active ? '#ffffff' : '#0b1324',
    padding: '9px 12px',
    borderRadius: '999px',
    fontWeight: 950,
    fontSize: '12px',
    cursor: 'pointer',
    boxShadow: active ? '0 12px 22px rgba(15,23,42,.10)' : '0 8px 18px rgba(15,23,42,.04)',
    transition: 'all 0.2s ease',
  });

  return (
    <PageShell>
      <section style={{ background: '#ffffff', color: '#0f172a', fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '34px 18px 76px' }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Batallas</div>
              <h1 style={{ margin: '6px 0 0', fontSize: '34px', letterSpacing: '-.9px', fontWeight: 950, color: '#0b1324' }}>
                Decide en 1 toque
              </h1>
              <div style={{ marginTop: '8px', fontSize: '14px', color: '#64748b', maxWidth: '90ch' }}>
                Una batalla a la vez, carrusel automático. Después de votar, aparece el resultado rápido.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button style={pill(false)} onClick={() => setIdx(0)}>Reiniciar</button>
              <div style={{ fontSize: '12px', padding: '7px 10px', borderRadius: '999px', background: '#f8fafc', border: '1px solid #e5e7eb', color: '#475569' }}>
                {idx + 1}/{battles.length}
              </div>
            </div>
          </div>

          {/* Battle Card */}
          <div style={{ marginTop: '16px', border: '1px solid #e5e7eb', borderRadius: '22px', padding: '14px', background: '#ffffff', boxShadow: '0 14px 34px rgba(15,23,42,.06)', position: 'relative', overflow: 'hidden' }}>

            {/* Top meta */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12px', padding: '7px 10px', borderRadius: '999px', background: '#f8fafc', border: '1px solid #e5e7eb', color: '#475569', fontWeight: 900 }}>
                  {current.category}
                </span>
                <span style={{ fontSize: '12px', padding: '7px 10px', borderRadius: '999px', background: current.mode === 'Knockout' ? '#fff7ed' : '#eff6ff', border: '1px solid #e5e7eb', color: '#0b1324', fontWeight: 900 }}>
                  {current.mode === 'Knockout' ? 'K.O.' : 'Progresiva'}
                </span>
              </div>

              <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 800 }}>
                {fmtCL(current.stats.totalVotes)} votos (demo)
              </div>
            </div>

            {/* Question */}
            <div style={{ marginTop: '10px', fontSize: '18px', fontWeight: 950, color: '#0b1324' }}>
              {current.question}
            </div>

            {/* Two sides */}
            <div style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button
                onClick={() => handleVote('A')}
                disabled={locked}
                style={{
                  textAlign: 'left',
                  border: '1px solid #e5e7eb',
                  borderRadius: '18px',
                  padding: '14px',
                  background: '#ffffff',
                  cursor: locked ? 'not-allowed' : 'pointer',
                  opacity: locked ? 0.85 : 1,
                  boxShadow: '0 12px 26px rgba(15,23,42,.05)',
                  transition: 'transform .12s ease',
                }}
              >
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 900 }}>{current.sideA.tag}</div>
                <div style={{ marginTop: '6px', fontSize: '18px', fontWeight: 950, color: '#0b1324' }}>{current.sideA.title}</div>
                <div style={{ marginTop: '6px', fontSize: '13px', color: '#475569', lineHeight: 1.55 }}>{current.sideA.subtitle}</div>
              </button>

              <button
                onClick={() => handleVote('B')}
                disabled={locked}
                style={{
                  textAlign: 'left',
                  border: '1px solid #e5e7eb',
                  borderRadius: '18px',
                  padding: '14px',
                  background: '#ffffff',
                  cursor: locked ? 'not-allowed' : 'pointer',
                  opacity: locked ? 0.85 : 1,
                  boxShadow: '0 12px 26px rgba(15,23,42,.05)',
                  transition: 'transform .12s ease',
                }}
              >
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 900 }}>{current.sideB.tag}</div>
                <div style={{ marginTop: '6px', fontSize: '18px', fontWeight: 950, color: '#0b1324' }}>{current.sideB.title}</div>
                <div style={{ marginTop: '6px', fontSize: '13px', color: '#475569', lineHeight: 1.55 }}>{current.sideB.subtitle}</div>
              </button>
            </div>

            {/* Overlay results */}
            {overlay.show && (
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(255,255,255,.92)',
                backdropFilter: 'blur(6px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '18px'
              }}>
                <div style={{ width: 'min(720px, 100%)', border: '1px solid #e5e7eb', borderRadius: '22px', padding: '14px', background: '#ffffff', boxShadow: '0 14px 34px rgba(15,23,42,.08)' }}>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Resultado</div>
                  <div style={{ marginTop: '6px', fontSize: '16px', fontWeight: 950, color: '#0b1324' }}>
                    {current.sideA.title} vs {current.sideB.title}
                  </div>

                  <div style={{ marginTop: '12px', display: 'grid', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b' }}>
                      <span><b style={{ color: '#0b1324' }}>{current.sideA.title}</b></span>
                      <span style={{ fontWeight: 950 }}>{overlay.aPct}%</span>
                    </div>
                    <div style={{ height: '12px', borderRadius: '999px', background: '#f1f5f9', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${overlay.aPct}%`, background: 'linear-gradient(90deg,#4f46e5,#6366f1)' }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b' }}>
                      <span><b style={{ color: '#0b1324' }}>{current.sideB.title}</b></span>
                      <span style={{ fontWeight: 950 }}>{overlay.bPct}%</span>
                    </div>
                    <div style={{ height: '12px', borderRadius: '999px', background: '#f1f5f9', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${overlay.bPct}%`, background: 'linear-gradient(90deg,#22c55e,#34d399)' }} />
                    </div>
                  </div>

                  <div style={{ marginTop: '12px', fontSize: '12px', color: '#94a3b8' }}>
                    Pasa automáticamente a la siguiente batalla.
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>
    </PageShell>
  );
};

export default Battles;
