import React from 'react';
import { 
  Heart, Footprints, Moon, Check, Plus, AlertCircle, 
  Flame, Droplets, Bell, ChevronRight, Activity, ShieldAlert
} from 'lucide-react';
import { ScheduleItem, VitalMetric } from '../types';

interface TabDashboardProps {
  schedule: ScheduleItem[];
  vitals: VitalMetric[];
  onToggleSchedule: (id: string) => void;
  onOpenSos: () => void;
  seniorMode: boolean;
  onNavigateTab: (tab: any) => void;
}

export const TabDashboard: React.FC<TabDashboardProps> = ({
  schedule,
  vitals,
  onToggleSchedule,
  onOpenSos,
  seniorMode,
  onNavigateTab,
}) => {
  const completedCount = schedule.filter(s => s.completed).length;
  const progressPercent = Math.round((completedCount / schedule.length) * 100);

  return (
    <div className="space-y-4 pb-6">
      {/* Header Greeting */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <span className="text-xs font-semibold text-emerald-600 tracking-wide uppercase">
            Thứ Năm, 01 Tháng 10
          </span>
          <h1 className={`font-extrabold text-slate-900 ${seniorMode ? 'text-2xl' : 'text-xl'}`}>
            Chào Bác An! 👋
          </h1>
          <p className="text-xs text-slate-500">Chỉ số sinh hiệu hôm nay rất tích cực</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onNavigateTab('assistant')}
            className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 flex items-center justify-center transition-colors relative"
            title="Chat với trợ lý AI"
          >
            <Activity className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
          </button>
        </div>
      </div>

      {/* EMERGENCY SOS BANNER / CARD */}
      <div className="bg-gradient-to-r from-rose-500 via-rose-600 to-orange-500 rounded-3xl p-4 text-white shadow-lg shadow-rose-500/25 relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center animate-pulse">
              <ShieldAlert className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md">
                  Hỗ trợ 24/7
                </span>
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              </div>
              <h3 className={`font-bold text-white mt-0.5 ${seniorMode ? 'text-lg' : 'text-base'}`}>
                Nút Cấp Cứu Khẩn Cấp (SOS)
              </h3>
              <p className="text-xs text-white/90">Gọi nhanh 115 & gửi GPS người thân</p>
            </div>
          </div>
          <button
            onClick={onOpenSos}
            className={`min-h-[44px] px-4 py-2.5 bg-white text-rose-600 font-extrabold rounded-2xl text-xs hover:bg-rose-50 shadow-md transition-all active:scale-95 whitespace-nowrap ${
              seniorMode ? 'text-sm px-5 py-3' : ''
            }`}
          >
            BẤM SOS
          </button>
        </div>
      </div>

      {/* QUICK VITALS CARD GRID */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className={`font-bold text-slate-900 ${seniorMode ? 'text-lg' : 'text-sm'}`}>
            Chỉ Số Sức Khỏe Nhanh
          </h2>
          <button 
            onClick={() => onNavigateTab('analytics')}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5"
          >
            <span>Chi tiết</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {/* Heart rate */}
          <div className="bg-white p-3.5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between hover:border-emerald-200 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-500">Nhịp tim</span>
              <div className="w-7 h-7 rounded-xl bg-rose-50 flex items-center justify-center">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20 animate-pulse" />
              </div>
            </div>
            <div className="my-2">
              <span className={`font-extrabold text-slate-900 tabular-nums ${seniorMode ? 'text-2xl' : 'text-xl'}`}>
                82
              </span>
              <span className="text-[11px] font-medium text-slate-400 ml-1">bpm</span>
            </div>
            <div className="inline-flex items-center text-[10px] font-semibold text-emerald-600 bg-emerald-50/70 px-1.5 py-0.5 rounded-lg w-fit">
              Ổn định
            </div>
          </div>

          {/* Steps */}
          <div className="bg-white p-3.5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between hover:border-sky-200 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-500">Bước chân</span>
              <div className="w-7 h-7 rounded-xl bg-sky-50 flex items-center justify-center">
                <Footprints className="w-4 h-4 text-sky-600" />
              </div>
            </div>
            <div className="my-2">
              <span className={`font-extrabold text-slate-900 tabular-nums ${seniorMode ? 'text-2xl' : 'text-xl'}`}>
                5.420
              </span>
              <span className="text-[11px] font-medium text-slate-400 ml-1">bước</span>
            </div>
            <div className="inline-flex items-center text-[10px] font-semibold text-sky-600 bg-sky-50/70 px-1.5 py-0.5 rounded-lg w-fit">
              68% mục tiêu
            </div>
          </div>

          {/* Sleep */}
          <div className="bg-white p-3.5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between hover:border-indigo-200 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-500">Giấc ngủ</span>
              <div className="w-7 h-7 rounded-xl bg-indigo-50 flex items-center justify-center">
                <Moon className="w-4 h-4 text-indigo-600" />
              </div>
            </div>
            <div className="my-2">
              <span className={`font-extrabold text-slate-900 tabular-nums ${seniorMode ? 'text-2xl' : 'text-xl'}`}>
                7.5
              </span>
              <span className="text-[11px] font-medium text-slate-400 ml-1">giờ</span>
            </div>
            <div className="inline-flex items-center text-[10px] font-semibold text-indigo-600 bg-indigo-50/70 px-1.5 py-0.5 rounded-lg w-fit">
              Sâu 2.1h
            </div>
          </div>
        </div>
      </div>

      {/* TODAY'S HEALTH SCHEDULE WITH PROGRESS BAR */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`font-bold text-slate-900 ${seniorMode ? 'text-lg' : 'text-sm'}`}>
              Lịch Trình Sức Khỏe Hôm Nay
            </h2>
            <p className="text-xs text-slate-500">
              Đã hoàn thành <strong className="text-emerald-600 font-bold tabular-nums">{completedCount}/{schedule.length}</strong> mục
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl">
            {progressPercent}%
          </span>
        </div>

        {/* Progress track */}
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* List of interactive checkbox items */}
        <div className="divide-y divide-slate-50 pt-1">
          {schedule.map((item) => (
            <div
              key={item.id}
              onClick={() => onToggleSchedule(item.id)}
              className={`py-3 flex items-start gap-3 cursor-pointer group rounded-xl px-1 hover:bg-slate-50/80 transition-colors ${
                seniorMode ? 'py-4' : ''
              }`}
            >
              {/* Accessible Touch Checkbox */}
              <button
                type="button"
                aria-label={`Đánh dấu ${item.title}`}
                className={`mt-0.5 rounded-xl border flex items-center justify-center transition-all ${
                  seniorMode ? 'w-8 h-8' : 'w-6 h-6'
                } ${
                  item.completed
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm'
                    : 'border-slate-300 bg-white group-hover:border-emerald-400'
                }`}
              >
                {item.completed && <Check className={seniorMode ? 'w-5 h-5' : 'w-4 h-4'} />}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-medium text-slate-400 tabular-nums">
                    {item.time}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-md font-semibold ${
                    item.category === 'medication' ? 'bg-amber-50 text-amber-700' :
                    item.category === 'exercise' ? 'bg-sky-50 text-sky-700' :
                    item.category === 'water' ? 'bg-blue-50 text-blue-700' :
                    'bg-purple-50 text-purple-700'
                  }`}>
                    {item.category === 'medication' ? 'Uống thuốc' :
                     item.category === 'exercise' ? 'Vận động' :
                     item.category === 'water' ? 'Uống nước' : 'Đo chỉ số'}
                  </span>
                </div>
                <div className={`mt-0.5 font-bold transition-all ${
                  seniorMode ? 'text-base' : 'text-sm'
                } ${
                  item.completed ? 'text-slate-400 line-through' : 'text-slate-900'
                }`}>
                  {item.title}
                </div>
                <p className="text-xs text-slate-500 mt-0.5 truncate">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Daily Quick Advice Card */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 rounded-3xl p-4 border border-emerald-100 flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
          <Activity className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">
              Lời khuyên thông minh từ AI Care
            </span>
          </div>
          <p className="text-xs text-slate-700 mt-1 leading-relaxed">
            Nhiệt độ ngoài trời hôm nay khoảng 32°C. Bác An nhớ uống thêm 1 cốc nước ấm trước 15:00 và hạn chế đi dạo lúc giữa trưa nắng nhé!
          </p>
        </div>
      </div>
    </div>
  );
};
