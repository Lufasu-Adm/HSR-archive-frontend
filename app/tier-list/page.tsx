import Link from 'next/link';

// 1. Tipe Data
interface Character {
  name: string;
  slug: string;
  image_url: string;
  element: string;
  role: string;
  tier_data?: {
    overall: string;
    role: string;
  };
}

// 2. Fetch Data dari Laravel
async function getCharacters() {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/characters', { cache: 'no-store' });
    const json = await res.json();
    return json.data;
  } catch (error) {
    return [];
  }
}

// 3. Komponen Baris Tier (SS, S, A)
const TierRow = ({ rank, bgGradient, chars }: { rank: string, bgGradient: string, chars: Character[] }) => {
  if (chars.length === 0) return null;

  return (
    <div className="flex flex-col md:flex-row border-b border-slate-800 last:border-0 min-h-[120px]">
      {/* Kolom Rank (Kiri) */}
      <div className={`${bgGradient} w-full md:w-32 flex flex-col items-center justify-center p-4 text-slate-900`}>
        <span className="text-4xl font-black">{rank}</span>
      </div>
      
      {/* Kolom Karakter (Kanan) */}
      <div className="bg-slate-900/50 flex-1 p-6 flex flex-wrap gap-4 items-center">
        {chars.map((char) => (
          <Link key={char.slug} href={`/characters/${char.slug}`} className="group relative block">
            {/* Bingkai Gambar */}
            <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-slate-700 group-hover:border-white transition shadow-lg relative">
              <img src={char.image_url} alt={char.name} className="w-full h-full object-cover" />
              
              {/* Badge Role Kecil di pojok */}
              <div className="absolute bottom-0 right-0 bg-black/80 px-1.5 py-0.5 rounded-tl-md text-[10px] text-white font-bold uppercase">
                 {char.tier_data?.role || char.role}
              </div>
            </div>
            
            {/* Tooltip Nama (Muncul saat hover) */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20 pointer-events-none">
              {char.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default async function TierListPage() {
  const characters: Character[] = await getCharacters();

  // 4. Filter Karakter berdasarkan Rank Database
  const tiers = {
    SS: characters.filter(c => c.tier_data?.overall === 'SS'),
    S:  characters.filter(c => c.tier_data?.overall === 'S'),
    A:  characters.filter(c => c.tier_data?.overall === 'A'),
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                    Meta Tier List
                </h1>
                <p className="text-slate-400 mt-2">Ranking performa karakter di Memory of Chaos terbaru.</p>
            </div>
            <Link href="/" className="px-5 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-bold transition">
                &larr; Back to Home
            </Link>
        </div>

        {/* Tabel Tier List */}
        <div className="border border-slate-800 rounded-2xl overflow-hidden shadow-2xl bg-slate-900">
            <TierRow rank="SS" bgGradient="bg-gradient-to-br from-red-500 to-orange-600" chars={tiers.SS} />
            <TierRow rank="S"  bgGradient="bg-gradient-to-br from-orange-400 to-yellow-500" chars={tiers.S} />
            <TierRow rank="A"  bgGradient="bg-gradient-to-br from-purple-500 to-indigo-500" chars={tiers.A} />
        </div>

      </div>
    </main>
  );
}