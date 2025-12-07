// src/app/page.tsx
import CharacterList from '@/components/CharacterList'; // Import komponen baru kita

// Fetch data tetap di Server Side (SEO Friendly)
async function getCharacters() {
  try {
    // Pastikan URL API backend Laravel kamu benar
    const res = await fetch('http://127.0.0.1:8000/api/characters', {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch data');

    const json = await res.json();
    return json.data;
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const characters = await getCharacters();

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Tetap */}
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
            NEXUS ARCHIVE
          </h1>
          <p className="text-slate-400">Database & Builds for Star Rail</p>
        </div>

        {/* Panggil Component Client di sini & oper datanya */}
        <CharacterList initialData={characters} />
        
      </div>
    </main>
  );
}