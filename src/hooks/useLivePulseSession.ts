import { useEffect, useState } from 'react';

export type DemoProfile = {
  ageBand: '18-24' | '25-34' | '35-44' | '45-54' | '55+';
  gender: 'M' | 'F' | 'X';
  comuna: string;
};

export type LivePulseSession = {
  isUser: boolean;   // “usuario conectado” (real o demo)
  isDemo: boolean;   // demo activado por localStorage
  demoProfile: DemoProfile;
};

// Ajusta estos defaults si quieres otro “usuario demo”
const DEFAULT_DEMO_PROFILE: DemoProfile = {
  ageBand: '25-34',
  gender: 'M',
  comuna: 'Santiago',
};

const DEMO_KEY = 'opina_demo_user';

function readDemoFlag(): boolean {
  try {
    return localStorage.getItem(DEMO_KEY) === '1';
  } catch {
    return false;
  }
}

export default function useLivePulseSession() {
  const [isDemo, setIsDemo] = useState<boolean>(() => readDemoFlag());
  const [demoProfile] = useState<DemoProfile>(() => DEFAULT_DEMO_PROFILE);

  // En este proyecto, “isUser” era equivalente a “demo activado”
  // (cuando conectes auth real, aquí se combina: authUser || demo)
  const isUser = isDemo;
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'opina_demo_user') setIsDemo(readDemoFlag());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);


  const session: LivePulseSession = { isUser, isDemo, demoProfile };
  return session;
}
