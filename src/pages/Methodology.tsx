import React from 'react';
import PageShell from '../components/layout/PageShell';

const Methodology: React.FC = () => {
    // Shared Styling APIs
    const sectionApi = "mt-6";
    const cardApi = "rounded-3xl border border-white/12 bg-gradient-to-b from-white/5 to-white/5 shadow-lg p-4.5";
    const h3Api = "m-0 text-[15px] text-ink font-bold";
    const textApi = "mt-2 text-muted text-[13px] leading-relaxed";
    const badgeApi = "inline-flex items-center gap-2 px-2.5 py-2 rounded-full border border-white/14 bg-white/5 font-extrabold text-xs text-muted mt-2.5";
    const badgeOkApi = "text-ok border-ok/25";

    return (
        <PageShell>
            <div className="min-h-screen">
                <main className="py-7 pb-16">
                    <div className="max-w-[980px] mx-auto px-5">
                        <h1 className="m-0 text-2xl tracking-tight text-ink">Metodología</h1>
                        <p className="mt-2.5 text-sm text-muted max-w-[80ch] leading-relaxed">
                            Opina+ convierte opiniones simples en señales sociales confiables.
                            El foco no está en una respuesta individual, sino en la <b>tendencia agregada</b> y su evolución en el tiempo.
                        </p>

                        {/* FLOW */}
                        <div className={`${cardApi} ${sectionApi}`}>
                            <h2 className="m-0 text-base text-ink font-bold">Cómo se genera una señal</h2>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4">
                                {[
                                    { num: 1, title: 'Opinión rápida', text: 'El usuario responde encuestas breves o “batallas” diseñadas para minimizar sesgo y fricción.' },
                                    { num: 2, title: 'Identidad y contexto', text: 'Cada respuesta se asocia a un perfil verificado (edad, región, intereses), sin exponer identidad.' },
                                    { num: 3, title: 'Agregación y normalización', text: 'Las respuestas se agrupan por segmento, se limpian outliers y se transforman en índices comparables.' },
                                    { num: 4, title: 'Señal e insight', text: 'El sistema detecta tendencias, quiebres y estabilidad. La IA traduce eso en insights accionables.' }
                                ].map((step) => (
                                    <div key={step.num} className="rounded-2xl border border-white/12 bg-white/5 p-3.5">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-b from-primary/80 to-primary/30 flex items-center justify-center font-black mb-2.5 text-ink">
                                            {step.num}
                                        </div>
                                        <p className="font-black text-sm m-0 text-ink">{step.title}</p>
                                        <p className={textApi}>{step.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SPLIT */}
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${sectionApi}`}>
                            <div className={cardApi}>
                                <h3 className={h3Api}>Para el usuario</h3>
                                <p className={textApi}>
                                    - Participa gratis
                                    <br />- Ve resultados claros y didácticos
                                    <br />- Desbloquea más información al completar su perfil
                                    <br />- Su identidad protege la calidad del sistema
                                </p>
                                <span className={`${badgeApi} ${badgeOkApi}`}>● Sin exposición personal</span>
                            </div>

                            <div className={cardApi}>
                                <h3 className={h3Api}>Para empresas e instituciones</h3>
                                <p className={textApi}>
                                    - Acceso a datos agregados y segmentados
                                    <br />- Series de tiempo reales (no encuestas puntuales)
                                    <br />- Detección temprana de cambios de ánimo
                                    <br />- Inputs para decisiones estratégicas
                                </p>
                                <span className={`${badgeApi} ${badgeOkApi}`}>● Datos comparables y trazables</span>
                            </div>
                        </div>

                        {/* PRIVACY */}
                        <div className={`${cardApi} ${sectionApi}`}>
                            <h3 className={h3Api}>Privacidad y ética</h3>
                            <p className={textApi}>
                                Opina+ no vende datos personales ni respuestas individuales.
                                Todo el valor se genera a partir de <b>patrones colectivos</b>.
                                La identidad se usa únicamente para evitar fraude, duplicación y manipulación.
                            </p>
                            <span className={`${badgeApi} ${badgeOkApi}`}>● Datos agregados · ● Identidad protegida</span>
                        </div>
                    </div>
                </main>
            </div>
        </PageShell>
    );
};

export default Methodology;
