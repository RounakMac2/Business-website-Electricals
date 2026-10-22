import JSZip from 'jszip';
import { RfqItem } from '../types';

export async function exportCombinedTenderZip(items: RfqItem[], subtotal: number, gst: number, total: number) {
  const zip = new JSZip();

  // 1. BOQ & Tender Summary
  const boqContent = `GAGAN ELECTRICALS - AJMER MANUFACTURING WORKS
COMBINED TENDER BID SPECIFICATION & BOQ SCHEDULE
Reference: AJM-GE-TENDER-${Date.now()}
Standard: IEC 61439-1 & 2 / IS 8623 (Form 4b Separation)
Location: Near Ram Mandir, Ramganj, Ajmer, Rajasthan 305001
Contact: Ravi (Works In-Charge & Technical Director) | +91 9414431708 | ravi26976@gmail.com

========================================================================
SELECTED SWITCHBOARD ASSEMBLIES
========================================================================
${items.map((item, idx) => `
[Item ${idx + 1}]
Name: ${item.title}
Quantity: ${item.qty} Unit(s)
Unit Price (Ex-Works): INR ${item.unitPrice.toLocaleString('en-IN')}
Line Total: INR ${(item.unitPrice * item.qty).toLocaleString('en-IN')}
Enclosure: 2.0mm CRCA Sheet Steel, 7-Tank Treated, RAL 7035 Powder Coated
Busbar: 99.9% Electrolytic Tough Pitch (ETP) Copper, Silver/Tin Plated Joints
Internal Segregation: IEC 61439-2 Form 4b Type 7 (Independent Breaker, Busbar & Cable Chambers)
Testing: Routine Short Circuit 50kA/1s withstand (CPRI Type-Tested Architecture)
`).join('\n')}

========================================================================
COMMERCIAL SUMMARY (EX-WORKS AJMER)
========================================================================
Subtotal Baseline: INR ${subtotal.toLocaleString('en-IN')}
Estimated Statutory GST (18% HSN 8537): INR ${gst.toLocaleString('en-IN')}
Total Estimated Commercial Value: INR ${total.toLocaleString('en-IN')}

Dispatch Timeline: 3-4 Weeks from GA drawing confirmation
Testing: Routine FAT testing including 5kV Megger & 2.5kV HV Flash test witnessed at Ajmer factory.
`;
  zip.file('01_TENDER_BOQ_SCHEDULE.txt', boqContent);

  // 2. CPRI Compliance Document
  const cpriContent = `CENTRAL POWER RESEARCH INSTITUTE (CPRI) TEST VERIFICATION SUMMARY
Tested at: CPRI Switchgear Testing Station
Standard: IEC 61439-2 / IS 16647 / IS 8623
Manufacturer: Gagan Electricals, Ajmer, Rajasthan

Type Test Parameters Successfully Cleared:
1. Short-time withstand current test: 50 kA rms for 1.0 second, Peak 105 kA
2. Temperature-rise test: Compliant with Table 6 limits at rated ambient 45°C
3. Dielectric properties: Power frequency withstand voltage 2.5 kV for 1 minute
4. Verification of clearance & creepage distances: Form 4b metallic barriers verified
5. Degree of Protection: IP54 (Indoor) & IP65 (Outdoor with canopy)

All production assemblies are manufactured with identical design metrics and busbar arrangements.
`;
  zip.file('02_CPRI_COMPLIANCE_CERTIFICATE.txt', cpriContent);

  // 3. Technical GA & SLD Guidance
  const gaContent = `GENERAL ARRANGEMENT (GA) & SINGLE LINE DIAGRAM SPECIFICATION
Cable Entry: Bottom / Top interchangeable via removable un-drilled gland plates (3.0mm thickness)
Foundation Details: Base channel 75x40mm ISMC painted coal-tar black
Earthing: Continuous 50x6mm Copper Earth Bus extending through entire switchboard length
Ventilation: IP54 louvered door panels with washable polyurethane filter media
Interlocking schemes: Castell key interlocking between Mains incomer and DG bus couplers.
`;
  zip.file('03_GA_AND_FOUNDATION_SPEC.txt', gaContent);

  // Generate and trigger download
  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Gagan_Electricals_Tender_Spec_Pack_${Date.now()}.zip`;
  a.click();
  URL.revokeObjectURL(url);
}
