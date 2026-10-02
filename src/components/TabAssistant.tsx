import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Bot, User, Sparkles, AlertCircle, Clock, 
  Utensils, Dumbbell, Pill, Check, ChevronRight, RefreshCw
} from 'lucide-react';
import { ChatMessage, ChatCardContent } from '../types';
import { QUICK_PROMPTS } from '../data/mockData';

interface TabAssistantProps {
  messages: ChatMessage[];
  onSendMessage: (text: string, card?: ChatCardContent) => void;
  seniorMode: boolean;
  onAddScheduleItem?: (title: string, category: 'medication' | 'exercise') => void;
}

export const TabAssistant: React.FC<TabAssistantProps> = ({
  messages,
  onSendMessage,
  seniorMode,
  onAddScheduleItem,
}) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    // Send user message
    onSendMessage(text);
    if (!textToSend) setInputText('');

    // Simulate smart AI Doctor Assistant response
    setIsTyping(true);
    setTimeout(() => {
      let aiReplyText = '';
      let cardData: ChatCardContent | undefined = undefined;

      const lower = text.toLowerCase();

      if (lower.includes('dạ dày') || lower.includes('thực đơn') || lower.includes('giảm cân')) {
        aiReplyText = 'Dạ, người có tiền sử đau dạ dày khi muốn kiểm soát cân nặng cần ưu tiên thực phẩm dễ tiêu, giảm độ axit nhưng vẫn đủ vi chất. AI Care đã lập thẻ thực đơn gợi ý riêng cho bác:';
        cardData = {
          type: 'diet',
          title: 'Thực Đơn Giảm Cân Thân Thiện Dạ Dày',
          calories: '~1.450 kcal/ngày',
          items: [
            'Bữa sáng: Yến mạch nấu sữa hạt hạnh nhân ấm + 1 quả chuối chín nhẹ',
            'Bữa trưa: Cơm gạo lứt mềm + 150g ức gà hấp gừng + canh bí đao luộc',
            'Bữa phụ: 1 hộp sữa chua men sống không đường + 1 thìa hạt chia',
            'Bữa tối: Cá hồi áp chảo + súp khoai tây nghiền (ăn trước 19h)',
          ],
          tips: 'Tránh ăn quá no, nhai kỹ ít nhất 20 lần trước khi nuốt và không ăn đồ chua, cay, chiên rán ngập dầu.',
        };
      } else if (lower.includes('giãn cơ') || lower.includes('bài tập') || lower.includes('văn phòng') || lower.includes('mỏi')) {
        aiReplyText = 'Tuyệt vời ạ! Việc giãn cơ nhẹ nhàng giúp cải thiện tuần hoàn máu, giảm áp lực đốt sống cổ và thư giãn khớp gối:';
        cardData = {
          type: 'exercise',
          title: 'Chuỗi Giãn Cơ Nhẹ Nhàng 7 Phút',
          duration: '3 động tác · 7 phút',
          items: [
            'Động tác 1: Xoay cổ và kéo căng cơ thang 2 bên (giữ mỗi bên 20 giây)',
            'Động tác 2: Đan tay sau lưng ưỡn ngực, hít sâu thở chậm (5 lần)',
            'Động tác 3: Nhón gót chân và xoay khớp cổ chân giúp máu về tim tốt hơn (15 nhịp)',
          ],
          tips: 'Thực hiện động tác từ tốn, không giật mạnh. Nếu thấy chóng mặt hãy ngồi nghỉ ngay.',
        };
      } else if (lower.includes('uống thuốc') || lower.includes('nhắc lịch') || lower.includes('thuốc')) {
        aiReplyText = 'Dạ bác! AI Care đã đối chiếu đơn thuốc hiện tại của bác và tạo thẻ lịch nhắc tự động:';
        cardData = {
          type: 'medication',
          title: 'Lịch Uống Thuốc Huyết Áp & Tiêu Hóa',
          dosage: '2 cữ trong ngày',
          items: [
            '07:00 Sáng: Amlodipine 5mg (1 viên) sau ăn sáng',
            '12:30 Trưa: Men vi sinh Bio-Flora (1 gói) hòa nước nguội',
            'Chuông báo sẽ tự động rung trên ứng dụng trước 10 phút',
          ],
          tips: 'Bác hãy chuẩn bị sẵn nước lọc ấm và không uống thuốc cùng nước trà/sữa.',
        };
      } else if (lower.includes('ngủ') || lower.includes('căng thẳng') || lower.includes('mất ngủ')) {
        aiReplyText = 'Để có giấc ngủ sâu và nhịp tim ổn định vào ban đêm, bác có thể áp dụng 4 nguyên tắc sau:';
        cardData = {
          type: 'general',
          title: 'Phương Pháp Vệ Sinh Giấc Ngủ Sâu',
          items: [
            '1. Ngâm chân nước ấm (khoảng 40°C) với chút muối gừng trước khi ngủ 30 phút.',
            '2. Ngừng dùng điện thoại/tivi trước giờ ngủ 45 phút để mắt thư giãn.',
            '3. Hít thở theo nhịp 4-7-8 (hít 4 giây, nín thở 7 giây, thở ra từ từ 8 giây).',
            '4. Giữ phòng ngủ thoáng mát, nhiệt độ lý tưởng khoảng 24-26°C.',
          ],
          tips: 'Nếu khó ngủ sau 20 phút nằm, hãy ngồi dậy đọc sách tĩnh tâm thay vì trằn trọc.',
        };
      } else {
        aiReplyText = `AI Care đã ghi nhận câu hỏi của bác: "${text}". Dựa trên hồ sơ sức khỏe và nhịp tim 82 bpm hiện tại, chỉ số của bác rất an toàn. Bác chú ý duy trì chế độ sinh hoạt đều đặn, uống đủ nước và nếu có triệu chứng khác lạ hãy đi khám ngay nhé ạ!`;
      }

      onSendMessage(aiReplyText, cardData);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="flex flex-col h-[520px]">
      {/* FIXED MEDICAL DISCLAIMER BANNER */}
      <div className="bg-amber-50/90 border-b border-amber-200/80 px-3.5 py-2 flex items-center gap-2 text-amber-900 shrink-0">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
        <span className="text-[11px] leading-snug font-medium">
          <strong>Cảnh báo y tế:</strong> AI chỉ mang tính chất tham khảo, không thay thế chẩn đoán hay chỉ định của bác sĩ.
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3.5 no-scrollbar">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white shadow-sm ${
                  isUser ? 'bg-sky-600' : 'bg-emerald-600'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble & Content */}
              <div className={`max-w-[85%] space-y-2 ${isUser ? 'text-right' : 'text-left'}`}>
                <div
                  className={`inline-block px-3.5 py-2.5 rounded-2xl shadow-sm text-xs leading-relaxed ${
                    seniorMode ? 'text-sm' : ''
                  } ${
                    isUser
                      ? 'bg-sky-600 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {/* RICH CARD ATTACHMENT */}
                {msg.card && (
                  <div className="bg-white rounded-2xl border border-emerald-100 p-3.5 shadow-sm text-left space-y-2.5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-2">
                        {msg.card.type === 'diet' && <Utensils className="w-4 h-4 text-emerald-600" />}
                        {msg.card.type === 'exercise' && <Dumbbell className="w-4 h-4 text-sky-600" />}
                        {msg.card.type === 'medication' && <Pill className="w-4 h-4 text-amber-600" />}
                        {msg.card.type === 'general' && <Sparkles className="w-4 h-4 text-purple-600" />}
                        <h4 className="text-xs font-bold text-slate-900">{msg.card.title}</h4>
                      </div>
                      {(msg.card.calories || msg.card.duration || msg.card.dosage) && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {msg.card.calories || msg.card.duration || msg.card.dosage}
                        </span>
                      )}
                    </div>

                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {msg.card.items.map((it, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>

                    {msg.card.tips && (
                      <div className="p-2 bg-slate-50 rounded-xl text-[11px] text-slate-600 border border-slate-100">
                        <strong className="text-slate-800">Lưu ý an toàn:</strong> {msg.card.tips}
                      </div>
                    )}

                    {/* Action buttons inside card */}
                    {msg.card.type === 'medication' && (
                      <button 
                        onClick={() => {
                          onAddScheduleItem?.('Uống Amlodipine 5mg (Đã cập nhật)', 'medication');
                          alert('Đã cập nhật lịch uống thuốc vào Trang chủ!');
                        }}
                        className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Lưu vào Lịch trình hôm nay</span>
                      </button>
                    )}

                    {msg.card.type === 'exercise' && (
                      <button 
                        onClick={() => alert('Bắt đầu hẹn giờ 7 phút giãn cơ! Hãy hít thở đều nhé bác An.')}
                        className="w-full py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Dumbbell className="w-3.5 h-3.5" />
                        <span>Bắt đầu bài tập ngay</span>
                      </button>
                    )}
                  </div>
                )}

                <div className="text-[10px] text-slate-400 px-1">{msg.timestamp}</div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs py-1">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white px-3 py-2 rounded-2xl border border-slate-100 text-slate-500 flex items-center gap-1.5">
              <span>AI Care đang soạn câu trả lời y tế</span>
              <span className="inline-flex gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce delay-200"></span>
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* QUICK PROMPT CHIPS */}
      <div className="px-3 py-2 bg-slate-50/90 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <span className="text-[11px] text-slate-400 font-semibold whitespace-nowrap pl-1">Gợi ý:</span>
        {QUICK_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="text-xs font-medium text-slate-700 bg-white hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 hover:border-emerald-300 px-3 py-1.5 rounded-full transition-all whitespace-nowrap shrink-0 shadow-2xs active:scale-95"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <div className="p-3 bg-white border-t border-slate-100">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Hỏi AI Care về triệu chứng, thực đơn, bài tập..."
            className={`flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              seniorMode ? 'text-sm py-3' : ''
            }`}
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-11 h-11 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-md transition-all active:scale-95"
            aria-label="Gửi tin nhắn"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
