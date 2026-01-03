import React from 'react';
import PageShell from '../components/layout/PageShell';

const NotFound: React.FC = () => {
    return (
        <PageShell>
            <div className="min-h-screen flex items-center justify-center p-5">
                <div className="w-full max-w-[860px]">
                    <div className="rounded-3xl border border-white/12 bg-card-gradient shadow-2xl p-6 relative overflow-hidden">
                        {/* Background effects */}
                        <div className="absolute inset-0 pointer-events-none opacity-90 bg-[radial-gradient(560px_260px_at_18%_10%,rgba(20,184,166,0.14),transparent_55%),radial-gradient(520px_240px_at_88%_15%,rgba(124,255,234,0.1),transparent_58%)]"></div>

                        <div className="relative z-10">
                            <h1 className="m-0 text-[44px] leading-tight tracking-[-0.8px] text-ink font-black">404</h1>
                            <p className="mt-2.5 text-sm text-muted leading-relaxed">
                                Esta página no existe o cambió de lugar.
                                Vuelve al inicio o entra a resultados para seguir explorando.
                            </p>

                            <div className="flex gap-2.5 flex-wrap mt-4">
                                <a
                                    className="inline-flex items-center justify-center px-3.5 py-2.5 rounded-xl border border-primary/35 bg-gradient-to-b from-primary/20 to-primary/10 shadow-lg text-ink font-extrabold text-[13px] no-underline transition hover:-translate-y-px hover:bg-white/8"
                                    href="#/"
                                >
                                    Volver a Home
                                </a>
                                <a
                                    className="inline-flex items-center justify-center px-3.5 py-2.5 rounded-xl border border-white/14 bg-white/5 text-ink font-extrabold text-[13px] no-underline transition hover:-translate-y-px hover:bg-white/8"
                                    href="#/results"
                                >
                                    Ir a Resultados
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageShell>
    );
};

export default NotFound;
