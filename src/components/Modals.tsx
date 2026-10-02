import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, PhoneCall, ShieldCheck, QrCode, X, 
  MapPin, CheckCircle2, Calendar, FileText, Heart, Clock, UserCheck
} from 'lucide-react';
import { MedicalPartner } from '../types';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
  seniorMode: boolean;
}

export const SosModal: React.FC<SosModalProps> = ({ isOpen, onClose, seniorMode }) => {
  const [countdown, setCountdown] = useState<number>(5);
  const [isCalling, setIsCalling] = useState<boolean>(false);
  const [locationSent, setLocationSent] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && countdown > 0 && !isCalling) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    } else if (isOpen && countdown === 0 && !isCalling) {
      setIsCalling(true);
      setLocationSent(true);
    }
    return () => clearTimeout(timer);
  }, [isOpen, countdown, isCalling]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-rose-200 text-center relative ${seniorMode ? 'scale-105' : ''}`}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-20 h-20 mx-auto rounded-full bg-rose-100 flex items-center justify-center mb-4 ring-8 ring-rose-50 animate-pulse">
          <AlertTriangle className="w-10 h-10 text-rose-600" />
        </div>

        <h3 className={`font-bold text-slate-900 ${seniorMode ? 'text-2xl' : 'text-xl'}`}>
          CẤP CỨU KHẨN CẤP (SOS)
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Hệ thống đang kích hoạt cuộc gọi khẩn và phát tín hiệu định vị cứu hộ
        </p>

        {!isCalling ? (
          <div className="my-6 py-4 bg-rose-50/80 rounded-2xl border border-rose-100">
            <span className="text-xs uppercase font-semibold tracking-wider text-rose-700">Tự động kết nối sau</span>
            <div className="text-5xl font-extrabold text-rose-600 my-1 tabular-nums">
              00:0{countdown}
            </div>
            <p className="text-xs text-rose-600">Bấm nút bên dưới để gọi ngay lập tức</p>
          </div>
        ) : (
          <div className="my-6 py-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-semibold">Đã gửi tọa độ GPS tới TT Cấp cứu 115</span>
          </div>
        )}

        <div className="space-y-3">
          <a
            href="tel:115"
            onClick={() => setIsCalling(true)}
            className="w-full min-h-[48px] bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition-all active:scale-95"
          >
            <PhoneCall className="w-5 h-5" />
            <span>GỌI TRUNG TÂM 115 NGAY</span>
          </a>

          <button
            onClick={() => {
              setLocationSent(true);
              alert("Đã gửi SMS khẩn kèm vị trí GPS đến Con gái (0903.xxx.888) & BS. Tuấn!");
            }}
            className="w-full min-h-[44px] bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-2xl flex items-center justify-center gap-2 text-sm transition-colors"
          >
            <MapPin className="w-4 h-4 text-rose-600" />
            <span>{locationSent ? 'Đã báo người thân & Bác sĩ gia đình' : 'Báo người thân (Con gái: 0903.xxx.888)'}</span>
          </button>
        </div>

        <button 
          onClick={onClose}
          className="mt-4 text-xs text-slate-400 hover:text-slate-600 underline min-h-[36px]"
        >
          Hủy yêu cầu (Nếu bấm nhầm)
        </button>
      </div>
    </div>
  );
};

interface QrModalProps {
  partner: MedicalPartner | null;
  onClose: () => void;
  seniorMode: boolean;
}

export const PartnerQrModal: React.FC<QrModalProps> = ({ partner, onClose, seniorMode }) => {
  if (!partner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 text-center relative ${seniorMode ? 'scale-105' : ''}`}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-3 border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Mã Định Danh Xác Thực Y Tế</span>
        </div>

        <h3 className="font-bold text-slate-900 text-lg">{partner.name}</h3>
        <p className="text-xs text-slate-500 mt-1">Giấy phép: {partner.licenseId}</p>

        {/* QR Code Container */}
        <div className="my-5 p-4 bg-slate-50 rounded-2xl border border-slate-200 inline-block relative">
          <div className="w-48 h-48 bg-white rounded-xl p-2 shadow-inner border border-slate-200 flex flex-col items-center justify-center relative">
            {/* SVG Simulated QR code */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
              <rect x="0" y="0" width="30" height="30" fill="currentColor" rx="4" />
              <rect x="5" y="5" width="20" height="20" fill="white" rx="2" />
              <rect x="9" y="9" width="12" height="12" fill="currentColor" rx="1" />
              
              <rect x="70" y="0" width="30" height="30" fill="currentColor" rx="4" />
              <rect x="75" y="5" width="20" height="20" fill="white" rx="2" />
              <rect x="79" y="9" width="12" height="12" fill="currentColor" rx="1" />
              
              <rect x="0" y="70" width="30" height="30" fill="currentColor" rx="4" />
              <rect x="5" y="75" width="20" height="20" fill="white" rx="2" />
              <rect x="9" y="79" width="12" height="12" fill="currentColor" rx="1" />

              <rect x="36" y="8" width="6" height="6" fill="currentColor" />
              <rect x="48" y="14" width="8" height="6" fill="currentColor" />
              <rect x="36" y="24" width="8" height="8" fill="currentColor" />
              <rect x="48" y="32" width="6" height="6" fill="currentColor" />
              <rect x="14" y="38" width="8" height="8" fill="currentColor" />
              <rect x="26" y="44" width="6" height="10" fill="currentColor" />
              <rect x="68" y="38" width="10" height="6" fill="currentColor" />
              <rect x="82" y="46" width="6" height="8" fill="currentColor" />
              <rect x="40" y="48" width="20" height="20" fill="#059669" rx="3" />
              <rect x="42" y="72" width="8" height="8" fill="currentColor" />
              <rect x="58" y="78" width="12" height="6" fill="currentColor" />
              <rect x="76" y="72" width="8" height="10" fill="currentColor" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">AICARE</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-mono">HASH: SHA256-VN-MED-{partner.id.toUpperCase()}-SECURE</p>
        </div>

        <p className="text-xs text-slate-600 mb-4 px-2">
          Quét mã này tại quầy để tự động check-in y tế hoặc đối soát đơn thuốc chống hàng giả mạo.
        </p>

        <button
          onClick={onClose}
          className="w-full min-h-[44px] bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl text-sm transition-colors"
        >
          Xác nhận xong
        </button>
      </div>
    </div>
  );
};

