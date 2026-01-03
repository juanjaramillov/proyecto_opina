import React, { useState, useEffect } from 'react';
import PageShell from '../components/layout/PageShell';
import ResultsFilters from '../components/results/ResultsFilters';
import ResultsKPIs from '../components/results/ResultsKPIs';
import ResultsCharts from '../components/results/ResultsCharts';
import ResultsTable from '../components/results/ResultsTable';
import { FilterState, ResultsData, Driver, RowData } from '../components/results/types';

// --- Mock Logic ---
const mockResults = (f: FilterState): ResultsData => {
  const winDays = f.win === "7 días" ? 7 : f.win === "14 días" ? 14 : f.win === "30 días" ? 30 : 90;

  const base = 1000 + (winDays * 180);
  const responses = Math.round(base + Math.random() * 420 - 200);

  const consensus = Math.round(55 + Math.random() * 30); // 55-85
  const shift = Math.round((Math.random() * 10 - 5) * 10) / 10; // -5..+5
  const seriesN = Math.min(12, Math.max(8, Math.round(winDays / 7)));

  const series = Array.from({ length: seriesN }, (_, i) => {
    const drift = shift * (i / (seriesN - 1));
    return Math.round((60 + Math.random() * 6 + drift) * 10) / 10;
  });

  const drivers: Driver[] = [
    { label: "Experiencia directa", v: Math.round(18 + Math.random() * 12) },
    { label: "Costo de vida", v: Math.round(14 + Math.random() * 12) },
    { label: "Medios / redes", v: Math.round(10 + Math.random() * 10) },
    { label: "Servicios públicos", v: Math.round(8 + Math.random() * 10) },
    { label: "Expectativas", v: Math.round(6 + Math.random() * 10) }
  ];

  const rows: RowData[] = [
    { topic: "Seguridad percibida", seg: `${f.region} · ${f.age}`, idx: Math.round((60 + Math.random() * 12) * 10) / 10, delta: +Math.round((Math.random() * 3) * 10) / 10 },
    { topic: "Optimismo económico", seg: `${f.region} · ${f.age}`, idx: Math.round((45 + Math.random() * 14) * 10) / 10, delta: -Math.round((Math.random() * 3) * 10) / 10 },
    { topic: "Confianza institucional", seg: `${f.region} · ${f.age}`, idx: Math.round((48 + Math.random() * 10) * 10) / 10, delta: (Math.random() > .5 ? 1 : -1) * Math.round((Math.random() * 2) * 10) / 10 },
    { topic: "Satisfacción transporte", seg: `${f.region} · ${f.age}`, idx: Math.round((55 + Math.random() * 16) * 10) / 10, delta: +Math.round((Math.random() * 2.5) * 10) / 10 },
    { topic: "Ánimo social general", seg: `${f.region} · ${f.age}`, idx: Math.round((50 + Math.random() * 14) * 10) / 10, delta: (Math.random() > .55 ? 1 : -1) * Math.round((Math.random() * 2.2) * 10) / 10 }
  ];

  return { responses, consensus, shift, series, drivers, rows };
};

const Results: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    region: 'RM',
    age: '18–24',
    cat: 'Sociedad',
    win: '7 días'
  });

  const [data, setData] = useState<ResultsData | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>('—');

  const nowLabel = () => {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const loadAll = React.useCallback(async () => {
    // Simulate real async fetch
    await new Promise(r => setTimeout(r, 10));
    setLastUpdate(`Última actualización: ${nowLabel()}`);
    const result = mockResults(filters);
    setData(result);
  }, [filters]);

  useEffect(() => {
    // eslint-disable-next-line
    loadAll();
  }, [loadAll]); // Initial load and when filters change (if desired, or just keep it simple)

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    const defaultFilters = { region: 'RM', age: '18–24', cat: 'Sociedad', win: '7 días' };
    setFilters(defaultFilters);
    // Needed to update data with new filters immediately
    setLastUpdate(`Última actualización: ${nowLabel()}`);
    setData(mockResults(defaultFilters));
  };

  const copyTable = () => {
    if (!data) return;
    const rowsTxt = data.rows.map(r => `${r.topic}\t${r.seg}\t${r.idx}\t${r.delta}`).join("\n");
    const txt = `Tema\tSegmento\tÍndice\tΔ\n${rowsTxt}`;
    navigator.clipboard.writeText(txt);
  };

  if (!data) return <div className="p-10 text-center text-muted">Cargando...</div>;

  return (
    <PageShell>
      <div className="min-h-screen">
        <main className="py-6 pb-16" id="dash">
          <div className="max-w-ws mx-auto px-5">
            <div className="flex items-end justify-between gap-3 flex-wrap">
              <div>
                <h1 className="m-0 text-2xl tracking-tight text-ink">Resultados</h1>
                <p className="mt-2 text-[13px] leading-relaxed max-w-[80ch] text-muted">
                  Señales agregadas por segmento (demo). Cuando conectes backend, estos paneles se alimentan de datos reales.
                </p>
              </div>
              <div className="text-muted2 text-xs font-bold" id="lastUpdate">{lastUpdate}</div>
            </div>

            <ResultsFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={resetFilters}
              onApply={loadAll}
            />

            <ResultsKPIs data={data} />

            <ResultsCharts data={data} filters={filters} />

            <ResultsTable data={data} onCopy={copyTable} />

          </div>
        </main>
      </div>
    </PageShell>
  );
};

export default Results;
