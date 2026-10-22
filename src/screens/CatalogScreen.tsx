import React, { useState, useMemo } from 'react';
import { ProductSpec, RfqItem } from '../types';
import { PRODUCTS } from '../data/catalogData';
import { TechnicalSldModal } from '../components/modals/TechnicalSldModal';
import { DiscomPenaltyCalcModal } from '../components/modals/DiscomPenaltyCalcModal';
import { FeederSizingModal } from '../components/modals/FeederSizingModal';
import { ProformaModal } from '../components/modals/ProformaModal';
import { exportCombinedTenderZip } from '../utils/exportZip';

interface CatalogScreenProps {
  rfqItems: RfqItem[];
  setRfqItems: React.Dispatch<React.SetStateAction<RfqItem[]>>;
  onNavigateToRfq: () => void;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({
  rfqItems,
  setRfqItems,
  onNavigateToRfq,
}) => {
  const [catalogMode, setCatalogMode] = useState<'standard' | 'custom'>('standard');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCurrent, setFilterCurrent] = useState('ALL');
  const [filterBrand, setFilterBrand] = useState('ALL');
  const [filterIngress, setFilterIngress] = useState('ALL');

  // Modals state
  const [sldModal, setSldModal] = useState<{ open: boolean; title: string; filename: string }>({
    open: false,
    title: '',
    filename: '',
  });
  const [discomModalOpen, setDiscomModalOpen] = useState(false);
  const [feederModalOpen, setFeederModalOpen] = useState(false);
  const [proformaModalOpen, setProformaModalOpen] = useState(false);
  const [isExportingZip, setIsExportingZip] = useState(false);

  // Custom panel builder state for "Engineered-to-Order" tab
  const [customRating, setCustomRating] = useState('2000A');
  const [customFeedersCount, setCustomFeedersCount] = useState(16);
  const [customBusbar, setCustomBusbar] = useState<'cu' | 'al'>('cu');

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.series.toLowerCase().includes(q) ||
        p.subTitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.currentTag.toLowerCase().includes(q) ||
        p.ingressTag.toLowerCase().includes(q);

      const matchesCurrent = filterCurrent === 'ALL' || p.currentTag.includes(filterCurrent);
      const matchesBrand =
        filterBrand === 'ALL' || p.brandTags.some((b) => b.toLowerCase().includes(filterBrand.toLowerCase()));
      const matchesIngress = filterIngress === 'ALL' || p.ingressTag.includes(filterIngress);

