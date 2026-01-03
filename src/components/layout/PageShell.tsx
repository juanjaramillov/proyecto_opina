import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './PageShell.css'; // Keeping import to avoid breaking build if file exists, but will empty it later.

interface PageShellProps {
    children: ReactNode;
}

const PageShell: React.FC<PageShellProps> = ({ children }) => {
    const location = useLocation();
    const path = location.pathname;

    // const isActive = (route: string) => {
    //     const baseClasses = "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border border-transparent";
    //     return path === route
    //         ? `${baseClasses} bg-indigo-50 text-primary border-indigo-100/50 shadow-sm`
    //         : `${baseClasses} text-slate-500 hover:text-slate-900 hover:bg-slate-50`;
    // };

    return (
        <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-bg">
            <header style={{ position: 'sticky', top: 0, zIndex: 50, background: '#ffffff', borderBottom: '1px solid #eef2f7' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px' }}>
                    {/* Brand */}
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-sm flex items-center justify-center text-white border border-indigo-400/20 transition-transform duration-300 hover:scale-105">
                            <span className="material-symbols-outlined text-[20px]">graphic_eq</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-800">
                            opina<span className="text-primary">+</span>
                        </span>
                    </Link>

                    {/* Links */}
                    <nav style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        {[
                            { path: '/', label: 'Inicio' },
                            { path: '/live-pulse', label: 'Pulso en Vivo' },
                            { path: '/surveys', label: 'Encuestas' },
                            { path: '/results', label: 'Resultados' },
                            { path: '/battles', label: 'Batallas' },
                            { path: '/index-o', label: 'Índice O+' }
                        ].map((link) => {
                            const active = path === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    style={{
                                        textDecoration: 'none',
                                        fontWeight: 800,
                                        fontSize: '13px',
                                        color: '#0b1324',
                                        padding: '9px 12px',
                                        borderRadius: '999px',
                                        background: active ? '#f1f5f9' : 'transparent',
                                        border: active ? '1px solid #e5e7eb' : '1px solid transparent'
                                    }}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Profile / CTA (derecha) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Link to="/signup" style={{ textDecoration: 'none', fontWeight: 900, fontSize: '13px', padding: '10px 14px', borderRadius: '999px', background: '#0b1324', color: '#ffffff', boxShadow: '0 12px 24px rgba(15,23,42,.14)' }}>
                            Entrar
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1 w-full">
                {children}
            </main>

            <footer className="w-full border-t border-slate-200 bg-white/50 backdrop-blur-sm mt-auto py-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-slate-500 font-medium text-sm mb-4">
                        Opina+ · Señales sociales basadas en opinión real
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400 font-medium">
                        <Link to="/privacy" className="hover:text-primary transition-colors">Privacidad</Link>
                        <Link to="/cookies" className="hover:text-primary transition-colors">Cookies</Link>
                        <Link to="/legal" className="hover:text-primary transition-colors">Legal</Link>
                        <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PageShell;
