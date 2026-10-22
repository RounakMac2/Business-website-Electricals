import React, { useState } from 'react';
import { MAP_IMAGE } from '../data/catalogData';

export const RfqScreen: React.FC = () => {
  // Form State
  const [clientName, setClientName] = useState('');
  const [gstin, setGstin] = useState('');
  const [email, setEmail] = useState('ravi26976@gmail.com');
  const [phone, setPhone] = useState('9414431708');
  const [siteLocation, setSiteLocation] = useState('rajasthan');

  // Engineering Parameters
  const [sysVoltage, setSysVoltage] = useState('415v');
  const [incomerRating, setIncomerRating] = useState('1600 A');
  const [faultLevel, setFaultLevel] = useState('50ka');
  const [busbarMat, setBusbarMat] = useState<'cu' | 'al'>('cu');
  const [separationForm, setSeparationForm] = useState('form4b');
  const [ipRating, setIpRating] = useState('ip54');

  // OEM Makes
  const [preferredMakes, setPreferredMakes] = useState<string[]>([
    'Schneider Electric',
    'L&T (Larsen & Toubro)',
  ]);

  // Uploaded files
  const [files, setFiles] = useState<{ name: string; size: string }[]>([
    { name: 'Substation_Single_Line_Diagram_Rev3.dwg', size: '4.8 MB' },
  ]);
  const [customReqs, setCustomReqs] = useState('');

  // Submission state & modal
  const [submittedTicket, setSubmittedTicket] = useState<{
    ticketId: string;
    date: string;
  } | null>(null);

  const incomerOptions = [
    '400 A',
    '800 A',
    '1250 A',
    '1600 A',
    '2500 A',
    '3200 A',
    '4000 A',
    '6300 A (Air ACB)',
  ];

  const oemMakesList = [
    { name: 'Schneider Electric', series: 'Masterpact / NSX' },
    { name: 'L&T (Larsen & Toubro)', series: 'Omega / Dsine Series' },
    { name: 'Siemens', series: 'Sentron 3WL / 3VA' },
    { name: 'ABB', series: 'Emax 2 / Tmax XT' },
    { name: 'Legrand', series: 'DMX3 / DPX3 Series' },
    { name: 'Eaton', series: 'Power Xpert / NZM' },
  ];

  const toggleMake = (makeName: string) => {
    setPreferredMakes((prev) =>
      prev.includes(makeName) ? prev.filter((m) => m !== makeName) : [...prev, makeName]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      const sizeStr =
        f.size > 1024 * 1024
          ? (f.size / (1024 * 1024)).toFixed(1) + ' MB'
          : (f.size / 1024).toFixed(0) + ' KB';
      setFiles((prev) => [...prev, { name: f.name, size: sizeStr }]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ticket = `RFQ-AJM-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedTicket({
      ticketId: ticket,
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Ravi (Gagan Electricals), I would like to request a quotation for:
- System Voltage: ${sysVoltage.toUpperCase()}
- Main Incomer: ${incomerRating}
- Fault Rating: ${faultLevel.toUpperCase()} for 1s
- Busbar: ${busbarMat === 'cu' ? '99.9% ETP Copper' : 'EC Aluminum'}
- Separation: ${separationForm.toUpperCase()}
- IP Rating: ${ipRating.toUpperCase()}
- OEM Brands: ${preferredMakes.join(', ')}
- Delivery Hub: ${siteLocation.toUpperCase()}
Client: ${clientName || 'Industrial Client'}`
  );

  return (
    <div className="flex flex-col w-full">
      {/* Sub-header Bar */}
      <div className="w-full bg-[#dde9ff] py-2 sm:py-2.5 border-b border-[#d5e3fd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 bg-[#000000] text-[#ffffff] rounded">
              <span className="material-symbols-outlined text-[18px]">terminal</span>
            </span>
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <span className="text-[#0d1c2f] font-semibold tracking-wider uppercase">
                B2B Commercial Engineering Portal
              </span>
              <span className="text-[#76777d]">/</span>
              <span className="text-[#904d00] font-bold">RFQ-SPEC-2025-V3</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#009668] bg-[#ffffff] px-2.5 py-1 rounded shadow-2xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#009668] animate-pulse"></span>
              Direct Ajmer Works Desk Online
            </span>
            <span className="text-[#45464d] text-xs font-mono hidden sm:inline">
              Turnaround SLA: &lt; 4 Hours
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Title */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-[#904d00] font-bold mb-1">
            <span className="material-symbols-outlined text-[16px]">tune</span>
            System Configuration &amp; Commercial Estimate
          </div>
          <h1 className="text-3xl sm:text-4xl text-[#0d1c2f] tracking-tight font-bold">
            Panel Specification Builder &amp; RFQ
          </h1>
          <p className="text-sm text-[#45464d] max-w-3xl mt-1 leading-relaxed">
            Configure high-tension/low-tension switchboards to IEC 61439-2 standards. Attach SLD or feeder specs to receive certified General Arrangement (GA) drawings and guaranteed price bid from our manufacturing unit.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form (8 cols) */}
          <form onSubmit={handleSubmit} className="lg:col-span-8 flex flex-col gap-6">
            {/* Step 01: Project & Commercial Entity */}
            <div className="bg-[#ffffff] rounded p-6 shadow-sm border border-[#dde9ff]">
              <div className="flex items-center justify-between pb-2 mb-4 border-b border-[#eff4ff]">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-[#000000] text-[#ffffff] flex items-center justify-center font-mono text-xs font-bold">
                    01
                  </span>
                  <h2 className="text-lg font-semibold text-[#0d1c2f]">Project &amp; Commercial Entity</h2>
                </div>
                <span className="text-[11px] font-mono text-[#45464d] uppercase tracking-wider">
                  Mandatory Details
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0d1c2f] mb-1">
                    Client / Company Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Apex Infra Projects Pvt Ltd"
                    className="w-full h-11 px-3 bg-[#eff4ff] text-[#0d1c2f] text-sm rounded focus:outline-none focus:ring-2 focus:ring-[#000000] border border-[#dde9ff]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0d1c2f] mb-1">
                    GSTIN Number (For Input Credit)
                  </label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    placeholder="08AAAAA0000A1Z5"
                    className="w-full h-11 px-3 bg-[#eff4ff] text-[#0d1c2f] font-mono text-xs rounded uppercase focus:outline-none focus:ring-2 focus:ring-[#000000] border border-[#dde9ff]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0d1c2f] mb-1">
                    Technical Contact Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 px-3 bg-[#eff4ff] text-[#0d1c2f] text-sm rounded focus:outline-none focus:ring-2 focus:ring-[#000000] border border-[#dde9ff]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0d1c2f] mb-1">
                    Authorized Mobile / Phone *
                  </label>
                  <div className="relative flex">
                    <span className="h-11 px-3 bg-[#e6eeff] text-[#0d1c2f] font-mono text-xs flex items-center rounded-l border border-r-0 border-[#dde9ff]">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-11 px-3 bg-[#eff4ff] text-[#0d1c2f] font-mono text-xs rounded-r focus:outline-none focus:ring-2 focus:ring-[#000000] border border-[#dde9ff]"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#0d1c2f] mb-1">
                    Delivery Site Location / State Hub *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                    {[
                      { id: 'rajasthan', label: 'Rajasthan (Fast-Track)' },
                      { id: 'delhi_ncr', label: 'Delhi NCR Hub' },
                      { id: 'gujarat', label: 'Gujarat Ind. Belt' },
                      { id: 'pan_india', label: 'Pan-India Transit' },
                    ].map((loc) => (
                      <label
                        key={loc.id}
                        className={`flex items-center gap-1.5 p-2.5 rounded cursor-pointer border transition-colors ${
                          siteLocation === loc.id
                            ? 'bg-[#e6eeff] border-[#904d00] font-semibold text-[#0d1c2f]'
                            : 'bg-[#eff4ff] border-[#dde9ff] hover:bg-[#e6eeff] text-[#45464d]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="site_location"
                          value={loc.id}
                          checked={siteLocation === loc.id}
                          onChange={(e) => setSiteLocation(e.target.value)}
                          className="accent-[#904d00]"
                        />
                        <span className="text-[11px]">{loc.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 02: Electrical Engineering Parameters */}
            <div className="bg-[#ffffff] rounded p-6 shadow-sm border border-[#dde9ff]">
              <div className="flex items-center justify-between pb-2 mb-4 border-b border-[#eff4ff]">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-[#000000] text-[#ffffff] flex items-center justify-center font-mono text-xs font-bold">
                    02
                  </span>
                  <h2 className="text-lg font-semibold text-[#0d1c2f]">Electrical Engineering Parameters</h2>
                </div>
                <span className="text-xs text-[#904d00] font-mono font-bold tracking-wider">
                  IEC 61439-2 TESTED
                </span>
              </div>

              <div className="flex flex-col gap-5">
                {/* System Voltage */}
                <div>
                  <label className="block text-xs font-semibold text-[#0d1c2f] mb-2">
                    Operating System Voltage (Nominal Un)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label
                      onClick={() => setSysVoltage('415v')}
                      className={`p-3 rounded cursor-pointer flex flex-col justify-between border transition-all ${
                        sysVoltage === '415v'
                          ? 'bg-[#e6eeff] border-[#904d00]'
                          : 'bg-[#eff4ff] border-[#dde9ff] hover:bg-[#e6eeff]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm font-bold text-[#0d1c2f]">415V AC</span>
                        <input
                          type="radio"
                          name="sys_voltage"
                          value="415v"
                          checked={sysVoltage === '415v'}
                          onChange={() => setSysVoltage('415v')}
                          className="accent-[#904d00]"
                        />
                      </div>
                      <span className="text-xs text-[#45464d] mt-1 leading-snug">
                        Standard L.V. Industrial Grid, 50Hz 3-Ph 4-Wire
                      </span>
                    </label>

                    <label
                      onClick={() => setSysVoltage('690v')}
                      className={`p-3 rounded cursor-pointer flex flex-col justify-between border transition-all ${
                        sysVoltage === '690v'
                          ? 'bg-[#e6eeff] border-[#904d00]'
                          : 'bg-[#eff4ff] border-[#dde9ff] hover:bg-[#e6eeff]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm font-bold text-[#0d1c2f]">690V AC</span>
                        <input
                          type="radio"
                          name="sys_voltage"
                          value="690v"
                          checked={sysVoltage === '690v'}
                          onChange={() => setSysVoltage('690v')}
                          className="accent-[#904d00]"
                        />
                      </div>
                      <span className="text-xs text-[#45464d] mt-1 leading-snug">
                        Heavy Mining, Wind Turbines &amp; Chemical Plants
                      </span>
                    </label>

                    <label
                      onClick={() => setSysVoltage('11kv')}
                      className={`p-3 rounded cursor-pointer flex flex-col justify-between border transition-all ${
                        sysVoltage === '11kv'
                          ? 'bg-[#e6eeff] border-[#904d00]'
                          : 'bg-[#eff4ff] border-[#dde9ff] hover:bg-[#e6eeff]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm font-bold text-[#0d1c2f]">11kV HT</span>
                        <input
                          type="radio"
                          name="sys_voltage"
                          value="11kv"
                          checked={sysVoltage === '11kv'}
                          onChange={() => setSysVoltage('11kv')}
                          className="accent-[#904d00]"
                        />
                      </div>
                      <span className="text-xs text-[#45464d] mt-1 leading-snug">
                        Primary HT Distribution with VCB / SF6 Switchboard
                      </span>
                    </label>
                  </div>
                </div>

                {/* Main Incomer Current Rating */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-[#0d1c2f]">
                      Main Incomer Current Rating (In)
                    </label>
                    <span className="text-xs font-mono text-[#45464d]">
                      Selected: <strong className="text-[#904d00]">{incomerRating}</strong>
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {incomerOptions.map((rating) => {
                      const isSelected = incomerRating === rating;
                      return (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setIncomerRating(rating)}
                          className={`py-2 px-2 rounded font-mono text-xs transition-all text-center cursor-pointer border ${
                            isSelected
                              ? 'bg-[#000000] text-[#ffffff] font-bold border-[#000000] shadow-sm'
                              : 'bg-[#eff4ff] hover:bg-[#e6eeff] text-[#0d1c2f] font-semibold border-[#dde9ff]'
                          }`}
                        >
                          {rating}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Short Circuit & Busbar Conductor */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Short Circuit */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0d1c2f] mb-1.5">
                      Short Circuit Withstand Level (1 Sec)
                    </label>
                    <div className="flex flex-col gap-2">
                      {[
                        { id: '36ka', label: '36 kA / 1s', note: 'Standard Commercial' },
                        { id: '50ka', label: '50 kA / 1s', note: 'Standard Industrial', isDefault: true },
                        { id: '65ka', label: '65 kA / 1s', note: 'CPRI Type-Tested Heavy' },
                      ].map((fc) => (
                        <label
                          key={fc.id}
                          className={`flex items-center justify-between p-2.5 rounded cursor-pointer border transition-colors ${
                            faultLevel === fc.id
                              ? 'bg-[#e6eeff] border-[#904d00]'
                              : 'bg-[#eff4ff] border-[#dde9ff] hover:bg-[#e6eeff]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="fault_level"
                              value={fc.id}
                              checked={faultLevel === fc.id}
                              onChange={() => setFaultLevel(fc.id)}
                              className="accent-[#904d00]"
                            />
                            <span className="font-mono text-xs font-bold text-[#0d1c2f]">
                              {fc.label}
                            </span>
                          </div>
                          <span className={`text-[11px] ${faultLevel === fc.id ? 'text-[#904d00] font-medium' : 'text-[#45464d]'}`}>
                            {fc.note}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Busbar Metallurgy */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0d1c2f] mb-1.5">
                      Busbar Conductor Metallurgy
                    </label>
                    <div className="flex flex-col gap-2">
                      <label
                        className={`p-2.5 rounded cursor-pointer flex flex-col justify-between border transition-colors ${
                          busbarMat === 'cu'
                            ? 'bg-[#e6eeff] border-[#904d00]'
                            : 'bg-[#eff4ff] border-[#dde9ff] hover:bg-[#e6eeff]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-[#0d1c2f]">
                            99.9% Electrolytic Copper
                          </span>
                          <input
                            type="radio"
                            name="busbar_mat"
                            value="cu"
                            checked={busbarMat === 'cu'}
                            onChange={() => setBusbarMat('cu')}
                            className="accent-[#904d00]"
                          />
                        </div>
                        <span className="text-[11px] text-[#45464d] mt-0.5 leading-snug">
                          Tinned high-purity ETP grade. Compact heat profile.
                        </span>
                      </label>

                      <label
                        className={`p-2.5 rounded cursor-pointer flex flex-col justify-between border transition-colors ${
                          busbarMat === 'al'
                            ? 'bg-[#e6eeff] border-[#904d00]'
                            : 'bg-[#eff4ff] border-[#dde9ff] hover:bg-[#e6eeff]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-[#0d1c2f]">
                            High Conductivity EC Aluminum
                          </span>
                          <input
                            type="radio"
                            name="busbar_mat"
                            value="al"
                            checked={busbarMat === 'al'}
                            onChange={() => setBusbarMat('al')}
                            className="accent-[#904d00]"
                          />
                        </div>
                        <span className="text-[11px] text-[#45464d] mt-0.5 leading-snug">
                          Grade 63401 WP heat-treated with silver plating joints.
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Form Separation & IP Rating */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Internal Separation */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0d1c2f] mb-1.5">
                      Internal Compartmental Separation
                    </label>
                    <div className="flex flex-col gap-2">
                      {[
                        { id: 'form2b', title: 'Form 2b', desc: 'Busbars separated from units' },
                        { id: 'form3b', title: 'Form 3b', desc: 'Units separated from terminals' },
                        { id: 'form4b', title: 'Form 4b (Type 7)', desc: 'Complete compartmented isolation', isDefault: true },
                      ].map((form) => (
                        <label
                          key={form.id}
                          className={`p-2.5 rounded cursor-pointer flex items-center justify-between border transition-colors ${
                            separationForm === form.id
                              ? 'bg-[#e6eeff] border-[#904d00]'
                              : 'bg-[#eff4ff] border-[#dde9ff] hover:bg-[#e6eeff]'
                          }`}
                        >
                          <div>
                            <div className="font-mono text-xs font-bold text-[#0d1c2f]">{form.title}</div>
                            <div className="text-[11px] text-[#45464d]">{form.desc}</div>
                          </div>
                          <input
                            type="radio"
                            name="separation_form"
                            value={form.id}
                            checked={separationForm === form.id}
                            onChange={() => setSeparationForm(form.id)}
                            className="accent-[#904d00]"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* IP Rating */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0d1c2f] mb-1.5">
                      Enclosure Ingress Protection (IP Rating)
                    </label>
                    <div className="flex flex-col gap-2">
                      {[
                        { id: 'ip42', title: 'IP42 Protection', desc: 'Controlled indoor substation rooms' },
                        { id: 'ip54', title: 'IP54 Dust & Splash Proof', desc: 'Standard factory shopfloor with neoprene gaskets', isDefault: true },
                        { id: 'ip65', title: 'IP65 Weatherproof Canopy', desc: 'Outdoor yard installation with rain roof' },
                      ].map((ip) => (
                        <label
                          key={ip.id}
                          className={`p-2.5 rounded cursor-pointer flex items-center justify-between border transition-colors ${
                            ipRating === ip.id
                              ? 'bg-[#e6eeff] border-[#904d00]'
                              : 'bg-[#eff4ff] border-[#dde9ff] hover:bg-[#e6eeff]'
                          }`}
                        >
                          <div>
                            <div className="font-mono text-xs font-bold text-[#0d1c2f]">{ip.title}</div>
                            <div className="text-[11px] text-[#45464d]">{ip.desc}</div>
                          </div>
                          <input
                            type="radio"
                            name="ip_rating"
                            value={ip.id}
                            checked={ipRating === ip.id}
                            onChange={() => setIpRating(ip.id)}
                            className="accent-[#904d00]"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 03: Preferred Switchgear Makes */}
            <div className="bg-[#ffffff] rounded p-6 shadow-sm border border-[#dde9ff]">
              <div className="flex items-center justify-between pb-2 mb-4 border-b border-[#eff4ff]">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-[#000000] text-[#ffffff] flex items-center justify-center font-mono text-xs font-bold">
                    03
                  </span>
                  <h2 className="text-lg font-semibold text-[#0d1c2f]">
                    Preferred Switchgear Makes (OEM Components)
                  </h2>
                </div>
                <span className="text-xs font-mono text-[#45464d]">Multiple Selection</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {oemMakesList.map((oem) => {
                  const isChecked = preferredMakes.includes(oem.name);
                  return (
                    <label
                      key={oem.name}
                      onClick={() => toggleMake(oem.name)}
                      className={`p-3 rounded cursor-pointer border flex items-center justify-between transition-colors ${
                        isChecked
                          ? 'bg-[#e6eeff] border-[#904d00]'
                          : 'bg-[#eff4ff] border-[#dde9ff] hover:bg-[#e6eeff]'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold text-[#0d1c2f] block leading-tight">
                          {oem.name}
                        </span>
                        <span className="text-[11px] text-[#45464d]">{oem.series}</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // handled by parent div
                        className="w-4 h-4 accent-[#904d00] shrink-0 ml-2"
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Step 04: Feeder Schedule & Drawing Attachment */}
            <div className="bg-[#ffffff] rounded p-6 shadow-sm border border-[#dde9ff]">
              <div className="flex items-center justify-between pb-2 mb-4 border-b border-[#eff4ff]">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-[#000000] text-[#ffffff] flex items-center justify-center font-mono text-xs font-bold">
                    04
                  </span>
                  <h2 className="text-lg font-semibold text-[#0d1c2f]">
                    Feeder Schedule &amp; Drawing Attachment
                  </h2>
                </div>
                <span className="text-xs font-mono text-[#009668] font-semibold">
                  SLD / BOQ / DWG
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <label className="p-6 bg-[#eff4ff] rounded border-2 border-dashed border-[#dde9ff] hover:border-[#904d00] flex flex-col items-center justify-center text-center cursor-pointer transition-colors relative">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".pdf,.dwg,.dxf,.xlsx,.zip"
                  />
                  <span className="material-symbols-outlined text-[36px] text-[#904d00] mb-1">
                    cloud_upload
                  </span>
                  <span className="text-sm font-bold text-[#0d1c2f]">
                    Upload Single Line Diagram (SLD) or BOM
                  </span>
                  <span className="text-xs text-[#45464d] mt-1">
                    Accepts PDF, DWG, DXF, XLSX, or ZIP archives (Up to 45 MB)
                  </span>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#e6eeff] text-[#0d1c2f] rounded text-xs font-mono uppercase font-semibold">
                    <span className="material-symbols-outlined text-[16px]">folder_open</span>
                    <span>Browse Local Workspace</span>
                  </div>
                </label>

                {/* Uploaded File List */}
                {files.length > 0 && (
                  <div className="flex flex-col gap-1.5 font-mono text-xs">
                    {files.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 bg-[#eff4ff] rounded border border-[#dde9ff]"
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <span className="material-symbols-outlined text-[16px] text-[#904d00]">
                            attachment
                          </span>
                          <span className="font-semibold text-[#0d1c2f] truncate">{file.name}</span>
                          <span className="text-[#45464d] text-[10px]">({file.size})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFiles(files.filter((_, i) => i !== idx))}
                          className="text-[#ba1a1a] hover:underline text-[11px] cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#0d1c2f] mb-1">
                    Special Architecture &amp; Custom Integration Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={customReqs}
                    onChange={(e) => setCustomReqs(e.target.value)}
                    placeholder="e.g. DG Auto-synchronization with dual incomer interlock, RS485 Modbus SCADA multi-function meters, top cable entry, specific RAL 7032 powder coat shade, restricted room dimensions."
                    className="w-full p-3 bg-[#eff4ff] text-[#0d1c2f] text-xs rounded focus:outline-none focus:ring-2 focus:ring-[#000000] border border-[#dde9ff]"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Bottom 4-Hour Response Banner & Submit CTA */}
            <div className="bg-[#e6eeff] rounded p-5 shadow-sm border border-[#d5e3fd] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded bg-[#904d00] text-[#ffffff] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[26px]">electric_meter</span>
                </span>
                <div>
                  <span className="text-sm text-[#0d1c2f] font-bold block">
                    4-Hour Verified Engineering Response
                  </span>
                  <span className="text-xs text-[#45464d]">
                    Includes verified GA sketch, copper weight computation &amp; formal quotation.
                  </span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto h-12 px-6 bg-[#904d00] hover:bg-[#663500] text-[#ffffff] rounded text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>Submit RFQ for Costing &amp; GA Drawing</span>
              </button>
            </div>
          </form>

          {/* Right Sidebar (4 cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            {/* Factory Direct Desk */}
            <div className="bg-[#ffffff] rounded p-6 shadow-sm border border-[#dde9ff]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#904d00] font-bold">
                  Factory Direct Desk
                </span>
                <span className="text-xs font-mono text-[#009668] bg-[#e6eeff] px-2 py-0.5 rounded font-semibold">
                  Ajmer Hub
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded bg-[#000000] text-[#ffffff] flex items-center justify-center text-xl font-bold font-mono">
                  GE
                </div>
                <div>
                  <div className="text-base font-bold text-[#0d1c2f]">Gagan Electricals</div>
                  <div className="text-xs text-[#45464d] font-mono">
                    Works In-Charge &amp; Chief Engineer: <strong className="text-[#0d1c2f]">Ravi</strong>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-5 font-mono text-xs">
                <div className="p-2.5 bg-[#eff4ff] rounded flex items-start gap-2 border border-[#dde9ff]">
                  <span className="material-symbols-outlined text-[18px] text-[#904d00] shrink-0 mt-0.5">
                    location_on
                  </span>
                  <div className="text-[#0d1c2f] leading-snug">
                    Near Ram Mandir, Ramganj, Ajmer, Rajasthan 305001
                  </div>
                </div>

                <div className="p-2.5 bg-[#eff4ff] rounded flex items-center justify-between border border-[#dde9ff]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#904d00]">phone</span>
                    <span className="text-[#0d1c2f] font-semibold">+91 9414431708</span>
                  </div>
                  <a
                    href="tel:+919414431708"
                    className="text-[#904d00] font-bold uppercase hover:underline"
                  >
                    Call
                  </a>
                </div>

                <div className="p-2.5 bg-[#eff4ff] rounded flex items-center justify-between border border-[#dde9ff]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#904d00]">mail</span>
                    <span className="text-[#0d1c2f] truncate max-w-[150px]">ravi26976@gmail.com</span>
                  </div>
                  <a
                    href="mailto:ravi26976@gmail.com"
                    className="text-[#904d00] font-bold uppercase hover:underline"
                  >
                    Write
                  </a>
                </div>
              </div>

              <a
                href={`https://wa.me/919414431708?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full h-11 bg-[#000000] text-[#ffffff] hover:bg-[#233144] rounded text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px] text-[#009668]">chat</span>
                <span>Instant WhatsApp Specification</span>
              </a>
            </div>

            {/* Tender & Dispatch Flow */}
            <div className="bg-[#ffffff] rounded p-6 shadow-sm border border-[#dde9ff]">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-[20px] text-[#904d00]">alt_route</span>
                <h3 className="text-base font-semibold text-[#0d1c2f]">Tender &amp; Dispatch Flow</h3>
              </div>

              <div className="flex flex-col gap-4 relative pl-6">
                <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-[#dde9ff]"></div>

                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-[#904d00] ring-4 ring-[#ffffff]"></div>
                  <span className="text-[10px] font-mono text-[#904d00] font-bold uppercase">
                    Phase 1 • Within 4 Hours
                  </span>
                  <div className="text-xs font-mono font-bold text-[#0d1c2f]">
                    SLD Review &amp; Technical Clearance
                  </div>
                  <p className="text-[11px] text-[#45464d] mt-0.5 leading-snug">
                    Verification of fault calculations, current density &amp; feeder sizing by lead engineer.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-[#000000] ring-4 ring-[#ffffff]"></div>
                  <span className="text-[10px] font-mono text-[#45464d] font-bold uppercase">
                    Phase 2 • Commercial Bid
                  </span>
                  <div className="text-xs font-mono font-bold text-[#0d1c2f]">
                    Formal INR Pricing &amp; Itemized BOM
                  </div>
                  <p className="text-[11px] text-[#45464d] mt-0.5 leading-snug">
                    Transparent switchgear break-up with statutory GST, testing and logistics charges.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-[#000000] ring-4 ring-[#ffffff]"></div>
                  <span className="text-[10px] font-mono text-[#45464d] font-bold uppercase">
                    Phase 3 • CAD Approval
                  </span>
                  <div className="text-xs font-mono font-bold text-[#0d1c2f]">
                    2D GA &amp; Busbar Schematic Drafting
                  </div>
                  <p className="text-[11px] text-[#45464d] mt-0.5 leading-snug">
                    Physical dimensions, cable trench layout, foundation details and panel elevation.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-[#009668] ring-4 ring-[#ffffff]"></div>
                  <span className="text-[10px] font-mono text-[#009668] font-bold uppercase">
                    Phase 4 • Dispatch
                  </span>
                  <div className="text-xs font-mono font-bold text-[#0d1c2f]">
                    Factory Acceptance Test (FAT) &amp; Logistics
                  </div>
                  <p className="text-[11px] text-[#45464d] mt-0.5 leading-snug">
                    High voltage withstand test, megger clearance, client FAT witness &amp; safe freight.
                  </p>
                </div>
              </div>
            </div>

            {/* Statutory & Quality Approvals */}
            <div className="bg-[#ffffff] rounded p-6 shadow-sm border border-[#dde9ff]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#0d1c2f] font-bold">
                  Statutory &amp; Quality Approvals
                </span>
                <span className="material-symbols-outlined text-[18px] text-[#009668]">
                  verified_user
                </span>
              </div>
              <div className="flex flex-col gap-1.5 font-mono text-xs">
                <div className="p-2.5 bg-[#eff4ff] rounded flex items-center justify-between border border-[#dde9ff]">
                  <span className="text-[#0d1c2f] font-semibold">CPRI Tested Unit</span>
                  <span className="text-[#009668] font-bold">65kA / 1s OK</span>
                </div>
                <div className="p-2.5 bg-[#eff4ff] rounded flex items-center justify-between border border-[#dde9ff]">
                  <span className="text-[#0d1c2f] font-semibold">ISO 9001:2015</span>
                  <span className="text-[#45464d]">Certified Quality</span>
                </div>
                <div className="p-2.5 bg-[#eff4ff] rounded flex items-center justify-between border border-[#dde9ff]">
                  <span className="text-[#0d1c2f] font-semibold">IEC 61439-1 &amp; 2</span>
                  <span className="text-[#45464d]">Form 4b Type 7</span>
                </div>
                <div className="p-2.5 bg-[#eff4ff] rounded flex items-center justify-between border border-[#dde9ff]">
                  <span className="text-[#0d1c2f] font-semibold">Enclosure Test</span>
                  <span className="text-[#45464d]">IP54 / IP55 Standard</span>
                </div>
              </div>
            </div>

            {/* Map Card */}
            <div className="rounded overflow-hidden shadow-sm border border-[#dde9ff]">
              <div
                className="w-full h-44 bg-cover bg-center flex items-end p-3 relative"
                style={{ backgroundImage: `url('${MAP_IMAGE}')` }}
              >
                <div className="bg-[#ffffff]/90 backdrop-blur-md px-3 py-1.5 rounded flex items-center gap-1.5 border border-[#dde9ff]">
                  <span className="material-symbols-outlined text-[16px] text-[#904d00]">factory</span>
                  <span className="text-xs font-mono text-[#0d1c2f] font-bold">Gagan Works • Ajmer</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* On-Site Survey Banner */}
      <div className="w-full bg-[#eff4ff] py-8 border-t border-[#dde9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-lg font-bold text-[#0d1c2f] block">
              Need an On-Site Engineering Survey in Rajasthan?
            </span>
            <span className="text-sm text-[#45464d]">
              Our site engineers inspect substation civil trenches, incomer cable routes and transformer links.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:+919414431708"
              className="h-10 px-4 bg-[#ffffff] hover:bg-[#e6eeff] text-[#0d1c2f] rounded text-xs font-mono uppercase font-bold flex items-center gap-1.5 transition-colors border border-[#dde9ff]"
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              <span>+91 9414431708</span>
            </a>
            <a
              href="mailto:ravi26976@gmail.com"
              className="h-10 px-4 bg-[#000000] hover:bg-[#233144] text-[#ffffff] rounded text-xs font-mono uppercase font-bold flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">mail</span>
              <span>Schedule Visit</span>
            </a>
          </div>
        </div>
      </div>

      {/* RFQ Submission Success Modal */}
      {submittedTicket && (
        <div className="fixed inset-0 z-50 bg-[#000000]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#ffffff] max-w-lg w-full rounded shadow-2xl p-6 border border-[#dde9ff] flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200 font-mono">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#009668]/15 text-[#009668] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[28px]">check_circle</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0d1c2f]">RFQ Registered Successfully!</h3>
                <span className="text-xs text-[#904d00] font-bold">{submittedTicket.ticketId}</span>
              </div>
            </div>

            <div className="bg-[#eff4ff] p-4 rounded text-xs space-y-1.5 text-[#0d1c2f]">
              <div className="flex justify-between">
                <span className="text-[#45464d]">Client:</span>
                <span className="font-bold">{clientName || 'Commercial Entity'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#45464d]">Parameters:</span>
                <span className="font-bold">{incomerRating} • {sysVoltage.toUpperCase()} • Form {separationForm.replace('form', '')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#45464d]">Turnaround SLA:</span>
                <span className="text-[#009668] font-bold">&lt; 4 Hours (Ajmer Desk)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#45464d]">Authorized Desk:</span>
                <span>Ravi (Works In-Charge)</span>
              </div>
            </div>

            <p className="text-xs text-[#45464d] leading-relaxed font-sans">
              Thank you! Our engineering cell is drafting your certified GA drawing and copper-indexed quotation. A formal PDF proposal will be dispatched to <strong>{email}</strong>.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#eff4ff]">
              <button
                onClick={() => setSubmittedTicket(null)}
                className="px-4 py-2 bg-[#e6eeff] hover:bg-[#dde9ff] text-[#0d1c2f] rounded text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <a
                href={`https://wa.me/919414431708?text=Hello%20Ravi%2C%20I%20have%20submitted%20Tender%20RFQ%20${submittedTicket.ticketId}%20for%20${incomerRating}%20switchboard.`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-[#009668] hover:bg-[#005236] text-[#ffffff] rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>WhatsApp Notice</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
