// src/ui/styles.ts
// Mini design-system: mismos estilos actuales, centralizados (NO cambia look)

export const fonts = {
    base:
        'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
};

export const colors = {
    text: '#0f172a',
    title: '#0b1324',
    muted: '#64748b',
    faint: '#94a3b8',
    border: '#e5e7eb',
    panel: '#ffffff',
    soft: '#f8fafc',
};

export const layout = {
    page: (maxWidth = 1200) => ({
        maxWidth: `${maxWidth}px`,
        margin: '0 auto',
        padding: '34px 18px 76px',
    }),
};

export const cards = {
    panel: {
        border: `1px solid ${colors.border}`,
        borderRadius: '18px',
        background: colors.panel,
        boxShadow: '0 10px 24px rgba(15,23,42,.05)',
    } as const,

    panelStrong: {
        border: `1px solid ${colors.border}`,
        borderRadius: '22px',
        background: colors.panel,
        boxShadow: '0 14px 34px rgba(15,23,42,.06)',
    } as const,

    inner: {
        border: '1px solid #eef2f7',
        borderRadius: '16px',
        background: colors.panel,
    } as const,
};

export const pills = {
    base: {
        appearance: 'none' as const,
        padding: '9px 12px',
        borderRadius: '999px',
        fontWeight: 950,
        fontSize: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    } as const,
    active: {
        border: `1px solid ${colors.title}`,
        background: colors.title,
        color: colors.panel,
        boxShadow: '0 12px 22px rgba(15,23,42,.10)',
    } as const,
    idle: {
        border: `1px solid ${colors.border}`,
        background: colors.panel,
        color: colors.title,
        boxShadow: '0 8px 18px rgba(15,23,42,.04)',
    } as const,
};

export const text = {
    kicker: { fontSize: '12px', color: colors.muted } as const,
    muted: { fontSize: '12px', color: colors.muted } as const,
    faint: { fontSize: '12px', color: colors.faint } as const,
    h1: {
        margin: '6px 0 0',
        fontSize: '34px',
        letterSpacing: '-.9px',
        fontWeight: 950,
        color: colors.title,
    } as const,
};
