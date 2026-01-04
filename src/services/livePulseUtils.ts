export const fmtCL = (n: number) => {
  try {
    return n.toLocaleString('es-CL');
  } catch {
    return String(n);
  }
};

export const getUserConnected = () => {
  try {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('opina_demo_user') === '1';
  } catch {
    return false;
  }
};
