export type ActiveTab = 'catalog' | 'rfq' | 'tracking' | 'home' | 'contact';

export interface ProductSpec {
  id: string;
  series: string;
  name: string;
  subTitle: string;
  badge: string;
  badgeClass?: string;
  price: number;
  priceLabel: string;
  image: string;
  imageAlt: string;
  dimensionsBadge: string;
  busbarLabel: string;
  busbarValue: string;
  description: string;
  parameters: { label: string; value: string }[];
  tierPricing?: {
    qty: string;
    price: number;
    label: string;
    highlight?: boolean;
    savingLabel?: string;
  }[];
  rebateBanner?: {
    icon: string;
    text: string;
    priceTag: string;
  };
  noticeBanner?: {
    icon: string;
    text: string;
  };
  cadFile: string;
  sldFile: string;
  currentTag: string;
  brandTags: string[];
  ingressTag: string;
  ratingCategory: '630A' | '1600A' | '400kVAR' | '1000kVA';
}

export interface RfqItem {
  id: string;
  productId: string;
  title: string;
  unitPrice: number;
  qty: number;
  configNote?: string;
}

export interface RfqFormData {
  clientName: string;
  gstin: string;
  email: string;
  phone: string;
  siteLocation: string;
  systemVoltage: string;
  incomerRating: string;
  faultLevel: string;
  busbarMetallurgy: string;
  separationForm: string;
  ipRating: string;
  preferredMakes: string[];
  attachedFiles: FileDetail[];
  customRequirements: string;
}

export interface FileDetail {
  name: string;
  size: string;
  type: string;
}

export interface TrackingOrder {
  orderId: string;
  clientName: string;
  projectTitle: string;
  contractDate: string;
  promisedDispatch: string;
  status: 'In Fabrication' | 'Testing & FAT' | 'Ready for Dispatch' | 'Dispatched';
  progressPercentage: number;
  incomerSpec: string;
  busbarRating: string;
  stages: {
    name: string;
    completed: boolean;
    current?: boolean;
    date?: string;
    note?: string;
  }[];
  testResults: {
    testName: string;
    value: string;
    standard: string;
    status: 'PASS' | 'PENDING';
  }[];
}
