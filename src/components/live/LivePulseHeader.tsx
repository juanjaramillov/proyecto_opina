import { Link } from 'react-router-dom';

interface Props {
  isUser: boolean;
}

const LivePulseHeader: React.FC<Props> = ({ isUser }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap' }}>
      <div>
        <div style={{ fontSize: '12px', color: '#64748b' }}>Live Pulse</div>
        <h1 style={{ margin: '6px 0 0', fontSize: '34px', letterSpacing: '-.9px', fontWeight: 950, color: '#0b1324' }}>
          Señales activas (demo visual)
        </h1>
        <div style={{ marginTop: '8px', fontSize: '14px', color: '#64748b', maxWidth: '90ch' }}>
          Ves <b>Total</b>, <b>Tú</b> y puedes comparar contra un <b>segmento</b>.
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ fontSize: '12px', padding: '7px 10px', borderRadius: '999px', background: '#f8fafc', border: '1px solid #e5e7eb', color: '#475569' }}>
          Actualiza cada 60s
        </div>

        {isUser ? (
          <Link
            to="/profile"
            style={{
              textDecoration: 'none',
              fontSize: '12px',
              padding: '9px 12px',
              borderRadius: '999px',
              background: '#ecfdf5',
              color: '#16a34a',
              fontWeight: 950,
              border: '1px solid #bbf7d0',
            }}
          >
            Conectado: mostrando “Tú”
          </Link>
        ) : (
          <Link
            to="/signup"
            style={{
              textDecoration: 'none',
              fontSize: '12px',
              padding: '9px 12px',
              borderRadius: '999px',
              background: '#0b1324',
              color: '#ffffff',
              fontWeight: 950,
            }}
          >
            Conéctate para ver “Tú”
          </Link>
        )}
      </div>
    </div>
  );
};

export default LivePulseHeader;
