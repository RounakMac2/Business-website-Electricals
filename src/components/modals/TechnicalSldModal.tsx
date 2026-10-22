import React from 'react';

interface TechnicalSldModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  filename: string;
}

export const TechnicalSldModal: React.FC<TechnicalSldModalProps> = ({
  isOpen,
  onClose,
  title,
  filename,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#000000]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#ffffff] max-w-3xl w-full rounded shadow-2xl overflow-hidden flex flex-col my-8 border border-[#dde9ff] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#dde9ff] px-5 py-3 flex items-center justify-between border-b border-[#d5e3fd]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#904d00] text-[22px]">account_tree</span>
            <div>
              <span className="font-bold text-base text-[#0d1c2f] block leading-tight">{title}</span>
              <span className="text-[11px] font-mono text-[#45464d]">Gagan Electricals CAD Drawing Archive</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded hover:bg-[#e6eeff] flex items-center justify-center text-[#0d1c2f] transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-5">
          <div className="bg-[#eff4ff] p-5 rounded border border-[#d5e3fd] flex flex-col items-center justify-center text-center">
            {/* Schematic Preview Box */}
            <div className="w-full bg-[#ffffff] border border-[#c6c6cd] rounded p-4 mb-4 font-mono text-left text-xs shadow-inner overflow-x-auto">
              <div className="flex items-center justify-between border-b border-[#eff4ff] pb-2 mb-3">
                <span className="text-[#904d00] font-bold">SCHEMATIC: {filename}</span>
                <span className="bg-[#fe932c]/20 text-[#663500] px-2 py-0.5 rounded font-bold text-[10px]">
                  REV-4 CERTIFIED
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px] text-[#0d1c2f]">
                <div className="space-y-1">
                  <div className="text-[#45464d] uppercase tracking-wider font-semibold">Incomer Section</div>
                  <div>• 3P+N 415V 50Hz 4-Wire Bus System</div>
                  <div>• Incomer Breaker: 1600A 4P 50kA Drawout ACB</div>
                  <div>• Microprocessor Trip Unit: LSIG Protection</div>
                  <div>• CT Ratio: 1600/5A Class 0.5S + 5P10 (Dual Core)</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[#45464d] uppercase tracking-wider font-semibold">Busbar &amp; Segregation</div>
                  <div>• Busbar: 2x 100x10mm ETP Cu (Current Density: 1.2 A/mm²)</div>
                  <div>• Short-time withstand: 50kA for 1.0 Sec (CPRI Tested)</div>
                  <div>• Separation: Form 4b Type 7 (Metallic barriers)</div>
                  <div>• Enclosure: 2.0mm CRCA Steel, RAL 7035, IP54</div>
                </div>
              </div>
            </div>

            <span className="material-symbols-outlined text-[#45464d] text-[42px] mb-1">schema</span>
            <span className="font-mono text-sm font-bold text-[#0d1c2f]">{filename}</span>
            <p className="text-xs text-[#45464d] max-w-lg mt-1.5 leading-relaxed">
              Complete electrical schematic includes busbar dimensioning calculations, CT/PT metering ratios, control terminal numbers, interlock schemes, and short-circuit withstand compliance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#eff4ff]">
            <span className="text-[11px] font-mono text-[#009668] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">verified</span>
              Digital Signature: Ravi (Works In-Charge • Ajmer)
            </span>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-initial px-4 py-2 bg-[#e6eeff] hover:bg-[#dde9ff] rounded text-xs font-semibold text-[#0d1c2f] transition-colors"
              >
                Close Viewer
              </button>
              <button
                onClick={() => {
                  // Simulate authenticated file download
                  const content = `GAGAN ELECTRICALS - AJMER WORKS
TECHNICAL SINGLE LINE DIAGRAM ARCHIVE
Filename: ${filename}
Title: ${title}
Standards: IEC 61439-1 & 2 / IS 8623 Form 4b
Short Circuit Withstand: 50kA for 1s (CPRI Certified)
Busbar: 99.9% ETP Grade Copper
Fabrication: 2.0mm CRCA Sheet Steel, RAL 7035 Powder Coated
Direct Works Desk: Ravi (+91 9414431708 | ravi26976@gmail.com)`;
                  const blob = new Blob([content], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = filename;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="flex-1 sm:flex-initial px-4 py-2 bg-[#904d00] hover:bg-[#663500] text-[#ffffff] rounded text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Download CAD / SLD</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
