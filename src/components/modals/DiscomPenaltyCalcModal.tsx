import React, { useState } from 'react';

interface DiscomPenaltyCalcModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPanel?: (kvar: number) => void;
}

export const DiscomPenaltyCalcModal: React.FC<DiscomPenaltyCalcModalProps> = ({
  isOpen,
  onClose,
  onApplyPanel,
}) => {
  const [sanctionedLoadKw, setSanctionedLoadKw] = useState<number>(350);
  const [currentPf, setCurrentPf] = useState<number>(0.78);
  const [monthlyUnitsKwh, setMonthlyUnitsKwh] = useState<number>(85000);
  const [tariffPerUnit, setTariffPerUnit] = useState<number>(8.5);

  if (!isOpen) return null;

  // Formula:
  // Q = P * (tan(acos(PF1)) - tan(acos(PF2)))
  const phi1 = Math.acos(Math.min(0.99, Math.max(0.5, currentPf)));
  const targetPf = 0.99;
  const phi2 = Math.acos(targetPf);
  const tanPhi1 = Math.tan(phi1);
  const tanPhi2 = Math.tan(phi2);
  const requiredKvarRaw = sanctionedLoadKw * (tanPhi1 - tanPhi2);
  const recommendedKvar = Math.ceil(requiredKvarRaw / 25) * 25; // standard 25 kVAR step rounding

  // Penalty estimation:
  // In DISCOM tariff, PF below 0.90 incurs ~1% to 2% penalty per 0.01 drop
  const pfDeficit = Math.max(0, 0.90 - currentPf);
  const penaltyPercentage = pfDeficit > 0 ? (pfDeficit * 100 * 1.5) : 0;
  const monthlyEnergyCharge = monthlyUnitsKwh * tariffPerUnit;
  const estimatedMonthlyPenalty = Math.round((monthlyEnergyCharge * penaltyPercentage) / 100);
  const annualLoss = estimatedMonthlyPenalty * 12;

  // Estimate APFC Panel cost based on Gagan Electricals 400 kVAR base rate
  const estimatedPanelCost = Math.round((recommendedKvar / 400) * 485000);
  const paybackMonths = annualLoss > 0 ? Math.max(1, Math.round((estimatedPanelCost / (estimatedMonthlyPenalty || 1)) * 10) / 10) : 0;

  return (
    <div className="fixed inset-0 z-50 bg-[#000000]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#ffffff] max-w-2xl w-full rounded shadow-2xl overflow-hidden flex flex-col my-8 border border-[#dde9ff] animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-[#dde9ff] px-5 py-3 flex items-center justify-between border-b border-[#d5e3fd]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#904d00] text-[22px]">calculate</span>
            <div>
              <span className="font-bold text-base text-[#0d1c2f] block leading-tight">
                DISCOM Power Factor Penalty &amp; APFC Sizing Calculator
              </span>
              <span className="text-[11px] font-mono text-[#45464d]">
                State Electricity Board (AVVNL / JVVNL / JDVVNL / Torrent) Compliance
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0d1c2f] mb-1">
                Connected Load (kW / kVA)
              </label>
              <input
                type="number"
                value={sanctionedLoadKw}
                onChange={(e) => setSanctionedLoadKw(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-[#eff4ff] rounded text-sm font-mono text-[#0d1c2f] focus:outline-none focus:ring-1 focus:ring-[#904d00]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0d1c2f] mb-1">
                Current Operating PF (Lagging)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.5"
                max="0.95"
                value={currentPf}
                onChange={(e) => setCurrentPf(Number(e.target.value) || 0.78)}
                className="w-full px-3 py-2 bg-[#eff4ff] rounded text-sm font-mono text-[#0d1c2f] focus:outline-none focus:ring-1 focus:ring-[#904d00]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0d1c2f] mb-1">
                Monthly Consumption (Units / kWh)
              </label>
              <input
                type="number"
                value={monthlyUnitsKwh}
                onChange={(e) => setMonthlyUnitsKwh(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-[#eff4ff] rounded text-sm font-mono text-[#0d1c2f] focus:outline-none focus:ring-1 focus:ring-[#904d00]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0d1c2f] mb-1">
                Industrial Tariff Rate (₹ / Unit)
              </label>
              <input
                type="number"
                step="0.1"
                value={tariffPerUnit}
                onChange={(e) => setTariffPerUnit(Number(e.target.value) || 8.5)}
                className="w-full px-3 py-2 bg-[#eff4ff] rounded text-sm font-mono text-[#0d1c2f] focus:outline-none focus:ring-1 focus:ring-[#904d00]"
              />
            </div>
          </div>

          {/* Results Display */}
          <div className="bg-[#eff4ff] p-4 rounded border border-[#dde9ff] flex flex-col gap-3 font-mono">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
              <div className="bg-[#ffffff] p-3 rounded">
                <span className="text-[10px] text-[#45464d] block uppercase font-bold">Recommended APFC</span>
                <span className="text-xl font-bold text-[#904d00]">{recommendedKvar} kVAR</span>
                <span className="text-[10px] text-[#009668] block">Target: 0.99 Unity</span>
              </div>

              <div className="bg-[#ffffff] p-3 rounded">
                <span className="text-[10px] text-[#45464d] block uppercase font-bold">Est. Monthly Penalty</span>
                <span className="text-xl font-bold text-[#ba1a1a]">₹{estimatedMonthlyPenalty.toLocaleString('en-IN')}</span>
                <span className="text-[10px] text-[#45464d] block">Billed by DISCOM</span>
              </div>

              <div className="bg-[#ffffff] p-3 rounded col-span-2 sm:col-span-1">
                <span className="text-[10px] text-[#45464d] block uppercase font-bold">Capital Payback</span>
                <span className="text-xl font-bold text-[#009668]">{paybackMonths} Months</span>
                <span className="text-[10px] text-[#009668] block">Rapid ROI Recovery</span>
              </div>
            </div>

            <div className="p-3 bg-[#e6eeff] rounded text-xs text-[#0d1c2f] flex items-start gap-2 font-sans">
              <span className="material-symbols-outlined text-[#009668] text-[20px] shrink-0 mt-0.5">verified</span>
              <div>
                <strong>7% Detuned Harmonic Filtering Advantage:</strong> Prevents resonance with 5th and 7th harmonic generating nonlinear VFD/LED loads, preventing premature capacitor burst and capacitor bank tripping.
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#eff4ff]">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#e6eeff] hover:bg-[#dde9ff] rounded text-xs font-semibold text-[#0d1c2f] transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                if (onApplyPanel) onApplyPanel(recommendedKvar);
                onClose();
              }}
              className="px-4 py-2 bg-[#904d00] hover:bg-[#663500] text-[#ffffff] rounded text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
              <span>Add {recommendedKvar} kVAR APFC Panel to RFQ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
