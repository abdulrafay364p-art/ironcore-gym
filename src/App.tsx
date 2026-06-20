import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, Users, Heart, Calendar, MapPin, Phone, Mail, 
  Instagram, Facebook, Twitter, ArrowRight, Clock, Award, 
  Zap, Target, Trophy 
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const IronCoreFitness = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#membership', label: 'Membership' },
    { href: '#equipment', label: 'Equipment' },
    { href: '#trainers', label: 'Trainers' },
    { href: '#schedule', label: 'Schedule' },
    { href: '#transformations', label: 'Results' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' },
  ];

  const services = [
    {
      icon: <Dumbbell className="w-8 h-8" />,
      title: "Strength Training",
      desc: "Build raw power with our comprehensive strength programs using free weights and machines.",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Personal Training",
      desc: "1-on-1 coaching with certified trainers to achieve your specific fitness goals.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Cardio & HIIT",
      desc: "High intensity interval training and state-of-the-art cardio equipment.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Weight Training",
      desc: "Progressive overload programs tailored for muscle growth and definition.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Specialized Programs",
      desc: "Olympic lifting, functional training, mobility, and competition prep.",
      color: "from-amber-500 to-yellow-500"
    }
  ];

  const membershipPlans = [
    {
      id: "basic",
      name: "IRON",
      price: 49,
      period: "month",
      features: [
        "24/7 Gym Access",
        "All Cardio Equipment",
        "Free Weight Area",
        "Group Fitness Classes",
        "Locker Access",
        "Mobile App"
      ],
      popular: false,
      color: "border-zinc-700 hover:border-zinc-500"
    },
    {
      id: "premium",
      name: "STEEL",
      price: 89,
      period: "month",
      features: [
        "Everything in IRON",
        "Unlimited Group Classes",
        "Personal Training (2/mo)",
        "Sauna & Recovery Lounge",
        "Nutrition Consultation",
        "Guest Passes (2/mo)"
      ],
      popular: true,
      color: "border-red-500 shadow-2xl shadow-red-500/20"
    },
    {
      id: "elite",
      name: "FORGE",
      price: 149,
      period: "month",
      features: [
        "Everything in STEEL",
        "Unlimited Personal Training",
        "Priority Class Booking",
        "Body Composition Scans",
        "Private Coaching Sessions",
        "VIP Recovery Suite",
        "Supplement Discounts"
      ],
      popular: false,
      color: "border-zinc-700 hover:border-zinc-500"
    }
  ];

  const trainers = [
    {
      name: "Marcus Rivera",
      role: "Head Strength Coach",
      bio: "Former Olympic weightlifter. 12+ years transforming athletes.",
      image: "/images/trainer-male.jpg",
      specialties: ["Powerlifting", "Olympic Lifting"]
    },
    {
      name: "Alex Rivera",
      role: "Performance Coach",
      bio: "NASM Master Trainer. Specializes in HIIT and athletic performance.",
      image: "/images/trainer-male2.jpg",
      specialties: ["HIIT", "Athletic Performance"]
    },
    {
      name: "Derek Kane",
      role: "Combat & Conditioning",
      bio: "Ex-Marine. Builds unbreakable mental and physical toughness.",
      image: "/images/deadlift.jpg",
      specialties: ["MMA", "Functional Training"]
    },
    {
      name: "Jordan Hale",
      role: "Nutrition & Mobility",
      bio: "Sports nutritionist and mobility specialist. Helps athletes recover faster.",
      image: "/images/trainer-male3.jpg",
      specialties: ["Mobility", "Nutrition"]
    }
  ];

  const scheduleData = [
    { time: "05:30", monday: "HIIT", tuesday: "Yoga", wednesday: "Strength", thursday: "Cardio", friday: "Mobility", saturday: "Power", sunday: "Rest" },
    { time: "07:00", monday: "Strength", tuesday: "Boxing", wednesday: "HIIT", thursday: "Olympic", friday: "Yoga", saturday: "CrossFit", sunday: "Rest" },
    { time: "09:00", monday: "Cardio", tuesday: "Mobility", wednesday: "Power", thursday: "HIIT", friday: "Strength", saturday: "Yoga", sunday: "Rest" },
    { time: "16:30", monday: "Olympic", tuesday: "Strength", wednesday: "Boxing", thursday: "Yoga", friday: "HIIT", saturday: "Team", sunday: "Rest" },
    { time: "18:00", monday: "CrossFit", tuesday: "Power", wednesday: "Cardio", thursday: "Strength", friday: "Boxing", saturday: "Open", sunday: "Rest" },
  ];

  const galleryImages = [
    "/images/gym-interior.jpg",
    "/images/gallery1.jpg",
    "/images/equipment.jpg",
    "/images/group-class.jpg",
    "/images/deadlift.jpg",
    "/images/transformation.jpg",
  ];

  const testimonials = [
    {
      name: "James Thompson",
      result: "Lost 42lbs • +65lbs Bench",
      quote: "The coaching at IronCore completely changed my life. The environment pushes you to be better every single day.",
      image: "/images/trainer-male.jpg",
      progress: "18 months"
    },
    {
      name: "Michael Brooks",
      result: "Added 26lbs of muscle",
      quote: "The trainers here helped me completely transform my physique. The intensity and support is unmatched.",
      image: "/images/trainer-male3.jpg",
      progress: "14 months"
    }
  ];

  // Smooth scroll
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition - bodyRect - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
      setActiveSection(id.replace('#', ''));
    }
  };

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-80px 0px -20%" }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleJoinNow = () => {
    scrollToSection('#membership');
    setSelectedPlan('premium');
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/15551234567?text=Hi%20IronCore%2C%20I%27m%20interested%20in%20joining!', '_blank');
  };

  return (
    <div className="bg-zinc-950 text-white overflow-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-lg border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-3xl tracking-tighter">IRONCORE</div>
              <div className="text-[10px] text-zinc-500 -mt-1">EST 2018 • FITNESS CLUB</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className={`transition-colors hover:text-red-500 ${activeSection === link.href.replace('#', '') ? 'text-red-500' : 'text-zinc-400'}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleJoinNow}
              className="hidden md:flex items-center gap-2 px-8 py-3.5 bg-white text-black font-semibold rounded-2xl hover:bg-red-600 hover:text-white transition-all text-sm tracking-wider"
            >
              JOIN NOW <ArrowRight className="w-4 h-4" />
            </motion.button>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-11 h-11 flex items-center justify-center border border-zinc-700 rounded-2xl"
            >
              <div className={`space-y-1.5 transition-all ${isMenuOpen ? 'rotate-90' : ''}`}>
                <div className="w-5 h-0.5 bg-white"></div>
                <div className="w-5 h-0.5 bg-white"></div>
                <div className="w-5 h-0.5 bg-white"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-zinc-950 border-t border-zinc-800 px-6 py-8"
          >
            <div className="flex flex-col gap-6 text-lg">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  className="py-2 border-b border-zinc-800 last:border-none"
                >
                  {link.label}
                </a>
              ))}
              <button 
                onClick={handleJoinNow}
                className="mt-4 w-full py-4 bg-red-600 text-white font-semibold rounded-3xl"
              >
                JOIN THE FORGE
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/deadlift.jpg" 
            alt="IronCore Fitness" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#ef4444_1px,transparent_1px)] bg-[length:40px_40px] opacity-10"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-16">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-3xl border border-red-500/30 bg-red-950/40 text-red-400 text-xs tracking-[3px] mb-6">
                ESTABLISHED 2018 • NEW YORK
              </div>
              
              <h1 className="text-7xl md:text-[92px] leading-[0.9] font-black tracking-tighter mb-6">
                FORGE YOUR<br />LEGACY
              </h1>
              
              <p className="text-2xl md:text-3xl text-zinc-400 mb-12 max-w-md">
                The most elite training facility in the city. 
                Where champions are made.
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                onClick={handleJoinNow}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center justify-center gap-3 bg-red-600 hover:bg-white hover:text-zinc-950 transition-all text-xl font-semibold py-7 px-14 rounded-3xl"
              >
                BECOME A MEMBER
                <ArrowRight className="group-hover:translate-x-1 transition" />
              </motion.button>
              
              <motion.button 
                onClick={() => scrollToSection('#schedule')}
                whileHover={{ scale: 1.03 }}
                className="flex-1 sm:flex-none border border-white/60 hover:bg-white/10 transition-all text-xl py-7 px-10 rounded-3xl font-medium flex items-center justify-center gap-3"
              >
                <Calendar className="w-5 h-5" /> SEE THE SCHEDULE
              </motion.button>
            </div>

            <div className="mt-16 flex items-center gap-8 text-sm">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <div>
                  <div className="font-mono text-xs text-emerald-400">OPEN NOW</div>
                  <div className="text-zinc-400">24 HOURS</div>
                </div>
              </div>
              <div className="h-8 w-px bg-white/20"></div>
              <div className="text-zinc-500 text-sm leading-tight">
                1428 INDUSTRIAL<br />LOFT, DOWNTOWN
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 flex flex-col items-center gap-3 z-10">
          <div className="text-[10px] tracking-[2px] text-zinc-500">SCROLL TO EXPLORE</div>
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-transparent via-white/60 to-transparent"
          />
        </div>

        {/* Trust bar */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent flex items-end justify-center pb-8">
          <div className="flex items-center gap-8 text-xs opacity-60">
            <div>AS SEEN IN</div>
            <div className="flex items-center gap-8">
              <div>MEN'S HEALTH</div>
              <div>FORBES</div>
              <div>ESPN</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-7">
              <div className="sticky top-24">
                <div className="uppercase text-red-500 text-sm tracking-[4px] mb-3">OUR STORY</div>
                <h2 className="text-6xl font-bold tracking-tighter leading-none mb-8">
                  BUILT FOR<br />THOSE WHO<br />REFUSE TO<br />SETTLE
                </h2>
                
                <div className="max-w-md text-lg text-zinc-400">
                  IronCore was founded with one mission: to create the ultimate environment for serious athletes and those who want to become one. 
                </div>
                
                <div className="mt-12 flex items-center gap-6">
                  <div className="flex -space-x-4">
                    <div className="w-9 h-9 bg-zinc-800 border-2 border-zinc-950 rounded-2xl"></div>
                    <div className="w-9 h-9 bg-red-600 border-2 border-zinc-950 rounded-2xl"></div>
                    <div className="w-9 h-9 bg-zinc-700 border-2 border-zinc-950 rounded-2xl"></div>
                  </div>
                  <div className="text-sm leading-tight">
                    1800+ members<br />
                    <span className="text-red-400">97% retention rate</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-5">
              <motion.div 
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-800"
              >
                <img 
                  src="/images/gym-interior.jpg" 
                  alt="Gym Interior" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 p-8">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 mb-2">
                    <div className="w-2 h-px bg-amber-400"></div>
                    THE FORGE
                  </div>
                  <div className="text-4xl font-semibold leading-none">4,200 SQ FT<br />OF PURE IRON</div>
                </div>
                
                <div className="absolute top-8 right-8 bg-black/70 text-xs px-5 py-3 rounded-2xl flex items-center gap-2 border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  182 ATHLETES TRAINING
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-end mb-16">
            <div>
              <div className="text-red-500 text-sm font-medium tracking-widest">WHAT WE OFFER</div>
              <h3 className="text-6xl font-bold tracking-tighter">DISCIPLINES OF EXCELLENCE</h3>
            </div>
            <p className="max-w-xs text-zinc-400">
              Our programs are designed by world-class coaches to deliver measurable results in record time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
                className="group bg-zinc-900 border border-zinc-800 p-10 rounded-3xl hover:border-red-500/60 transition-all duration-500 flex flex-col"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform`}>
                  {service.icon}
                </div>
                
                <h4 className="text-4xl font-semibold tracking-tight mb-4">{service.title}</h4>
                <p className="text-zinc-400 leading-relaxed flex-1">{service.desc}</p>
                
                <div className="pt-8 mt-auto border-t border-zinc-800 flex justify-between items-center text-xs uppercase tracking-widest text-zinc-500">
                  <div>LEARN MORE</div>
                  <ArrowRight className="group-hover:translate-x-3 transition" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section id="membership" className="py-24 bg-zinc-950 border-t border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-red-500 font-mono text-sm mb-4 tracking-[3px]">MEMBERSHIPS</div>
            <h2 className="text-6xl font-bold tracking-tighter">CHOOSE YOUR PATH</h2>
            <p className="mt-4 text-xl text-zinc-400 max-w-md mx-auto">No contracts. Cancel anytime. Results guaranteed.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {membershipPlans.map((plan, index) => (
              <motion.div 
                key={plan.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedPlan(plan.id)}
                className={`group relative bg-zinc-900 rounded-3xl p-10 border-2 cursor-pointer transition-all flex flex-col ${plan.color} ${selectedPlan === plan.id ? 'ring-4 ring-red-500 scale-[1.03]' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-8 bg-red-600 text-white text-xs font-bold tracking-widest px-8 py-1 rounded-3xl">MOST POPULAR</div>
                )}

                <div>
                  <div className="font-mono text-xs tracking-[2px] text-zinc-400 mb-1">{plan.name} PLAN</div>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-7xl font-bold tracking-tighter">${plan.price}</span>
                    <span className="text-zinc-400 text-xl">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-5 mb-12 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <div className="mt-1.5 w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                      <span className="text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={(e) => { e.stopPropagation(); handleJoinNow(); }}
                  className="py-6 text-sm font-semibold tracking-widest border border-white hover:bg-white hover:text-black transition-all rounded-2xl"
                >
                  START YOUR 7 DAY TRIAL
                </button>

                <div className="text-[10px] text-center text-zinc-500 mt-6">BILLED MONTHLY • NO COMMITMENT</div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12 text-xs text-zinc-500 flex items-center justify-center gap-8">
            <div className="flex items-center gap-2"><Award className="w-4 h-4" />CANCEL ANYTIME</div>
            <div className="flex items-center gap-2"><Zap className="w-4 h-4" />ACCESS 24/7</div>
            <div className="flex items-center gap-2"><Trophy className="w-4 h-4" />WORLD CLASS COACHING</div>
          </div>
        </div>
      </section>

      {/* EQUIPMENT */}
      <section id="equipment" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-x-16 items-center">
            <div className="lg:col-span-5">
              <div className="text-red-500 text-xs tracking-[3.5px] mb-4">STATE OF THE ART</div>
              <h2 className="text-[56px] leading-none font-bold tracking-[-2.5px] mb-8">THE FINEST<br />TOOLS FOR YOUR<br />TRANSFORMATION</h2>
              
              <div className="space-y-8 text-zinc-400">
                <div className="flex gap-6">
                  <div className="text-6xl font-light text-white/10">01</div>
                  <div>
                    <div className="font-semibold text-white text-xl mb-3">HAMMER STRENGTH &amp; ROGUE</div>
                    <div className="text-sm leading-relaxed">Commercial grade equipment trusted by the best athletes and training facilities in the world.</div>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="text-6xl font-light text-white/10">02</div>
                  <div>
                    <div className="font-semibold text-white text-xl mb-3">LIFE FITNESS CARDIO</div>
                    <div className="text-sm leading-relaxed">The latest in connected cardio technology with integrated screens and performance tracking.</div>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="text-6xl font-light text-white/10">03</div>
                  <div>
                    <div className="font-semibold text-white text-xl mb-3">FUNCTIONAL TRAINING ZONE</div>
                    <div className="text-sm leading-relaxed">Sleds, battle ropes, heavy bags, plyo boxes, and more for the ultimate athletic performance training.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 mt-12 lg:mt-0">
              <div className="relative rounded-3xl overflow-hidden border border-zinc-800">
                <img 
                  src="/images/equipment.jpg" 
                  alt="Premium Equipment" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black to-transparent"></div>
                
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="inline bg-black/80 text-xs px-4 py-2 rounded-3xl flex items-center gap-2 w-fit">
                    <div className="px-3 py-px bg-white text-black font-bold rounded">NEW</div>
                    <span>2025 Cybex Series just arrived</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRAINERS */}
      <section id="trainers" className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="font-mono text-red-500 text-sm">THE COACHES</span>
              <h2 className="font-bold text-6xl tracking-tighter">MEET YOUR COACHES</h2>
            </div>
            <a href="#contact" onClick={(e) => {e.preventDefault(); scrollToSection('#contact')}} className="hidden md:flex items-center gap-2 text-sm group">
              MEET THE ENTIRE TEAM 
              <div className="border border-white/30 px-4 py-3 rounded-2xl group-hover:bg-white group-hover:text-black transition">→</div>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainers.map((trainer, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className="group"
              >
                <div className="overflow-hidden rounded-3xl aspect-[4/3.1] relative mb-5 shadow-xl">
                  <img 
                    src={trainer.image} 
                    alt={trainer.name} 
                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black to-transparent"></div>
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="font-semibold text-2xl tracking-tight">{trainer.name}</div>
                    <div className="text-red-400 text-sm">{trainer.role}</div>
                  </div>
                </div>
                
                <div className="px-1">
                  <p className="text-sm text-zinc-400 line-clamp-2 mb-6">{trainer.bio}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {trainer.specialties.map((spec, i) => (
                      <span key={i} className="text-[10px] border border-zinc-700 px-4 py-1 rounded-3xl">{spec}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CLASS SCHEDULE */}
      <section id="schedule" className="py-24 border-t border-zinc-900 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-5/12">
              <div className="uppercase text-xs tracking-widest text-red-500 mb-6">WEEKLY PROGRAM</div>
              <h2 className="font-bold text-6xl tracking-tighter leading-none mb-6">CLASS TIMETABLE</h2>
              <p className="text-zinc-400 max-w-xs">Our classes are limited to 14 participants to ensure quality coaching and attention to form.</p>
              
              <div className="mt-16 hidden lg:block">
                <div className="flex items-center gap-4 text-xs">
                  <div className="px-5 py-2 border border-red-500 text-red-400 rounded-3xl">ALL CLASSES INCLUDED WITH PREMIUM</div>
                </div>
              </div>
            </div>

            <div className="lg:w-7/12 overflow-auto">
              <table className="w-full min-w-[620px] text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-left text-xs text-zinc-400">
                    <th className="py-5 pr-8 font-normal w-20">TIME</th>
                    <th className="py-5 px-4 font-normal">MON</th>
                    <th className="py-5 px-4 font-normal">TUE</th>
                    <th className="py-5 px-4 font-normal">WED</th>
                    <th className="py-5 px-4 font-normal">THU</th>
                    <th className="py-5 px-4 font-normal">FRI</th>
                    <th className="py-5 px-4 font-normal">SAT</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-200 divide-y divide-zinc-900 font-light">
                  {scheduleData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-zinc-900/60 transition">
                      <td className="py-6 pr-8 font-mono text-red-400">{row.time}</td>
                      <td className="py-6 px-4 border-l border-zinc-900">{row.monday}</td>
                      <td className="py-6 px-4 border-l border-zinc-900">{row.tuesday}</td>
                      <td className="py-6 px-4 border-l border-zinc-900">{row.wednesday}</td>
                      <td className="py-6 px-4 border-l border-zinc-900">{row.thursday}</td>
                      <td className="py-6 px-4 border-l border-zinc-900">{row.friday}</td>
                      <td className="py-6 px-4 border-l border-zinc-900 bg-red-950/30 font-medium text-red-400">{row.saturday}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSFORMATIONS */}
      <section id="transformations" className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-3xl bg-white/5 px-6 py-2 text-xs tracking-widest mb-6">REAL RESULTS</div>
            <h2 className="text-6xl font-bold tracking-tighter">TRANSFORMATIONS</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="bg-zinc-900 rounded-3xl overflow-hidden flex flex-col"
              >
                <div className="h-80 relative">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950/90"></div>
                  
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <div className="text-red-400 font-mono text-xs mb-1">12 WEEK CHALLENGE</div>
                    <div className="text-4xl font-semibold tracking-tight">{testimonial.result}</div>
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="italic text-lg text-zinc-300 leading-tight flex-1">
                    “{testimonial.quote}”
                  </div>
                  <div className="pt-8 mt-auto border-t border-zinc-800 text-sm">
                    — {testimonial.name}<br />
                    <span className="text-zinc-500">Member since {testimonial.progress}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <img 
              src="/images/transformation.jpg" 
              alt="Transformation" 
              className="mx-auto max-w-4xl rounded-3xl shadow-2xl border border-zinc-800"
            />
            <div className="text-xs text-zinc-500 mt-6">— 100+ TRANSFORMATIONS LIKE THIS EVERY YEAR —</div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="text-red-500 font-medium text-sm tracking-widest mb-2">THE EXPERIENCE</div>
              <h2 className="text-6xl font-bold tracking-tighter">INSIDE THE FORGE</h2>
            </div>
            <div className="text-zinc-500 hidden md:block">Tap images to enlarge • 40 photos in full gallery</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {galleryImages.map((imgSrc, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: Math.min(index * 0.03, 0.6) }}
                className={`relative overflow-hidden rounded-3xl group ${index === 0 || index === 5 ? 'md:col-span-7' : 'md:col-span-5'}`}
              >
                <img 
                  src={imgSrc} 
                  alt={`IronCore Gallery ${index}`} 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 group-hover:via-black/30"></div>
                
                <div className="absolute bottom-6 left-6 text-xs font-mono bg-black/60 px-4 py-1 rounded-3xl backdrop-blur">
                  {index % 3 === 0 ? "WEIGHTS" : index % 3 === 1 ? "CARDIO" : "RECOVERY"}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-zinc-950 py-20 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-y-16">
          <div className="md:col-span-5">
            <div className="text-sm text-red-500 tracking-widest mb-4">HEADQUARTERS</div>
            <div className="text-[42px] leading-none font-semibold tracking-tight mb-8">1428 METALWORKS<br />LOFT, TRIBECA</div>
            
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-4 mb-2 text-sm">
                  <Phone className="w-4 h-4 text-red-400" />
                  <a href="tel:2125550199" className="hover:text-red-400 transition">(212) 555-0199</a>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <Mail className="w-4 h-4 text-red-400" />
                  <a href="mailto:train@ironcore.club" className="hover:text-red-400 transition">train@ironcore.club</a>
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-widest text-zinc-500 mb-4">CONNECT</div>
                <div className="flex gap-6">
                  <a href="#" className="hover:text-red-400 transition"><Instagram /></a>
                  <a href="#" className="hover:text-red-400 transition"><Facebook /></a>
                  <a href="#" className="hover:text-red-400 transition"><Twitter /></a>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-zinc-800 text-xs leading-loose text-zinc-400">
              24 HOUR ACCESS FOR MEMBERS<br />
              FRONT DESK OPEN 5AM — 11PM DAILY
            </div>
          </div>

          <div className="md:col-span-7">
            <form className="bg-zinc-900 p-10 md:p-14 rounded-3xl">
              <div className="text-3xl font-semibold mb-10">Ready to start?</div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs tracking-widest mb-3 text-zinc-400">FIRST NAME</label>
                  <input type="text" className="w-full bg-black border border-zinc-700 focus:border-red-500 rounded-2xl px-6 py-6 outline-none text-lg" placeholder="Alex" />
                </div>
                <div>
                  <label className="block text-xs tracking-widest mb-3 text-zinc-400">LAST NAME</label>
                  <input type="text" className="w-full bg-black border border-zinc-700 focus:border-red-500 rounded-2xl px-6 py-6 outline-none text-lg" placeholder="Rivera" />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-xs tracking-widest mb-3 text-zinc-400">EMAIL ADDRESS</label>
                <input type="email" className="w-full bg-black border border-zinc-700 focus:border-red-500 rounded-2xl px-6 py-6 outline-none text-lg" placeholder="you@email.com" />
              </div>

              <div className="mt-6">
                <label className="block text-xs tracking-widest mb-3 text-zinc-400">WHICH PLAN INTERESTS YOU?</label>
                <div className="grid grid-cols-3 gap-4">
                  {["IRON", "STEEL", "FORGE"].map(plan => (
                    <button 
                      key={plan}
                      type="button"
                      onClick={() => setSelectedPlan(plan.toLowerCase())}
                      className={`py-6 border text-sm tracking-widest rounded-2xl transition-all ${selectedPlan === plan.toLowerCase() ? 'bg-red-600 border-red-600' : 'border-zinc-700 hover:border-zinc-400'}`}
                    >
                      {plan}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-xs tracking-widest mb-3 text-zinc-400">TELL US ABOUT YOUR GOALS</label>
                <textarea className="w-full bg-black border border-zinc-700 focus:border-red-500 rounded-3xl px-6 py-6 h-40 outline-none resize-y" placeholder="I want to get stronger and build visible muscle..."></textarea>
              </div>

              <button 
                type="button"
                onClick={() => alert("Thank you! A membership advisor will contact you shortly.")}
                className="mt-10 w-full py-7 bg-white text-black font-semibold text-sm tracking-[1.5px] rounded-3xl hover:bg-red-600 hover:text-white transition-colors"
              >
                SEND MESSAGE — LET'S BUILD TOGETHER
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-xs border-t border-zinc-900 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-y-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-2xl">
                <Dumbbell className="w-4 h-4" />
              </div>
              <div className="font-bold text-4xl tracking-[-2px]">IRONCORE</div>
            </div>
            <div className="text-zinc-500">NEW YORK CITY</div>
          </div>

          <div>
            <div className="font-semibold mb-6 text-zinc-400">NAVIGATION</div>
            <div className="space-y-3 text-zinc-400">
              {navLinks.map(l => (
                <div key={l.href}><a href={l.href} onClick={(e) => { e.preventDefault(); scrollToSection(l.href); }} className="hover:text-white cursor-pointer">{l.label}</a></div>
              ))}
            </div>
          </div>

          <div>
            <div className="font-semibold mb-6 text-zinc-400">HOURS</div>
            <div className="space-y-3 text-zinc-400">
              <div>MON — SUN: 24 HOURS</div>
              <div>RECEPTION: 5AM — 11PM</div>
              <div className="pt-4">LAST ENTRY: 10PM</div>
            </div>
          </div>

          <div>
            <div className="font-semibold mb-6 text-zinc-400">LOCATION</div>
            <div className="text-zinc-400 leading-snug">
              1428 INDUSTRIAL LOFT<br />
              TRIBECA, NEW YORK, NY 10013
            </div>
            <a href="#" className="inline-flex mt-6 text-red-400 items-center gap-2 text-xs hover:underline">
              <MapPin className="w-3.5 h-3.5" /> GET DIRECTIONS
            </a>
          </div>

          <div className="col-span-2 md:col-span-1 md:text-right">
            <div className="text-[10px] text-zinc-500">© IRONCORE FITNESS CLUB 2025<br />ALL RIGHTS RESERVED</div>
            
            <div onClick={openWhatsApp} className="mt-8 flex md:justify-end items-center gap-3 cursor-pointer group">
              <div className="w-9 h-9 bg-green-500 rounded-2xl flex items-center justify-center text-black">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.485-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.355l-.14-.083-3.086.81.824-3.018-.2-.126a9.938 9.938 0 01-1.52-5.274c0-5.477 4.46-9.93 9.945-9.93 2.656 0 5.153 1.035 7.03 2.91 1.877 1.876 2.91 4.372 2.91 7.028 0 5.477-4.46 9.93-9.945 9.93m8.413-18.297A11.82 11.82 0 0012.004 1C6.477 1 2 5.476 2 11.003c0 2.105.555 4.163 1.61 5.973L1 23l6.15-1.615c1.748.978 3.747 1.496 5.854 1.496 5.527 0 10.004-4.476 10.004-9.997 0-2.664-1.04-5.17-2.93-7.046"/></svg>
              </div>
              <div>
                <div className="text-xs text-emerald-400 group-hover:text-emerald-300">WHATSAPP US</div>
                <div className="text-[11px] text-zinc-500">Instant responses</div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <motion.button
        onClick={openWhatsApp}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-black w-16 h-16 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 hover:shadow-green-600 transition-all"
        aria-label="Contact via WhatsApp"
      >
        <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.485-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.355l-.14-.083-3.086.81.824-3.018-.2-.126a9.938 9.938 0 01-1.52-5.274c0-5.477 4.46-9.93 9.945-9.93 2.656 0 5.153 1.035 7.03 2.91 1.877 1.876 2.91 4.372 2.91 7.028 0 5.477-4.46 9.93-9.945 9.93m8.413-18.297A11.82 11.82 0 0012.004 1C6.477 1 2 5.476 2 11.003c0 2.105.555 4.163 1.61 5.973L1 23l6.15-1.615c1.748.978 3.747 1.496 5.854 1.496 5.527 0 10.004-4.476 10.004-9.997 0-2.664-1.04-5.17-2.93-7.046"/>
        </svg>
      </motion.button>
    </div>
  );
};

export default IronCoreFitness;

