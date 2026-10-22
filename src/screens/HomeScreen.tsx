import React from 'react';
import { ActiveTab } from '../types';
import { PRODUCTS } from '../data/catalogData';

interface HomeScreenProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ setActiveTab }) => {
  return (
    <div className="flex flex-col w-full">
      {/* Industrial Meta Sub-Header Strip */}
      <div className="w-full bg-[#dde9ff] px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between text-[#45464d] text-[10px] sm:text-xs font-mono border-b border-[#d5e3fd]">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-widest text-[#0d1c2f]">
            <span className="w-2 h-2 rounded-full bg-[#009668] animate-pulse"></span>
            Works Ref: AJM-GE-Q2-2025
          </span>
          <span className="hidden md:inline text-[#c6c6cd]">|</span>
          <span className="hidden md:inline">CPRI Tested Assemblies to IEC 61439-1 &amp; 2</span>
          <span className="hidden md:inline text-[#c6c6cd]">|</span>
          <span className="hidden lg:inline">Base Material: 99.9% ETP Grade Copper | 2.0mm CRCA Steel</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#904d00] font-semibold hidden sm:inline">
            Ex-Factory Ajmer Works (GST &amp; Freight on actuals)
          </span>
          <span className="bg-[#d5e3fd] px-2 py-0.5 rounded text-[#0d1c2f] font-mono font-medium">
            INR (₹) Base Matrix
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="w-full px-4 sm:px-6 py-12 lg:py-16 bg-gradient-to-b from-[#f8f9ff] to-[#eff4ff]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-[#e6eeff] px-3 py-1 rounded text-[#904d00] text-xs uppercase tracking-widest font-bold font-mono self-start border border-[#d5e3fd]">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              CPRI Type-Tested Switchgear Manufacturer
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0d1c2f] uppercase tracking-tight leading-tight">
              Precision Switchgear &amp; Heavy Power Architecture
            </h1>

            <p className="text-sm sm:text-base text-[#45464d] leading-relaxed">
              Engineering and manufacturing of IEC 61439-2 Form 4b low-voltage switchboards, intelligent motor control centers (iMCC), detuned APFC harmonic suppression panels, and outdoor feeder pillars at Ajmer Works.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 font-mono">
              <button
                onClick={() => setActiveTab('catalog')}
                className="px-6 py-3 bg-[#904d00] hover:bg-[#663500] text-[#ffffff] font-bold text-xs uppercase tracking-wider rounded transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                <span>Explore Catalog &amp; Pricing</span>
              </button>
              <button
                onClick={() => setActiveTab('rfq')}
                className="px-6 py-3 bg-[#000000] hover:bg-[#233144] text-[#ffffff] font-bold text-xs uppercase tracking-wider rounded transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
                <span>Launch RFQ Builder</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#dde9ff] font-mono">
              <div>
                <span className="text-xl sm:text-2xl font-bold text-[#0d1c2f] block">65 kA</span>
                <span className="text-[10px] text-[#45464d] uppercase font-medium">Short-Circuit Withstand</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-[#0d1c2f] block">Form 4b</span>
                <span className="text-[10px] text-[#45464d] uppercase font-medium">Internal Separation</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-[#904d00] block">&lt; 4 Hours</span>
                <span className="text-[10px] text-[#45464d] uppercase font-medium">GA Drawing Turnaround</span>
              </div>
            </div>
          </div>

          {/* Hero Image Showcase */}
          <div className="w-full lg:max-w-lg bg-[#ffffff] p-4 rounded shadow-lg border border-[#dde9ff] relative">
            <div className="aspect-[4/3] rounded overflow-hidden relative">
              <img
                src={PRODUCTS[0].image}
                alt="PCC-X1 Power Control Center"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-[#0d1c2f]/90 backdrop-blur-md p-3 rounded text-[#ffffff] font-mono text-xs flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm">Series PCC-X1 (1600A Form 4b)</div>
                  <div className="text-[10px] text-[#c6c6cd]">99.9% ETP Copper • IP54 • CPRI 50kA Certified</div>
                </div>
                <span className="text-base font-bold text-[#fe932c]">₹6,95,000</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Systems Grid Showcase */}
      <section className="w-full px-4 sm:px-6 py-12 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#904d00] font-bold block mb-1">
              Core Engineering Lineup
            </span>
            <h2 className="text-2xl sm:text-3xl text-[#0d1c2f] font-bold uppercase tracking-tight">
              Type-Tested Industrial Assemblies
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('catalog')}
            className="text-xs font-mono font-bold text-[#904d00] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View Full 5-Series Matrix</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.slice(0, 3).map((prod) => (
            <div
              key={prod.id}
              className="bg-[#ffffff] rounded shadow-sm hover:shadow-md transition-shadow border border-[#dde9ff] overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] bg-[#e6eeff] relative overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 bg-[#000000] text-white px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase">
                    {prod.series}
                  </span>
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-mono text-[#904d00] uppercase font-bold block mb-0.5">
                    {prod.subTitle}
                  </span>
                  <h3 className="text-sm font-bold text-[#0d1c2f] mb-2">{prod.name}</h3>
                  <p className="text-xs text-[#45464d] line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-[#eff4ff] flex items-center justify-between font-mono mt-2">
                <span className="text-base font-bold text-[#904d00]">
                  ₹{prod.price.toLocaleString('en-IN')}
                </span>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="px-3 py-1.5 bg-[#e6eeff] hover:bg-[#dde9ff] text-[#0d1c2f] text-xs font-bold rounded transition-colors"
                >
                  Configure
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Benchmarks Banner */}
      <section className="w-full bg-[#eff4ff] py-12 border-y border-[#dde9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
            <div className="bg-[#ffffff] p-5 rounded border border-[#dde9ff]">
              <span className="material-symbols-outlined text-[28px] text-[#904d00] mb-2 block">
                layers
              </span>
              <div className="text-sm font-bold text-[#0d1c2f]">2.0mm CRCA Steel</div>
              <p className="text-xs text-[#45464d] mt-1 font-sans">
                CNC punched, 7-tank chemical pretreated with 80-micron powder coating.
              </p>
            </div>

            <div className="bg-[#ffffff] p-5 rounded border border-[#dde9ff]">
              <span className="material-symbols-outlined text-[28px] text-[#009668] mb-2 block">
                bolt
              </span>
              <div className="text-sm font-bold text-[#0d1c2f]">99.9% ETP Copper</div>
              <p className="text-xs text-[#45464d] mt-1 font-sans">
                Electrolytic grade busbars tested to IS 613 with high current density headroom.
              </p>
            </div>

            <div className="bg-[#ffffff] p-5 rounded border border-[#dde9ff]">
              <span className="material-symbols-outlined text-[28px] text-[#904d00] mb-2 block">
                shield
              </span>
              <div className="text-sm font-bold text-[#0d1c2f]">Form 4b Separation</div>
              <p className="text-xs text-[#45464d] mt-1 font-sans">
                Full metallic barriers isolating busbar, breaker, and cable chambers.
              </p>
            </div>

            <div className="bg-[#ffffff] p-5 rounded border border-[#dde9ff]">
              <span className="material-symbols-outlined text-[28px] text-[#009668] mb-2 block">
                verified
              </span>
              <div className="text-sm font-bold text-[#0d1c2f]">CPRI Certified</div>
              <p className="text-xs text-[#45464d] mt-1 font-sans">
                50kA and 65kA 1-second short circuit withstand with full test documentation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
