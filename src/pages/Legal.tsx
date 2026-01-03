import React from 'react';
import PageShell from '../components/layout/PageShell';

const Legal: React.FC = () => {
    // Shared styles
    const cardApi = "mt-4.5 rounded-3xl border border-white/12 bg-gradient-to-b from-white/5 to-white/5 shadow-lg p-4.5";
    const h2Api = "m-0 text-base text-ink font-bold";
    const pApi = "mt-2.5 text-muted text-[13px] leading-relaxed";

    return (
        <PageShell>
            <div className="min-h-screen">
                <main className="py-8 pb-16">
                    <div className="max-w-ws mx-auto px-5">
                        <h1 className="m-0 text-2xl tracking-tight text-ink">Aviso legal</h1>
                        <p className="mt-2.5 text-sm text-muted">
                            Opina+ entrega señales e insights basados en información agregada. No es “verdad absoluta”.
                        </p>

                        <div className={cardApi}>
                            <h2 className={h2Api}>1) Naturaleza del producto</h2>
                            <p className={pApi}>
                                Las visualizaciones e insights representan tendencias estadísticas (agregadas), sujetas a margen de error,
                                sesgos de participación y cambios de contexto.
                            </p>
                        </div>

                        <div className={cardApi}>
                            <h2 className={h2Api}>2) No es asesoría</h2>
                            <p className={pApi}>
                                Opina+ no presta asesoría legal, médica, financiera ni de inversión. La información es para análisis y toma de decisiones
                                con criterio profesional.
                            </p>
                        </div>

                        <div className={cardApi}>
                            <h2 className={h2Api}>3) Limitación de responsabilidad</h2>
                            <p className={pApi}>
                                El uso de la plataforma es bajo responsabilidad del usuario/cliente. Los resultados pueden variar por calidad de muestra,
                                metodología, ventanas de tiempo y segmentación seleccionada.
                            </p>
                        </div>

                        <div className={cardApi}>
                            <h2 className={h2Api}>4) Datos</h2>
                            <p className={pApi}>
                                La plataforma está diseñada para operar con datos agregados. No se entrega identidad ni respuestas individuales a terceros.
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </PageShell>
    );
};

export default Legal;
