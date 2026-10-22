import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { BRAND_LOGO } from '../data/catalogData';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  rfqCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, rfqCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'catalog', label: 'Catalog & Pricing' },
    { id: 'rfq', label: 'Request a Quote' },
    { id: 'tracking', label: 'Order Tracking' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f8f9ff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Top Engineering & Credentials Strip */}
      <div className="bg-[#dde9ff] border-b border-[#d5e3fd]">
        <div className="w-full px-4 sm:px-6 mx-auto flex items-center justify-between h-9">
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="tel:+919414431708"
              className="flex items-center gap-1 text-xs text-[#45464d] hover:text-[#0d1c2f] font-medium font-mono"
            >
              <span className="material-symbols-outlined text-[15px] text-[#904d00]">phone_in_talk</span>
              <span>+91 9414431708</span>
            </a>
            <a
              href="mailto:ravi26976@gmail.com"
              className="hidden sm:flex items-center gap-1 text-xs text-[#45464d] hover:text-[#0d1c2f] font-mono"
            >
              <span className="material-symbols-outlined text-[15px] text-[#904d00]">mail</span>
              <span>ravi26976@gmail.com</span>
            </a>
            <div className="hidden md:flex items-center gap-1 text-xs text-[#45464d] font-mono">
              <span className="material-symbols-outlined text-[15px] text-[#76777d]">location_on</span>
              <span>Ajmer, Rajasthan</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-[#009668] animate-pulse"></span>
              <span className="text-[10px] sm:text-xs text-[#009668] uppercase tracking-wider font-semibold font-mono">
                CPRI Tested &amp; Certified Unit
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Navigation Bar */}
      <div className="h-16 w-full px-4 sm:px-6 mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 py-1 text-left focus:outline-none"
          >
            <img
              alt="Gagan Electricals Brand Logo"
              className="h-8 w-auto object-contain rounded-sm"
              src={BRAND_LOGO}
              onError={(e) => {
                // Graceful fallback if external URL fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="flex flex-col">
              <span className="text-[17px] sm:text-[19px] uppercase tracking-tight text-[#0d1c2f] leading-none font-bold">
                Gagan Electricals
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#904d00] font-semibold uppercase tracking-widest font-mono">
                Switchgear &amp; Power Architecture
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 ml-6">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 rounded text-[13px] transition-colors relative ${
                    isActive
                      ? 'bg-[#000000] text-[#ffffff] font-semibold shadow-sm'
                      : 'text-[#45464d] hover:text-[#0d1c2f] font-medium'
                  }`}
                >
                  {item.label}
                  {item.id === 'rfq' && rfqCount > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.2 bg-[#fe932c] text-[#000000] font-bold text-[10px] rounded-full">
                      {rfqCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Action Deck */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('rfq')}
            className="inline-flex items-center justify-center gap-1.5 h-10 px-4 sm:px-5 bg-[#904d00] text-[#ffffff] rounded text-xs uppercase tracking-wider font-bold transition-all hover:bg-[#663500] shadow-sm active:scale-95 cursor-pointer font-mono"
          >
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            <span>Get Instant Quote</span>
          </button>

          <button
            onClick={() => setActiveTab('tracking')}
            title="Track Job Card / Works Ref"
            className="w-9 h-9 rounded-full bg-[#000000] flex items-center justify-center shrink-0 text-[#ffffff] hover:bg-[#233144] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded text-[#0d1c2f] hover:bg-[#eff4ff] focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#ffffff] border-b border-[#dde9ff] px-4 py-3 shadow-lg flex flex-col gap-1 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`flex items-center justify-between w-full px-3 py-2.5 rounded text-sm text-left ${
                activeTab === item.id
                  ? 'bg-[#000000] text-[#ffffff] font-semibold'
                  : 'text-[#0d1c2f] hover:bg-[#eff4ff]'
              }`}
            >
              <span>{item.label}</span>
              {item.id === 'rfq' && rfqCount > 0 && (
                <span className="px-2 py-0.5 bg-[#fe932c] text-[#000000] text-xs font-bold rounded">
                  {rfqCount} items
                </span>
              )}
            </button>
          ))}
          <div className="pt-2 mt-1 border-t border-[#eff4ff] flex flex-col gap-2 font-mono text-xs text-[#45464d]">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-[#904d00]">phone_in_talk</span>
              <span>+91 9414431708</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-[#76777d]">factory</span>
              <span>Works: Ramganj, Ajmer 305001</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
