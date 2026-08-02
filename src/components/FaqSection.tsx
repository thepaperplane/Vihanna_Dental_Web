import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  ThumbsUp, 
  ThumbsDown, 
  Sparkles, 
  PhoneCall, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export interface FaqItem {
  id: string;
  category: 'implants' | 'invisalign' | 'pricing' | 'general';
  question: string;
  answer: string;
  tags: string[];
}

const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'general',
    question: 'Is Root Canal Treatment (RCT) painful at Vihana Dental Care?',
    answer: 'Not at all! At Vihana Dental Care in Kalapatti, Coimbatore, our root canal treatments are performed under local anesthesia using high-magnification dental microscopes and diode laser sterilization. This ensures a 100% comfortable, painless single-sitting procedure with rapid healing.',
    tags: ['Root Canal', 'Painless Dentistry', 'Laser RCT', 'Microscope']
  },
  {
    id: 'faq-2',
    category: 'invisalign',
    question: 'How much do Invisalign Clear Aligners cost in Coimbatore & how long does treatment take?',
    answer: 'Invisalign and custom clear aligners typically range between ₹45,000 and ₹1,50,000 depending on the complexity of teeth alignment. Using our iTero 3D intraoral digital scanner, Dr. N. Sanchana MDS provides a precise 3D simulation preview of your transformed smile before treatment starts. Average treatment duration is 6 to 14 months.',
    tags: ['Invisalign', 'Clear Aligners', 'Braces', 'Cost', 'Duration']
  },
  {
    id: 'faq-3',
    category: 'implants',
    question: 'Why choose Swiss Titanium Dental Implants over traditional bridges?',
    answer: 'Swiss titanium dental implants are computer-guided permanent replacements that fuse directly with your jawbone. Unlike dental bridges, implants do not require grinding down adjacent healthy teeth, prevent jawbone resorption, restore 100% natural chewing strength, and come with a lifetime warranty options.',
    tags: ['Dental Implants', 'Swiss Titanium', 'Bridges', 'Jawbone']
  },
  {
    id: 'faq-4',
    category: 'pricing',
    question: 'Do you offer emergency dental appointments for sudden toothache or trauma?',
    answer: 'Yes! Vihana Dental Care offers same-day emergency appointments for severe toothaches, chipped teeth, swelling, or wisdom tooth pain. You can call +91 98943 17823 or message us directly on WhatsApp for immediate priority triage.',
    tags: ['Emergency', 'Toothache', 'Same-Day Appointment', 'Kalapatti']
  },
  {
    id: 'faq-5',
    category: 'general',
    question: 'How do I prepare my child for their first dental visit?',
    answer: 'Our clinic uses a "Tell-Show-Do" friendly approach tailored for children. We recommend scheduling an appointment in the morning when your child is well-rested. Avoid using words like "shot" or "pain". Our child-friendly pediatric dentists make checkups fun, offering fluoride varnish protective shields and cavity sealants.',
    tags: ['Pediatric', 'Kids Dentist', 'Cavity Shield', 'First Visit']
  },
  {
    id: 'faq-6',
    category: 'pricing',
    question: 'Are flexible 0% interest EMI payment options available for major treatments?',
    answer: 'Yes! We support easy 0% interest EMI payment plans for Invisalign clear aligners, full mouth dental implants, and cosmetic smile makeovers. We accept all major credit/debit cards, UPI, Google Pay, and health insurance claim documentation.',
    tags: ['EMI', '0% Interest', 'Payment Options', 'Insurance']
  },
  {
    id: 'faq-7',
    category: 'general',
    question: 'How frequently should I get ultrasonic teeth cleaning and polishing?',
    answer: 'We recommend professional ultrasonic scaling and polishing every 6 months to remove tartar buildup, eliminate bad breath (halitosis), prevent gum disease (gingivitis), and maintain bright, healthy enamel.',
    tags: ['Teeth Cleaning', 'Scaling', 'Polishing', 'Gum Health']
  },
  {
    id: 'faq-8',
    category: 'pricing',
    question: 'Where is Vihana Dental Care located and what are the clinic working hours?',
    answer: 'We are located at No 77, Post Office Street, Kalapatti, Coimbatore (641048). Working hours are Monday to Saturday from 9:00 AM to 8:30 PM, and Sunday from 10:00 AM to 2:00 PM. Ample car & two-wheeler parking is available on-site.',
    tags: ['Location', 'Kalapatti', 'Clinic Hours', 'Coimbatore']
  }
];

