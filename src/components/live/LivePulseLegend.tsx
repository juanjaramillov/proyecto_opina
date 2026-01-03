import React from 'react';

const itemStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '12px',
  color: '#475569',
  padding: '7px 10px',
  border: '1px solid #e5e7eb',
  borderRadius: '999px',
  background: '#ffffff',
};

const dot = (bg: string): React.CSSProperties => ({
  width: '10px',
  height: '10px',
  borderRadius: '999px',
  background: bg,
});

const LivePulseLegend: React.FC = () => (
  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '12px' }}>
    <span style={itemStyle}>
      <span style={dot('#4f46e5')} /> Total
    </span>
    <span style={itemStyle}>
      <span style={dot('#22c55e')} /> Tú
    </span>
    <span style={itemStyle}>
      <span style={dot('#a78bfa')} /> Segmento comparado
    </span>
  </div>
);

export default LivePulseLegend;
