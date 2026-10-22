import React, { useState } from 'react';
import { RfqItem } from '../../types';

interface ProformaModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: RfqItem[];
  subtotal: number;
  gst: number;
  total: number;
}

export const ProformaModal: React.FC<ProformaModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  gst,
  total,
}) => {
  const [buyerName, setBuyerName] = useState('Apex Infra Projects Pvt Ltd');
  const [buyerGst, setBuyerGst] = useState('08AAAAA0000A1Z5');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const proformaNumber = `AJM-GE-PRO-2025-${Math.floor(1000 + Math.random() * 9000)}`;
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const text = `GAGAN ELECTRICALS - FORMAL PROFORMA INVOICE
Ref: ${proformaNumber} | Date: ${currentDate}
Works: Near Ram Mandir, Ramganj, Ajmer, Rajasthan 305001
Buyer: ${buyerName} (GSTIN: ${buyerGst})

ITEMS:
${items.map((it, idx) => `${idx + 1}. ${it.title} (Qty: ${it.qty}) - ₹${(it.unitPrice * it.qty).toLocaleString('en-IN')}`).join('\n')}

Subtotal (Ex-Works Ajmer): ₹${subtotal.toLocaleString('en-IN')}
Estimated GST (18% HSN 8537): ₹${gst.toLocaleString('en-IN')}
Total Amount: ₹${total.toLocaleString('en-IN')}

Dispatch Lead Time: 3-4 Weeks from drawing clearance
Works In-Charge: Ravi (+91 9414431708)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#000000]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#ffffff] max-w-3xl w-full rounded shadow-2xl overflow-hidden flex flex-col my-8 border border-[#dde9ff] animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Bar */}
        <div className="bg-[#dde9ff] px-5 py-3 flex items-center justify-between border-b border-[#d5e3fd] print:hidden">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#904d00] text-[22px]">assignment</span>
            <div>
              <span className="font-bold text-base text-[#0d1c2f] block leading-tight">
                Formal Commercial Proforma Invoice
              </span>
              <span className="text-[11px] font-mono text-[#45464d]">
                Generated from Ajmer Works B2B Pricing Matrix
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded hover:bg-[#e6eeff] flex items-center justify-center text-[#0d1c2f] transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Proforma Sheet Content (Printable) */}
        <div className="p-6 sm:p-8 flex flex-col gap-6 text-[#0d1c2f] bg-[#ffffff]" id="printable-proforma">
          {/* Company Letterhead */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b-2 border-[#0d1c2f] pb-4 gap-4">
            <div>
              <h1 className="text-2xl font-bold uppercase tracking-tight text-[#0d1c2f]">
                Gagan Electricals
              </h1>
              <p className="text-xs font-mono uppercase tracking-widest text-[#904d00] font-bold">
                Switchgear &amp; Power Architecture • Ajmer Works
              </p>
              <p className="text-xs text-[#45464d] mt-1">
                Near Ram Mandir, Ramganj, Ajmer, Rajasthan 305001<br />
                Works Phone: +91 9414431708 | Email: ravi26976@gmail.com<br />
                CPRI Tested &amp; Approved • ISO 9001:2015 Unit
              </p>
            </div>
            <div className="text-left sm:text-right font-mono text-xs">
              <span className="inline-block px-2.5 py-1 bg-[#fe932c]/20 text-[#663500] rounded font-bold uppercase text-[11px] mb-1">
                PROFORMA INVOICE
              </span>
              <div className="font-bold text-[#0d1c2f] text-sm">{proformaNumber}</div>
              <div className="text-[#45464d]">Date: {currentDate}</div>
              <div className="text-[#009668] font-bold">HSN: 8537 (Switchboards)</div>
            </div>
          </div>

          {/* Buyer Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#eff4ff] p-4 rounded text-xs">
            <div>
              <span className="text-[#45464d] uppercase font-mono font-bold block mb-1">Billed &amp; Shipped To:</span>
              <input
                type="text"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="w-full bg-[#ffffff] border border-[#dde9ff] px-2 py-1 rounded font-semibold text-[#0d1c2f] text-xs focus:outline-none"
                placeholder="Company Legal Name"
              />
              <div className="mt-1 flex items-center gap-1">
                <span className="font-mono text-[#45464d]">GSTIN:</span>
                <input
                  type="text"
                  value={buyerGst}
                  onChange={(e) => setBuyerGst(e.target.value)}
                  className="bg-[#ffffff] border border-[#dde9ff] px-2 py-0.5 rounded font-mono uppercase text-[#0d1c2f] text-[11px] focus:outline-none"
                  placeholder="GST Number"
                />
              </div>
            </div>
            <div className="font-mono text-[#45464d] space-y-1">
              <div><strong className="text-[#0d1c2f]">Dispatch Basis:</strong> Ex-Works Ajmer Factory</div>
              <div><strong className="text-[#0d1c2f]">Lead Time:</strong> 3 – 4 Weeks upon SLD approval</div>
              <div><strong className="text-[#0d1c2f]">Transit Insurance:</strong> Included to destination site</div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-[#dde9ff]">
              <thead className="bg-[#e6eeff] font-mono text-[#0d1c2f] uppercase text-[11px]">
                <tr>
                  <th className="p-2.5 border-b border-[#dde9ff]">#</th>
                  <th className="p-2.5 border-b border-[#dde9ff]">Assembly Description &amp; Technical Spec</th>
                  <th className="p-2.5 border-b border-[#dde9ff] text-center">Qty</th>
                  <th className="p-2.5 border-b border-[#dde9ff] text-right">Unit Rate (₹)</th>
                  <th className="p-2.5 border-b border-[#dde9ff] text-right">Total Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eff4ff]">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-[#45464d]">
                      No assemblies selected in RFQ builder.
                    </td>
                  </tr>
                ) : (
                  items.map((item, index) => (
                    <tr key={item.id} className="hover:bg-[#f8f9ff]">
                      <td className="p-2.5 font-mono text-[#45464d]">{index + 1}</td>
                      <td className="p-2.5">
                        <div className="font-bold text-[#0d1c2f]">{item.title}</div>
                        <div className="text-[11px] text-[#45464d]">
                          IEC 61439-2 Form 4b • 99.9% ETP Cu Busbar • 2.0mm CRCA RAL 7035
                        </div>
                      </td>
                      <td className="p-2.5 font-mono text-center font-bold">{item.qty} Unit</td>
                      <td className="p-2.5 font-mono text-right">₹{item.unitPrice.toLocaleString('en-IN')}</td>
                      <td className="p-2.5 font-mono text-right font-bold">
                        ₹{(item.unitPrice * item.qty).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pricing Totals */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-t border-[#dde9ff] pt-4 font-mono text-xs">
            <div className="space-y-1 text-[#45464d] max-w-sm">
              <div className="font-bold text-[#0d1c2f]">Commercial Terms:</div>
              <div>• Payment: 30% Advance with Purchase Order, 70% against FAT inspection before dispatch.</div>
              <div>• Warranty: 18 months from commissioning or 24 months from dispatch date.</div>
              <div>• Routine Testing: Megger, HV Withstand, Millivolt drop included at no extra cost.</div>
            </div>

            <div className="w-full sm:w-64 bg-[#eff4ff] p-3 rounded space-y-2">
              <div className="flex justify-between text-[#45464d]">
                <span>Subtotal (Ex-Works):</span>
                <span className="font-bold text-[#0d1c2f]">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#45464d]">
                <span>GST (18% HSN 8537):</span>
                <span className="font-bold text-[#0d1c2f]">₹{gst.toLocaleString('en-IN')}</span>
              </div>
              <div className="h-px bg-[#d5e3fd]"></div>
              <div className="flex justify-between items-baseline text-sm font-bold text-[#904d00]">
                <span>Grand Total:</span>
                <span className="text-base">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Authorizing Desk */}
          <div className="pt-4 border-t border-[#eff4ff] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#009668]"></span>
              <span className="text-xs font-mono text-[#009668] font-bold">
                Works Approved • Ready for Formal Client Purchase Order
              </span>
            </div>
            <div className="text-right font-mono text-xs">
              <div className="font-bold text-[#0d1c2f]">For GAGAN ELECTRICALS</div>
              <div className="text-[#904d00] font-semibold mt-1">Ravi (Works In-Charge &amp; Technical Director)</div>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="bg-[#eff4ff] px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#dde9ff] print:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-2 bg-[#ffffff] hover:bg-[#e6eeff] border border-[#dde9ff] rounded text-xs font-mono text-[#0d1c2f] font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">content_copy</span>
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
            </button>
            <a
              href={`https://wa.me/919414431708?text=Hello%20Ravi%2C%20I%20have%20reviewed%20Proforma%20Invoice%20${proformaNumber}%20for%20total%20INR%20${total}%20for%20our%20project.%20Please%20confirm%20delivery%20schedule.`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 bg-[#009668] hover:bg-[#005236] text-[#ffffff] rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>WhatsApp to Ravi</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#e6eeff] hover:bg-[#dde9ff] rounded text-xs font-semibold text-[#0d1c2f] transition-colors"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#904d00] hover:bg-[#663500] text-[#ffffff] rounded text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
