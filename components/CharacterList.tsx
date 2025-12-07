"use client";

import { useState } from 'react';
import Link from 'next/link';

// Definisikan tipe data lagi biar aman
interface Character {
  name: string;
  slug: string;
  rarity: string;
  element: string;
  role: string;
  image_url: string;
}

export default function CharacterList({ initialData }: { initialData: Character[] }) {
  // State untuk menyimpan apa yang diketik user
  const [search, setSearch] = useState('');
  // State untuk menyimpan filter elemen yang dipilih
  const [selectedElement, setSelectedElement] = useState('All');

  // List elemen untuk tombol filter
  const elements = ['All', 'Fire', 'Ice', 'Wind', 'Lightning', 'Physical', 'Quantum', 'Imaginary'];

  // LOGIKA FILTER:
  // Ambil data awal, lalu saring berdasarkan Search DAN Element
  const filteredCharacters = initialData.filter((char) => {
    const matchName = char.name.toLowerCase().includes(search.toLowerCase());
    const matchElement = selectedElement === 'All' || char.element === selectedElement;
    
    return matchName && matchElement;
  });

  return (
    <div>
      {/* --- BAGIAN KONTROL (SEARCH & FILTER) --- */}
      <div className="mb-8 space-y-4">
        
        {/* Search Bar */}
        <input 
          type="text" 
          placeholder="Search character name..." 
          className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-yellow-500 transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {elements.map((elem) => (
            <button
              key={elem}
              onClick={() => setSelectedElement(elem)}
              className={`px-4 py-2 rounded-full text-sm font-bold border transition-all
                ${selectedElement === elem 
                  ? 'bg-yellow-500 text-black border-yellow-500' // Gaya tombol aktif
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-500' // Gaya tombol mati
                }
              `}
            >
              {elem}
            </button>
          ))}
        </div>
      </div>

      {/* --- BAGIAN GRID HASIL --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((char) => (
            <div 
              key={char.slug} 
              className="group relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,179,8,0.2)]"
            >
              {/* Link Pembungkus agar bisa diklik */}
              <Link href={`/characters/${char.slug}`} className="block">
                <div className="flex items-center p-5">
                  {/* Gambar */}
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <img 
                      src={char.image_url} 
                      alt={char.name} 
                      className="w-full h-full object-cover rounded-full border-2 border-slate-600 group-hover:border-yellow-400 transition-colors"
                    />
                  </div>
                  
                  {/* Teks Info */}
                  <div className="ml-5 flex-1">
                    <h2 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                      {char.name}
                    </h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                       <span className={`text-xs font-bold px-2 py-1 rounded border ${
                         char.element === 'Fire' ? 'text-red-400 border-red-900 bg-red-950' :
                         char.element === 'Ice' ? 'text-cyan-400 border-cyan-900 bg-cyan-950' :
                         'text-slate-400 border-slate-700 bg-slate-800'
                       }`}>
                        {char.element}
                      </span>
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-yellow-200 border border-slate-700">
                        {char.rarity}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-20 text-slate-500">
            <p className="text-xl">Karakter tidak ditemukan 😔</p>
            <button 
              onClick={() => {setSearch(''); setSelectedElement('All')}}
              className="mt-4 text-yellow-500 hover:underline"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}