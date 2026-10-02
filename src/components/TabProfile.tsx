import React from 'react';
import { 
  User, ShieldCheck, Lock, Eye, FileText, HeartPulse, 
  Settings, ToggleLeft, ToggleRight, CheckCircle2, ChevronRight,
  Sparkles, Smartphone, UserCog
} from 'lucide-react';
import { UserSecuritySettings } from '../types';

interface TabProfileProps {
  settings: UserSecuritySettings;
  onUpdateSetting: <K extends keyof UserSecuritySettings>(key: K, value: UserSecuritySettings[K]) => void;
  onOpenMedicalRecord: () => void;
  seniorMode: boolean;
}

export const TabProfile: React.FC<TabProfileProps> = ({
  settings,
  onUpdateSetting,
  onOpenMedicalRecord,
  seniorMode,
}) => {
  return (
    <div className="space-y-4 pb-8">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm flex items-center gap-3.5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-md">
          <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-extrabold text-2xl">
              AN
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <h2 className={`font-extrabold text-slate-900 ${seniorMode ? 'text-xl' : 'text-base'}`}>
              Nguyễn Văn An
            </h2>
            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
              58 tuổi
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Mã BHYT: GD-4-79-79-1284-001</p>
          <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-600">
            <span>Nhóm máu: <strong className="text-rose-600">O+</strong></span>
            <span>·</span>
            <span>Cao: <strong>168 cm</strong></span>
            <span>·</span>
            <span>Nặng: <strong>64.8 kg</strong></span>
          </div>
        </div>
      </div>

      {/* QUICK EHR BUTTON */}
      <button
        onClick={onOpenMedicalRecord}
        className="w-full min-h-[48px] p-3.5 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white rounded-2xl font-bold text-xs flex items-center justify-between shadow-md shadow-sky-600/20 transition-all active:scale-98"
      >
        <div className="flex items-center gap-2.5">
          <FileText className="w-5 h-5 text-white" />
          <div className="text-left">
            <div className={`${seniorMode ? 'text-sm' : 'text-xs'} font-bold`}>Hồ Sơ Bệnh Án Điện Tử (EHR)</div>
            <div className="text-[10px] text-sky-100 font-normal">Xem lịch sử chẩn đoán & đơn thuốc điều trị</div>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-white/80" />
      </button>

      {/* ELDERLY MODE TOGGLE (CHẾ ĐỘ DÀNH CHO NGƯỜI CAO TUỔI) */}
      <div className={`rounded-3xl p-4 border transition-all ${
        settings.seniorMode 
          ? 'bg-amber-500 text-white border-amber-600 shadow-md ring-2 ring-amber-300' 
          : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 text-slate-900'
      }`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
              settings.seniorMode ? 'bg-white text-amber-600' : 'bg-amber-500 text-white'
            }`}>
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  settings.seniorMode ? 'bg-amber-600 text-amber-100' : 'bg-amber-200 text-amber-900'
                }`}>
                  Tính năng đặc biệt
                </span>
              </div>
              <h3 className={`font-bold mt-0.5 ${seniorMode ? 'text-lg' : 'text-sm'}`}>
                Chế Độ Dành Cho Người Cao Tuổi
              </h3>
              <p className={`text-xs mt-0.5 ${settings.seniorMode ? 'text-amber-100' : 'text-slate-600'}`}>
                Phóng to chữ, tăng độ tương phản, nút bấm cực lớn dễ chạm
              </p>
            </div>
          </div>

          <button
            onClick={() => onUpdateSetting('seniorMode', !settings.seniorMode)}
            className={`min-h-[44px] min-w-[56px] flex items-center justify-center transition-transform active:scale-95 ${
              settings.seniorMode ? 'text-white' : 'text-amber-600'
            }`}
            aria-label="Bật tắt chế độ người cao tuổi"
          >
            {settings.seniorMode ? (
              <ToggleRight className="w-10 h-10 fill-white text-amber-600" />
            ) : (
              <ToggleLeft className="w-10 h-10 text-slate-400" />
            )}
          </button>
        </div>
      </div>

      {/* SECURITY CONTROLS (CÀI ĐẶT BẢO MẬT & QUYỀN RIÊNG TƯ) */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <div>
            <h3 className={`font-bold text-slate-900 ${seniorMode ? 'text-base' : 'text-sm'}`}>
              Cài Đặt Bảo Mật & Quyền Riêng Tư Y Tế
            </h3>
            <span className="text-[11px] text-slate-500">Tiêu chuẩn bảo mật dữ liệu y tế quốc gia</span>
          </div>
        </div>

        {/* Setting 1: E2EE */}
        <div className="flex items-center justify-between py-2 border-b border-slate-50">
          <div className="pr-2">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Mã hóa dữ liệu End-to-End (E2EE)</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Toàn bộ lịch sử nhịp tim, thuốc và tin nhắn chỉ bác mới giải mã được
            </p>
          </div>
          <button
            onClick={() => onUpdateSetting('e2ee', !settings.e2ee)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-emerald-600 active:scale-95"
            aria-label="Bật tắt mã hóa"
          >
            {settings.e2ee ? (
              <ToggleRight className="w-9 h-9 fill-emerald-600 text-white" />
            ) : (
              <ToggleLeft className="w-9 h-9 text-slate-300" />
            )}
          </button>
        </div>

        {/* Setting 2: Doctor sharing authorization */}
        <div className="flex items-center justify-between py-2 border-b border-slate-50">
          <div className="pr-2">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <UserCog className="w-3.5 h-3.5 text-sky-600" />
              <span>Ủy quyền chia sẻ dữ liệu cho Bác sĩ điều trị</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Cho phép BS. Trần Minh Tuấn (BHYD) xem diễn biến nhịp tim định kỳ
            </p>
          </div>
          <button
            onClick={() => onUpdateSetting('shareDataWithDoctor', !settings.shareDataWithDoctor)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-sky-600 active:scale-95"
            aria-label="Bật tắt chia sẻ dữ liệu với bác sĩ"
          >
            {settings.shareDataWithDoctor ? (
              <ToggleRight className="w-9 h-9 fill-sky-600 text-white" />
            ) : (
              <ToggleLeft className="w-9 h-9 text-slate-300" />
            )}
          </button>
        </div>

        {/* Setting 3: Consent */}
        <div className="flex items-center justify-between py-2">
          <div className="pr-2">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
              <span>Đồng ý điều khoản Consent & Đạo đức AI</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân y tế
            </p>
          </div>
          <button
            onClick={() => onUpdateSetting('medicalConsent', !settings.medicalConsent)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-teal-600 active:scale-95"
            aria-label="Bật tắt đồng ý điều khoản"
          >
            {settings.medicalConsent ? (
              <ToggleRight className="w-9 h-9 fill-teal-600 text-white" />
            ) : (
              <ToggleLeft className="w-9 h-9 text-slate-300" />
            )}
          </button>
        </div>
      </div>

      {/* App Version Info */}
      <div className="text-center text-[11px] text-slate-400 space-y-1">
        <div>AI Care Health Assistant v2.4 (Bản chuẩn Y tế Việt Nam)</div>
        <div>Mã thiết bị: AICARE-VN-SECURE-NODE-901</div>
      </div>
    </div>
  );
};
