import React, { useState } from 'react';
import { 
  Heart, Shield, Smartphone, Sparkles, AlertTriangle, 
  Activity, CheckCircle2, RotateCcw, Volume2, User
} from 'lucide-react';
import { TabId, ScheduleItem, MedicalPartner, ChatMessage, ChatCardContent, UserSecuritySettings } from './types';
import { 
  INITIAL_SCHEDULE, 
  INITIAL_VITALS, 
  INITIAL_MESSAGES, 
  PARTNERS_DATA, 
  ANALYTICS_DATA 
} from './data/mockData';
import { PhoneMockup } from './components/PhoneMockup';
import { TabDashboard } from './components/TabDashboard';
import { TabAssistant } from './components/TabAssistant';
import { TabPartners } from './components/TabPartners';
import { TabAnalytics } from './components/TabAnalytics';
import { TabProfile } from './components/TabProfile';
import { 
  SosModal, 
  PartnerQrModal, 
  BookingModal, 
  MedicalRecordModal 
} from './components/Modals';

export default function App() {
  // Tab State
  const [currentTab, setCurrentTab] = useState<TabId>('dashboard');

  // Application Data States
  const [schedule, setSchedule] = useState<ScheduleItem[]>(INITIAL_SCHEDULE);
  const [vitals] = useState(INITIAL_VITALS);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [partners] = useState<MedicalPartner[]>(PARTNERS_DATA);
  const [analyticsData] = useState(ANALYTICS_DATA);

  // Security & User Settings
  const [settings, setSettings] = useState<UserSecuritySettings>({
    e2ee: true,
    shareDataWithDoctor: true,
    medicalConsent: true,
    seniorMode: false,
    emergencySosActive: false,
  });

  // Modals
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [qrPartner, setQrPartner] = useState<MedicalPartner | null>(null);
  const [bookingPartner, setBookingPartner] = useState<MedicalPartner | null>(null);
  const [isMedicalRecordOpen, setIsMedicalRecordOpen] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  // Toggle Schedule Checkbox
  const handleToggleSchedule = (id: string) => {
    setSchedule((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextCompleted = !item.completed;
          showToast(
            nextCompleted
              ? `✓ Đã hoàn thành: ${item.title}`
              : `Đã mở lại nhắc nhở: ${item.title}`
          );
          return { ...item, completed: nextCompleted };
        }
        return item;
      })
    );
  };

  // Chat message send
  const handleSendMessage = (text: string, card?: ChatCardContent) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: card ? 'ai' : 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      card,
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  // Add item from chat to schedule
  const handleAddScheduleItem = (title: string, category: 'medication' | 'exercise') => {
    const newItem: ScheduleItem = {
      id: `sch-${Date.now()}`,
      time: '12:00',
      title,
      category,
      detail: 'Được thêm bởi Trợ lý AI Care',
      completed: false,
    };
    setSchedule((prev) => [newItem, ...prev]);
    showToast(`Đã thêm vào lịch trình hôm nay: ${title}`);
  };

  // Update Setting
  const handleUpdateSetting = <K extends keyof UserSecuritySettings>(
    key: K,
    value: UserSecuritySettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    if (key === 'seniorMode') {
      showToast(value ? 'Đã kích hoạt: Chế độ Dành cho người cao tuổi' : 'Đã chuyển về Chế độ tiêu chuẩn');
    } else if (key === 'e2ee') {
      showToast(value ? 'Đã bật mã hóa đầu cuối E2EE' : 'Đã tắt mã hóa');
    } else if (key === 'shareDataWithDoctor') {
      showToast(value ? 'Đã cấp quyền chia sẻ dữ liệu y tế' : 'Đã thu hồi quyền chia sẻ');
    } else if (key === 'medicalConsent') {
      showToast(value ? 'Đã cập nhật đồng ý Consent y tế' : 'Đã hủy thỏa thuận Consent');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-white relative overflow-x-hidden">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-emerald-500/10 blur-[130px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-1/4 w-[500px] h-[500px] bg-sky-500/10 blur-[140px] rounded-full"></div>
        <div className="absolute top-1/3 right-[-5%] w-[400px] h-[400px] bg-teal-500/10 blur-[120px] rounded-full"></div>
      </div>

      {/* TOP DESKTOP HEADER BAR */}
      <header className="relative z-10 w-full border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-md shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Heart className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
            </div>
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
              <span>AI Care</span>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                Trợ lý Sức khỏe AI
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Mô phỏng Mobile App hoàn chỉnh · 5 Tab tương tác chuẩn Y tế
            </p>
          </div>
        </div>

        {/* Quick desktop controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleUpdateSetting('seniorMode', !settings.seniorMode)}
            className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
              settings.seniorMode
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-bold'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white hover:border-slate-500'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Chế độ Người cao tuổi: {settings.seniorMode ? 'BẬT' : 'TẮT'}</span>
          </button>

          <button
            onClick={() => {
              showToast('🔔 Nhắc nhở: Đã 3 giờ chiều, bác An nhớ uống 200ml nước ấm nhé!');
            }}
            className="min-h-[40px] px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-xl text-xs font-medium hidden md:flex items-center gap-1.5 transition-colors"
          >
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Thử thông báo</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA: Centered Mobile Mockup & Side feature highlight cards on desktop */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-6 px-3 lg:px-8">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-8 xl:gap-12">
          
          {/* LEFT COLUMN: Feature Explanations & Quick Navigation on Desktop */}
          <div className="hidden lg:flex flex-col gap-4 w-72 shrink-0 text-left">
            <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl p-5 border border-slate-800/80 shadow-lg">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Kiến trúc hệ thống
              </span>
              <h2 className="text-base font-bold text-white mt-1">5 Tab Chức Năng</h2>
              <div className="mt-3 space-y-2">
                {[
                  { id: 'dashboard', label: '1. Trang Chủ (Dashboard)' },
                  { id: 'assistant', label: '2. Trợ Lý AI Chatbot' },
                  { id: 'partners', label: '3. Đối Tác & Nhà Thuốc' },
                  { id: 'analytics', label: '4. Biểu Đồ Sức Khỏe' },
                  { id: 'profile', label: '5. Tài Khoản & Bảo Mật' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTab(item.id as TabId)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                      currentTab === item.id
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-xs'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {currentTab === item.id && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl p-5 border border-slate-800/80 shadow-lg space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-white font-bold">
                <Shield className="w-4 h-4 text-sky-400" />
                <span>Tiêu chuẩn Y Tế</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Tích hợp tích xanh xác thực đơn vị y tế, mã hóa đầu cuối E2EE, và nút SOS khẩn cấp kết nối 115.
              </p>
            </div>
          </div>

          {/* CENTER: THE REALISTIC SMARTPHONE MOCKUP */}
          <div className="shrink-0 flex items-center justify-center">
            <PhoneMockup
              currentTab={currentTab}
              onTabChange={setCurrentTab}
              seniorMode={settings.seniorMode}
              toastMessage={toastMessage}
            >
              {currentTab === 'dashboard' && (
                <TabDashboard
                  schedule={schedule}
                  vitals={vitals}
                  onToggleSchedule={handleToggleSchedule}
                  onOpenSos={() => setIsSosOpen(true)}
                  seniorMode={settings.seniorMode}
                  onNavigateTab={setCurrentTab}
                />
              )}

              {currentTab === 'assistant' && (
                <TabAssistant
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  seniorMode={settings.seniorMode}
                  onAddScheduleItem={handleAddScheduleItem}
                />
              )}

              {currentTab === 'partners' && (
                <TabPartners
                  partners={partners}
                  onOpenQr={(p) => setQrPartner(p)}
                  onOpenBooking={(p) => setBookingPartner(p)}
                  seniorMode={settings.seniorMode}
                />
              )}

              {currentTab === 'analytics' && (
                <TabAnalytics
                  data={analyticsData}
                  seniorMode={settings.seniorMode}
                />
              )}

              {currentTab === 'profile' && (
                <TabProfile
                  settings={settings}
                  onUpdateSetting={handleUpdateSetting}
                  onOpenMedicalRecord={() => setIsMedicalRecordOpen(true)}
                  seniorMode={settings.seniorMode}
                />
              )}
            </PhoneMockup>
          </div>

          {/* RIGHT COLUMN: Quick Actions & Live Simulator Status on Desktop */}
          <div className="hidden lg:flex flex-col gap-4 w-72 shrink-0 text-left">
            <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl p-5 border border-slate-800/80 shadow-lg space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                Thao tác nhanh
              </span>
              <h2 className="text-base font-bold text-white">Thử Nghiệm Tính Năng</h2>

              <div className="space-y-2">
                <button
                  onClick={() => setIsSosOpen(true)}
                  className="w-full py-2.5 px-3 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Kích hoạt Cấp cứu SOS</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentTab('assistant');
                    handleSendMessage('Thực đơn giảm cân đau dạ dày');
                  }}
                  className="w-full py-2.5 px-3 bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/40 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <span>Mô phỏng Thẻ Thực đơn AI</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentTab('partners');
                    setQrPartner(partners[0]);
                  }}
                  className="w-full py-2.5 px-3 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Quét QR Chống giả mạo</span>
                </button>

                <button
                  onClick={() => setIsMedicalRecordOpen(true)}
                  className="w-full py-2.5 px-3 bg-teal-600/20 hover:bg-teal-600/30 text-teal-300 border border-teal-500/40 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4 text-teal-400" />
                  <span>Xem Bệnh án điện tử</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-900/40 rounded-3xl p-4 border border-slate-800/60 text-[11px] text-slate-400 space-y-1">
              <div className="font-semibold text-slate-300">Trạng thái mô phỏng:</div>
              <div>• Khung máy: iPhone 16 Pro (Dynamic Island)</div>
              <div>• Dữ liệu: Real-time React state rendering</div>
              <div>• Chống giả: SHA256 Medical Registry Hash</div>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 w-full border-t border-slate-800/60 bg-slate-950/80 backdrop-blur-sm px-4 py-3 text-center text-xs text-slate-500">
        AI Care - Trợ lý Sức khỏe AI · Dự án ứng dụng chăm sóc sức khỏe thông minh cá nhân hóa
      </footer>

      {/* MODALS */}
      <SosModal
        isOpen={isSosOpen}
        onClose={() => setIsSosOpen(false)}
        seniorMode={settings.seniorMode}
      />

      <PartnerQrModal
        partner={qrPartner}
        onClose={() => setQrPartner(null)}
        seniorMode={settings.seniorMode}
      />

      <BookingModal
        partner={bookingPartner}
        onClose={() => setBookingPartner(null)}
        onSuccess={(msg) => showToast(msg)}
        seniorMode={settings.seniorMode}
      />

      <MedicalRecordModal
        isOpen={isMedicalRecordOpen}
        onClose={() => setIsMedicalRecordOpen(false)}
        seniorMode={settings.seniorMode}
      />
    </div>
  );
}
