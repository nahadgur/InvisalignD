
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Calendar, 
  CheckCircle, 
  Shield, 
  Sparkles, 
  Globe, 
  Medal, 
  Bolt, 
  Currency, 
  Menu, 
  X,
  Smile,
  Users,
  User,
  ArrowUpRight,
  Search,
  ChevronUp
} from './components/Icons';
import LeadFormModal from './components/LeadFormModal';

type View = 'home' | 'services' | 'location' | 'blog';

const BLOG_POSTS = [
  {
    id: 1,
    title: "Invisalign Cost 2024: A Complete UK Price Guide",
    excerpt: "Understand the investment required for a perfect smile. We break down the cost factors between Platinum and Diamond tier providers.",
    date: "March 15, 2024",
    category: "Pricing",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Invisalign vs Traditional Braces: Which is Better for You?",
    excerpt: "Comparing aesthetics, comfort, and clinical effectiveness. Discover why 90% of adults now choose clear aligners over metal tracks.",
    date: "March 10, 2024",
    category: "Patient Guide",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "The Science of ClinCheck: How Digital Planning Transforms Smiles",
    excerpt: "Explore the 3D software that allows you to see your final smile before you even start treatment. The power of digital orthodontics.",
    date: "March 02, 2024",
    category: "Technology",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "How to Clean Invisalign Aligners: Expert Maintenance Tips",
    excerpt: "Maintain crystal-clear aligners and fresh breath with these daily cleaning protocols recommended by leading Platinum providers.",
    date: "February 25, 2024",
    category: "Patient Guide",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1593054992451-2495393d6961?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Orthodontic Relapse: Why Invisalign is the Solution",
    excerpt: "Did your teeth move after childhood braces? Learn how Invisalign 'Lite' and 'Express' can quickly restore your alignment.",
    date: "February 18, 2024",
    category: "Specialist Info",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1461532257246-777de18cd58b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Eating with Invisalign: The 'Do's and Don'ts'",
    excerpt: "One of the best perks of clear aligners is zero dietary restrictions. Here is how to manage snacks and meals effectively.",
    date: "February 10, 2024",
    category: "Lifestyle",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop"
  }
];

const LOCATIONS: Record<string, string[]> = {
  "England": [
    "London", "Birmingham", "Manchester", "Leeds", "Liverpool", "Sheffield", "Bristol", 
    "Newcastle upon Tyne", "Nottingham", "Leicester", "Coventry", "Bradford", "Hull", 
    "Stoke-on-Trent", "Derby", "Southampton", "Portsmouth", "Plymouth", "Wolverhampton", "Reading",
    "Luton", "Milton Keynes", "Northampton", "Peterborough", "Swindon", "York", "Oxford", 
    "Cambridge", "Chelmsford", "Colchester", "Slough", "Blackpool", "Preston", "Bolton", 
    "Huddersfield", "Sunderland", "Middlesbrough", "Brighton", "Bournemouth", "Ipswich"
  ],
  "Scotland": [
    "Glasgow", "Edinburgh", "Aberdeen", "Dundee", "Inverness", "Perth", "Stirling", "Paisley", "Ayr", "Kilmarnock"
  ],
  "Wales": [
    "Cardiff", "Swansea", "Newport", "Wrexham", "Bangor", "Bridgend", "Llanelli", "Merthyr Tydfil", "Barry", "Caerphilly"
  ],
  "Northern Ireland": [
    "Belfast", "Derry (Londonderry)", "Lisburn", "Newtownabbey", "Bangor", "Craigavon", "Newry", "Carrickfergus", "Coleraine", "Antrim"
  ]
};

const SERVICES = [
  { id: 'crowded', title: 'Invisalign for Crowded Teeth', desc: 'Effectively straighten teeth that overlap or lack space. Crowded teeth can lead to plaque buildup and gum disease.', icon: <Users className="w-8 h-8" />, color: 'sky' },
  { id: 'gaps', title: 'Invisalign for Gaps', desc: 'Close noticeable spaces between your teeth quickly. Gaps can bring your smile together seamlessly.', icon: <Sparkles className="w-8 h-8" />, color: 'indigo' },
  { id: 'overbite', title: 'Invisalign for Overbite', desc: 'Correct deep bites where upper teeth overlap lower teeth significantly. Modern attachments handle complex movements.', icon: <Shield className="w-8 h-8" />, color: 'emerald' },
  { id: 'underbite', title: 'Invisalign for Underbite', desc: 'Address underbites to enhance facial profile and prevent wear. Invisalign is a gentle alternative to corrective surgery.', icon: <Medal className="w-8 h-8" />, color: 'amber' },
  { id: 'crossbite', title: 'Invisalign for Crossbite', desc: 'Fix crossbites to prevent jaw pain and tooth chipping. Clear aligners widen the arch for a balanced bite.', icon: <Globe className="w-8 h-8" />, color: 'rose' },
  { id: 'adults', title: 'Invisalign for Adults', desc: 'Professional, discreet aligners designed for busy lifestyles. Straighten your teeth without the traditional braces look.', icon: <User className="w-8 h-8" />, color: 'sky' }
];