interface BookingModalProps {
  partner: MedicalPartner | null;
  onClose: () => void;
  onSuccess: (info: string) => void;
  seniorMode: boolean;
}

export const BookingModal: React.FC<BookingModalProps> = ({ partner, onClose, onSuccess, seniorMode }) => {
  const [selectedDate, setSelectedDate] = useState('2026-10-02');
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!partner) return null;
  const isPharmacy = partner.type === 'pharmacy';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess(isPharmacy 
        ? `Đã gửi đơn thuốc đến ${partner.name}. Dược sĩ sẽ gọi xác nhận trong 5 phút!` 
        : `Đặt lịch khám thành công tại ${partner.name} lúc ${selectedTime} ngày ${selectedDate}!`);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 relative ${seniorMode ? 'scale-105' : ''}`}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
            {isPharmacy ? <ShieldCheck className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
          </div>
          <div>
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              {isPharmacy ? 'Liên kết nhà thuốc' : 'Đặt lịch khám trực tuyến'}
            </span>
            <h3 className="font-bold text-slate-900 text-base leading-tight line-clamp-1">{partner.name}</h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isPharmacy ? (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Chọn ngày khám</label>
                <input 
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Khung giờ hẹn</label>
                <div className="grid grid-cols-3 gap-2">
                  {['08:30', '09:00', '10:15', '14:00', '15:30', '16:30'].map(t => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`py-2 text-xs font-medium rounded-xl border transition-colors min-h-[40px] ${
                        selectedTime === t 
                          ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-sm' 
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Yêu cầu đơn thuốc hoặc tư vấn dược</label>
              <textarea 
                rows={3}
                placeholder="Nhập tên thuốc cần mua (hoặc tải đơn thuốc bác sĩ chỉ định)..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <p className="text-[11px] text-emerald-700 mt-1">✓ Dược sĩ sẽ kiểm tra chống tương tác thuốc trước khi giao hàng</p>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Ghi chú triệu chứng (nếu có)</label>
            <input 
              type="text"
              placeholder="VD: Tái khám huyết áp định kỳ, mỏi vai gáy..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 min-h-[44px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl text-xs transition-colors"
            >
              Quay lại
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-1/2 min-h-[44px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5"
            >
              {isSubmitting ? 'Đang gửi...' : isPharmacy ? 'Gửi đơn thuốc' : 'Xác nhận hẹn'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface MedicalRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  seniorMode: boolean;
}

export const MedicalRecordModal: React.FC<MedicalRecordModalProps> = ({ isOpen, onClose, seniorMode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 max-h-[85vh] overflow-y-auto no-scrollbar relative ${seniorMode ? 'scale-105' : ''}`}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-700">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Hồ Sơ Bệnh Án Điện Tử</h3>
            <span className="text-xs text-slate-500 font-mono">Mã HS: VN-EHR-882910</span>
          </div>
        </div>

        <div className="space-y-4 text-left">
          {/* General info */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Bệnh nhân:</span>
              <span className="font-bold text-slate-900">Nguyễn Văn An (58 tuổi)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Nhóm máu:</span>
              <span className="font-bold text-rose-600">O+ (Dương tính)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Dị ứng ghi nhận:</span>
              <span className="font-bold text-amber-700">Penicillin (Mức độ vừa)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Bệnh nền:</span>
              <span className="font-medium text-slate-800">Tăng huyết áp vô căn (Đang kiểm soát)</span>
            </div>
          </div>

          {/* Last visit */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Lần khám gần nhất</h4>
            <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-900">Bệnh Viện ĐHYD TP.HCM</span>
                <span className="text-slate-500">18/09/2026</span>
              </div>
              <p className="text-xs text-slate-700">
                <span className="font-semibold text-slate-800">Bác sĩ phụ trách:</span> BS.CKII Trần Minh Tuấn
              </p>
              <div className="p-2 bg-emerald-50 rounded-xl text-xs text-emerald-900">
                <span className="font-semibold">Kết luận:</span> Huyết áp tâm thu ổn định 120/80 mmHg. Tiếp tục duy trì phác đồ Amlodipine 5mg và vận động nhẹ.
              </div>
            </div>
          </div>

          {/* Active prescription */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Đơn thuốc đang dùng</h4>
            <div className="space-y-2">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">Amlodipine Besylate 5mg</div>
                  <div className="text-[11px] text-slate-500">1 viên / ngày sau ăn sáng</div>
                </div>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-bold">Đang dùng</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">Bio-Flora 250mg</div>
                  <div className="text-[11px] text-slate-500">1 gói / ngày sau ăn trưa</div>
                </div>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-bold">Đang dùng</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full min-h-[44px] bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-2xl text-xs transition-colors"
        >
          Đóng hồ sơ
        </button>
      </div>
    </div>
  );
};
