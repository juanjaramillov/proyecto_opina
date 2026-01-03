import React, { useEffect, useMemo, useState } from 'react';
import PageShell from '../components/layout/PageShell';
import { Link } from 'react-router-dom';

type Survey = {
    id: string;
    title: string;
    category: string;
    status: 'Activa' | 'Cerrada' | 'Próxima';
    votes: number;
    delta7d: number; // variación vs 7d (demo)
    lastUpdate: string;
};

const Surveys: React.FC = () => {
    const [query, setQuery] = useState('');
    const [cat, setCat] = useState<'all' | 'Social' | 'Economía' | 'Política' | 'Trabajo' | 'Deportes' | 'Productos'>('all');

    // Base demo
    const baseSurveys: Survey[] = useMemo(() => ([
        { id: 's1', title: '¿Qué tema te preocupa más hoy?', category: 'Social', status: 'Activa', votes: 18234, delta7d: 6.2, lastUpdate: 'hoy' },
        { id: 's2', title: '¿Subir o bajar impuestos a pymes?', category: 'Economía', status: 'Activa', votes: 14390, delta7d: -2.1, lastUpdate: 'hoy' },
        { id: 's3', title: '¿Prioridad: seguridad o reactivación?', category: 'Política', status: 'Activa', votes: 22110, delta7d: 3.7, lastUpdate: 'hoy' },
        { id: 's4', title: '¿Modalidad laboral ideal?', category: 'Trabajo', status: 'Activa', votes: 12980, delta7d: 1.4, lastUpdate: 'ayer' },
        { id: 's5', title: '¿Equipo chileno con mejor proyección?', category: 'Deportes', status: 'Cerrada', votes: 8840, delta7d: 0.0, lastUpdate: 'hace 2 días' },
        { id: 's6', title: '¿Producto infaltable para el verano?', category: 'Productos', status: 'Próxima', votes: 0, delta7d: 0.0, lastUpdate: 'mañana' },
    ]), []);

    // Derivados (sin errors prefer-const)
    const stats = useMemo(() => {
        const total = baseSurveys.reduce((a, s) => a + (s.votes || 0), 0);
        const diff = baseSurveys.reduce((a, s) => a + (s.delta7d || 0), 0);
        const seg = baseSurveys.filter(s => s.status === 'Activa').length;

        return { total, diff, seg };
    }, [baseSurveys]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return baseSurveys
            .filter(s => (cat === 'all' ? true : s.category === cat))
            .filter(s => (q ? s.title.toLowerCase().includes(q) : true))
            .sort((a, b) => (b.votes - a.votes));
    }, [baseSurveys, query, cat]);

    // Pequeña animación demo de actualización (no cambia UX)
    useEffect(() => {
        // nada crítico: placeholder para futuras integraciones
    }, [baseSurveys]);

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

    const fmtCL = (n: number) => {
        try { return n.toLocaleString('es-CL'); } catch { return String(n); }
    };

    const badge = (status: Survey['status']) => {
        if (status === 'Activa') return { bg: '#ecfdf5', b: '#bbf7d0', c: '#16a34a' };
        if (status === 'Cerrada') return { bg: '#f1f5f9', b: '#e2e8f0', c: '#475569' };
        return { bg: '#eff6ff', b: '#bfdbfe', c: '#2563eb' };
    };

    return (
        <PageShell>
            <section style={{ background: '#ffffff', color: '#0f172a', fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '34px 18px 76px' }}>

                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap' }}>
                        <div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>Encuestas</div>
                            <h1 style={{ margin: '6px 0 0', fontSize: '34px', letterSpacing: '-.9px', fontWeight: 950, color: '#0b1324' }}>
                                Vota rápido, genera señal
                            </h1>
                            <div style={{ marginTop: '8px', fontSize: '14px', color: '#64748b', maxWidth: '90ch' }}>
                                Demo de listado con filtros. Después esto se conecta a tu backend.
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                            <Link to="/battles" style={{ textDecoration: 'none', fontSize: '12px', padding: '9px 12px', borderRadius: '999px', background: '#0b1324', color: '#ffffff', fontWeight: 950 }}>
                                Ir a Batallas →
                            </Link>
                        </div>
                    </div>

                    {/* KPIs */}
                    <div style={{ marginTop: '14px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '12px' }}>
                        <div style={{ gridColumn: 'span 4', minWidth: '240px', border: '1px solid #e5e7eb', borderRadius: '18px', padding: '14px' }}>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>Respuestas acumuladas (demo)</div>
                            <div style={{ fontSize: '28px', fontWeight: 950, marginTop: '6px' }}>{fmtCL(stats.total)}</div>
                            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>suma de votos</div>
                        </div>

                        <div style={{ gridColumn: 'span 4', minWidth: '240px', border: '1px solid #e5e7eb', borderRadius: '18px', padding: '14px' }}>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>Momentum 7d (demo)</div>
                            <div style={{ fontSize: '28px', fontWeight: 950, marginTop: '6px', color: stats.diff >= 0 ? '#16a34a' : '#dc2626' }}>
                                {stats.diff >= 0 ? '+' : ''}{stats.diff.toFixed(1).replace('.', ',')}%
                            </div>
                            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>promedio simple</div>
                        </div>

                        <div style={{ gridColumn: 'span 4', minWidth: '240px', border: '1px solid #e5e7eb', borderRadius: '18px', padding: '14px' }}>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>Encuestas activas</div>
                            <div style={{ fontSize: '28px', fontWeight: 950, marginTop: '6px' }}>{stats.seg}</div>
                            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>en curso</div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div style={{ marginTop: '14px', border: '1px solid #e5e7eb', borderRadius: '18px', padding: '12px', background: '#ffffff', boxShadow: '0 10px 24px rgba(15,23,42,.05)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '10px', alignItems: 'start' }}>
                            <div style={{ gridColumn: 'span 6', minWidth: '260px' }}>
                                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 900 }}>Buscar</div>
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Ej: seguridad, impuestos, trabajo..."
                                    style={{
                                        marginTop: '8px',
                                        width: '100%',
                                        borderRadius: '14px',
                                        border: '1px solid #e5e7eb',
                                        padding: '10px 12px',
                                        fontSize: '13px',
                                        outline: 'none',
                                    }}
                                />
                            </div>

                            <div style={{ gridColumn: 'span 6', minWidth: '260px' }}>
                                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 900 }}>Categoría</div>
                                <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    {(['all', 'Social', 'Economía', 'Política', 'Trabajo', 'Deportes', 'Productos'] as const).map((v) => (
                                        <button
                                            key={v}
                                            style={pill(cat === v)}
                                            onClick={() => setCat(v)}
                                        >
                                            {v === 'all' ? 'Todas' : v}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* List */}
                    <div style={{ marginTop: '14px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '12px' }}>
                        <div style={{ gridColumn: 'span 12' }}>
                            <div style={{ display: 'grid', gap: '10px' }}>
                                {filtered.map((s) => {
                                    const b = badge(s.status);
                                    return (
                                        <div key={s.id} style={{ border: '1px solid #e5e7eb', borderRadius: '18px', padding: '14px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                                                <div style={{ minWidth: '240px' }}>
                                                    <div style={{ fontSize: '12px', color: '#64748b' }}>{s.category} · actualizado {s.lastUpdate}</div>
                                                    <div style={{ marginTop: '6px', fontSize: '16px', fontWeight: 950, color: '#0b1324' }}>{s.title}</div>
                                                </div>

                                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                                                    <span style={{ fontSize: '12px', fontWeight: 950, background: b.bg, border: `1px solid ${b.b}`, color: b.c, padding: '7px 10px', borderRadius: '999px' }}>
                                                        {s.status}
                                                    </span>

                                                    <div style={{ textAlign: 'right' }}>
                                                        <div style={{ fontSize: '12px', color: '#64748b' }}>Votos</div>
                                                        <div style={{ fontSize: '16px', fontWeight: 950 }}>{s.votes ? fmtCL(s.votes) : '—'}</div>
                                                    </div>

                                                    <div style={{ textAlign: 'right' }}>
                                                        <div style={{ fontSize: '12px', color: '#64748b' }}>7d</div>
                                                        <div style={{ fontSize: '16px', fontWeight: 950, color: s.delta7d >= 0 ? '#16a34a' : '#dc2626' }}>
                                                            {s.delta7d >= 0 ? '+' : ''}{s.delta7d.toFixed(1).replace('.', ',')}%
                                                        </div>
                                                    </div>

                                                    <button
                                                        style={{
                                                            appearance: 'none',
                                                            border: '1px solid #0b1324',
                                                            background: '#0b1324',
                                                            color: '#ffffff',
                                                            padding: '9px 12px',
                                                            borderRadius: '999px',
                                                            fontWeight: 950,
                                                            fontSize: '12px',
                                                            cursor: s.status === 'Activa' ? 'pointer' : 'not-allowed',
                                                            opacity: s.status === 'Activa' ? 1 : 0.6,
                                                        }}
                                                        disabled={s.status !== 'Activa'}
                                                        onClick={() => { /* demo */ }}
                                                    >
                                                        Votar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                {filtered.length === 0 && (
                                    <div style={{ border: '1px solid #e5e7eb', borderRadius: '18px', padding: '18px', textAlign: 'center', color: '#64748b' }}>
                                        No hay resultados con esos filtros.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </PageShell>
    );
};

export default Surveys;
