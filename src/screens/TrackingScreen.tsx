import React, { useState } from 'react';
import { SAMPLE_ORDERS } from '../data/catalogData';
import { TrackingOrder } from '../types';

export const TrackingScreen: React.FC = () => {
  const [searchRef, setSearchRef] = useState('AJM-GE-Q2-2025');
  const [selectedOrder, setSelectedOrder] = useState<TrackingOrder | null>(SAMPLE_ORDERS[0]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchRef.trim().toUpperCase();
    const found = SAMPLE_ORDERS.find(
      (o) => o.orderId.toUpperCase() === query || o.clientName.toUpperCase().includes(query)
    );
    if (found) {
      setSelectedOrder(found);
    } else {
      alert(`No active works order found matching "${searchRef}". Showing sample active order.`);
      setSelectedOrder(SAMPLE_ORDERS[0]);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Sub-header Bar */}
      <div className="w-full bg-[#dde9ff] py-2 sm:py-2.5 border-b border-[#d5e3fd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 bg-[#000000] text-[#ffffff] rounded">
              <span className="material-symbols-outlined text-[18px]">precision_manufacturing</span>
            </span>
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <span className="text-[#0d1c2f] font-semibold tracking-wider uppercase">
                Ajmer Works Production &amp; FAT Dispatch Tracking
              </span>
              <span className="text-[#76777d]">/</span>
              <span className="text-[#904d00] font-bold">SHOP-FLOOR LIVE</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#009668] bg-[#ffffff] px-2.5 py-1 rounded shadow-2xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#009668] animate-pulse"></span>
              Real-Time Shopfloor QC Synced
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Title */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-[#904d00] font-bold mb-1">
            <span className="material-symbols-outlined text-[16px]">timeline</span>
            Ajmer Manufacturing Facility Status
          </div>
          <h1 className="text-3xl sm:text-4xl text-[#0d1c2f] tracking-tight font-bold">
            Production &amp; Dispatch Tracking
          </h1>
          <p className="text-sm text-[#45464d] max-w-3xl mt-1 leading-relaxed">
            Monitor real-time progress of your industrial switchboard assemblies through CNC sheet metal fabrication, 7-tank powder coating, ETP copper busbar trunking, and certified Factory Acceptance Testing (FAT).
          </p>
        </div>

        {/* Search Ref Bar */}
        <div className="bg-[#ffffff] p-5 rounded shadow-sm border border-[#dde9ff] mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#76777d] text-[20px]">
                search
              </span>
              <input
                type="text"
                value={searchRef}
                onChange={(e) => setSearchRef(e.target.value)}
                placeholder="Enter Job Card or Works Ref (e.g. AJM-GE-Q2-2025 or GE-2025-0842)..."
                className="w-full pl-10 pr-3 py-2.5 bg-[#eff4ff] text-[#0d1c2f] font-mono text-xs rounded border border-[#dde9ff] focus:outline-none focus:ring-2 focus:ring-[#000000]"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-[#904d00] hover:bg-[#663500] text-[#ffffff] font-mono text-xs uppercase font-bold tracking-wider rounded transition-colors shrink-0 shadow-sm cursor-pointer"
            >
              Track Assembly
            </button>
          </form>

          {/* Quick preset buttons */}
          <div className="flex items-center gap-2 mt-3 font-mono text-xs flex-wrap">
            <span className="text-[#45464d] text-[11px]">Quick Samples:</span>
            {SAMPLE_ORDERS.map((o) => (
              <button
                key={o.orderId}
                onClick={() => {
                  setSearchRef(o.orderId);
                  setSelectedOrder(o);
                }}
                className={`px-2.5 py-1 rounded text-[11px] transition-colors border cursor-pointer ${
                  selectedOrder?.orderId === o.orderId
                    ? 'bg-[#000000] text-[#ffffff] border-[#000000]'
                    : 'bg-[#eff4ff] text-[#0d1c2f] border-[#dde9ff] hover:bg-[#e6eeff]'
                }`}
              >
                {o.orderId} ({o.status})
              </button>
            ))}
          </div>
        </div>

        {selectedOrder && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 cols: Progress, Stages & Test Log */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Order Header Card */}
              <div className="bg-[#ffffff] rounded p-6 shadow-sm border border-[#dde9ff]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-[#eff4ff] gap-2">
                  <div>
                    <span className="text-xs font-mono text-[#904d00] font-bold block">
                      WORKS ORDER: {selectedOrder.orderId}
                    </span>
                    <h2 className="text-lg font-bold text-[#0d1c2f]">{selectedOrder.projectTitle}</h2>
                    <span className="text-xs text-[#45464d]">Client: {selectedOrder.clientName}</span>
                  </div>
                  <div className="text-left sm:text-right font-mono">
                    <span
                      className={`inline-block px-3 py-1 rounded text-xs font-bold uppercase ${
                        selectedOrder.status === 'Ready for Dispatch'
                          ? 'bg-[#009668]/20 text-[#009668]'
                          : 'bg-[#fe932c]/20 text-[#663500]'
                      }`}
                    >
                      {selectedOrder.status}
                    </span>
                    <span className="block text-[11px] text-[#45464d] mt-1">
                      Promised Dispatch: {selectedOrder.promisedDispatch}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-6 font-mono text-xs">
                  <div className="flex justify-between text-[#0d1c2f] font-semibold mb-1.5">
                    <span>Ajmer Shopfloor Completion</span>
                    <span className="text-[#904d00] font-bold">{selectedOrder.progressPercentage}%</span>
                  </div>
                  <div className="w-full h-3 bg-[#eff4ff] rounded-full overflow-hidden border border-[#dde9ff]">
                    <div
                      className="h-full bg-[#904d00] rounded-full transition-all duration-500"
                      style={{ width: `${selectedOrder.progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Technical specs summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#eff4ff] p-3 rounded font-mono text-xs border border-[#dde9ff]">
                  <div>
                    <span className="text-[#45464d] text-[10px] uppercase block">Incomer Breaker:</span>
                    <span className="font-semibold text-[#0d1c2f]">{selectedOrder.incomerSpec}</span>
                  </div>
                  <div>
                    <span className="text-[#45464d] text-[10px] uppercase block">Busbar System:</span>
                    <span className="font-semibold text-[#0d1c2f]">{selectedOrder.busbarRating}</span>
                  </div>
                </div>
              </div>

              {/* Manufacturing Stages Stepper */}
              <div className="bg-[#ffffff] rounded p-6 shadow-sm border border-[#dde9ff]">
                <h3 className="text-base font-bold text-[#0d1c2f] mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#904d00]">factory</span>
                  <span>Fabrication &amp; Assembly Milestone Tracking</span>
                </h3>

                <div className="flex flex-col gap-5 relative pl-6">
                  <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-[#dde9ff]"></div>

                  {selectedOrder.stages.map((stage, idx) => {
                    return (
                      <div key={idx} className="relative">
                        <div
                          className={`absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full ring-4 ring-[#ffffff] flex items-center justify-center ${
                            stage.completed
                              ? 'bg-[#009668]'
                              : stage.current
                              ? 'bg-[#904d00] animate-pulse'
                              : 'bg-[#c6c6cd]'
                          }`}
                        ></div>
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                          <span
                            className={`font-mono text-xs font-bold ${
                              stage.completed
                                ? 'text-[#0d1c2f]'
                                : stage.current
                                ? 'text-[#904d00]'
                                : 'text-[#76777d]'
                            }`}
                          >
                            Stage {idx + 1}: {stage.name}
                          </span>
                          {stage.date && (
                            <span className="text-[10px] font-mono text-[#009668] font-semibold">
                              {stage.date}
                            </span>
                          )}
                        </div>
                        {stage.note && (
                          <p className="text-xs text-[#45464d] mt-0.5 leading-snug">
                            {stage.note}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quality & Routine Test Results Log */}
              <div className="bg-[#ffffff] rounded p-6 shadow-sm border border-[#dde9ff]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#009668]">verified</span>
                    <h3 className="text-base font-bold text-[#0d1c2f]">
                      Factory Acceptance Routine Test Logs (FAT)
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[#009668] bg-[#eff4ff] px-2 py-0.5 rounded font-bold border border-[#dde9ff]">
                    ISO 9001:2015 QC Log
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono border border-[#dde9ff]">
                    <thead className="bg-[#e6eeff] text-[#0d1c2f] uppercase text-[10px]">
                      <tr>
                        <th className="p-2.5 border-b border-[#dde9ff]">Routine Test Name</th>
                        <th className="p-2.5 border-b border-[#dde9ff]">Recorded Measured Value</th>
                        <th className="p-2.5 border-b border-[#dde9ff]">Acceptance Standard</th>
                        <th className="p-2.5 border-b border-[#dde9ff] text-right">Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#eff4ff]">
                      {selectedOrder.testResults.map((t, i) => (
                        <tr key={i} className="hover:bg-[#f8f9ff]">
                          <td className="p-2.5 font-bold text-[#0d1c2f]">{t.testName}</td>
                          <td className="p-2.5 text-[#45464d]">{t.value}</td>
                          <td className="p-2.5 text-[#45464d]">{t.standard}</td>
                          <td className="p-2.5 text-right font-bold text-[#009668]">
                            <span className="bg-[#009668]/15 px-2 py-0.5 rounded">
                              {t.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right 4 cols: Works Inspection Desk & Logistics */}
            <aside className="lg:col-span-4 flex flex-col gap-6">
              {/* Inspection Witness & Live Cam Booking */}
              <div className="bg-[#ffffff] rounded p-6 shadow-sm border border-[#dde9ff]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-[#904d00]">videocam</span>
                  <h4 className="text-sm font-bold text-[#0d1c2f]">Live FAT Witness &amp; Video Inspection</h4>
                </div>
                <p className="text-xs text-[#45464d] leading-relaxed mb-4">
                  Client technical representatives or third-party inspection agencies (TUV, DNV, SGS, RITES) can schedule on-site or high-definition live video inspection at our Ajmer shopfloor.
                </p>

                <div className="flex flex-col gap-2 font-mono text-xs">
                  <a
                    href="tel:+919414431708"
                    className="p-3 bg-[#904d00] hover:bg-[#663500] text-[#ffffff] rounded font-bold uppercase tracking-wider text-center transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">call</span>
                    <span>Book FAT Witness Inspection</span>
                  </a>
                  <a
                    href={`https://wa.me/919414431708?text=Hello%20Ravi%2C%20regarding%20Works%20Order%20${selectedOrder.orderId}%2C%20we%20would%20like%20to%20schedule%20FAT%20witness%20inspection.`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-[#eff4ff] hover:bg-[#e6eeff] text-[#0d1c2f] rounded font-semibold text-center transition-colors border border-[#dde9ff] flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#009668]">chat</span>
                    <span>WhatsApp Works In-Charge</span>
                  </a>
                </div>
              </div>

              {/* Logistics & Dispatch Policy */}
              <div className="bg-[#ffffff] rounded p-6 shadow-sm border border-[#dde9ff] font-mono text-xs space-y-3">
                <div className="text-xs font-bold uppercase text-[#0d1c2f]">
                  Ajmer Works Dispatch Checklist
                </div>
                <div className="space-y-1.5 text-[#45464d]">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#009668] text-[16px]">check_circle</span>
                    <span>Heavy polythene shrink wrapping</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#009668] text-[16px]">check_circle</span>
                    <span>Wooden skid crate base with corner buffers</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#009668] text-[16px]">check_circle</span>
                    <span>Desiccant silica gel inside all cubicles</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#009668] text-[16px]">check_circle</span>
                    <span>Original CPRI Routine Test Report in pouch</span>
                  </div>
                </div>

                <div className="p-3 bg-[#e6eeff] rounded border border-[#d5e3fd] text-[11px] text-[#0d1c2f]">
                  <strong>Works Address:</strong> Near Ram Mandir, Ramganj, Ajmer 305001. Direct truck loading bay accessible for 20ft/40ft trailers.
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};
