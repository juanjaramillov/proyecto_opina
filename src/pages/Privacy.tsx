import React from 'react';
import PageShell from '../components/layout/PageShell';

const Privacy: React.FC = () => {
    // Shared styles
    const cardApi = "mt-4.5 rounded-3xl border border-white/12 bg-gradient-to-b from-white/5 to-white/5 shadow-lg p-4.5";
    const h2Api = "m-0 text-base text-ink font-bold tracking-tight";
    const ulApi = "mt-2.5 p-0 list-none flex flex-col gap-2.5";
    const liApi = "rounded-2xl border border-white/12 bg-white/5 p-3";
    const bApi = "block text-[13px] text-ink";
    const spanApi = "block mt-1.5 text-muted text-xs leading-relaxed";

    return (
        <PageShell>
            <div className="min-h-screen">
                <main className="py-8 pb-16">
                    <div className="max-w-[980px] mx-auto px-5">
                        <h1 className="m-0 text-2xl tracking-tight text-ink">Privacidad</h1>
                        <p className="mt-2.5 text-sm text-muted max-w-[90ch] leading-relaxed">
                            Esto es un resumen claro (no legalista). La idea: confianza.
                            Opina+ se construye sobre señales agregadas, no sobre exposición personal.
                        </p>

                        <div className={cardApi}>
                            <h2 className={h2Api}>Qué recopilamos</h2>
                            <ul className={ulApi}>
                                <li className={liApi}>
                                    <b className={bApi}>Respuestas a encuestas y batallas</b>
                                    <span className={spanApi}>Se usan para construir índices y tendencias en el tiempo.</span>
                                </li>
                                <li className={liApi}>
                                    <b className={bApi}>Datos de perfil (segmentación)</b>
                                    <span className={spanApi}>Ej: edad, región, intereses. Se usa para análisis por segmento.</span>
                                </li>
                                <li className={liApi}>
                                    <b className={bApi}>Identidad (para verificación)</b>
                                    <span className={spanApi}>Se usa para evitar duplicación, fraude y manipulación. No se entrega a terceros.</span>
                                </li>
                            </ul>
                            <span className="inline-flex items-center gap-2 px-2.5 py-2 rounded-full border border-ok/25 bg-white/5 font-extrabold text-xs text-ok/95 mt-2.5">● Datos agregados</span>
                        </div>

                        <div className={cardApi}>
                            <h2 className={h2Api}>Qué NO hacemos</h2>
                            <ul className={ulApi}>
                                <li className={liApi}>
                                    <b className={bApi}>No vendemos datos personales</b>
                                    <span className={spanApi}>Ningún cliente accede a identidad, datos directos ni respuestas individuales.</span>
                                </li>
                                <li className={liApi}>
                                    <b className={bApi}>No publicamos tu información</b>
                                    <span className={spanApi}>Los resultados públicos se muestran como tendencias agregadas.</span>
                                </li>
                                <li className={liApi}>
                                    <b className={bApi}>No permitimos manipulación</b>
                                    <span className={spanApi}>La verificación y controles buscan evitar bots y duplicados.</span>
                                </li>
                            </ul>
                            <span className="inline-flex items-center gap-2 px-2.5 py-2 rounded-full border border-ok/25 bg-white/5 font-extrabold text-xs text-ok/95 mt-2.5">● Sin exposición personal</span>
                        </div>

                        <div className={cardApi}>
                            <h2 className={h2Api}>Cómo protegemos</h2>
                            <ul className={ulApi}>
                                <li className={liApi}>
                                    <b className={bApi}>Separación de capas</b>
                                    <span className={spanApi}>Identidad y datos analíticos se tratan como dominios distintos.</span>
                                </li>
                                <li className={liApi}>
                                    <b className={bApi}>Acceso por permisos</b>
                                    <span className={spanApi}>El acceso interno se limita por rol y auditoría.</span>
                                </li>
                                <li className={liApi}>
                                    <b className={bApi}>Agregación para terceros</b>
                                    <span className={spanApi}>El producto para empresas se basa en segmentos y ventanas, no en usuarios.</span>
                                </li>
                            </ul>
                            <span className="inline-flex items-center gap-2 px-2.5 py-2 rounded-full border border-warn/25 bg-white/5 font-extrabold text-xs text-warn/95 mt-2.5">● Recomendado: auditoría y logging</span>
                        </div>

                        <div className={cardApi}>
                            <h2 className={h2Api}>Tus derechos</h2>
                            <p className="mt-2.5 text-muted text-[13px] leading-relaxed">
                                Puedes pedir acceso a tu información, correcciones o eliminación (según políticas y regulación aplicable).
                                En producción, esto se gestiona desde “Perfil” o soporte.
                            </p>
                            <p className="mt-2.5 text-muted2 text-xs">
                                Nota: este texto es conceptual. Si vas a producción real, necesitas términos legales revisados por abogado.
                            </p>
                        </div>

                    </div>
                </main>
            </div>
        </PageShell>
    );
};

export default Privacy;
