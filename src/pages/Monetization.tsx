import React from 'react';
import PageShell from '../components/layout/PageShell';

const Monetization: React.FC = () => {
    // Shared APIs
    const sectionApi = "mt-6";
    const cardApi = "rounded-3xl border border-white/12 bg-gradient-to-b from-white/5 to-white/5 shadow-lg p-4.5";
    const h2Api = "m-0 text-base text-ink font-bold";
    // h3Api y pApi eliminados por falta de uso
    const badgeApi = "inline-flex items-center gap-2 px-2.5 py-2 rounded-full border border-white/14 bg-white/5 font-extrabold text-xs text-muted mt-2.5";
    const badgeOkApi = "text-ok border-ok/25";
    const badgeWarnApi = "text-warn border-warn/25";

    return (
        <PageShell>
            <div className="min-h-screen">
                <main className="py-8 pb-16">
                    <div className="max-w-[1080px] mx-auto px-5">
                        <h1 className="m-0 text-2xl tracking-tight text-ink">Modelo de monetización</h1>
                        <p className="mt-2.5 text-sm text-muted max-w-[90ch] leading-relaxed">
                            Opina+ monetiza <b>señales agregadas</b>, no datos personales.
                            Las empresas pagan por entender tendencias reales, segmentadas y comparables en el tiempo.
                        </p>

                        {/* VALUE */}
                        <div className={`${cardApi} ${sectionApi}`}>
                            <h2 className={h2Api}>Qué compran las empresas</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-4">
                                {[
                                    { title: 'Señales tempranas', text: 'Detección de cambios de ánimo, percepción y expectativas antes de que aparezcan en métricas tradicionales.' },
                                    { title: 'Segmentación real', text: 'Análisis por edad, región, intereses y tiempo. No muestras genéricas ni encuestas aisladas.' },
                                    { title: 'Series de tiempo', text: 'Evolución histórica que permite comparar decisiones, eventos y campañas.' }
                                ].map((item, idx) => (
                                    <div key={idx} className="rounded-2xl border border-white/12 bg-white/5 p-3.5">
                                        <h3 className="m-0 text-[15px] tracking-tight text-ink">{item.title}</h3>
                                        <p className="mt-2 text-muted text-[13px] leading-relaxed">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* PLANS */}
                        <div className={sectionApi}>
                            <h2 className={h2Api}>Planes</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-4">
                                {/* Plan: Explorar */}
                                <div className="rounded-[20px] border border-white/14 bg-white/6 p-4 relative">
                                    <h3 className="m-0 text-base tracking-tight text-ink">Explorar</h3>
                                    <div className="mt-2.5 text-2xl font-black tracking-tight text-ink">Desde CLP $—</div>
                                    <div className="text-muted text-xs mt-1">Acceso inicial</div>
                                    <ul className="mt-3 pl-[18px] text-muted text-[13px] leading-relaxed">
                                        <li>Dashboard básico</li>
                                        <li>Segmentos estándar</li>
                                        <li>Ventanas cortas</li>
                                        <li>Sin exportación</li>
                                    </ul>
                                    <span className={`${badgeApi} ${badgeWarnApi}`}>● Ideal para pilotos</span>
                                </div>

                                {/* Plan: Pro */}
                                <div className="rounded-[20px] border border-white/14 bg-white/6 p-4 relative outline outline-2 outline-primary/35 shadow-[0_0_0_6px_rgba(20,184,166,0.12)] z-10">
                                    <h3 className="m-0 text-base tracking-tight text-ink">Pro</h3>
                                    <div className="mt-2.5 text-2xl font-black tracking-tight text-ink">Desde CLP $—</div>
                                    <div className="text-muted text-xs mt-1">Uso profesional</div>
                                    <ul className="mt-3 pl-[18px] text-muted text-[13px] leading-relaxed">
                                        <li>Todos los segmentos</li>
                                        <li>Series históricas</li>
                                        <li>Exportaciones</li>
                                        <li>Alertas de quiebre</li>
                                    </ul>
                                    <a className="mt-3.5 inline-block px-3.5 py-2.5 rounded-full border border-primary/35 bg-gradient-to-b from-primary/22 to-primary/8 shadow-lg font-extrabold text-[13px] text-ink no-underline" href="#">Solicitar demo</a>
                                </div>

                                {/* Plan: Enterprise */}
                                <div className="rounded-[20px] border border-white/14 bg-white/6 p-4 relative">
                                    <h3 className="m-0 text-base tracking-tight text-ink">Enterprise</h3>
                                    <div className="mt-2.5 text-2xl font-black tracking-tight text-ink">A medida</div>
                                    <div className="text-muted text-xs mt-1">Instituciones / gran escala</div>
                                    <ul className="mt-3 pl-[18px] text-muted text-[13px] leading-relaxed">
                                        <li>Acceso API</li>
                                        <li>Modelos personalizados</li>
                                        <li>Soporte dedicado</li>
                                        <li>Integración interna</li>
                                    </ul>
                                    <span className={`${badgeApi} ${badgeOkApi}`}>● Contrato anual</span>
                                </div>
                            </div>
                        </div>

                        {/* ETHICS */}
                        <div className={`${cardApi} ${sectionApi}`}>
                            <h2 className={h2Api}>Ética y privacidad</h2>
                            <p className="mt-2 text-muted text-sm leading-relaxed">
                                Ningún cliente accede a datos personales ni respuestas individuales.
                                Todo se entrega como información agregada, trazable y comparable.
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                <span className={`${badgeApi} ${badgeOkApi}`}>● Datos agregados</span>
                                <span className={`${badgeApi} ${badgeOkApi}`}>● Identidad protegida</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </PageShell>
    );
};

export default Monetization;
