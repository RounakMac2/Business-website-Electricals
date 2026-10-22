import React, { useState } from 'react';
import { MAP_IMAGE } from '../data/catalogData';

export const ContactScreen: React.FC = () => {
  const [visitorName, setVisitorName] = useState('');
  const [visitorCompany, setVisitorCompany] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitType, setVisitType] = useState('Factory FAT Witness');
  const [visitDate, setVisitDate] = useState('');
  const [sentNotice, setSentNotice] = useState(false);

  const handleVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSentNotice(true);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Sub-header Bar */}
      <div className="w-full bg-[#dde9ff] py-2 sm:py-2.5 border-b border-[#d5e3fd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 bg-[#000000] text-[#ffffff] rounded">
              <span className="material-symbols-outlined text-[18px]">factory</span>
            </span>
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <span className="text-[#0d1c2f] font-semibold tracking-wider uppercase">
                Ajmer Works Factory Desk &amp; Engineering Cell
              </span>
              <span className="text-[#76777d]">/</span>
              <span className="text-[#904d00] font-bold">AJM-RJ-305001</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#009668] bg-[#ffffff] px-2.5 py-1 rounded shadow-2xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#009668] animate-pulse"></span>
              Shop Floor Open: 08:00 - 20:00 IST
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-[#904d00] font-bold mb-1">
            <span className="material-symbols-outlined text-[16px]">location_on</span>
            Manufacturing Plant &amp; Registered Office
          </div>
          <h1 className="text-3xl sm:text-4xl text-[#0d1c2f] tracking-tight font-bold">
            Contact &amp; Works Visit
          </h1>
          <p className="text-sm text-[#45464d] max-w-3xl mt-1 leading-relaxed">
            Reach our technical director directly for tender BOQ estimates, on-site substation surveys, or schedule an in-person Factory Acceptance Test (FAT) witness in Ajmer, Rajasthan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contacts & Map (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-[#ffffff] rounded p-6 shadow-sm border border-[#dde9ff]">
              <div className="flex items-start gap-4 pb-4 mb-4 border-b border-[#eff4ff]">
                <div className="w-14 h-14 rounded bg-[#000000] text-[#ffffff] flex items-center justify-center text-xl font-bold font-mono shrink-0">
                  GE
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#0d1c2f]">Gagan Electricals</h2>
                  <div className="text-xs text-[#904d00] font-mono font-bold uppercase tracking-wider">
                    Switchgear &amp; Power Architecture
                  </div>
                  <p className="text-xs text-[#45464d] mt-1">
                    Specialized fabrication of CPRI type-tested PCC, iMCC, APFC and Outdoor Feeder Pillars.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-3 bg-[#eff4ff] rounded border border-[#dde9ff]">
                  <span className="text-[10px] text-[#45464d] uppercase font-bold block mb-1">
                    Works In-Charge &amp; Chief Engineer
                  </span>
                  <div className="text-sm font-bold text-[#0d1c2f]">Ravi</div>
                  <div className="text-[#904d00] text-xs mt-0.5">Technical Director</div>
                </div>

                <div className="p-3 bg-[#eff4ff] rounded border border-[#dde9ff]">
                  <span className="text-[10px] text-[#45464d] uppercase font-bold block mb-1">
                    Direct Phone Line
                  </span>
                  <a href="tel:+919414431708" className="text-sm font-bold text-[#0d1c2f] hover:underline block">
                    +91 9414431708
                  </a>
                  <span className="text-[10px] text-[#009668] block mt-0.5">Available 08:00 - 20:00 IST</span>
                </div>

                <div className="p-3 bg-[#eff4ff] rounded border border-[#dde9ff]">
                  <span className="text-[10px] text-[#45464d] uppercase font-bold block mb-1">
                    Technical Email
                  </span>
                  <a href="mailto:ravi26976@gmail.com" className="text-xs font-bold text-[#0d1c2f] hover:underline block truncate">
                    ravi26976@gmail.com
                  </a>
                  <span className="text-[10px] text-[#45464d] block mt-0.5">&lt; 2 Hours Email Response</span>
                </div>

                <div className="p-3 bg-[#eff4ff] rounded border border-[#dde9ff]">
                  <span className="text-[10px] text-[#45464d] uppercase font-bold block mb-1">
                    Location Code
                  </span>
                  <div className="text-xs font-bold text-[#0d1c2f]">AJM-RJ-305001</div>
                  <span className="text-[10px] text-[#45464d] block mt-0.5">RIICO / PWD Approved Unit</span>
                </div>
              </div>

              <div className="p-3 bg-[#eff4ff] rounded border border-[#dde9ff] mt-4 flex items-start gap-2.5 font-mono text-xs text-[#0d1c2f]">
                <span className="material-symbols-outlined text-[#904d00] text-[20px] shrink-0 mt-0.5">
                  factory
                </span>
                <div>
                  <strong className="block text-sm">Manufacturing Works Address:</strong>
                  Near Ram Mandir, Ramganj, Ajmer, Rajasthan 305001, India.
                  <div className="text-[11px] text-[#45464d] mt-1 font-sans">
                    5.2 km from Ajmer Junction Railway Station • 135 km from Jaipur International Airport.
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="https://wa.me/919414431708?text=Hello%20Ravi%2C%20I%20would%20like%20to%20inquire%20about%20switchboard%20panels."
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 px-4 bg-[#009668] hover:bg-[#005236] text-[#ffffff] font-mono text-xs font-bold uppercase rounded flex items-center justify-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>Instant WhatsApp Chat</span>
                </a>
                <a
                  href="tel:+919414431708"
                  className="py-2.5 px-4 bg-[#904d00] hover:bg-[#663500] text-[#ffffff] font-mono text-xs font-bold uppercase rounded flex items-center justify-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  <span>Call Directly</span>
                </a>
              </div>
            </div>

            {/* Map Preview */}
            <div className="bg-[#ffffff] rounded overflow-hidden shadow-sm border border-[#dde9ff]">
              <div
                className="w-full h-64 bg-cover bg-center flex items-end p-4 relative"
                style={{ backgroundImage: `url('${MAP_IMAGE}')` }}
              >
                <div className="bg-[#ffffff]/90 backdrop-blur-md p-3 rounded shadow-md border border-[#dde9ff] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#904d00] text-[20px]">pin_drop</span>
                  <div className="font-mono text-xs">
                    <span className="font-bold text-[#0d1c2f] block">Gagan Electricals Switchgear Works</span>
                    <span className="text-[10px] text-[#45464d]">Ramganj, Ajmer, Rajasthan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Schedule Factory Visit / Survey Form (5 cols) */}
          <div className="lg:col-span-5 bg-[#ffffff] rounded p-6 shadow-sm border border-[#dde9ff]">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#eff4ff]">
              <span className="material-symbols-outlined text-[#904d00]">calendar_month</span>
              <h2 className="text-lg font-bold text-[#0d1c2f]">Schedule Works Visit or On-Site Survey</h2>
            </div>

            {sentNotice ? (
              <div className="bg-[#eff4ff] p-5 rounded border border-[#d5e3fd] text-center font-mono space-y-3 animate-in fade-in">
                <span className="material-symbols-outlined text-[#009668] text-[40px] mx-auto block">
                  check_circle
                </span>
                <h3 className="font-bold text-sm text-[#0d1c2f]">Visit Request Logged!</h3>
                <p className="text-xs text-[#45464d] font-sans">
                  Ravi (+91 9414431708) will call you within 2 hours to confirm factory gate pass and inspection slot.
                </p>
                <button
                  onClick={() => setSentNotice(false)}
                  className="px-4 py-1.5 bg-[#904d00] text-white text-xs font-bold rounded"
                >
                  Book Another Slot
                </button>
              </div>
            ) : (
              <form onSubmit={handleVisitSubmit} className="flex flex-col gap-4 text-xs font-mono">
                <div>
                  <label className="block font-semibold text-[#0d1c2f] mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full px-3 py-2 bg-[#eff4ff] rounded border border-[#dde9ff] text-[#0d1c2f] focus:outline-none focus:ring-1 focus:ring-[#000000]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#0d1c2f] mb-1">Company / EPC Entity *</label>
                  <input
                    type="text"
                    required
                    value={visitorCompany}
                    onChange={(e) => setVisitorCompany(e.target.value)}
                    placeholder="e.g. Apex Infra Projects"
                    className="w-full px-3 py-2 bg-[#eff4ff] rounded border border-[#dde9ff] text-[#0d1c2f] focus:outline-none focus:ring-1 focus:ring-[#000000]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#0d1c2f] mb-1">Contact Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={visitorPhone}
                    onChange={(e) => setVisitorPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full px-3 py-2 bg-[#eff4ff] rounded border border-[#dde9ff] text-[#0d1c2f] focus:outline-none focus:ring-1 focus:ring-[#000000]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#0d1c2f] mb-1">Purpose of Visit</label>
                  <select
                    value={visitType}
                    onChange={(e) => setVisitType(e.target.value)}
                    className="w-full px-3 py-2 bg-[#eff4ff] rounded border border-[#dde9ff] text-[#0d1c2f] focus:outline-none focus:ring-1 focus:ring-[#000000]"
                  >
                    <option value="Factory FAT Witness">Factory Acceptance Test (FAT) Witness</option>
                    <option value="On-Site Survey in Rajasthan">On-Site Substation Engineering Survey</option>
                    <option value="Tender BOQ & Busbar Discussion">Tender BOQ &amp; Busbar Discussion</option>
                    <option value="Vendor Audit & Facility Inspection">Vendor Audit &amp; Facility Inspection</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#0d1c2f] mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#eff4ff] rounded border border-[#dde9ff] text-[#0d1c2f] focus:outline-none focus:ring-1 focus:ring-[#000000]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#904d00] hover:bg-[#663500] text-[#ffffff] font-bold uppercase tracking-wider rounded transition-colors shadow-sm mt-2 cursor-pointer"
                >
                  Request Works Appointment
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
