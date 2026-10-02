import React, { useState, useEffect } from 'react';
import { 
  Home, Bot, Building2, LineChart, User, 
  Wifi, Battery, Signal, Sparkles
} from 'lucide-react';
import { TabId } from '../types';

interface PhoneMockupProps {
  currentTab: TabId;
  onTabChange: (tab: TabId) => void;
  seniorMode: boolean;
  toastMessage: string | null;
  children: React.ReactNode;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  currentTab,
  onTabChange,
  seniorMode,
  toastMessage,
  children,
}) => {
  const [currentTime, setCurrentTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const navTabs: { id: TabId; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Trang chủ', icon: Home },
    { id: 'assistant', label: 'Trợ lý AI', icon: Bot },
    { id: 'partners', label: 'Đối tác', icon: Building2 },
    { id: 'analytics', label: 'Theo dõi', icon: LineChart },
    { id: 'profile', label: 'Tài khoản', icon: User },
  ];

  return (
    <div className="relative mx-auto my-auto select-none">
      {/* Outer Smartphone Frame - Titanium Matte finish with soft glow */}
      <div className="relative w-[390px] sm:w-[410px] h-[820px] bg-slate-900 rounded-[52px] p-3.5 shadow-2xl ring-1 ring-white/20 border-4 border-slate-700/60 transition-all duration-300">
        {/* Physical side buttons mockup */}
        <div className="absolute -left-4.5 top-28 w-1 h-8 bg-slate-700 rounded-l-md"></div>
        <div className="absolute -left-4.5 top-40 w-1 h-12 bg-slate-700 rounded-l-md"></div>
        <div className="absolute -left-4.5 top-56 w-1 h-12 bg-slate-700 rounded-l-md"></div>
        <div className="absolute -right-4.5 top-44 w-1 h-16 bg-slate-700 rounded-r-md"></div>

        {/* Inner Screen Container */}
        <div className="relative w-full h-full bg-slate-50 rounded-[42px] overflow-hidden flex flex-col border border-slate-800/80">
          {/* TOP STATUS BAR & DYNAMIC ISLAND */}
          <div className="relative z-40 px-6 pt-3 pb-2 flex items-center justify-between text-slate-900 bg-slate-50/90 backdrop-blur-md">
            {/* Live Clock */}
            <span className="text-[13px] font-bold font-mono tracking-tight">{currentTime}</span>

            {/* Dynamic Island Pill */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-28 h-6 bg-black rounded-full flex items-center justify-between px-2.5 shadow-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
            </div>

            {/* Status Icons */}
            <div className="flex items-center gap-1.5 text-slate-800">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <div className="flex items-center gap-0.5">
                <span className="text-[11px] font-bold font-mono">98%</span>
                <Battery className="w-4 h-4 fill-slate-800" />
              </div>
            </div>
          </div>

          {/* ACTIVE TOAST BANNER */}
          {toastMessage && (
            <div className="absolute top-12 left-4 right-4 z-50 p-3 bg-emerald-700 text-white text-xs font-semibold rounded-2xl shadow-xl border border-emerald-500 flex items-center gap-2 animate-in slide-in-from-top duration-300">
              <Sparkles className="w-4 h-4 text-emerald-300 shrink-0" />
              <span className="flex-1">{toastMessage}</span>
            </div>
          )}

          {/* SCROLLABLE MAIN SCREEN CONTENT */}
          <main className="flex-1 overflow-y-auto px-4 py-2 no-scrollbar">
            {children}
          </main>

          {/* FIXED BOTTOM NAVIGATION BAR */}
          <nav 
            className={`relative z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 pt-1 pb-4 flex items-center justify-around ${
              seniorMode ? 'py-2.5' : ''
            }`}
            aria-label="Điều hướng chính"
          >
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`min-h-[48px] min-w-[48px] flex flex-col items-center justify-center transition-all duration-150 rounded-2xl px-2 ${
                    isActive 
                      ? 'text-emerald-600 font-bold scale-105' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                  aria-label={tab.label}
                >
                  <div className={`p-1 rounded-xl transition-colors ${
                    isActive ? 'bg-emerald-50 text-emerald-600' : ''
                  }`}>
                    <Icon className={seniorMode ? 'w-6 h-6' : 'w-5 h-5'} />
                  </div>
                  <span className={`text-[10px] tracking-tight mt-0.5 ${
                    seniorMode ? 'text-xs font-bold' : 'font-medium'
                  }`}>
                    {tab.label}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-0.5"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Home indicator bar */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-300 rounded-full pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};
