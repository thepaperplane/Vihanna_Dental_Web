import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PhoneCall, 
  MessageCircle, 
  Calendar, 
  X, 
  Zap, 
  ChevronUp,
  Clock,
  Sparkles
} from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface FloatingQuickActionsProps {
  onOpenBooking: () => void;
  onOpenWhatsAppBot?: () => void;
}

export const FloatingQuickActions: React.FC<FloatingQuickActionsProps> = ({
  onOpenBooking,
  onOpenWhatsAppBot,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${CLINIC_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20Vihana%20Dental%20Care,%20I%20would%20like%20to%20book%20an%20appointment%20or%20inquire%20about%20services.`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      <div className="pointer-events-auto flex flex-col items-end gap-3">
        {/* Expanded Quick Action Items */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="flex flex-col items-end gap-2.5 mb-1"
            >
              {/* Action 1: Book Appointment */}
              <motion.button
                onClick={() => {
                  onOpenBooking();
                  setIsOpen(false);
                }}
                whileHover={{ scale: 1.05, x: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 bg-teal-700 hover:bg-teal-800 text-white px-4 py-3 rounded-2xl shadow-xl border border-teal-600/40 text-sm font-bold min-h-[44px] transition-all group"
                id="floating-action-book"
              >
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-semibold text-teal-100 group-hover:bg-white/30">
                  Instant
                </span>
                <span>Book Appointment</span>
                <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
              </motion.button>

              {/* Action 2: WhatsApp Chat */}
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-2xl shadow-xl border border-emerald-500/40 text-sm font-bold min-h-[44px] transition-all group"
                id="floating-action-whatsapp"
              >
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-semibold text-emerald-100 group-hover:bg-white/30">
                  24/7 Chat
                </span>
                <span>WhatsApp Us</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
              </motion.a>

              {/* Action 3: Call Now */}
              <motion.a
                href={`tel:${CLINIC_INFO.phone}`}
                whileHover={{ scale: 1.05, x: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700/60 text-sm font-bold min-h-[44px] transition-all group"
                id="floating-action-call"
              >
                <span className="bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full text-xs font-semibold">
                  Emergency
                </span>
                <span>Call {CLINIC_INFO.phone}</span>
                <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-teal-400">
                  <PhoneCall className="w-4 h-4" />
                </div>
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          className={`relative flex items-center gap-2.5 px-4 py-3.5 rounded-full shadow-2xl transition-all duration-300 border min-h-[52px] ${
            isOpen
              ? 'bg-slate-900 text-white border-slate-700'
              : 'bg-gradient-to-r from-teal-700 to-teal-800 text-white border-teal-500/40 shadow-teal-700/30'
          }`}
          aria-label="Quick Action Floating Menu"
          id="floating-quick-menu-trigger"
        >
          {/* Status Dot */}
          {!isOpen && (
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
            </span>
          )}

          <div className="flex items-center gap-2 font-bold text-sm tracking-tight">
            {isOpen ? (
              <>
                <X className="w-5 h-5 text-slate-300" />
                <span>Close</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 text-teal-300 fill-teal-300" />
                <span className="hidden sm:inline">Quick Contact</span>
                <ChevronUp className="w-4 h-4 text-teal-200" />
              </>
            )}
          </div>
        </motion.button>
      </div>
    </div>
  );
};
