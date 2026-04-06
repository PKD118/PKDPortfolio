import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Github, Linkedin, Mail, Phone, MapPin, ExternalLink,
  Menu, X, Download, ChevronDown, Code2, Layers, Database,
  Wrench, GitBranch, Trophy, ArrowUpRight
} from 'lucide-react'
import {
  motion, useScroll, useSpring, useInView, useReducedMotion,
  useTransform, useMotionValue, AnimatePresence
} from 'framer-motion'
import userImage from './assets/cv.jpeg'
import './App.css'

// ── Animation helpers ──

function AnimatedSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
}

const staggerItem = {
  hidden: { opacity: 0, y: 14, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } }
}

// ── Tilt card with 3D mouse tracking ──
function TiltCard({ children, className = '', ...props }) {
  const ref = useRef(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const prefersReducedMotion = useReducedMotion()

  const handleMouse = useCallback((e) => {
    if (prefersReducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    rotateX.set(y * -8)
    rotateY.set(x * 8)
  }, [prefersReducedMotion, rotateX, rotateY])

  const handleLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  return (
    <motion.div
      ref={ref}
      className={`glass-card tilt-card p-6 ${className}`}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.01 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

function GlassCard({ children, className = '', ...props }) {
  return (
    <motion.div
      className={`glass-card p-6 ${className}`}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// ── Animated counter ──
function AnimatedCounter({ value, suffix = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!isInView) return
    if (prefersReducedMotion) { setCount(value); return }
    let start = 0
    const duration = 1500
    const startTime = Date.now()
    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, value, prefersReducedMotion])

  return <span ref={ref}>{count}{suffix}</span>
}

// ── Magnetic link ──
function MagneticLink({ children, href, className = '', ...props }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const prefersReducedMotion = useReducedMotion()

  const handleMouse = useCallback((e) => {
    if (prefersReducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.2)
    y.set((e.clientY - cy) * 0.2)
  }, [prefersReducedMotion, x, y])

  const handleLeave = useCallback(() => { x.set(0); y.set(0) }, [x, y])

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x, y }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      {...props}
    >
      {children}
    </motion.a>
  )
}

// ── Main App ──

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [roleIndex, setRoleIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  // Parallax values for hero
  const heroRef = useRef(null)
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  const heroY = useTransform(heroScroll, [0, 1], [0, 150])
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0])

  const roles = ['iOS Developer', 'SwiftUI Architect', 'Healthcare Fintech Engineer']

  useEffect(() => {
    if (prefersReducedMotion) return
    const interval = setInterval(() => setRoleIndex(i => (i + 1) % roles.length), 3000)
    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact']
      const scrollPosition = window.scrollY + 100
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const navItems = ['home', 'about', 'skills', 'projects', 'experience', 'contact']

  const skills = [
    {
      title: 'Programming Languages',
      icon: <Code2 className="h-5 w-5 text-blue-400" />,
      badgeClass: 'badge-blue',
      items: ['Swift 6', 'Java', 'Python', 'JavaScript', 'C++', 'SQL'],
    },
    {
      title: 'Frameworks & SDKs',
      icon: <Layers className="h-5 w-5 text-green-400" />,
      badgeClass: 'badge-green',
      items: ['SwiftUI', 'UIKit', 'Combine', 'WidgetKit', 'MapKit', 'Firebase', 'REST APIs', 'MXMerchant SDK', 'AnyPay SDK'],
    },
    {
      title: 'Databases',
      icon: <Database className="h-5 w-5 text-purple-400" />,
      badgeClass: 'badge-purple',
      items: ['Firestore', 'Firebase Realtime Database', 'MongoDB', 'MySQL', 'Apache Derby'],
    },
    {
      title: 'Tools & Platforms',
      icon: <Wrench className="h-5 w-5 text-amber-400" />,
      badgeClass: 'badge-orange',
      items: ['Xcode', 'Instruments', 'TestFlight', 'OSLog', 'Git', 'GitHub', 'Postman', 'Jira', 'Trello', 'Swift Package Manager', 'CocoaPods'],
    },
    {
      title: 'Engineering Practices',
      icon: <GitBranch className="h-5 w-5 text-rose-400" />,
      badgeClass: 'badge-rose',
      items: [
        'MVVM', 'Protocol-Oriented Programming', 'Swift Concurrency & Actors',
        'Modular SwiftUI Component Design', 'Offline-First Architecture',
        'Multi-Tenant SaaS Design', 'Unit & UI Testing', 'Performance Profiling',
        'TestFlight Beta Management', 'Agile/Scrum', 'Code Reviews',
        'Responsive iPad & iPhone Layouts', 'Component-Driven Design Systems'
      ],
    },
  ]

  const projects = [
    {
      title: 'BillPay-POS',
      subtitle: 'iPad Payment System',
      date: 'Sep 2025 - Nov 2025',
      image: '/images/billpay.jpg',
      description: 'Built and owned end-to-end as the sole iOS developer — from the first line of architecture to TestFlight deployment. Processes 50,000+ monthly transactions across multiple healthcare clinics on a multi-tenant SaaS platform.',
      technologies: ['Swift 6', 'SwiftUI', 'Firebase', 'GCP', 'MXMerchant', 'AnyPay SDK'],
      features: [
        'Integrated MXMerchant and AnyPay SDKs with BBPOS Bluetooth card readers',
        'Real-time Firestore sync with offline-first resilience',
        'Secure REST API pipelines and HIPAA-aware patient data handling',
        'Reduced debugging time by 75% through structured OSLog logging',
      ],
      featured: true,
      link: 'https://github.com/PKD118'
    },
    {
      title: 'Foodier!',
      subtitle: 'Food Delivery + Restaurant App',
      date: '2023',
      image: '/images/foodier.jpg',
      description: 'Two companion apps — a customer-facing food delivery app and a restaurant management app — working together in real time.',
      technologies: ['SwiftUI', 'Firebase', 'MapKit'],
      achievements: ['1st Place — iOS App Showcase, 2023'],
      features: [
        'Reusable SwiftUI component system from scratch',
        'Live map tracking via MapKit',
        'Real-time data flow through Firestore',
      ],
      link: 'https://github.com/PKD118/Foodier'
    },
    {
      title: 'CfL — Care for Love',
      subtitle: 'Health Monitoring App',
      date: '2023',
      image: '/images/cfl.jpg',
      description: 'Health-monitoring app for cardiac patients where doctors and caregivers track vitals in real time.',
      technologies: ['Java', 'Android', 'Firebase'],
      features: [
        'Firebase auth and cloud sync for secure patient data',
        'Real-time vitals tracking with health suggestions',
        'Comprehensive testing with full UML documentation',
      ],
      link: 'https://github.com/PKD118/CFL'
    },
    {
      title: 'Teleport 24/7',
      subtitle: 'Courier Management Platform',
      date: '2022',
      image: '/images/teleport.jpg',
      description: 'Courier management platform for end-to-end delivery operations across web and desktop.',
      technologies: ['Java', 'Laravel', 'Apache Derby', 'MySQL'],
      achievements: ['Best Java Project — CSE 2200 Course, 2022'],
      features: [
        'Cross-platform interface (web + desktop)',
        'Full backend integration with database connectivity',
        'End-to-end delivery operations management',
      ],
      link: 'https://github.com/PKD118/Teleport-Java-App'
    }
  ]

  const experiences = [
    {
      role: 'Junior iOS Developer',
      company: 'LAB3',
      location: 'Boston, MA (Remote)',
      date: 'Sep 2025 - Present',
      current: true,
      bullets: [
        'Sole iOS developer for BillPay-POS, processing 50,000+ monthly transactions across multiple clinics',
        'Architected scalable features using Swift 6, SwiftUI, and MVVM with clean REST API integration',
        'Integrated MXMerchant terminal and BBPOS Bluetooth card reader for card-present payments',
        'Collaborated daily with cross-functional US teams in Agile environment',
        'Cut debugging time by 75% with structured OSLog-based logging and Instruments profiling',
        'Owned full TestFlight distribution pipeline and led internal QA cycles',
      ]
    },
    {
      role: 'iOS Developer Intern',
      company: 'SahiTech Ltd.',
      location: 'Dhaka, Bangladesh (Remote)',
      date: 'Jun 2025 - Aug 2025',
      current: false,
      bullets: [
        'Built WidgetKit extensions and Apple Watch complications for glanceable information',
        'Developed modular SwiftUI components and clean REST API data handlers',
        'Contributed to sprint planning and code reviews as part of a remote Agile team',
      ]
    },
    {
      role: 'General Secretary',
      company: 'CSE Association, KUET',
      location: '',
      date: 'Apr 2023 - Apr 2024',
      current: false,
      bullets: [
        'Coordinated operations for 500+ students across technical, creative, and academic teams',
        'Fostered cross-department collaboration with strong leadership and team empathy',
        'Built documentation and task-tracking practices now applied in QA workflows',
      ]
    }
  ]

  return (
    <div className="min-h-screen mesh-gradient noise-overlay text-slate-100">

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
        }}
      />

      {/* Navigation — floating glass pill */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-3xl">
        <div className="glass-card px-5 py-3 flex justify-between items-center">
          <button
            onClick={() => scrollToSection('home')}
            className="text-lg font-bold text-white cursor-pointer hover:opacity-80 transition-opacity"
          >
            BD<span className="text-blue-400">.</span>
          </button>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="relative px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer rounded-md hover:text-white"
                style={{ color: activeSection === item ? '#ffffff' : '#64748b' }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
                {activeSection === item && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-blue-400"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="glass-card mt-2 p-3 md:hidden"
            >
              {navItems.map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    activeSection === item
                      ? 'text-white bg-white/5'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero — with parallax */}
      <section id="home" ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="dot-grid absolute inset-0 opacity-50" />
        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
          style={prefersReducedMotion ? {} : { y: heroY, opacity: heroOpacity }}
        >
          <AnimatedSection>
            <motion.div
              className="relative inline-block mb-8"
              animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src={userImage}
                alt="Biduyt Das"
                className="w-28 h-28 rounded-full object-cover ring-2 ring-blue-400/25 glow-accent"
              />
              <motion.div
                className="absolute -inset-2 rounded-full border border-blue-400/10"
                animate={prefersReducedMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4">
              <span className="text-white">Hi, I'm </span>
              <span className="gradient-text">Biduyt Das</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.25}>
            <div className="h-10 md:h-12 flex items-center justify-center mb-6">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                  transition={{ duration: 0.5 }}
                  className="text-xl md:text-2xl text-blue-300/80 font-medium"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.35}>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Building production iOS apps that handle real payments for real patients.
              Sole iOS developer at LAB3, specializing in Swift, SwiftUI, and healthcare fintech.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.45}>
            <motion.div
              className="flex flex-wrap justify-center gap-6 mb-12"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {[
                { value: 50, suffix: 'K+', sub: 'Transactions/mo' },
                { value: 3, suffix: '+', sub: 'Shipped Apps' },
                { value: 2, suffix: 'x', sub: 'Award-Winning' },
              ].map(stat => (
                <motion.div
                  key={stat.sub}
                  variants={staggerItem}
                  className="glass-card px-6 py-4 text-center min-w-[120px]"
                >
                  <div className="text-2xl font-bold text-white">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{stat.sub}</div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatedSection>

          <AnimatedSection delay={0.55}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(96, 165, 250, 0.2)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 rounded-xl bg-blue-500 text-white font-semibold text-lg cursor-pointer transition-all"
              >
                View My Work
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, borderColor: 'rgba(96, 165, 250, 0.3)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 rounded-xl border border-white/10 text-slate-300 font-medium text-lg hover:text-white cursor-pointer transition-all"
              >
                Get In Touch
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.04, borderColor: 'rgba(96, 165, 250, 0.3)' }}
                whileTap={{ scale: 0.97 }}
                href="/Biduyt_Das_CV.pdf"
                download
                className="px-8 py-3 rounded-xl border border-white/10 text-slate-300 font-medium text-lg hover:text-white cursor-pointer transition-all flex items-center gap-2"
              >
                <Download className="h-4 w-4" /> Download CV
              </motion.a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.65}>
            <div className="flex justify-center gap-4">
              {[
                { href: 'mailto:pkdasbiduyt@gmail.com', icon: <Mail className="h-5 w-5" />, label: 'Email' },
                { href: 'https://www.linkedin.com/in/biduytdas/', icon: <Linkedin className="h-5 w-5" />, label: 'LinkedIn' },
                { href: 'https://github.com/PKD118', icon: <Github className="h-5 w-5" />, label: 'GitHub' },
              ].map(link => (
                <MagneticLink
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-slate-500 hover:text-blue-400 hover:border-blue-400/30 hover:bg-blue-400/5 transition-all cursor-pointer"
                  aria-label={link.label}
                >
                  {link.icon}
                </MagneticLink>
              ))}
            </div>
          </AnimatedSection>

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-5 w-5 text-slate-600" />
          </motion.div>
        </motion.div>
      </section>

      {/* About */}
      <section id="about" className="py-24 relative">
        <div className="gradient-divider mb-24" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 text-center">About Me</h2>
            <p className="text-slate-400 text-center max-w-2xl mx-auto mb-16">
              iOS developer with production experience building secure, scalable mobile applications for healthcare and fintech.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <AnimatedSection delay={0.1}>
              <div className="space-y-5">
                <h3 className="text-2xl font-semibold text-white mb-6">My Journey</h3>
                <p className="text-slate-400 leading-relaxed">
                  As a Computer Science graduate from Khulna University of Engineering & Technology, I've gone from building academic projects to owning a production iOS app that processes real payments for real patients every day. At LAB3 I built BillPay-POS from the ground up — architecture, integrations, testing, and deployment — entirely on my own.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  My core stack is Swift 6, SwiftUI, and Firebase, with deep experience in payment SDK integration (MXMerchant, AnyPay), Bluetooth card readers, real-time Firestore sync, and offline-first design.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  Outside of code I served as General Secretary of the CSE Association at KUET, coordinating operations for 500+ students. I write about what I learn at{' '}
                  <a href="https://learnwithbiduyt.blogspot.com" target="_blank" rel="noopener noreferrer" className="text-blue-400/80 hover:text-blue-300 transition-colors underline underline-offset-2 decoration-blue-400/30">
                    learnwithbiduyt.blogspot.com
                  </a>
                </p>
                <div className="flex items-center text-slate-500 pt-2">
                  <MapPin className="h-4 w-4 mr-2 text-slate-400" /> Sylhet, Bangladesh
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="space-y-6">
                <TiltCard>
                  <h4 className="font-semibold text-white mb-4 text-lg">Education</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-white">BSc Engineering in CSE</h5>
                      <p className="text-slate-400 text-sm">Khulna University Of Engineering & Technology</p>
                      <p className="text-xs text-slate-500 mt-0.5">Jan 2020 - Sep 2025</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-white">Higher Secondary Certificate</h5>
                      <p className="text-slate-400 text-sm">MC College</p>
                      <p className="text-xs text-slate-500 mt-0.5">2017 - 2019</p>
                    </div>
                  </div>
                </TiltCard>

                <TiltCard>
                  <h4 className="font-semibold text-white mb-4 text-lg">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Table Tennis', 'AI', 'Prompt Engineering', 'Software Architecture', 'Blogging', 'Team Collaboration', 'Agile Practices'].map(i => (
                      <span key={i} className="glass-badge text-xs px-3 py-1.5 rounded-full cursor-default">{i}</span>
                    ))}
                  </div>
                </TiltCard>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24">
        <div className="gradient-divider mb-24" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 text-center">Skills & Technologies</h2>
            <p className="text-slate-400 text-center max-w-2xl mx-auto mb-16">
              Technical skills across iOS development, backend integration, and engineering practices.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, idx) => (
              <AnimatedSection key={skill.title} delay={idx * 0.08} className={idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''}>
                <TiltCard className="h-full">
                  <div className="flex items-center gap-3 mb-5">
                    {skill.icon}
                    <h3 className="font-semibold text-white">{skill.title}</h3>
                  </div>
                  <motion.div
                    className="flex flex-wrap gap-2"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {skill.items.map(item => (
                      <motion.span
                        key={item}
                        variants={staggerItem}
                        whileHover={{ scale: 1.08, y: -2 }}
                        className={`${skill.badgeClass} text-xs px-3 py-1.5 rounded-full cursor-default`}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </motion.div>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24">
        <div className="gradient-divider mb-24" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 text-center">Featured Projects</h2>
            <p className="text-slate-400 text-center max-w-2xl mx-auto mb-16">
              Real shipped products — from production healthcare payment systems to award-winning iOS apps.
            </p>
          </AnimatedSection>

          <div className="space-y-8">
            {projects.map((project, idx) => (
              <AnimatedSection key={project.title} delay={idx * 0.1}>
                <motion.div
                  className={`glass-card overflow-hidden ${project.featured ? 'border-l-2 border-l-blue-500/40' : ''}`}
                  whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`grid md:grid-cols-2`}>
                    {/* Image */}
                    <div className={`relative h-56 md:h-auto min-h-[280px] overflow-hidden ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                      <motion.div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${project.image})` }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className={`absolute inset-0 ${idx % 2 === 1 ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-transparent via-transparent to-[#050a12]/90 hidden md:block`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050a12]/90 to-transparent md:hidden" />
                      {project.achievements && (
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {project.achievements.map((a, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/15 text-amber-200 border border-amber-500/25 backdrop-blur-sm">
                              <Trophy className="h-3 w-3" /> {a}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className={`p-6 md:p-8 flex flex-col justify-center ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="text-xl font-bold text-white">{project.title}</h3>
                          <p className="text-blue-400/70 text-sm font-medium">{project.subtitle}</p>
                        </div>
                        <span className="text-xs text-slate-500 whitespace-nowrap ml-4 mt-1">{project.date}</span>
                      </div>
                      <p className="text-slate-400 text-sm mt-3 leading-relaxed">{project.description}</p>

                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {project.technologies.map(tech => (
                          <span key={tech} className="glass-badge text-xs px-2.5 py-1 rounded-full">{tech}</span>
                        ))}
                      </div>

                      <ul className="mt-4 space-y-2">
                        {project.features.map((f, i) => (
                          <li key={i} className="flex items-start text-sm text-slate-400">
                            <span className="w-1.5 h-1.5 bg-blue-400/50 rounded-full mt-1.5 mr-2.5 flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>

                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block group">
                          <motion.span
                            whileHover={{ scale: 1.02 }}
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-white/10 text-sm text-slate-400 hover:border-blue-400/30 hover:text-blue-300 transition-all cursor-pointer"
                          >
                            View Project <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </motion.span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Experience — Timeline */}
      <section id="experience" className="py-24">
        <div className="gradient-divider mb-24" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 text-center">Experience</h2>
            <p className="text-slate-400 text-center max-w-2xl mx-auto mb-16">
              From healthcare payment systems to remote Agile teams and student leadership.
            </p>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px timeline-line" />
            <div className="space-y-10">
              {experiences.map((exp, idx) => (
                <AnimatedSection key={exp.company} delay={idx * 0.12}>
                  <div className="relative pl-16 md:pl-20">
                    <div className="absolute left-6 md:left-8 -translate-x-1/2 top-6">
                      {exp.current ? (
                        <motion.div
                          className="timeline-dot"
                          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-slate-600 border-2 border-[#050a12]" />
                      )}
                    </div>

                    <GlassCard>
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                          <p className="text-blue-400/70 font-medium">{exp.company}</p>
                          {exp.location && <p className="text-xs text-slate-500 mt-0.5">{exp.location}</p>}
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full whitespace-nowrap self-start ${
                          exp.current
                            ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                            : 'bg-white/5 text-slate-400 border border-white/8'
                        }`}>
                          {exp.date}
                        </span>
                      </div>
                      <ul className="space-y-2.5">
                        {exp.bullets.map((item, i) => (
                          <li key={i} className="flex items-start text-sm text-slate-400">
                            <span className="w-1.5 h-1.5 bg-blue-400/40 rounded-full mt-1.5 mr-2.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </GlassCard>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="gradient-divider mb-24" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[8rem] md:text-[12rem] font-black text-white/[0.015] leading-none tracking-tight">
            LET'S TALK
          </span>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 text-center">Get In Touch</h2>
            <p className="text-slate-400 text-center max-w-2xl mx-auto mb-16">
              Always open to discussing new opportunities, collaborations, or just a chat about iOS development.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection delay={0.1}>
              <TiltCard className="h-full">
                <h3 className="text-lg font-semibold text-white mb-6">Contact Information</h3>
                <div className="space-y-5">
                  {[
                    { icon: <Mail className="h-4 w-4" />, label: 'Email', value: 'pkdasbiduyt@gmail.com', href: 'mailto:pkdasbiduyt@gmail.com' },
                    { icon: <Phone className="h-4 w-4" />, label: 'Phone', value: '+8801637793410', href: 'tel:+8801637793410' },
                    { icon: <Linkedin className="h-4 w-4" />, label: 'LinkedIn', value: 'linkedin.com/in/biduytdas', href: 'https://www.linkedin.com/in/biduytdas/' },
                    { icon: <Github className="h-4 w-4" />, label: 'GitHub', value: 'github.com/PKD118', href: 'https://github.com/PKD118' },
                  ].map(({ icon, label, value, href }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:border-blue-400/30 group-hover:bg-blue-400/5 transition-all flex-shrink-0">
                        {icon}
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">{label}</p>
                        <p className="text-sm text-slate-300 group-hover:text-blue-300 transition-colors">{value}</p>
                      </div>
                    </a>
                  ))}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-slate-400 flex-shrink-0">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Location</p>
                      <p className="text-sm text-slate-300">Sylhet, Bangladesh</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <TiltCard className="h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Let's Connect</h3>
                  <p className="text-slate-400 text-sm mb-6">Open to opportunities in iOS and mobile development.</p>
                  <ul className="space-y-3 mb-8">
                    {['iOS Development (Swift, SwiftUI)', 'Mobile App Development (Production-grade)', 'Healthcare & Fintech Applications', 'Remote & Cross-functional Teams'].map(item => (
                      <li key={item} className="flex items-center text-sm text-slate-400">
                        <span className="w-1.5 h-1.5 bg-blue-400/50 rounded-full mr-3 flex-shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(96, 165, 250, 0.2)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('mailto:pkdasbiduyt@gmail.com?subject=Portfolio Inquiry', '_blank')}
                  className="w-full py-3 rounded-xl bg-blue-500 text-white font-semibold cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="h-4 w-4" /> Send Email
                </motion.button>
              </TiltCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 relative">
        <div className="gradient-divider mb-12" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Biduyt Das</h3>
          <p className="text-slate-500 mb-6">iOS Developer &middot; Swift & SwiftUI &middot; Healthcare Fintech</p>
          <div className="flex justify-center gap-4 mb-8">
            {[
              { href: 'mailto:pkdasbiduyt@gmail.com', icon: <Mail className="h-5 w-5" />, label: 'Email' },
              { href: 'https://linkedin.com/in/biduytdas', icon: <Linkedin className="h-5 w-5" />, label: 'LinkedIn' },
              { href: 'https://github.com/PKD118', icon: <Github className="h-5 w-5" />, label: 'GitHub' },
            ].map(link => (
              <MagneticLink
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-slate-500 hover:text-blue-400 hover:border-blue-400/30 transition-all cursor-pointer"
                aria-label={link.label}
              >
                {link.icon}
              </MagneticLink>
            ))}
          </div>
          <p className="text-slate-600 text-xs">&copy; 2025 Biduyt Das. Built with React and Tailwind CSS.</p>
        </div>
      </footer>

    </div>
  )
}

export default App
