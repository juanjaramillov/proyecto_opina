import React from 'react';

type WindowFilter = '24h' | '7d' | '30d';
type SegmentFilter = 'all' | 'rm' | 'valpo' | 'biobio';
type CompareFilter = 'total' | 'age' | 'gender' | 'comuna';

type Props = {
  windowFilter: WindowFilter;
  segmentFilter: SegmentFilter;
  compareFilter: CompareFilter;

  onWindowChange: (val: WindowFilter) => void;
  onSegmentChange: (val: SegmentFilter) => void;
  onCompareChange: (val: CompareFilter) => void;

  pillStyle: (active: boolean) => React.CSSProperties;
};

const LivePulseFilters: React.FC<Props> = ({
  windowFilter,
  segmentFilter,
  compareFilter,
  onWindowChange,
  onSegmentChange,
  onCompareChange,
  pillStyle,
}) => {
  const labelStyle: React.CSSProperties = { fontSize: '12px', color: '#64748b', fontWeight: 900 };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '10px', alignItems: 'start' }}>
      {/* Ventana */}
      <div style={{ gridColumn: 'span 3', minWidth: '240px' }}>
        <div style={labelStyle}>Ventana</div>
        <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(['24h', '7d', '30d'] as const).map((val) => (
            <button
              key={val}
              style={pillStyle(windowFilter === val)}
              onClick={() => onWindowChange(val)}
              type="button"
            >
              {val}
            </button>
          ))}
        </div>
      </div>

      {/* Segmento */}
      <div style={{ gridColumn: 'span 5', minWidth: '280px' }}>
        <div style={labelStyle}>Segmento (demo)</div>
        <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button style={pillStyle(segmentFilter === 'all')} onClick={() => onSegmentChange('all')} type="button">
            Total Chile
          </button>
          <button style={pillStyle(segmentFilter === 'rm')} onClick={() => onSegmentChange('rm')} type="button">
            RM
          </button>
          <button style={pillStyle(segmentFilter === 'valpo')} onClick={() => onSegmentChange('valpo')} type="button">
            Valparaíso
          </button>
          <button style={pillStyle(segmentFilter === 'biobio')} onClick={() => onSegmentChange('biobio')} type="button">
            Biobío
          </button>
        </div>
      </div>

      {/* Comparar */}
      <div style={{ gridColumn: 'span 4', minWidth: '280px' }}>
        <div style={labelStyle}>Comparar vs</div>
        <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button style={pillStyle(compareFilter === 'total')} onClick={() => onCompareChange('total')} type="button">
            Total
          </button>
          <button style={pillStyle(compareFilter === 'age')} onClick={() => onCompareChange('age')} type="button">
            Mi edad
          </button>
          <button style={pillStyle(compareFilter === 'gender')} onClick={() => onCompareChange('gender')} type="button">
            Mi género
          </button>
          <button style={pillStyle(compareFilter === 'comuna')} onClick={() => onCompareChange('comuna')} type="button">
            Mi comuna
          </button>
        </div>

        <div style={{ marginTop: '8px', fontSize: '12px', color: '#94a3b8' }}>
          Si no hay sesión, “Mi edad/género/comuna” usa valores demo.
        </div>
      </div>
    </div>
  );
};

export default LivePulseFilters;
