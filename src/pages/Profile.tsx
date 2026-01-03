import React, { useState } from 'react';
import PageShell from '../components/layout/PageShell';

interface ProfileState {
  name: string;
  age: string;
  region: string;
  comuna: string;
  i1: string;
  i2: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileState>({
    name: '',
    age: '',
    region: '',
    comuna: '',
    i1: '',
    i2: ''
  });

  const [verified, setVerified] = useState(false);
  const [lastUpdate, setLastUpdate] = useState('—');

  const nowLabel = () => {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const pct = React.useMemo(() => {
    const fields = [
      profile.name.trim(),
      profile.age.trim(),
      profile.region.trim(),
      profile.comuna.trim(),
      profile.i1.trim(),
      profile.i2.trim()
    ];
    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  }, [profile]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setProfile(prev => ({ ...prev, [id]: value }));
  };

  const resetForm = () => {
    setProfile({
      name: '',
      age: '',
      region: '',
      comuna: '',
      i1: '',
      i2: ''
    });
  };

  const saveProfile = async () => {
    // Mock save
    alert("Perfil guardado (demo).");
    setLastUpdate(`Actualizado: ${nowLabel()}`);
    // Ideally we would send data to backend here
  };

  const startVerification = async () => {
    alert("Simulación: inicia verificación (demo).");
  };

  const toggleVerified = () => {
    setVerified(!verified);
  };

  // Helper for badges
  const getProfileBadge = () => {
    const base = "inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full border bg-white/5 font-extrabold text-xs whitespace-nowrap";
    if (pct === 100) return <span className={`${base} border-ok/25 text-ok/95`}>● Perfil: {pct}%</span>;
    if (pct >= 60) return <span className={`${base} border-warn/25 text-warn/95`}>● Perfil: {pct}%</span>;
    return <span className={`${base} border-danger/25 text-danger/95`}>● Perfil: {pct}%</span>;
  };

  const getUnlockBadge = () => {
    const unlocked = pct === 100 && verified;
    const base = "inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full border bg-white/5 font-extrabold text-xs whitespace-nowrap";
    if (unlocked) return <span className={`${base} border-ok/25 text-ok/95`}>● Estado: Desbloqueado</span>;
    return <span className={`${base} border-danger/25 text-danger/95`}>● Estado: Bloqueado</span>;
  };

  return (
    <PageShell>
      <div className="min-h-screen">
        <main className="py-6 pb-16" id="prof">
          <div className="max-w-ws mx-auto px-5">
            <div className="flex items-end justify-between gap-3 flex-wrap">
              <div>
                <h1 className="m-0 text-2xl tracking-tight text-ink">Tu Perfil</h1>
                <p className="mt-2 text-[13px] leading-relaxed max-w-[80ch] text-muted">
                  Completa tus datos para mejorar la precisión de los insights y desbloquear funciones.
                </p>
              </div>
              <div className="text-muted2 text-xs font-bold" id="lastUpdate-profile">{lastUpdate}</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.8fr)] gap-6 mt-6">
              {/* Form */}
              <div className="rounded-r2 border border-stroke bg-card-gradient shadow-home-2 p-3.5 relative overflow-hidden h-fit">
                <div className="font-black text-[15px] tracking-tight text-ink">Datos Demográficos</div>
                <div className="text-muted2 text-xs font-bold mt-1.5">Usados para segmentación anónima.</div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3.5">
                  <div>
                    <label className="block text-muted2 text-xs font-bold mb-1.5">Nombre</label>
                    <input
                      className="w-full py-2.5 px-3 rounded-xl border border-white/14 bg-bg2/45 text-ink font-bold outline-none placeholder:text-white/10"
                      id="name"
                      value={profile.name}
                      onChange={handleChange}
                      placeholder="Juan Ignacio"
                    />
                  </div>
                  <div>
                    <label className="block text-muted2 text-xs font-bold mb-1.5">Edad</label>
                    <select
                      className="w-full py-2.5 px-3 rounded-xl border border-white/14 bg-bg2/45 text-ink font-bold outline-none appearance-none"
                      id="age"
                      value={profile.age}
                      onChange={handleChange}
                    >
                      <option value="">Selecciona</option>
                      <option>18–24</option>
                      <option>25–34</option>
                      <option>35–44</option>
                      <option>45–54</option>
                      <option>55+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-muted2 text-xs font-bold mb-1.5">Región</label>
                    <select
                      className="w-full py-2.5 px-3 rounded-xl border border-white/14 bg-bg2/45 text-ink font-bold outline-none appearance-none"
                      id="region"
                      value={profile.region}
                      onChange={handleChange}
                    >
                      <option value="">Selecciona</option>
                      <option>RM</option>
                      <option>Valparaíso</option>
                      <option>Biobío</option>
                      <option>La Araucanía</option>
                      <option>Antofagasta</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-muted2 text-xs font-bold mb-1.5">Comuna</label>
                    <input
                      className="w-full py-2.5 px-3 rounded-xl border border-white/14 bg-bg2/45 text-ink font-bold outline-none placeholder:text-white/10"
                      id="comuna"
                      value={profile.comuna}
                      onChange={handleChange}
                      placeholder="Providencia"
                    />
                  </div>

