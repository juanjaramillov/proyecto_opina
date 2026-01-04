export type LivePulseContext =
  | {
      mode: 'demo';
    }
  | {
      mode: 'user';
      userId: string;
    };
