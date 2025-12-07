import Link from 'next/link';
import DamageCalculator from '@/components/DamageCalculator'; 

// 1. Definisikan Tipe Data
interface CharacterDetail {
  name: string;
  slug: string;
  rarity: string;
  element: string;
  role: string;
  image_url: string;
  base_stats: {
    hp: number;
    atk: number;
    def: number;
    spd: number;
    [key: string]: any;
  };
  skills: {
    type: string;
    name: string;
    desc: string;
  }[];
  // Bagian Build Info (Opsional pakai ?)
  build_info?: {
    light_cone: { name: string; image: string };
    relics: { name: string; image: string };
    ornaments: { name: string; image: string };
    stat_priority: string[];
  };
}

// 2. Fungsi Fetch Data
async function getCharacterDetail(slug: string) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/characters/${slug}`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data;
  } catch (error) {
    return null;
  }
}

// 3. Komponen Halaman Detail
export default async function CharacterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; 
  const char: CharacterDetail = await getCharacterDetail(slug);

  if (!char) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
        <h1 className="text-3xl font-bold text-red-500">Character Not Found</h1>
        <Link href="/" className="mt-4 text-yellow-400 hover:underline">Kembali ke Home</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Tombol Back */}
        <Link href="/" className="inline-block mb-6 text-slate-400 hover:text-white transition-colors">
          &larr; Back to Database
        </Link>

        {/* --- SECTION 1: HEADER & STATS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Kolom Kiri: Gambar Besar */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-64 h-64 md:w-full md:h-auto aspect-square rounded-2xl overflow-hidden border-4 border-slate-800 shadow-2xl">
              <img 
                src={char.image_url} 
                alt={char.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h1 className="text-4xl font-extrabold text-white">{char.name}</h1>
                <div className="flex gap-2 mt-2">
                   <span className="bg-yellow-600 text-black text-xs font-bold px-2 py-1 rounded">{char.rarity}</span>
                   <span className="bg-red-900 text-red-100 text-xs font-bold px-2 py-1 rounded">{char.element}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Base Stats */}
          <div className="md:col-span-2 bg-slate-900 rounded-2xl p-6 border border-slate-800">
            <h2 className="text-2xl font-bold text-yellow-500 mb-6 flex items-center gap-2">
              📊 Base Stats (Lv. 80)
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(char.base_stats).map(([key, value]) => (
                <div key={key} className="bg-slate-800 p-4 rounded-lg flex justify-between items-center border border-slate-700">
                  <span className="uppercase text-xs font-bold text-slate-400 tracking-wider">
                    {key.replace('_', ' ')}
                  </span>
                  <span className="text-xl font-mono font-bold text-white">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- SECTION 2: SKILLS --- */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-500 mb-6">⚔️ Combat Skills</h2>
          <div className="space-y-6">
            {char.skills && char.skills.map((skill, index) => (
              <div key={index} className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-slate-600 transition">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                  <span className="text-xs bg-slate-700 px-3 py-1 rounded-full text-cyan-300 font-semibold border border-slate-600">
                    {skill.type}
                  </span>
                </div>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base mb-4">
                  {skill.desc}
                </p>

                {/* Kalkulator hanya untuk skill attack */}
                {(skill.type === 'Ultimate' || skill.type === 'Skill' || skill.type === 'Basic') && (
                    <DamageCalculator skillName={skill.name} multiplier="200" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* --- SECTION 3: RECOMMENDED BUILD --- */}
        {char.build_info && (
          <div className="mt-12 mb-12">
            <h2 className="text-2xl font-bold text-yellow-500 mb-6">🛡️ Recommended Build</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Light Cone */}
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex items-center gap-4">
                <img src={char.build_info.light_cone.image} className="w-16 h-16 bg-slate-800 rounded-lg object-contain" />
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold">Best Light Cone</p>
                  <p className="font-bold text-white text-sm">{char.build_info.light_cone.name}</p>
                </div>
              </div>

              {/* Card 2: Relic */}
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex items-center gap-4">
                <img src={char.build_info.relics.image} className="w-16 h-16 bg-slate-800 rounded-lg object-contain" />
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold">Best Relic Set</p>
                  <p className="font-bold text-white text-sm">{char.build_info.relics.name}</p>
                </div>
              </div>

              {/* Card 3: Ornament */}
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex items-center gap-4">
                <img src={char.build_info.ornaments.image} className="w-16 h-16 bg-slate-800 rounded-lg object-contain" />
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold">Best Planar</p>
                  <p className="font-bold text-white text-sm">{char.build_info.ornaments.name}</p>
                </div>
              </div>

            </div>

            {/* Stat Priority */}
            <div className="mt-6 bg-slate-900/50 p-4 rounded-lg border border-slate-800/50">
              <p className="text-slate-400 text-sm mb-2 font-bold">🎯 Stat Priority:</p>
              <div className="flex flex-wrap gap-2">
                {char.build_info.stat_priority.map((stat, idx) => (
                  <span key={idx} className="bg-slate-800 text-cyan-300 px-3 py-1 rounded text-sm font-mono border border-slate-700">
                    {stat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

      </div> {/* <-- Penutup Wrapper max-w-5xl ada di sini sekarang */}
    </main>
  );
}