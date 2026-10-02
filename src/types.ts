export type TabId = 'dashboard' | 'assistant' | 'partners' | 'analytics' | 'profile';

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  category: 'medication' | 'exercise' | 'water' | 'vitals';
  detail: string;
  completed: boolean;
}

export interface VitalMetric {
  id: string;
  label: string;
  value: string;
  unit: string;
  status: string;
  statusColor: 'emerald' | 'sky' | 'amber' | 'rose';
  trend: string;
  iconName: 'heart' | 'footprints' | 'moon' | 'droplet';
}

export interface ChatCardContent {
  type: 'diet' | 'exercise' | 'medication' | 'general';
  title: string;
  calories?: string;
  duration?: string;
  dosage?: string;
  items: string[];
  tips?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  card?: ChatCardContent;
}

export interface MedicalPartner {
  id: string;
  name: string;
  type: 'hospital' | 'pharmacy' | 'clinic';
  rating: number;
  reviewsCount: number;
  address: string;
  distance: string;
  verified: boolean;
  licenseId: string;
  openHours: string;
  phone: string;
  badgeText: string;
  specialties: string[];
}

export interface AnalyticsPoint {
  day: string;
  fullDate: string;
  heartRate: number; // bpm
  weight: number; // kg
  sleepHours: number; // hours
  steps: number; // steps
}

export interface UserSecuritySettings {
  e2ee: boolean;
  shareDataWithDoctor: boolean;
  medicalConsent: boolean;
  seniorMode: boolean;
  emergencySosActive: boolean;
}
