import React from 'react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="w-full bg-[#eff4ff] text-[#45464d] border-t border-[#dde9ff]">
      <div className="w-full max-w-[1440px] px-4 sm:px-6 py-10 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Company Brief */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl text-[#0d1c2f] uppercase font-bold tracking-tight">
                Gagan Electricals
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-[#45464d]">
              Engineering, design, and manufacturing of critical switchboards, industrial motor control centers, and HT/LT power distribution solutions.
            </p>
            <div className="flex flex-col gap-2 mt-2 font-mono">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#904d00] shrink-0 mt-0.5">
                  domain
                </span>
                <span className="text-[13px] text-[#0d1c2f]">
                  Near Ram Mandir, Ramganj, Ajmer, Rajasthan 305001
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#904d00] shrink-0">
                  call
                </span>
                <a href="tel:+919414431708" className="text-xs text-[#0d1c2f] hover:underline font-bold">
                  +91 9414431708
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#904d00] shrink-0">
                  alternate_email
                </span>
                <a href="mailto:ravi26976@gmail.com" className="text-xs text-[#0d1c2f] hover:underline">
                  ravi26976@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <span className="text-sm font-mono uppercase tracking-wider text-[#0d1c2f] font-bold">
              Quick Links
            </span>
            <ul className="flex flex-col gap-2 text-[13px]">
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className="flex items-center gap-1.5 hover:text-[#0d1c2f] transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#76777d]">chevron_right</span>
                  <span>Overview &amp; Core Systems</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="flex items-center gap-1.5 hover:text-[#0d1c2f] transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#76777d]">chevron_right</span>
                  <span>Technical Catalog &amp; Busbar Matrix</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('rfq')}
                  className="flex items-center gap-1.5 hover:text-[#0d1c2f] transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#76777d]">chevron_right</span>
                  <span>B2B Tender &amp; RFQ Builder</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('tracking')}
                  className="flex items-center gap-1.5 hover:text-[#0d1c2f] transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#76777d]">chevron_right</span>
                  <span>Production &amp; Dispatch Tracking</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="flex items-center gap-1.5 hover:text-[#0d1c2f] transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#76777d]">chevron_right</span>
                  <span>Factory &amp; Works Visit</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & Standards */}
          <div className="flex flex-col gap-4">
            <span className="text-sm font-mono uppercase tracking-wider text-[#0d1c2f] font-bold">
              Compliance &amp; Standards
            </span>
            <div className="flex flex-col gap-3">
              <div className="p-3 bg-[#e6eeff] rounded border border-[#d5e3fd]">
                <div className="text-xs font-mono text-[#0d1c2f] font-semibold flex items-center justify-between">
                  <span>CPRI Certified Testing</span>
                  <span className="text-[#009668] material-symbols-outlined text-[16px]">verified</span>
                </div>
                <p className="text-[12px] text-[#45464d] mt-1 leading-snug">
                  Short circuit withstand and temperature rise tested assemblies up to 65kA.
                </p>
              </div>

              <div className="p-3 bg-[#e6eeff] rounded border border-[#d5e3fd]">
                <div className="text-xs font-mono text-[#0d1c2f] font-semibold flex items-center justify-between">
                  <span>ISO 9001:2015 &amp; IEC 61439</span>
                  <span className="text-[#009668] material-symbols-outlined text-[16px]">verified</span>
                </div>
                <p className="text-[12px] text-[#45464d] mt-1 leading-snug">
                  Form 4b separation, IP54/IP55 ingress-rated sheet steel enclosures.
                </p>
              </div>
            </div>
          </div>

          {/* Vendor Credentials */}
          <div className="flex flex-col gap-4">
            <span className="text-sm font-mono uppercase tracking-wider text-[#0d1c2f] font-bold">
              Vendor Credentials
            </span>
            <div className="bg-[#ffffff] p-4 rounded border border-[#dde9ff] flex flex-col gap-2 font-mono">
              <div className="text-[10px] uppercase tracking-wider text-[#45464d]">Status</div>
              <div className="text-xs text-[#009668] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#009668]"></span>
                <span>Approved Vendor Unit</span>
              </div>

              <div className="h-px bg-[#d5e3fd] my-1"></div>

              <div className="text-[10px] uppercase tracking-wider text-[#45464d]">Location Code</div>
              <div className="text-xs text-[#0d1c2f] font-bold">AJM-RJ-305001</div>

              <div className="h-px bg-[#d5e3fd] my-1"></div>

              <div className="text-[10px] uppercase tracking-wider text-[#45464d]">Authorized Contact</div>
              <div className="text-xs text-[#0d1c2f] font-medium font-sans">
                Ravi (Works In-Charge)
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-6 border-t border-[#dde9ff] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#45464d]">
          <span>© 2025 Gagan Electricals. All rights reserved. Precision Switchgear &amp; Industrial Assemblies.</span>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#0d1c2f] cursor-default">IEC 61439-2 Form 4b</span>
            <span className="hover:text-[#0d1c2f] cursor-default">Safety Assurance</span>
            <span className="hover:text-[#0d1c2f] cursor-default">Terms of Procurement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