      return matchesSearch && matchesCurrent && matchesBrand && matchesIngress;
    });
  }, [searchQuery, filterCurrent, filterBrand, filterIngress]);

  // RFQ Calculations
  const subtotal = useMemo(() => {
    return rfqItems.reduce((acc, curr) => acc + curr.unitPrice * curr.qty, 0);
  }, [rfqItems]);

  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  const handleAddItem = (product: ProductSpec, qty = 1) => {
    setRfqItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) => (i.productId === product.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [
        {
          id: `rfq-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          productId: product.id,
          title: `${product.series} (${product.badge})`,
          unitPrice: product.price,
          qty: qty,
        },
        ...prev,
      ];
    });
  };

  const handleRemoveItem = (id: string) => {
    setRfqItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilterCurrent('ALL');
    setFilterBrand('ALL');
    setFilterIngress('ALL');
  };

  const handleExportZip = async () => {
    if (rfqItems.length === 0) {
      alert('Your RFQ builder is empty. Add assemblies to export combined tender package.');
      return;
    }
    setIsExportingZip(true);
    try {
      await exportCombinedTenderZip(rfqItems, subtotal, gst, total);
    } catch (e) {
      console.error(e);
      alert('Failed to generate tender ZIP file.');
    } finally {
      setIsExportingZip(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Industrial Meta Sub-Header Strip */}
      <div className="w-full bg-[#dde9ff] px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between text-[#45464d] text-[10px] sm:text-xs font-mono border-b border-[#d5e3fd]">
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
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

      {/* Primary Page Control Deck */}
      <div className="w-full px-4 sm:px-6 py-8">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
          {/* Headline & Value Pitch Banner */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1 bg-[#e6eeff] px-2.5 py-1 rounded text-[#904d00] text-[10px] sm:text-xs uppercase tracking-widest font-bold font-mono mb-2">
                <span className="material-symbols-outlined text-[15px]">verified_user</span> Direct Engineering Baseline Quotes
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#0d1c2f] uppercase tracking-tight font-bold">
                Industrial Panel Catalog &amp; Transparent Tiered Pricing (₹ INR)
              </h1>
              <p className="text-sm text-[#45464d] max-w-3xl mt-1 leading-relaxed">
                Certified low-voltage switchboards, intelligent motor control centers, and grid-synchronization assemblies. Built to Form 4b standards with verifiable tier discounts for OEM packagers and industrial EPC contractors.
              </p>
            </div>

            {/* Catalog Mode Tabs */}
            <div className="flex items-center bg-[#e6eeff] p-1 rounded gap-1 shrink-0 self-start lg:self-auto font-mono">
              <button
                onClick={() => setCatalogMode('standard')}
                className={`px-3 sm:px-4 py-2 rounded text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  catalogMode === 'standard'
                    ? 'bg-[#000000] text-[#ffffff] shadow-sm'
                    : 'text-[#45464d] hover:text-[#0d1c2f]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">inventory_2</span>
                <span>Ready-to-Wire Baselines</span>
              </button>
              <button
                onClick={() => setCatalogMode('custom')}
                className={`px-3 sm:px-4 py-2 rounded text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  catalogMode === 'custom'
                    ? 'bg-[#000000] text-[#ffffff] shadow-sm'
                    : 'text-[#45464d] hover:text-[#0d1c2f]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">tune</span>
                <span>Engineered-to-Order Panels</span>
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-[#eff4ff] p-4 rounded shadow-sm flex flex-col gap-3 border border-[#dde9ff]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-3">
              {/* Search */}
              <div className="lg:col-span-4 relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#76777d] text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by rating (1600A, Form 4b, IP65), model or keywords..."
                  className="w-full pl-9 pr-3 py-2 bg-[#ffffff] rounded text-xs text-[#0d1c2f] placeholder-[#45464d]/60 focus:outline-none focus:ring-1 focus:ring-[#000000] font-medium border border-[#dde9ff]"
                />
              </div>

              {/* Rating */}
              <div className="lg:col-span-2">
                <select
                  value={filterCurrent}
                  onChange={(e) => setFilterCurrent(e.target.value)}
                  className="w-full px-3 py-2 bg-[#ffffff] rounded text-xs text-[#0d1c2f] focus:outline-none focus:ring-1 focus:ring-[#000000] font-medium border border-[#dde9ff]"
                >
                  <option value="ALL">Current: All Amperages</option>
                  <option value="630A">630A Weatherproof</option>
                  <option value="1600A">1600A Heavy Duty</option>
                  <option value="400kVAR">400 kVAR Detuned</option>
                  <option value="1000kVA">1000 kVA Sync/AMF</option>
                </select>
              </div>

              {/* OEM Gear */}
              <div className="lg:col-span-2">
                <select
                  value={filterBrand}
                  onChange={(e) => setFilterBrand(e.target.value)}
                  className="w-full px-3 py-2 bg-[#ffffff] rounded text-xs text-[#0d1c2f] focus:outline-none focus:ring-1 focus:ring-[#000000] font-medium border border-[#dde9ff]"
                >
                  <option value="ALL">OEM Gear: Any / Multivendor</option>
                  <option value="ABB">ABB (Emax2 / Tmax XT)</option>
                  <option value="Schneider">Schneider (MasterPact MTZ)</option>
                  <option value="Siemens">Siemens (3WA / 3WL)</option>
                  <option value="LT">L&amp;T (Omega / AU)</option>
                </select>
              </div>

              {/* Enclosure */}
              <div className="lg:col-span-2">
                <select
                  value={filterIngress}
                  onChange={(e) => setFilterIngress(e.target.value)}
                  className="w-full px-3 py-2 bg-[#ffffff] rounded text-xs text-[#0d1c2f] focus:outline-none focus:ring-1 focus:ring-[#000000] font-medium border border-[#dde9ff]"
                >
                  <option value="ALL">Enclosure: Form &amp; IP Rating</option>
                  <option value="Form 4b">Form 4b Separation</option>
                  <option value="IP54">IP54 Indoor Free-Standing</option>
                  <option value="IP65">IP65 Outdoor Canopy</option>
                </select>
              </div>

              {/* Reset CTA */}
              <div className="lg:col-span-2 flex items-center justify-end">
                <button
                  onClick={handleResetFilters}
                  className="w-full py-2 px-3 bg-[#d5e3fd] text-[#0d1c2f] rounded text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#c6c6cd]/50 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                  <span>Reset Filters</span>
                </button>
              </div>
            </div>

            {/* Active Spec Pills & Live Metrics */}
            <div className="flex flex-wrap items-center justify-between pt-1 gap-2 text-xs font-mono">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[#45464d] uppercase tracking-wider font-semibold text-[10px]">Active Tags:</span>
                <span className="bg-[#e6eeff] px-2 py-0.5 rounded text-[#0d1c2f] text-[11px]">
                  Copper Busbar: ETP IS 613
                </span>
                <span className="bg-[#e6eeff] px-2 py-0.5 rounded text-[#0d1c2f] text-[11px]">
                  Thickness: 2.0mm CRCA
                </span>
                <span className="bg-[#e6eeff] px-2 py-0.5 rounded text-[#0d1c2f] text-[11px]">
                  CPRI Short-Circuit: 50kA/1s
                </span>
                <span className="bg-[#002113] text-[#6ffbbe] px-2 py-0.5 rounded font-bold flex items-center gap-1 text-[11px]">
                  <span className="material-symbols-outlined text-[13px]">check_circle</span> DISCOM Compliant
                </span>
              </div>
              <div className="text-[#45464d] text-[11px]">
                Showing {filteredProducts.length} engineered assemblies
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid with Asymmetric Sticky Quotation Summary Dock */}
      <div className="w-full px-4 sm:px-6 pb-12">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Primary Product Spec Stream (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6" id="catalog-list">
            {catalogMode === 'custom' && (
              <div className="bg-[#ffffff] rounded shadow-md border-2 border-[#904d00]/30 p-6 flex flex-col gap-5 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#904d00] text-[24px]">tune</span>
                    <div>
                      <h2 className="text-lg font-bold text-[#0d1c2f]">Engineered-to-Order Custom Switchboard Architect</h2>
                      <p className="text-xs text-[#45464d]">Configure bespoke busbar sizing, feeder tiers, and enclosure dimensions</p>
                    </div>
                  </div>
                  <span className="bg-[#904d00] text-[#ffffff] px-2 py-0.5 rounded text-xs font-mono font-bold">
                    Custom BOQ Engine
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0d1c2f] mb-1">Target Incomer Amperage</label>
                    <select
                      value={customRating}
                      onChange={(e) => setCustomRating(e.target.value)}
                      className="w-full px-3 py-2 bg-[#eff4ff] rounded text-xs font-mono text-[#0d1c2f]"
                    >
                      <option value="1250A">1250A Incomer</option>
                      <option value="1600A">1600A Incomer</option>
                      <option value="2000A">2000A Incomer</option>
                      <option value="2500A">2500A Incomer</option>
                      <option value="3200A">3200A Incomer</option>
                      <option value="4000A">4000A Incomer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0d1c2f] mb-1">Outgoing Feeder Slots</label>
                    <input
                      type="number"
                      min={4}
                      max={32}
                      value={customFeedersCount}
                      onChange={(e) => setCustomFeedersCount(Number(e.target.value) || 4)}
                      className="w-full px-3 py-2 bg-[#eff4ff] rounded text-xs font-mono text-[#0d1c2f]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0d1c2f] mb-1">Busbar Metallurgy</label>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => setCustomBusbar('cu')}
                        className={`flex-1 py-1.5 px-2 rounded text-xs font-mono font-semibold ${
                          customBusbar === 'cu' ? 'bg-[#904d00] text-white' : 'bg-[#eff4ff] text-[#0d1c2f]'
                        }`}
                      >
                        99.9% Cu
                      </button>
                      <button
                        onClick={() => setCustomBusbar('al')}
                        className={`flex-1 py-1.5 px-2 rounded text-xs font-mono font-semibold ${
                          customBusbar === 'al' ? 'bg-[#904d00] text-white' : 'bg-[#eff4ff] text-[#0d1c2f]'
                        }`}
                      >
                        EC Aluminum
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-[#eff4ff] p-4 rounded text-xs font-mono flex flex-col sm:flex-row justify-between items-center gap-3">
                  <div>
                    <div className="font-bold text-[#0d1c2f]">
                      Estimated Custom Baseline: {customRating} • {customFeedersCount} Feeders • {customBusbar === 'cu' ? 'Copper' : 'Aluminum'}
                    </div>
                    <div className="text-[#45464d] text-[11px] mt-0.5">
                      Complies with Form 4b Type 7 internal separation &amp; CPRI short circuit parameters.
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const estimatedPrice =
                        (parseInt(customRating) || 1600) * 450 + customFeedersCount * 22000 * (customBusbar === 'cu' ? 1 : 0.82);
                      const roundedPrice = Math.round(estimatedPrice / 5000) * 5000;
                      setRfqItems((prev) => [
                        {
                          id: `custom-panel-${Date.now()}`,
                          productId: 'custom-eto',
                          title: `Custom Switchboard (${customRating} • ${customFeedersCount} Feeders • ${customBusbar.toUpperCase()})`,
                          unitPrice: roundedPrice,
                          qty: 1,
                        },
                        ...prev,
                      ]);
                      alert('Custom Engineered-to-Order assembly added to your RFQ builder.');
                    }}
                    className="px-4 py-2 bg-[#904d00] hover:bg-[#663500] text-white font-bold rounded uppercase tracking-wider text-xs shrink-0 cursor-pointer shadow-sm"
                  >
                    Add Custom Switchboard to RFQ
                  </button>
                </div>
              </div>
            )}

            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="bg-[#ffffff] rounded shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden border border-[#dde9ff]"
              >
                {/* Product Card Top Strip */}
                <div className="bg-[#dde9ff] px-4 py-2 flex flex-wrap items-center justify-between gap-2 border-b border-[#d5e3fd]">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 bg-[#000000] text-[#ffffff] rounded text-[10px] font-mono font-bold uppercase tracking-wider">
                      {product.series}
                    </span>
                    <span className="text-xs font-semibold text-[#0d1c2f] font-mono">{product.subTitle}</span>
                    <span className="px-2 py-0.5 bg-[#e6eeff] rounded text-[#45464d] text-[10px] font-mono font-semibold">
                      {product.badge}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-[#ffffff] px-2 py-0.5 rounded shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-[#009668] animate-pulse"></span>
                    <span className="text-[10px] text-[#009668] font-bold uppercase font-mono">
                      CPRI 50kA Certified
                    </span>
                  </div>
                </div>

                {/* Product Card Body */}
                <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
                  {/* Left Column: Image & Technical Actions */}
                  <div className="md:col-span-4 flex flex-col gap-3">
                    <div className="relative w-full aspect-[4/3] bg-[#e6eeff] rounded overflow-hidden border border-[#d5e3fd]">
                      <img
                        src={product.image}
                        alt={product.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#0d1c2f]/85 backdrop-blur-sm text-[#ffffff] text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
                        {product.dimensionsBadge}
                      </span>
                    </div>

                    <div className="bg-[#eff4ff] p-2 rounded flex items-center justify-between text-xs font-mono border border-[#dde9ff]">
                      <span className="text-[#45464d] font-medium text-[11px]">{product.busbarLabel}</span>
                      <span className="text-[#0d1c2f] font-bold text-[11px]">{product.busbarValue}</span>
                    </div>

                    <button
                      onClick={() =>
                        setSldModal({
                          open: true,
                          title: `${product.series} Single Line Diagram`,
                          filename: product.sldFile,
                        })
                      }
                      className="w-full py-2 px-3 bg-[#e6eeff] hover:bg-[#dde9ff] transition-colors rounded text-xs font-semibold text-[#0d1c2f] flex items-center justify-center gap-1.5 cursor-pointer font-mono"
                    >
                      <span className="material-symbols-outlined text-[16px]">account_tree</span>
                      <span>View Technical SLD</span>
                    </button>
                  </div>

                  {/* Right Column: Engineering Details & Pricing */}
                  <div className="md:col-span-8 flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2 gap-1">
                        <h3 className="text-base sm:text-lg text-[#0d1c2f] font-bold leading-tight">
                          {product.name}
                        </h3>
                        <div className="text-left sm:text-right shrink-0">
                          <span className="text-[10px] font-mono text-[#45464d] block uppercase tracking-wider">
                            {product.priceLabel}
                          </span>
                          <span className="text-xl sm:text-2xl text-[#904d00] font-bold font-mono">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-[#45464d] mb-3 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Parameter Spec Table */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs bg-[#eff4ff] p-3 rounded mb-3 border border-[#dde9ff]">
                        {product.parameters.map((param, i) => (
                          <div
                            key={i}
                            className={`flex justify-between py-1 border-b border-[#dde9ff] last:border-b-0 ${
                              i >= product.parameters.length - 2 ? 'sm:border-b-0' : ''
                            }`}
                          >
                            <span className="text-[#45464d]">{param.label}</span>
                            <span className="font-mono text-[#0d1c2f] font-semibold text-[11px]">
                              {param.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Volume Tier Matrix Table */}
                      {product.tierPricing && (
                        <div className="mb-3">
                          <span className="text-[10px] font-mono text-[#45464d] font-bold uppercase tracking-wider block mb-1">
                            Quantity Tier Matrix (B2B Volume)
                          </span>
                          <div className="grid grid-cols-3 gap-1.5 text-center font-mono">
                            {product.tierPricing.map((tier, idx) => (
                              <div
                                key={idx}
                                className={`p-2 rounded border ${
                                  tier.highlight
                                    ? 'bg-[#fe932c]/10 border-[#fe932c]/40 text-[#904d00]'
                                    : 'bg-[#e6eeff] border-[#d5e3fd] text-[#0d1c2f]'
                                }`}
                              >
                                <span className="block text-[10px] text-[#45464d]">{tier.qty}</span>
                                <span className="block text-xs font-bold">
                                  ₹{tier.price.toLocaleString('en-IN')}
                                </span>
                                <span
                                  className={`block text-[9px] ${
                                    tier.savingLabel ? 'text-[#009668] font-bold' : 'text-[#76777d]'
                                  }`}
                                >
                                  {tier.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Special Banner (Rebate or Notice) */}
                      {product.rebateBanner && (
                        <div className="bg-[#e6eeff] p-2.5 rounded flex items-center justify-between text-xs mb-3 border border-[#d5e3fd]">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#904d00] text-[20px] shrink-0">
                              {product.rebateBanner.icon}
                            </span>
                            <span className="text-[#0d1c2f] font-medium leading-snug">
                              {product.rebateBanner.text}
                            </span>
                          </div>
                          <span className="text-[#904d00] font-mono font-bold shrink-0 ml-2">
                            {product.rebateBanner.priceTag}
                          </span>
                        </div>
                      )}

                      {product.noticeBanner && (
                        <div className="bg-[#eff4ff] p-2 rounded text-xs text-[#45464d] mb-3 flex items-center gap-2 border border-[#dde9ff]">
                          <span className="material-symbols-outlined text-[#904d00] text-[18px] shrink-0">
                            {product.noticeBanner.icon}
                          </span>
                          <span>{product.noticeBanner.text}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#eff4ff]">
                      <button
                        onClick={() => handleAddItem(product)}
                        className="flex-1 min-w-[190px] py-2.5 px-4 bg-[#904d00] hover:bg-[#663500] transition-colors rounded text-[#ffffff] text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-[0.98]"
                      >
                        <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                        <span>Configure &amp; Add to RFQ</span>
                      </button>

                      {product.id === 'imcc-flex' && (
                        <button
                          onClick={() => setFeederModalOpen(true)}
                          className="py-2.5 px-3 bg-[#d5e3fd] hover:bg-[#dde9ff] transition-colors rounded text-[#0d1c2f] text-xs font-mono font-semibold flex items-center gap-1.5 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">settings_input_component</span>
                          <span>Sizing Tool</span>
                        </button>
                      )}

                      {product.id === 'apfc-harmonic' && (
                        <button
                          onClick={() => setDiscomModalOpen(true)}
                          className="py-2.5 px-3 bg-[#d5e3fd] hover:bg-[#dde9ff] transition-colors rounded text-[#0d1c2f] text-xs font-mono font-semibold flex items-center gap-1.5 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">calculate</span>
                          <span>DISCOM Penalty Calc</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          const content = `GAGAN ELECTRICALS AJMER WORKS
SPECIFICATION DRAWING: ${product.cadFile}
Series: ${product.series}
Rating: ${product.badge}
Busbar: ${product.busbarValue}
Standards: IEC 61439-1 & 2 / IS 8623 Form 4b
Technical Director: Ravi (+91 9414431708)`;
                          const blob = new Blob([content], { type: 'text/plain' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = product.cadFile;
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                        className="py-2.5 px-3 bg-[#d5e3fd] hover:bg-[#dde9ff] transition-colors rounded text-[#0d1c2f] text-xs font-mono font-semibold flex items-center gap-1.5 cursor-pointer"
                        title="Download Engineering CAD / PDF Spec"
                      >
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        <span>DWG / CAD</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Sticky Quotation Summary & Direct Works Proforma Dock (4 cols) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-5">
            {/* Live RFQ Summary Box */}
            <div className="bg-[#ffffff] rounded shadow-md overflow-hidden border border-[#dde9ff]">
              <div className="bg-[#000000] text-[#ffffff] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">request_quote</span>
                  <span className="text-xs font-mono uppercase tracking-wider font-bold">
                    Active Tender RFQ Builder
                  </span>
                </div>
                <span className="bg-[#904d00] text-[#ffffff] px-2 py-0.5 rounded text-[10px] font-mono font-bold" id="rfq-badge">
                  {rfqItems.length} Assemblies
                </span>
              </div>

              <div className="p-4 flex flex-col gap-4">
                {/* List of Selected Items */}
                <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
                  {rfqItems.length === 0 ? (
                    <div className="p-4 bg-[#eff4ff] rounded text-center text-xs text-[#45464d] font-mono">
                      No assemblies selected yet. Click "Configure &amp; Add to RFQ" on any panel.
                    </div>
                  ) : (
                    rfqItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2.5 bg-[#eff4ff] rounded text-xs border border-[#dde9ff] transition-all"
                      >
                        <div className="flex flex-col min-w-0 pr-2">
                          <span className="font-semibold text-[#0d1c2f] truncate">{item.title}</span>
                          <span className="text-[10px] font-mono text-[#45464d]">Qty: {item.qty} Unit</span>
                        </div>
                        <div className="text-right shrink-0 font-mono">
                          <span className="font-bold text-[#0d1c2f]">
                            ₹{(item.unitPrice * item.qty).toLocaleString('en-IN')}
                          </span>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="block text-[#ba1a1a] text-[10px] hover:underline ml-auto font-medium cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Total Cost Summary Calculation */}
                <div className="bg-[#e6eeff] p-3 rounded flex flex-col gap-1.5 text-xs font-mono border border-[#d5e3fd]">
                  <div className="flex justify-between text-[#45464d]">
                    <span>Subtotal Baseline (Ex-Works):</span>
                    <span className="font-semibold text-[#0d1c2f]">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#45464d]">
                    <span>Estimated GST (18% HSN 8537):</span>
                    <span className="text-[#0d1c2f]">
                      ₹{gst.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="h-px bg-[#d5e3fd] my-1"></div>
                  <div className="flex items-baseline justify-between text-[#0d1c2f]">
                    <span className="font-bold">Total Estimate (₹ INR):</span>
                    <span className="text-xl font-bold text-[#904d00] font-mono">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Proforma Trigger Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      if (rfqItems.length === 0) {
                        alert('Please add at least one panel assembly to generate proforma.');
                        return;
                      }
                      setProformaModalOpen(true);
                    }}
                    className="w-full py-3 px-4 bg-[#904d00] hover:bg-[#663500] transition-colors rounded text-[#ffffff] text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">assignment</span>
                    <span>Request Formal Proforma</span>
                  </button>

                  <button
                    onClick={handleExportZip}
                    disabled={isExportingZip}
                    className="w-full py-2.5 px-4 bg-[#e6eeff] hover:bg-[#dde9ff] transition-colors rounded text-[#0d1c2f] text-xs font-mono font-semibold flex items-center justify-center gap-1.5 cursor-pointer border border-[#d5e3fd]"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isExportingZip ? 'sync' : 'inventory'}
                    </span>
                    <span>{isExportingZip ? 'Packaging Tender ZIP...' : 'Export Combined Tender Spec (ZIP)'}</span>
                  </button>

                  <button
                    onClick={onNavigateToRfq}
                    className="w-full py-2 px-3 bg-[#ffffff] hover:bg-[#eff4ff] border border-[#dde9ff] rounded text-xs font-mono text-[#0d1c2f] font-semibold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#904d00]">tune</span>
                    <span>Open Custom RFQ Specification Builder</span>
                  </button>
                </div>

                <p className="text-[10px] font-mono text-[#76777d] text-center">
                  *Proforma invoices include guaranteed 3-4 week dispatch timeline from Ajmer manufacturing works.
                </p>
              </div>
            </div>

            {/* Technical Director Works Support Card */}
            <div className="bg-[#ffffff] p-5 rounded shadow-sm flex flex-col gap-3 border border-[#dde9ff]">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded bg-[#000000] text-[#ffffff] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">engineering</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#45464d] block font-bold">
                    Direct Engineering Cell
                  </span>
                  <span className="text-lg font-bold text-[#0d1c2f] block leading-tight">Ravi</span>
                  <span className="text-xs text-[#904d00] font-medium font-mono">
                    Works In-Charge &amp; Technical Director
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-1 font-mono text-xs">
                <a
                  href="tel:+919414431708"
                  className="flex items-center gap-2 p-2 bg-[#eff4ff] hover:bg-[#e6eeff] rounded transition-colors text-[#0d1c2f] font-medium"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#904d00]">phone_in_talk</span>
                  <span>+91 9414431708</span>
                </a>
                <a
                  href="mailto:ravi26976@gmail.com"
                  className="flex items-center gap-2 p-2 bg-[#eff4ff] hover:bg-[#e6eeff] rounded transition-colors text-[#0d1c2f] font-medium"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#904d00]">mail</span>
                  <span className="truncate">ravi26976@gmail.com</span>
                </a>
                <div className="flex items-start gap-2 p-2 bg-[#eff4ff] rounded text-[#45464d] text-xs leading-snug">
                  <span className="material-symbols-outlined text-[18px] text-[#904d00] shrink-0 mt-0.5">factory</span>
                  <span>Works: Near Ram Mandir, Ramganj, Ajmer, Rajasthan 305001</span>
                </div>
              </div>

              <div className="bg-[#e6eeff] p-2 rounded text-[11px] font-mono flex items-center justify-between border border-[#d5e3fd]">
                <span className="text-[#0d1c2f] font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#009668]"></span>
                  Shop Floor Open
                </span>
                <span className="text-[#45464d]">08:00 - 20:00 IST</span>
              </div>
            </div>

            {/* Compliance Mini-Certificate Block */}
            <div className="bg-[#eff4ff] p-4 rounded flex flex-col gap-2 border border-[#dde9ff]">
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#0d1c2f]">
                Institutional Acceptance
              </span>
              <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
                <span className="bg-[#ffffff] px-2 py-1 rounded text-[#0d1c2f] border border-[#dde9ff]">
                  PWD Approved
                </span>
                <span className="bg-[#ffffff] px-2 py-1 rounded text-[#0d1c2f] border border-[#dde9ff]">
                  RIICO Registered
                </span>
                <span className="bg-[#ffffff] px-2 py-1 rounded text-[#0d1c2f] border border-[#dde9ff]">
                  CPWD Spec IV
                </span>
                <span className="bg-[#ffffff] px-2 py-1 rounded text-[#0d1c2f] border border-[#dde9ff]">
                  ISO 9001:2015
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Modals */}
      <TechnicalSldModal
        isOpen={sldModal.open}
        onClose={() => setSldModal({ open: false, title: '', filename: '' })}
        title={sldModal.title}
        filename={sldModal.filename}
      />

      <DiscomPenaltyCalcModal
        isOpen={discomModalOpen}
        onClose={() => setDiscomModalOpen(false)}
        onApplyPanel={(kvar) => {
          setRfqItems((prev) => [
            {
              id: `apfc-${Date.now()}`,
              productId: 'apfc-harmonic',
              title: `Series APFC-Harmonic (${kvar} kVAR 7% Detuned)`,
              unitPrice: Math.round((kvar / 400) * 485000),
              qty: 1,
            },
            ...prev,
          ]);
        }}
      />

      <FeederSizingModal
        isOpen={feederModalOpen}
        onClose={() => setFeederModalOpen(false)}
        onAddConfiguredFeeder={(spec) => {
          setRfqItems((prev) => [
            {
              id: `feeder-${Date.now()}`,
              productId: 'imcc-flex',
              title: `iMCC Feeder: ${spec}`,
              unitPrice: 185000,
              qty: 1,
            },
            ...prev,
          ]);
        }}
      />

      <ProformaModal
        isOpen={proformaModalOpen}
        onClose={() => setProformaModalOpen(false)}
        items={rfqItems}
        subtotal={subtotal}
        gst={gst}
        total={total}
      />
    </div>
  );
};