interface FaqSectionProps {
  onOpenBooking: () => void;
  onOpenAiAssistant?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenBooking, onOpenAiAssistant }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [feedbackState, setFeedbackState] = useState<Record<string, 'up' | 'down'>>({});

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'implants', label: 'Implants & RCT' },
    { id: 'invisalign', label: 'Invisalign & Braces' },
    { id: 'pricing', label: 'Pricing & Emergency' },
    { id: 'general', label: 'General Care' },
  ];

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handleFeedback = (id: string, type: 'up' | 'down') => {
    setFeedbackState(prev => ({ ...prev, [id]: type }));
  };

  return (
    <section 
      id="faq-section" 
      className="py-16 bg-slate-900 text-white relative overflow-hidden"
    >
      {/* Background Decorative Gradients */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <HelpCircle className="w-4 h-4 text-teal-400" />
            <span>Patient Knowledge Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Get clear, expert answers about painless dental procedures, Invisalign clear aligner costs, Swiss titanium implants, and emergency care at Vihana Dental Care, Kalapatti.
          </p>
        </motion.div>

        {/* Search & Category Filter Bar */}
        <motion.div 
          className="max-w-4xl mx-auto mb-10 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Search Box */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search questions by topic (e.g., 'Root Canal', 'Invisalign cost', 'Painless')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700/80 focus:border-teal-400 text-white placeholder-slate-400 pl-12 pr-4 py-3.5 rounded-2xl text-sm outline-none transition-all shadow-inner"
              id="faq-search-input"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 px-2.5 py-1 rounded-md"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
                    : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/50'
                }`}
                id={`faq-tab-${cat.id}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl mx-auto space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-slate-800/40 rounded-2xl border border-slate-800 p-6">
              <HelpCircle className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-200 mb-1">No matching questions found</h3>
              <p className="text-slate-400 text-sm mb-4">
                Try adjusting your search terms or contact Dr. N. Sanchana directly.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="text-xs text-teal-400 font-semibold underline underline-offset-4 hover:text-teal-300"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openFaqId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-slate-800/60 border border-slate-700/60 rounded-2xl overflow-hidden backdrop-blur-xs transition-colors hover:border-slate-600/80"
                  id={`faq-item-${faq.id}`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left px-6 py-4.5 flex items-start justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-slate-100 text-base sm:text-lg flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0 mt-2" />
                      {faq.question}
                    </span>
                    <div className={`p-1.5 rounded-lg bg-slate-700/50 text-slate-300 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-teal-500/20 text-teal-300' : ''}`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-5 pt-1 border-t border-slate-700/40 text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
                          <p>{faq.answer}</p>

                          {/* Tags & Helpful Rating */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-700/30 text-xs">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {faq.tags.map((tag) => (
                                <span key={tag} className="px-2.5 py-0.5 rounded-full bg-slate-700/50 text-slate-400 font-medium">
                                  #{tag}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center gap-2 text-slate-400">
                              <span>Was this helpful?</span>
                              <button
                                onClick={() => handleFeedback(faq.id, 'up')}
                                className={`p-1 rounded hover:bg-slate-700 transition-colors ${feedbackState[faq.id] === 'up' ? 'text-teal-400 font-bold' : ''}`}
                                title="Yes"
                              >
                                <ThumbsUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleFeedback(faq.id, 'down')}
                                className={`p-1 rounded hover:bg-slate-700 transition-colors ${feedbackState[faq.id] === 'down' ? 'text-rose-400 font-bold' : ''}`}
                                title="No"
                              >
                                <ThumbsDown className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Bottom Callout Box */}
        <motion.div 
          className="mt-12 max-w-4xl mx-auto bg-gradient-to-r from-teal-900/60 to-slate-800/80 border border-teal-500/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-300 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>Still Have Questions?</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Speak directly with Dr. N. Sanchana MDS
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              Get a personalized treatment roadmap or instant AI dental triage before visiting our clinic in Kalapatti, Coimbatore.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href={`tel:${CLINIC_INFO.phone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all"
              id="faq-call-button"
            >
              <PhoneCall className="w-4 h-4 text-teal-400" />
              <span>Call +91 98943 17823</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-teal-500/20 transition-all"
              id="faq-book-button"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
