import React, { useState } from 'react';

interface FeederSizingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddConfiguredFeeder?: (details: string) => void;
}

export const FeederSizingModal: React.FC<FeederSizingModalProps> = ({
  isOpen,
  onClose,
  onAddConfiguredFeeder,
}) => {
  const [motorHp, setMotorHp] = useState<number>(25);
  const [starterType, setStarterType] = useState<'DOL' | 'Star-Delta' | 'Soft-Starter' | 'VFD'>('Star-Delta');
  const [oemMake, setOemMake] = useState<'Schneider' | 'Siemens' | 'ABB' | 'L&T'>('Siemens');

  if (!isOpen) return null;

  const motorKw = Math.round(motorHp * 0.746 * 10) / 10;
  // Estimated Full Load Current (FLC) at 415V 3-phase (approx 1.4 A per HP)
  const flc = Math.round(motorHp * 1.38 * 10) / 10;

  // Sizing recommendations
  let contactorRating = '';
  let breakerRating = '';
  let cableSize = '';

  if (motorHp <= 10) {
    contactorRating = starterType === 'DOL' ? '18A (AC-3)' : '12A (AC-3)';
    breakerRating = '32A MPCB / MCCB (Type-2 Coordinated)';
    cableSize = '3C x 4.0 sq.mm Cu Armored Cable';
  } else if (motorHp <= 30) {
    contactorRating = starterType === 'DOL' ? '40A (AC-3)' : '25A (AC-3)';
    breakerRating = '63A MCCB (Thermal-Mag)';
    cableSize = '3C x 10.0 sq.mm Cu Armored Cable';
  } else if (motorHp <= 60) {
    contactorRating = starterType === 'Star-Delta' ? '50A (AC-3)' : '80A (AC-3)';
    breakerRating = '125A MCCB with Electronic Trip';
    cableSize = '3C x 25.0 sq.mm Cu / 35.0 Al Armored Cable';
  } else {
    contactorRating = starterType === 'Star-Delta' ? '115A (AC-3)' : '185A (AC-3)';
    breakerRating = '250A MCCB with Microprocessor Trip';
    cableSize = '3C x 70.0 sq.mm Cu Armored Cable';
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#000000]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#ffffff] max-w-2xl w-full rounded shadow-2xl overflow-hidden flex flex-col my-8 border border-[#dde9ff] animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-[#dde9ff] px-5 py-3 flex items-center justify-between border-b border-[#d5e3fd]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#904d00] text-[22px]">settings_input_component</span>
            <div>
              <span className="font-bold text-base text-[#0d1c2f] block leading-tight">
                iMCC Feeder Starter Sizing Tool (Type-2 Coordination)
              </span>
              <span className="text-[11px] font-mono text-[#45464d]">
                IEC 60947-4-1 / IS 13947 Motor Feeder Engineering
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

        <div className="p-6 flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0d1c2f] mb-1">
                Motor Rating (HP)
              </label>
              <select
                value={motorHp}
                onChange={(e) => setMotorHp(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#eff4ff] rounded text-sm font-mono text-[#0d1c2f] focus:outline-none focus:ring-1 focus:ring-[#904d00]"
              >
                <option value={5}>5 HP (3.7 kW)</option>
                <option value={7.5}>7.5 HP (5.5 kW)</option>
                <option value={10}>10 HP (7.5 kW)</option>
                <option value={15}>15 HP (11 kW)</option>
                <option value={20}>20 HP (15 kW)</option>
                <option value={25}>25 HP (18.5 kW)</option>
                <option value={30}>30 HP (22 kW)</option>
                <option value={40}>40 HP (30 kW)</option>
                <option value={50}>50 HP (37 kW)</option>
                <option value={75}>75 HP (55 kW)</option>
                <option value={100}>100 HP (75 kW)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0d1c2f] mb-1">
                Starter Configuration
              </label>
              <select
                value={starterType}
                onChange={(e) => setStarterType(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#eff4ff] rounded text-sm font-mono text-[#0d1c2f] focus:outline-none focus:ring-1 focus:ring-[#904d00]"
              >
                <option value="DOL">Direct On-Line (DOL)</option>
                <option value="Star-Delta">Fully Automatic Star-Delta</option>
                <option value="Soft-Starter">Thyristor Soft-Starter</option>
                <option value="VFD">Variable Frequency Drive (VFD)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0d1c2f] mb-1">
                Preferred OEM Gear
              </label>
              <select
                value={oemMake}
                onChange={(e) => setOemMake(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#eff4ff] rounded text-sm font-mono text-[#0d1c2f] focus:outline-none focus:ring-1 focus:ring-[#904d00]"
              >
                <option value="Siemens">Siemens (SIRIUS)</option>
                <option value="Schneider">Schneider (TeSys Deca)</option>
                <option value="ABB">ABB (AF Series)</option>
                <option value="L&T">L&amp;T (MO / MNX)</option>
              </select>
            </div>
          </div>

          {/* Computed Output */}
          <div className="bg-[#eff4ff] p-4 rounded border border-[#dde9ff] flex flex-col gap-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#d5e3fd] pb-2">
              <span className="font-bold text-[#0d1c2f]">
                FEeder SPEC: {motorHp} HP ({motorKw} kW) • {starterType}
              </span>
              <span className="bg-[#009668]/15 text-[#009668] px-2 py-0.5 rounded font-bold">
                FLC: ~{flc} A (415V 50Hz)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#0d1c2f]">
              <div className="bg-[#ffffff] p-2.5 rounded">
                <span className="text-[10px] text-[#45464d] block uppercase font-bold">Recommended Contactor</span>
                <span className="text-sm font-bold text-[#904d00]">{contactorRating}</span>
                <span className="text-[10px] text-[#45464d] block font-sans">{oemMake} Rated AC-3 Duty</span>
              </div>

              <div className="bg-[#ffffff] p-2.5 rounded">
                <span className="text-[10px] text-[#45464d] block uppercase font-bold">Upstream Protective Device</span>
                <span className="text-sm font-bold text-[#0d1c2f]">{breakerRating}</span>
                <span className="text-[10px] text-[#009668] block font-sans">Type-2 Short Circuit Safe</span>
              </div>

              <div className="bg-[#ffffff] p-2.5 rounded sm:col-span-2">
                <span className="text-[10px] text-[#45464d] block uppercase font-bold">Recommended Feeder Cable</span>
                <span className="text-sm font-bold text-[#0d1c2f]">{cableSize}</span>
                <span className="text-[10px] text-[#45464d] block font-sans">
                  Calculated for 3% max allowable voltage drop over 50 meters run
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#eff4ff]">
            <a
              href="tel:+919414431708"
              className="text-xs font-mono text-[#904d00] font-bold hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[15px]">call</span>
              <span>Speak to Ravi for Custom VFD Starter Schemes</span>
            </a>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#e6eeff] hover:bg-[#dde9ff] rounded text-xs font-semibold text-[#0d1c2f] transition-colors"
              >
                Done
              </button>
              <button
                onClick={() => {
                  const spec = `${motorHp}HP (${motorKw}kW) ${starterType} with ${oemMake} components`;
                  if (onAddConfiguredFeeder) onAddConfiguredFeeder(spec);
                  onClose();
                }}
                className="px-4 py-2 bg-[#904d00] hover:bg-[#663500] text-[#ffffff] rounded text-xs font-bold font-mono uppercase tracking-wider transition-colors shadow-sm"
              >
                Apply to iMCC RFQ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
