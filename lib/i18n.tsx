"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "hi";

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

export const translations: Translations = {
  // Brand & Header
  orgName: {
    en: "Rajasthan Aeroskatoball Association",
    hi: "राजस्थान एयरोस्केटोबॉल एसोसिएशन",
  },
  affiliation: {
    en: "Affiliated to Aeroskatoball Federation of India",
    hi: "एयरोस्केटोबॉल फेडरेशन ऑफ इंडिया से संबद्ध",
  },
  helpline: {
    en: "Helpline",
    hi: "हेल्पलाइन",
  },
  urgentNotice: {
    en: "Notice: State Aeroskatoball Championship 2026 registrations are now open. Download circular from downloads section.",
    hi: "सूचना: राज्य एयरोस्केटोबॉल चैम्पियनशिप 2026 के पंजीकरण अब खुले हैं। डाउनलोड अनुभाग से परिपत्र डाउनलोड करें।",
  },
  searchPlaceholder: {
    en: "Search players, news, championships, results...",
    hi: "खिलाड़ी, समाचार, चैंपियनशिप, परिणाम खोजें...",
  },
  login: {
    en: "Login",
    hi: "लॉगिन",
  },
  register: {
    en: "Register Now",
    hi: "पंजीकरण करें",
  },
  adminPortal: {
    en: "Admin Portal",
    hi: "एडमिन पोर्टल",
  },

  // Navigation (10 items)
  navHome: { en: "Home", hi: "मुख्य पृष्ठ" },
  navAbout: { en: "About Us", hi: "हमारे बारे में" },
  navCommittee: { en: "Executive Committee", hi: "कार्यकारिणी समिति" },
  navRegistration: { en: "Registration", hi: "पंजीकरण" },
  navChampionships: { en: "Championships", hi: "चैम्पियनशिप" },
  navResults: { en: "Results", hi: "परिणाम" },
  navGallery: { en: "Gallery", hi: "गैलरी" },
  navDownloads: { en: "Downloads", hi: "डाउनलोड्स" },
  navNews: { en: "News & Circulars", hi: "समाचार एवं परिपत्र" },
  navContact: { en: "Contact Us", hi: "संपर्क करें" },

  // Hero CTAs
  heroTitle1: {
    en: "Rajasthan State Aeroskatoball Championship 2026",
    hi: "राजस्थान राज्य एयरोस्केटोबॉल चैम्पियनशिप 2026",
  },
  heroSub1: {
    en: "Official State Championship in Bharatpur. Witness elite high-speed aerial skating athleticism.",
    hi: "भरतपुर में आधिकारिक राज्य चैम्पियनशिप। उच्च गति एयरो-स्केटिंग एथलेटिक्स का अनुभव करें।",
  },
  viewEvents: { en: "View Events", hi: "प्रतियोगिताएं देखें" },
  latestNews: { en: "Latest News", hi: "ताज़ा समाचार" },

  // Stats
  statPlayers: { en: "Registered Players", hi: "पंजीकृत खिलाड़ी" },
  statCoaches: { en: "Certified Coaches", hi: "प्रमाणित कोच" },
  statDistricts: { en: "District Associations", hi: "जिला संघ" },
  statClubs: { en: "Affiliated Clubs", hi: "संबद्ध क्लब" },
  statChampionships: { en: "Championships Held", hi: "आयोजित चैम्पियनशिप" },
  statMedals: { en: "State Medals Awarded", hi: "प्रदत्त पदक" },

  // Sections
  aboutTitle: { en: "About Rajasthan Aeroskatoball", hi: "राजस्थान एयरोस्केटोबॉल के बारे में" },
  presidentsMessage: { en: "President's Message", hi: "अध्यक्ष का संदेश" },
  readMore: { en: "Read More", hi: "और पढ़ें" },
  upcomingChampionships: { en: "Upcoming Championships", hi: "आगामी चैम्पियनशिप" },
  galleryPreview: { en: "Championship Highlights", hi: "चैम्पियनशिप की झलकियां" },
  ourSponsors: { en: "Official Partners & Affiliations", hi: "आधिकारिक भागीदार एवं संबद्धताएं" },

  // Verify
  verifyBadge: { en: "Official Digital ID Verification", hi: "आधिकारिक डिजिटल आईडी सत्यापन" },
  activeStatus: { en: "Active & Verified", hi: "सक्रिय एवं सत्यापित" },
  suspendedStatus: { en: "Suspended", hi: "निलंबित" },
  expiredStatus: { en: "Expired", hi: "समाप्त" },
  
  // Footer
  quickLinks: { en: "Quick Links", hi: "त्वरित लिंक" },
  importantLinks: { en: "Important Links", hi: "महत्वपूर्ण लिंक" },
  officeAddress: { en: "Office Address", hi: "कार्यालय पता" },
  addressValue: {
    en: "Vijay Nagar Colony, Bharatpur (Rajasthan) - 321001",
    hi: "विजय नगर कॉलोनी, भरतपुर (राजस्थान) - 321001",
  },
  copyright: {
    en: "Copyright © Rajasthan Aeroskatoball Association. All rights reserved.",
    hi: "सर्वाधिकार सुरक्षित © राजस्थान एयरोस्केटोबॉल एसोसिएशन।",
  },
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("raa_lang") as Language;
    if (saved === "en" || saved === "hi") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("raa_lang", lang);
  };

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language] || translations[key].en;
    }
    return key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
