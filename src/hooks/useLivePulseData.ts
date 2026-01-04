import { useCallback, useEffect, useState } from 'react';
import { buildLivePulseData, WindowFilter, SegmentFilter, CompareFilter, LivePulseData } from '../services/livePulseBuilder';
import { getUserConnected } from '../services/livePulseUtils';

export function useLivePulseData() {
  const INITIAL_WINDOW: WindowFilter = '24h';
  const INITIAL_SEGMENT: SegmentFilter = 'all';
  const INITIAL_COMPARE: CompareFilter = 'total';

  const [windowFilter, setWindowFilter] = useState<WindowFilter>(INITIAL_WINDOW);
  const [segmentFilter, setSegmentFilter] = useState<SegmentFilter>(INITIAL_SEGMENT);
  const [compareFilter, setCompareFilter] = useState<CompareFilter>(INITIAL_COMPARE);

  const [data, setData] = useState<LivePulseData>(() =>
    buildLivePulseData(
      INITIAL_WINDOW,
      INITIAL_SEGMENT,
      INITIAL_COMPARE,
      getUserConnected()
    )
  );

  const regenerate = useCallback(
    (next?: { w?: WindowFilter; s?: SegmentFilter; c?: CompareFilter }) => {
      const userConnected = getUserConnected();
      const w = next?.w ?? windowFilter;
      const s = next?.s ?? segmentFilter;
      const c = next?.c ?? compareFilter;
      setData(buildLivePulseData(w, s, c, userConnected));
    },
    [windowFilter, segmentFilter, compareFilter]
  );

  useEffect(() => {
    const interval = setInterval(() => regenerate(), 60000);
    return () => clearInterval(interval);
  }, [regenerate]);

  return {
    windowFilter,
    segmentFilter,
    compareFilter,
    data,
    setWindowFilter,
    setSegmentFilter,
    setCompareFilter,
    regenerate,
  };
}

export default useLivePulseData;
