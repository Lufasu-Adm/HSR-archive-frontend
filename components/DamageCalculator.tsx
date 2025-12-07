"use client"; // Wajib Client Component

import { useState } from 'react';

export default function DamageCalculator({ skillName, multiplier }: { skillName: string, multiplier: string }) {
  // State untuk input user
  const [atk, setAtk] = useState(2000); // Default ATK 2000
  const [critDmg, setCritDmg] = useState(150); // Default Crit 150%
  
  // LOGIKA MATEMATIKA SEDERHANA
  // Rumus: ATK * (Multiplier / 100) * (1 + (CritDmg / 100))
  // Kita anggap multipliernya teks "100%", jadi kita ambil angkanya aja
  const scalingNumber = parseFloat(multiplier) || 100; 
  
  const estimatedDmg = Math.floor(atk * (scalingNumber / 100));
  const critHitDmg = Math.floor(estimatedDmg * (1 + (critDmg / 100)));

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mt-4">
      <h4 className="text-yellow-400 font-bold mb-4 flex items-center gap-2">
        🧮 Test Damage: <span className="text-white">{skillName}</span>
      </h4>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Input ATK */}
        <div>
          <label className="text-xs text-slate-400 block mb-1">Total ATK</label>
          <input 
            type="number" 
            value={atk}
            onChange={(e) => setAtk(Number(e.target.value))}
            className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white text-sm focus:border-yellow-500 outline-none"
          />
        </div>

        {/* Input Crit DMG */}
        <div>
          <label className="text-xs text-slate-400 block mb-1">Crit DMG (%)</label>
          <input 
            type="number" 
            value={critDmg}
            onChange={(e) => setCritDmg(Number(e.target.value))}
            className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white text-sm focus:border-yellow-500 outline-none"
          />
        </div>
      </div>

      {/* Hasil Perhitungan */}
      <div className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-800">
        <div className="text-center w-1/2 border-r border-slate-800">
          <p className="text-xs text-slate-500">Normal Hit</p>
          <p className="text-lg font-bold text-white">{estimatedDmg.toLocaleString()}</p>
        </div>
        <div className="text-center w-1/2">
          <p className="text-xs text-slate-500">Critical Hit 💥</p>
          <p className="text-xl font-bold text-red-400">{critHitDmg.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}