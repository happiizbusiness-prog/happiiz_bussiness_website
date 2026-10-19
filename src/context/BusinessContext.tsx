import React, { createContext, useContext, useState, useEffect } from 'react';
import { BusinessSettings } from '../types';

export const DEFAULT_BUSINESS_SETTINGS: BusinessSettings = {
  businessName: 'HAPPIIZ BUSINESS SOLUTIONS',
  tagline: 'Your Business Our Priority — Accelerating Enterprise Growth with Cutting-Edge Web Engineering, Performance Marketing & Brand Craft',
  logoUrl: '',
  primaryColor: '#094bc7',
  secondaryColor: '#ff5722',
  contactNumber: '+91 98765 43210',
  whatsappNumber: '+919876543210',
  businessEmail: 'happiizbusiness@gmail.com',
  businessAddress: 'Suite 402, Level 4, Innov8 Executive Tower, Sector 62, Noida, NCR, India',
  socialUrls: {
    linkedin: 'https://linkedin.com/company/happiiz-business-solutions',
    instagram: 'https://instagram.com/happiizbusiness',
    facebook: 'https://facebook.com/happiizbusiness',
    twitter: 'https://x.com/happiizbiz',
    youtube: 'https://youtube.com/@happiizbusiness'
  },
  favicon: ''
};

const STORAGE_KEY = 'happiiz_business_settings_v1';

interface BusinessContextType {
  settings: BusinessSettings;
  updateSettings: (newSettings: Partial<BusinessSettings>) => void;
  resetSettings: () => void;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export function BusinessProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<BusinessSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_BUSINESS_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {
      // ignore JSON parse error
    }
    return DEFAULT_BUSINESS_SETTINGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // storage error
    }

    // Apply dynamic CSS variables for theme customization
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--brand-primary', settings.primaryColor);
      document.documentElement.style.setProperty('--brand-secondary', settings.secondaryColor);
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<BusinessSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_BUSINESS_SETTINGS);
  };

  return (
    <BusinessContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness(): BusinessContextType {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
}
