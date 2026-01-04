import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  windowFilter: '24h' | '7d' | '30d';
  segmentFilter: 'all' | 'rm' | 'valpo' | 'biobio';
  isUser: boolean;
  fmtCL: (n: number) => string;
  data: {
    totalVotes: number;
    youVotes: number | null;
    signals: number;
    vol: number;
  };
};

const cardStyle: React.CSSProperties = {
  minWidth: '240px',
  border: '1px solid #e5e7eb',
  borderRadius: '18px',
  padding: '14px',
};

const LivePulseKpis: React.FC<Props> = ({ windowFilter, segmentFilter, isUser, fmtCL, data }) => {
  return (
    <div style={{ marginTop: '14px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '12px' }}>
      <div style={{ gridColumn: 'span 3', ...cardStyle }}>
        <div style={{ fontSize: '12px', color: '#64748b' }}>Respuestas (Total)</div>
        <div style={{ fontSize: '28px', fontWeight: 950, marginTop: '6px' }}>{fmtCL(data.totalVotes)}</div>
        <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
          {windowFilter === '24h' ? 'últimas 24h' : windowFilter === '7d' ? 'últimos 7 días' : 'últimos 30 días'} ·{' '}
          {segmentFilter === 'all' ? 'Total Chile' : segmentFilter === 'rm' ? 'RM' : segmentFilter === 'valpo' ? 'Valparaíso' : 'Biobío'}
        </div>
      </div>

      <div style={{ gridColumn: 'span 3', ...cardStyle }}>
        <div style={{ fontSize: '12px', color: '#64748b' }}>Tus respuestas</div>
        <div style={{ fontSize: '28px', fontWeight: 950, marginTop: '6px', color: '#16a34a' }}>
          {isUser ? fmtCL(data.youVotes ?? 0) : '—'}
        </div>
        <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px' }}>
          {isUser ? (
            <Link to="/profile" style={{ color: '#16a34a', fontWeight: 950, textDecoration: 'none' }}>
              Conectado
            </Link>
          ) : (
            <Link to="/signup" style={{ color: '#0b1324', fontWeight: 950, textDecoration: 'none' }}>
              Conéctate para ver “Tú”
            </Link>
          )}
        </div>
      </div>

      <div style={{ gridColumn: 'span 3', ...cardStyle }}>
        <div style={{ fontSize: '12px', color: '#64748b' }}>Señales activas</div>
        <div style={{ fontSize: '28px', fontWeight: 950, marginTop: '6px' }}>{fmtCL(data.signals)}</div>
        <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>cambios detectados</div>
      </div>

      <div style={{ gridColumn: 'span 3', ...cardStyle }}>
        <div style={{ fontSize: '12px', color: '#64748b' }}>Volatilidad</div>
        <div style={{ fontSize: '28px', fontWeight: 950, marginTop: '6px' }}>{data.vol}</div>
        <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>0–100</div>
      </div>
    </div>
  );
};

export default LivePulseKpis;
