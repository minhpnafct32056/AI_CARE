import React, { useState } from 'react';
import { 
  Search, ShieldCheck, MapPin, Phone, Star, 
  QrCode, Calendar, Pill, Building2, Filter, ChevronRight
} from 'lucide-react';
import { MedicalPartner } from '../types';

interface TabPartnersProps {
  partners: MedicalPartner[];
  onOpenQr: (partner: MedicalPartner) => void;
  onOpenBooking: (partner: MedicalPartner) => void;
  seniorMode: boolean;
}

export const TabPartners: React.FC<TabPartnersProps> = ({
  partners,
  onOpenQr,
  onOpenBooking,
  seniorMode,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'hospital' | 'pharmacy' | 'clinic'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPartners = partners.filter((p) => {
    const matchType = filterType === 'all' || p.type === filterType;
    const matchQuery = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchType && matchQuery;
  });

  return (
    <div className="space-y-4 pb-6">
      {/* Search Header */}
      <div>
        <h1 className={`font-extrabold text-slate-900 ${seniorMode ? 'text-2xl' : 'text-xl'}`}>
          Đối Tác Y Tế & Nhà Thuốc
        </h1>
        <p className="text-xs text-slate-500">Mạng lưới cơ sở y tế đạt chuẩn & xác minh phòng chống giả mạo</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm bệnh viện, nhà thuốc, chuyên khoa..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
        />
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl overflow-x-auto no-scrollbar">
        {[
          { id: 'all', label: 'Tất cả' },
          { id: 'hospital', label: 'Bệnh viện' },
          { id: 'pharmacy', label: 'Nhà thuốc' },
          { id: 'clinic', label: 'Phòng khám' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id as any)}
            className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-xl transition-all whitespace-nowrap min-h-[36px] ${
              filterType === tab.id
                ? 'bg-white text-emerald-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List of Verified Partners */}
      <div className="space-y-3">
        {filteredPartners.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-3xl border border-slate-100 p-4">
            <Building2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-500">Không tìm thấy cơ sở y tế phù hợp</p>
          </div>
        ) : (
          filteredPartners.map((partner) => {
            const isPharmacy = partner.type === 'pharmacy';
            return (
              <div 
                key={partner.id}
                className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:border-emerald-200 transition-all space-y-3"
              >
                {/* Partner Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className={`font-bold text-slate-900 ${seniorMode ? 'text-base' : 'text-sm'}`}>
                        {partner.name}
                      </h3>
                      {partner.verified && (
                        <div 
                          className="inline-flex items-center gap-0.5 text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                          title="Đơn vị đã được xác minh chứng chỉ Bộ Y Tế"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 fill-sky-600 text-white" />
                          <span>Đã xác minh</span>
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{partner.address}</span>
                      <strong className="text-emerald-600 font-bold ml-1 shrink-0">({partner.distance})</strong>
                    </p>
                  </div>

                  {/* Rating Badge */}
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-xl text-amber-800 text-xs font-bold shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{partner.rating}</span>
                  </div>
                </div>

                {/* Specialties tags */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {partner.specialties.map((spec, i) => (
                    <span 
                      key={i} 
                      className="text-[10px] font-medium bg-slate-50 text-slate-600 px-2 py-0.5 rounded-lg border border-slate-100"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Bottom Action Bar */}
                <div className="flex items-center gap-2 pt-1 border-t border-slate-50">
                  {/* QR Verify Button */}
                  <button
                    onClick={() => onOpenQr(partner)}
                    className="min-h-[40px] px-3 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-200 transition-colors"
                    title="Xem mã QR kiểm định phòng chống giả mạo"
                  >
                    <QrCode className="w-4 h-4 text-emerald-600" />
                    <span className="hidden sm:inline">Mã QR</span>
                    <span>Xác thực</span>
                  </button>

                  {/* Booking / Buy Medicine Button */}
                  <button
                    onClick={() => onOpenBooking(partner)}
                    className={`flex-1 min-h-[40px] px-3 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 text-white shadow-sm transition-all active:scale-95 ${
                      isPharmacy
                        ? 'bg-teal-600 hover:bg-teal-700'
                        : 'bg-emerald-600 hover:bg-emerald-700'
                    }`}
                  >
                    {isPharmacy ? <Pill className="w-3.5 h-3.5" /> : <Calendar className="w-3.5 h-3.5" />}
                    <span>{isPharmacy ? 'Mua thuốc chính hãng' : 'Đặt lịch khám ngay'}</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Trust Guarantee Box */}
      <div className="p-3.5 bg-sky-50/70 border border-sky-100 rounded-2xl flex items-center gap-3">
        <ShieldCheck className="w-6 h-6 text-sky-600 shrink-0" />
        <p className="text-[11px] text-sky-900 leading-relaxed">
          100% đối tác trên AI Care được cấp phép bởi Bộ Y Tế. Mọi giao dịch đặt lịch và đơn thuốc đều được mã hóa và bảo hiểm quyền lợi y khoa.
        </p>
      </div>
    </div>
  );
};