                  <div>
                    <label className="block text-muted2 text-xs font-bold mb-1.5">Intereses (1)</label>
                    <select
                      className="w-full py-2.5 px-3 rounded-xl border border-white/14 bg-bg2/45 text-ink font-bold outline-none appearance-none"
                      id="i1"
                      value={profile.i1}
                      onChange={handleChange}
                    >
                      <option value="">Selecciona</option>
                      <option>Noticias</option>
                      <option>Deporte</option>
                      <option>Tecnología</option>
                      <option>Economía</option>
                      <option>Cultura</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-muted2 text-xs font-bold mb-1.5">Intereses (2)</label>
                    <select
                      className="w-full py-2.5 px-3 rounded-xl border border-white/14 bg-bg2/45 text-ink font-bold outline-none appearance-none"
                      id="i2"
                      value={profile.i2}
                      onChange={handleChange}
                    >
                      <option value="">Selecciona</option>
                      <option>Noticias</option>
                      <option>Deporte</option>
                      <option>Tecnología</option>
                      <option>Economía</option>
                      <option>Cultura</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2.5 flex-wrap justify-end mt-4">
                  <button
                    className="border border-white/14 bg-white/5 text-ink rounded-xl px-3 py-2.5 font-extrabold text-[13px] cursor-pointer transition hover:-translate-y-px hover:bg-white/8"
                    type="button"
                    onClick={resetForm}
                  >
                    Reset
                  </button>
                  <button
                    className="border border-primary/35 bg-gradient-to-b from-primary/20 to-primary/10 shadow-home text-ink rounded-xl px-3 py-2.5 font-extrabold text-[13px] cursor-pointer transition hover:-translate-y-px hover:bg-white/8"
                    type="button"
                    onClick={saveProfile}
                  >
                    Guardar
                  </button>
                </div>
              </div>

              {/* Locks / State */}
              <div className="flex flex-col gap-3" id="manual-scroll-to-state">
                <div className="rounded-r2 border border-stroke bg-card-gradient shadow-home-2 p-3.5 relative overflow-hidden">
                  <div className="font-black text-[15px] tracking-tight text-ink">Desbloqueos</div>
                  <div className="text-muted2 text-xs font-bold mt-1.5">Reglas claras para el usuario.</div>

                  <div className="h-px bg-white/10 my-3"></div>

                  <div className="rounded-2xl border border-white/12 bg-white/5 p-3">
                    <p className="font-black text-sm tracking-tight text-ink m-0">Análisis completos</p>
                    <p className="mt-2 text-muted text-xs leading-relaxed">
                      Requiere <b>perfil 100%</b> e <b>identidad verificada</b>. Con eso se habilitan comparaciones por segmento, series históricas y exportaciones.
                    </p>
                    <div className="flex gap-2.5 flex-wrap items-center justify-between mt-2.5">
                      {getProfileBadge()}
                      {getUnlockBadge()}
                    </div>
                  </div>

                  <div className="h-px bg-white/10 my-3"></div>

                  <div className="rounded-2xl border border-white/12 bg-white/5 p-3">
                    <p className="font-black text-sm tracking-tight text-ink m-0">Participación avanzada</p>
                    <p className="mt-2 text-muted text-xs leading-relaxed">
                      Permite responder “batallas” y encuestas recurrentes; el sistema mide consistencia y evolución en el tiempo.
                    </p>
                    <div className="flex gap-2.5 flex-wrap items-center justify-between mt-2.5">
                      <span className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full border border-warn/25 bg-white/5 font-extrabold text-xs text-warn/95 whitespace-nowrap">● Recomendado: completar perfil</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-r2 border border-stroke bg-card-gradient shadow-home-2 p-3.5 relative overflow-hidden">
                  <div className="font-black text-[15px] tracking-tight text-ink">Identidad</div>
                  <div className="text-muted2 text-xs font-bold mt-1.5">Demo. En producción se integra con ClaveÚnica / DNI / proveedor KYC.</div>

                  <div className="h-px bg-white/10 my-3"></div>

                  <div className="rounded-2xl border border-white/12 bg-white/5 p-3">
                    <p className="font-black text-sm tracking-tight text-ink m-0">Verificación</p>
                    <p className="mt-2 text-muted text-xs leading-relaxed">
                      {verified
                        ? "Identidad verificada. Esto habilita análisis completos y reduce fraude."
                        : "Aún no verificada. Verificar reduce fraude y mejora calidad estadística."}
                    </p>
                    <div className="flex gap-2.5 flex-wrap justify-start mt-4">
                      <button
                        className="border border-primary/35 bg-gradient-to-b from-primary/20 to-primary/10 shadow-home text-ink rounded-xl px-3 py-2.5 font-extrabold text-[13px] cursor-pointer transition hover:-translate-y-px hover:bg-white/8"
                        type="button"
                        onClick={startVerification}
                      >
                        Iniciar verificación
                      </button>
                      <button
                        className="border border-white/14 bg-white/5 text-ink rounded-xl px-3 py-2.5 font-extrabold text-[13px] cursor-pointer transition hover:-translate-y-px hover:bg-white/8"
                        type="button"
                        onClick={toggleVerified}
                      >
                        Simular verificada
                      </button>
                    </div>
                  </div>

                  <div className="h-px bg-white/10 my-3"></div>

                  <div className="rounded-2xl border border-white/12 bg-white/5 p-3">
                    <p className="font-black text-sm tracking-tight text-ink m-0">Privacidad</p>
                    <p className="mt-2 text-muted text-xs leading-relaxed">
                      Los análisis se basan en datos agregados. La identidad se usa para evitar duplicados y proteger el sistema.
                    </p>
                    <span className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full border border-ok/25 bg-white/5 font-extrabold text-xs text-ok/95 whitespace-nowrap mt-2.5">● Datos agregados</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </PageShell>
  );
};

export default Profile;