const FAQS_HOME = [
  { q: "How does this service differ from a normal dentist?", a: "We are an independent referral network focusing on Platinum tier providers. We prioritize matching you with clinical experts who handle thousands of cases annually. This ensures you receive the highest standard of specialized care." },
  { q: "Is the $500 network credit really available?", a: "Yes, patients who book through our referral pipeline qualify for an exclusive $500 credit. This credit is applied directly toward your full Invisalign treatment plan with our partners. It is part of our commitment to making elite care accessible." },
  { q: "Is there a cost for the referral?", a: "Our referral facilitation service is completely free for patients. We help you find the perfect match and arrange your initial consultation at no charge. You only pay the clinic directly if you choose to proceed with treatment." }
];

const FAQS_SERVICES = [
  { q: "How long does treatment usually take?", a: "Treatment duration varies but most adult cases are completed within 6 to 18 months. Lite cases can often be resolved in as little as 3 months. Your specialist will provide a precise digital timeline during your scan." },
  { q: "Will Invisalign affect my speech?", a: "Most patients experience a slight lisp for the first few days as the tongue adjusts to the aligners. This typically disappears quickly as you get used to wearing them. The aligners are ultra-thin to minimize any impact on daily conversation." },
  { q: "Can I see my results before I start?", a: "Yes, we use advanced 3D ClinCheck software to map out your entire smile transformation. You will be able to view a digital animation of your teeth moving into their final position. This happens before you even order your first set of aligners." }
];

const FAQS_LOCATION = [
  { q: "How do you vet your local providers?", a: "We only partner with clinics that maintain Platinum or Diamond status from Invisalign. This signifies they have achieved the highest level of experience and successful case volume. We also monitor patient reviews to ensure consistently high service standards." },
  { q: "Are the clinics easily accessible?", a: "Our network specifically targets major city centers and high-value towns for maximum convenience. Most partners offer flexible evening or weekend appointments to fit your schedule. We prioritize locations with excellent transport links and modern facilities." },
  { q: "What if there isn't a provider in my exact town?", a: "If your specific town is not listed, we will match you with the nearest elite hub. Platinum providers are worth the short travel as they offer superior technology and clinical outcomes. We ensure the travel time is minimized for your convenience." }
];

const CountUp: React.FC<{ end: number; suffix?: string; decimals?: number }> = ({ end, suffix = "", decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(start);
          }
        }, 16);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={elementRef}>{count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>;
};

