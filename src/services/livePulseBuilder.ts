export type WindowFilter = '24h' | '7d' | '30d';
export type SegmentFilter = 'all' | 'rm' | 'valpo' | 'biobio';
export type CompareFilter = 'total' | 'age' | 'gender' | 'comuna';

export type Topic = { k: string; name: string; total: number; you: number | null; seg: number };
export type Comuna = { n: string; v: number };
export type HeatCell = { a: string; v: number };
export type Story = { title: string; delta: string; total: number; seg: number };

export type LivePulseData = {
  totalVotes: number;
  youVotes: number | null;
  signals: number;
  vol: number;

  moodTotal: number;
  moodYou: number | null;
  moodSeg: number;

  topics: Topic[];
  hot: string;

  trendTotal: number;
  trendYou: number | null;
  trendSeg: number;

  sTotal: number[];
  sYou: number[];
  sSeg: number[];

  geo: { N: number; C: number; S: number };
  comunas: Comuna[];
  heat: HeatCell[];
  story: Story;
};

const DEMO_PROFILE = {
  ageBand: '25-34',
  gender: 'Hombre',
  comuna: 'Providencia',
} as const;

const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));

const makeSeries = (base: number, amp: number) => {
  const arr: number[] = [];
  for (let i = 0; i < 10; i++) {
    const noise = (Math.random() - 0.5) * amp;
    arr.push(clamp(base + noise + i * 0.7, 0, 100));
  }
  return arr;
};

export function buildLivePulseData(
  windowFilter: WindowFilter,
  segmentFilter: SegmentFilter,
  compareFilter: CompareFilter,
  userConnected: boolean
): LivePulseData {
  const baseVotes = windowFilter === '24h' ? 18427 : windowFilter === '7d' ? 126840 : 532900;
  const segMult =
    segmentFilter === 'all' ? 1.0 : segmentFilter === 'rm' ? 0.46 : segmentFilter === 'valpo' ? 0.16 : 0.12;

  const totalVotes = Math.round(baseVotes * segMult * (0.92 + Math.random() * 0.18));
  const youVotes = userConnected
    ? Math.max(
        3,
        Math.round((windowFilter === '24h' ? 11 : windowFilter === '7d' ? 46 : 168) * (0.85 + Math.random() * 0.30))
      )
    : null;

  const signals = Math.round(
    (windowFilter === '24h' ? 38 : windowFilter === '7d' ? 96 : 240) * (0.85 + Math.random() * 0.35)
  );
  const vol = Math.round(
    clamp((windowFilter === '24h' ? 62 : windowFilter === '7d' ? 55 : 48) + (Math.random() * 14 - 7), 25, 85)
  );

  const moodTotal = Math.round(clamp(63 + (Math.random() * 10 - 5), 30, 85));
  const moodYou = userConnected ? Math.round(clamp(58 + (Math.random() * 14 - 7), 25, 90)) : null;
  const moodSeg = Math.round(clamp(moodTotal + (Math.random() * 10 - 5), 25, 90));

  const topicsList: Array<{ k: string; name: string }> = [
    { k: 'seguridad', name: 'Seguridad' },
    { k: 'economia', name: 'Economía' },
    { k: 'salud', name: 'Salud' },
    { k: 'educacion', name: 'Educación' },
    { k: 'migracion', name: 'Migración' },
  ];

  const raw = topicsList.map(() => 20 + Math.random() * 20);
  const sum = raw.reduce((a, b) => a + b, 0);
  const sharesTotal = raw.map((v) => Math.round((v / sum) * 100));
  sharesTotal[0] += 100 - sharesTotal.reduce((a, b) => a + b, 0);

  let sharesYou = sharesTotal.map((v) => clamp(Math.round(v + (Math.random() * 18 - 9)), 5, 70));
  const sumY = sharesYou.reduce((a, b) => a + b, 0);
  sharesYou = sharesYou.map((v) => Math.round((v / sumY) * 100));
  sharesYou[0] += 100 - sharesYou.reduce((a, b) => a + b, 0);

  const segBias = compareFilter === 'age' ? 6 : compareFilter === 'gender' ? 4 : compareFilter === 'comuna' ? 5 : 2;
  let sharesSeg = sharesTotal.map((v, i) => {
    const dir = i === 1 ? 1 : i === 0 ? -1 : 0;
    return clamp(Math.round(v + dir * segBias + (Math.random() * 10 - 5)), 5, 78);
  });
  const sumS = sharesSeg.reduce((a, b) => a + b, 0);
  sharesSeg = sharesSeg.map((v) => Math.round((v / sumS) * 100));
  sharesSeg[0] += 100 - sharesSeg.reduce((a, b) => a + b, 0);

  let hotIdx = 0;
  for (let i = 1; i < topicsList.length; i++) if (sharesTotal[i] > sharesTotal[hotIdx]) hotIdx = i;
  const hot = topicsList[hotIdx].name;
  const trendTotal = Math.random() * 8 + 6.5;
  const trendYou = userConnected ? Math.random() * 10 + 1.5 : null;
  const trendSeg = Math.random() * 8 + 3.0;

  const sTotal = makeSeries(52, 14);
  const sYou = userConnected ? makeSeries(46, 18) : sTotal.map(() => 0);
  const sSeg = makeSeries(50, 16);

  const geo = {
    N: Math.round(clamp(28 + Math.random() * 18, 10, 70)),
    C: Math.round(clamp(46 + Math.random() * 22, 10, 85)),
    S: Math.round(clamp(22 + Math.random() * 20, 10, 70)),
  };

  const comunas: Comuna[] = [
    { n: 'Santiago Centro', v: 0 },
    { n: 'Puente Alto', v: 0 },
    { n: 'Maipú', v: 0 },
    { n: 'Valparaíso', v: 0 },
    { n: 'Concepción', v: 0 },
    { n: 'La Florida', v: 0 },
  ]
    .map((c) => ({ ...c, v: Math.round(clamp(18 + Math.random() * 62, 8, 92)) }))
    .sort((a, b) => b.v - a.v)
    .slice(0, 4);

  const ages = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'];
  const heat: HeatCell[] = ages.map((a) => {
    let base = 30 + Math.random() * 50;
    if (a === DEMO_PROFILE.ageBand) base += 8;
    return { a, v: Math.round(clamp(base, 10, 95)) };
  });

  const stories: Story[] = [
    { title: 'Sube preocupación por costo de vida', delta: '+8,2%', total: sharesTotal[0], seg: sharesSeg[0] },
    { title: 'Cambia el tono en seguridad', delta: '+5,6%', total: sharesTotal[1], seg: sharesSeg[1] },
    { title: 'Salud mental gana visibilidad', delta: '+3,7%', total: sharesTotal[2], seg: sharesSeg[2] },
  ];
  const story = stories[Math.floor(Math.random() * stories.length)];

  return {
    totalVotes,
    youVotes,
    signals,
    vol,
    moodTotal,
    moodYou,
    moodSeg,
    topics: topicsList.map((t, i) => ({
      ...t,
      total: sharesTotal[i],
      you: userConnected ? sharesYou[i] : null,
      seg: sharesSeg[i],
    })),
    hot,
    trendTotal,
    trendYou,
    trendSeg,
    sTotal,
    sYou,
    sSeg,
    geo,
    comunas,
    heat,
    story,
  };
}
