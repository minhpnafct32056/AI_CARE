import React, { useState } from 'react';
import { 
  Heart, Moon, Scale, TrendingUp, Sparkles, 
  Calendar, CheckCircle, ArrowUpRight, ArrowDownRight, Info
} from 'lucide-react';
import { AnalyticsPoint } from '../types';

interface TabAnalyticsProps {
  data: AnalyticsPoint[];
  seniorMode: boolean;
}

export const TabAnalytics: React.FC<TabAnalyticsProps> = ({ data, seniorMode }) => {
  const [activeMetric, setActiveMetric] = useState<'heartRate' | 'weight' | 'sleepHours'>('heartRate');
  const [selectedPointIndex, setSelectedPointIndex] = useState<number>(data.length - 1);

  const selectedPoint = data[selectedPointIndex] || data[0];

  // SVG Chart calculation
  const width = 320;
  const height = 150;
  const paddingX = 24;
  const paddingY = 24;

  const values = data.map(d => d[activeMetric]);
  const minVal = Math.min(...values) * 0.96;
  const maxVal = Math.max(...values) * 1.04;

  const points = data.map((d, index) => {
    const x = paddingX + (index / (data.length - 1)) * (width - 2 * paddingX);
    const y = height - paddingY - ((d[activeMetric] - minVal) / (maxVal - minVal || 1)) * (height - 2 * paddingY);
    return { x, y, data: d };
  });

  const pathD = points.reduce((acc, curr, idx, arr) => {
    if (idx === 0) return `M ${curr.x} ${curr.y}`;
    const prev = arr[idx - 1];
    const cx = (prev.x + curr.x) / 2;
    return `${acc} C ${cx} ${prev.y}, ${cx} ${curr.y}, ${curr.x} ${curr.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  const metricConfig = {
    heartRate: {
      title: 'Nhịp Tim Trung Bình',
      unit: 'bpm',
      avg: '81.5',
      color: '#f43f5e',
      gradientId: 'gradHeart',
      safeRange: '60 - 90 bpm',
      status: 'Ổn định, an toàn',
      trend: '-2 bpm so với tuần trước',
      isGood: true,
    },
    weight: {
      title: 'Cân Nặng & BMI',
      unit: 'kg',
      avg: '65.1',
      color: '#0284c7',
      gradientId: 'gradWeight',
      safeRange: '63 - 67 kg (BMI 22.8)',
      status: 'Chuẩn vóc dáng',
      trend: '-0.6 kg trong 7 ngày',
      isGood: true,
    },
    sleepHours: {
      title: 'Thời Lượng Giấc Ngủ',
      unit: 'giờ',
      avg: '7.4',
      color: '#6366f1',
      gradientId: 'gradSleep',
      safeRange: '7.0 - 8.5 giờ',
      status: 'Ngủ sâu đạt chuẩn',
      trend: '+0.5h giấc ngủ sâu',
      isGood: true,
    },
  }[activeMetric];

  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      <div>
        <h1 className={`font-extrabold text-slate-900 ${seniorMode ? 'text-2xl' : 'text-xl'}`}>
          Theo Dõi Sức Khỏe & Biểu Đồ
        </h1>
        <p className="text-xs text-slate-500">Xu hướng sức khỏe 7 ngày qua với phân tích thông minh từ AI</p>
      </div>

      {/* Metric Selector Buttons */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { id: 'heartRate', label: 'Nhịp tim', icon: Heart, color: 'text-rose-500' },
          { id: 'weight', label: 'Cân nặng', icon: Scale, color: 'text-sky-600' },
          { id: 'sleepHours', label: 'Giấc ngủ', icon: Moon, color: 'text-indigo-600' },
        ].map((btn) => {
          const Icon = btn.icon;
          const isActive = activeMetric === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => setActiveMetric(btn.id as any)}
              className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 min-h-[56px] ${
                isActive
                  ? 'bg-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                  : 'bg-white/80 border-slate-100 hover:bg-white text-slate-600'
              }`}
            >
              <Icon className={`w-4 h-4 ${btn.color}`} />
              <span className={`text-xs font-bold ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                {btn.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* INTERACTIVE SVG CHART CARD */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500">{metricConfig.title}</span>
              <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-md font-medium">
                Vùng an toàn: {metricConfig.safeRange}
              </span>
            </div>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className={`font-extrabold text-slate-900 tabular-nums ${seniorMode ? 'text-3xl' : 'text-2xl'}`}>
                {selectedPoint[activeMetric]}
              </span>
              <span className="text-xs font-semibold text-slate-500">{metricConfig.unit}</span>
              <span className="text-xs font-medium text-slate-400 ml-2">
                (Ngày {selectedPoint.day} - {selectedPoint.fullDate})
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-xl">
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>{metricConfig.trend}</span>
            </span>
          </div>
        </div>

        {/* SVG Container */}
        <div className="relative pt-2">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44 overflow-visible">
            <defs>
              <linearGradient id="gradHeart" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="gradWeight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="gradSleep" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid baseline */}
            <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="#f1f5f9" strokeWidth="1" />
            <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />

            {/* Area */}
            <path d={areaD} fill={`url(#${metricConfig.gradientId})`} />

            {/* Line curve */}
            <path d={pathD} fill="none" stroke={metricConfig.color} strokeWidth="3" strokeLinecap="round" />

            {/* Interactive Data points */}
            {points.map((pt, i) => {
              const isSelected = i === selectedPointIndex;
              return (
                <g key={i} className="cursor-pointer" onClick={() => setSelectedPointIndex(i)}>
                  {/* Invisible wide touch area */}
                  <circle cx={pt.x} cy={pt.y} r="18" fill="transparent" />
                  
                  {/* Outer halo if selected */}
                  {isSelected && (
                    <circle cx={pt.x} cy={pt.y} r="8" fill={metricConfig.color} opacity="0.25" className="animate-ping" />
                  )}
                  {/* Center Dot */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isSelected ? "5" : "3.5"}
                    fill="#ffffff"
                    stroke={metricConfig.color}
                    strokeWidth={isSelected ? "3" : "2"}
                  />
                  {/* Day label */}
                  <text
                    x={pt.x}
                    y={height - 6}
                    textAnchor="middle"
                    className={`text-[11px] font-medium fill-slate-400 ${isSelected ? 'fill-slate-900 font-bold' : ''}`}
                  >
                    {pt.data.day}
                  </text>
                </g>
              );
            })}
          </svg>
          <div className="text-center text-[10px] text-slate-400 mt-1">
            Chạm vào các điểm trên biểu đồ để xem chi tiết từng ngày
          </div>
        </div>
      </div>

      {/* AI HEALTH INSIGHTS BOX */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50/60 to-white rounded-3xl p-4 border border-emerald-100 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Đánh Giá Tổng Quan Từ AI Care</h3>
            <span className="text-[11px] text-emerald-800 font-medium">Dữ liệu tuần: 25/09 - 01/10</span>
          </div>
        </div>

        <div className="space-y-2 text-xs text-slate-700">
          <div className="flex items-start gap-2 bg-white/80 p-2.5 rounded-2xl border border-emerald-100/60">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900">Nhịp tim duy trì rất tốt:</strong> Dao động chuẩn 79 - 85 bpm, không xuất hiện cơn nhịp nhanh bất thường lúc nghỉ ngơi.
            </div>
          </div>

          <div className="flex items-start gap-2 bg-white/80 p-2.5 rounded-2xl border border-emerald-100/60">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900">Tiến độ vận động:</strong> Số bước chân bình quân đạt 5.800 bước/ngày (tăng 12% so với tháng trước).
            </div>
          </div>

          <div className="p-2.5 bg-emerald-600 text-white rounded-2xl shadow-sm text-xs space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <span>Khuyến nghị tối ưu tuần tới:</span>
            </div>
            <p className="text-emerald-50 text-[11px] leading-relaxed">
              Bác nên tiếp tục duy trì bài tập đi bộ nhẹ sau 17:30 và bổ sung nước khoáng trước 20:00 để chất lượng giấc ngủ sâu tăng thêm 15%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