const FAQSection: React.FC<{ faqs: { q: string, a: string }[], activeFaq: number | null, setActiveFaq: (n: number | null) => void }> = ({ faqs, activeFaq, setActiveFaq }) => (
  <section className="py-24 bg-slate-950">
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Frequently Asked Questions</h2>
        <p className="text-slate-400 font-medium">Clear answers for your clear aligner journey.</p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div 
            key={idx} 
            className={`faq-item dark-card rounded-3xl border border-white/5 cursor-default group ${activeFaq === idx ? 'active bg-slate-800/80 border-sky-500/30 shadow-sky-500/5' : 'hover:border-sky-500/20 shadow-xl'}`}
            onMouseEnter={() => setActiveFaq(idx)}
            onMouseLeave={() => setActiveFaq(null)}
          >
            <div className="p-6 flex items-center justify-between">
              <h3 className={`text-lg font-bold transition-colors duration-300 ${activeFaq === idx ? 'text-sky-400' : 'text-white'}`}>{faq.q}</h3>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${activeFaq === idx ? 'rotate-180 bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'bg-sky-500/10 text-sky-400'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
              </div>
            </div>
            <div className="faq-answer px-6 pb-6"><p className="text-slate-400 font-medium leading-relaxed">{faq.a}</p></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentView, setCurrentView] = useState<View>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [blogSearchQuery, setBlogSearchQuery] = useState('');
  const [blogPage, setBlogPage] = useState(1);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const postsPerPage = 3;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollPos > 50);
      setShowScrollTop(scrollPos / height > 0.3);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (view: View) => {
    setCurrentView(view);
    setSelectedCity(null);
    setIsMobileMenuOpen(false);
    setBlogSearchQuery('');
    setBlogPage(1);
    setActiveFaq(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const handleCityClick = (city: string) => { setSelectedCity(city); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const filteredLocations = useMemo(() => {
    if (!searchQuery) return LOCATIONS;
    const result: Record<string, string[]> = {};
    Object.entries(LOCATIONS).forEach(([region, cities]) => {
      const filtered = cities.filter(city => city.toLowerCase().includes(searchQuery.toLowerCase()));
      if (filtered.length > 0) result[region] = filtered;
    });
    return result;
  }, [searchQuery]);

  const filteredPosts = useMemo(() => {
    if (!blogSearchQuery) return BLOG_POSTS;
    return BLOG_POSTS.filter(post => 
      post.title.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(blogSearchQuery.toLowerCase())
    );
  }, [blogSearchQuery]);

  const paginatedPosts = useMemo(() => {
    const start = (blogPage - 1) * postsPerPage;
    return filteredPosts.slice(start, start + postsPerPage);
  }, [filteredPosts, blogPage]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const renderBlogView = () => (
    <div className="pt-32 pb-24 px-4 min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-7xl font-black text-white leading-tight tracking-tight">Invisalign <span className="text-sky-400 italic">Insights</span></h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">Expert clinical advice, pricing updates, and patient success stories.</p>
          <div className="max-w-xl mx-auto relative pt-8">
            <input 
              type="text" placeholder="Search articles by topic..." value={blogSearchQuery}
              onChange={(e) => { setBlogSearchQuery(e.target.value); setBlogPage(1); }}
              className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-sky-500 outline-none transition-all pl-14 shadow-2xl"
            />
            <Search className="absolute left-5 top-[60px] text-slate-500 w-6 h-6" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {paginatedPosts.map((post, idx) => (
            <div key={post.id} className="group dark-card rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col hover:border-sky-500/30 transition-all duration-500 shadow-2xl">
              <div className="relative h-56 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-sky-500/90 backdrop-blur-md text-white text-[10px] font-black uppercase rounded-full">{post.category}</div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h2 className="text-2xl font-black text-white mb-4 group-hover:text-sky-400 transition-colors">{post.title}</h2>
                <p className="text-slate-400 font-medium mb-8 flex-1">{post.excerpt}</p>
                <button className="flex items-center gap-2 text-sky-400 font-black uppercase tracking-widest text-[10px]">Read Article <ArrowUpRight className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderServicesView = () => (
    <div className="pt-32 pb-24 min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 space-y-16">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-7xl font-black text-white leading-tight">Elite Invisalign <span className="text-sky-400 italic">Treatments</span></h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">Customized clear aligner solutions for every clinical challenge, from complex bite issues to lifestyle-focused adult treatment.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div key={service.id} className="group dark-card p-10 rounded-[2.5rem] border border-white/5 hover:border-sky-500/30 transition-all flex flex-col shadow-xl">
              <div className={`mb-6 p-4 rounded-2xl bg-${service.color}-500/10 text-${service.color}-400 inline-flex self-start`}>{service.icon}</div>
              <h2 className="text-2xl font-black text-white mb-4 group-hover:text-sky-400 transition-colors">{service.title}</h2>
              <p className="text-slate-400 font-medium mb-8 flex-1">{service.desc}</p>
              <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 text-sky-400 font-black uppercase tracking-widest text-[10px]">Inquire for Referral <ArrowUpRight className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      </div>
      <FAQSection faqs={FAQS_SERVICES} activeFaq={activeFaq} setActiveFaq={setActiveFaq} />
    </div>
  );

  const renderLocationView = () => (
    <div className="pt-32 pb-24 min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-7xl font-black text-white leading-tight tracking-tight">
            Find Your Local <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Platinum Provider</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            {selectedCity ? `Elite Invisalign Specialists in ${selectedCity} are ready to transform your smile.` : "Access the UK's most exclusive network of clear aligner experts. Vetted for quality, verified for results."}
          </p>
          <div className="max-w-xl mx-auto relative mt-8 flex items-center">
            <Globe className="absolute left-6 text-slate-500 w-6 h-6 z-10" />
            <input 
              type="text" placeholder="Search your city or town..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-5 pl-16 text-white focus:border-sky-500 outline-none transition-all shadow-2xl"
            />
          </div>
        </div>
        {selectedCity && (
          <div className="dark-card p-8 md:p-12 rounded-[2.5rem] border border-sky-500/20 bg-sky-500/5 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-bold text-white">Start your journey in {selectedCity}</h2>
              <p className="text-slate-400 max-w-xl font-medium">Top-tier providers in the area are currently accepting new patients with the $500 credit.</p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="px-10 py-5 bg-sky-500 text-white font-black rounded-full shadow-2xl hover:scale-105 transition-all">Book {selectedCity} Consultation</button>
          </div>
        )}
        
        {/* Compact Locations Grid */}
        <div className="flex flex-col gap-16 pt-8">
          {Object.entries(filteredLocations).map(([region, cities]) => (
            <div key={region} className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-sky-500 rounded-full shadow-lg shadow-sky-500/20"></div>
                <h2 className="text-2xl font-black text-white tracking-tight uppercase">{region}</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {cities.map(city => (
                  <button 
                    key={city} 
                    onClick={() => handleCityClick(city)} 
                    className={`text-left px-4 py-3.5 rounded-2xl border transition-all font-bold text-xs flex items-center justify-between group ${selectedCity === city ? 'bg-sky-500/20 border-sky-500 text-sky-400 shadow-lg shadow-sky-500/5' : 'bg-slate-900/40 border-white/5 text-slate-400 hover:border-sky-500/30 hover:text-white hover:bg-slate-800/40'}`}
                  >
                    <span>{city}</span>
                    <ArrowUpRight className={`w-3 h-3 transition-transform ${selectedCity === city ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}`} />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <FAQSection faqs={FAQS_LOCATION} activeFaq={activeFaq} setActiveFaq={setActiveFaq} />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <button onClick={scrollToTop} className={`fixed bottom-6 left-6 z-[70] w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 text-slate-400 rounded-full flex items-center justify-center transition-all duration-500 ${showScrollTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}><ChevronUp className="w-6 h-6" /></button>
      
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled || currentView !== 'home' ? 'glass-effect py-3 shadow-xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigateTo('home')}>
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-white font-black">ID</div>
            <span className="text-2xl font-black text-white">Invisalign Dentists</span>
          </div>
          <div className="hidden md:flex items-center space-x-10 text-sm font-semibold">
            <button onClick={() => navigateTo('services')} className={currentView === 'services' ? 'text-sky-400' : 'hover:text-sky-400'}>Services</button>
            <button onClick={() => navigateTo('location')} className={currentView === 'location' ? 'text-sky-400' : 'hover:text-sky-400'}>Location</button>
            <button onClick={() => navigateTo('blog')} className={currentView === 'blog' ? 'text-sky-400' : 'hover:text-sky-400'}>Blog</button>
            <button onClick={() => setIsModalOpen(true)} className="px-7 py-2.5 bg-sky-500 text-white rounded-full font-bold shadow-lg shadow-sky-500/20">Find a Provider</button>
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 bg-white/5 rounded-xl"><Menu className="w-6 h-6" /></button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[60] bg-slate-950/40 backdrop-blur-sm transition-opacity duration-500 md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}>
        <div className={`absolute top-0 right-0 h-full w-[65%] bg-slate-900 border-l border-white/5 p-6 pt-20 flex flex-col space-y-4 transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <button onClick={() => navigateTo('home')} className="text-left px-4 py-3 font-bold">Home</button>
          <button onClick={() => navigateTo('services')} className="text-left px-4 py-3 font-bold">Services</button>
          <button onClick={() => navigateTo('location')} className="text-left px-4 py-3 font-bold">Location</button>
          <button onClick={() => navigateTo('blog')} className="text-left px-4 py-3 font-bold">Blog</button>
        </div>
      </div>

      {currentView === 'home' && (
        <>
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 px-4">
            <div className="absolute inset-0 z-0">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2400&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 animate-slow-zoom" alt="Smile" />
              <div className="absolute inset-0 bg-slate-950/70"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950"></div>
            </div>
            <div className="max-w-5xl mx-auto relative z-10 text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-bold"><Sparkles className="w-4 h-4" /><span>Premium Invisalign Facilitator</span></div>
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white leading-tight">The Network for <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-sky-400 animate-gradient">Elite Results.</span></h1>
              <p className="text-lg lg:text-2xl text-slate-300 max-w-3xl mx-auto font-medium">Connecting discerning patients with the top 1% of Platinum Invisalign providers for verified orthodontic results.</p>
              <button onClick={() => setIsModalOpen(true)} className="pulse-glow px-12 py-6 bg-sky-500 text-white text-xl font-bold rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all">Find My Specialist</button>
            </div>
          </section>
          <div className="bg-slate-900 border-y border-white/5 py-12"><div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">{[{val:350,suffix:'+',label:'Verified Partners'},{val:12,suffix:'k+',label:'Matches'},{val:4.95,suffix:'',decimals:2,label:'Rating'},{val:0,suffix:'Free',label:'Service',special:true}].map((s,i)=>(<div key={i}><p className="text-3xl font-black text-white">{s.special?'FREE':<CountUp end={s.val} suffix={s.suffix} decimals={s.decimals||0}/>}</p><p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{s.label}</p></div>))}</div></div>
          <section className="py-24 bg-slate-950">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-20 space-y-6"><h2 className="text-4xl md:text-5xl font-black text-white">How We Advocate For You</h2><p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">We ensure you are matched with the provider best suited for your specific clinical