import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Menu, X, Download } from 'lucide-react'
import userImage from './assets/cv.jpeg'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

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

  const skills = {
    languages: ['Swift 6', 'Java', 'Python', 'JavaScript', 'C++', 'SQL'],
    frameworks: ['SwiftUI', 'UIKit', 'Combine', 'WidgetKit', 'MapKit', 'Firebase', 'REST APIs', 'MXMerchant SDK', 'AnyPay SDK'],
    databases: ['Firestore', 'Firebase Realtime Database', 'MongoDB', 'MySQL', 'Apache Derby'],
    tools: ['Xcode', 'Instruments', 'TestFlight', 'OSLog', 'Git', 'GitHub', 'Postman', 'Jira', 'Trello', 'Swift Package Manager', 'CocoaPods'],
    practices: [
      'MVVM', 'Protocol-Oriented Programming', 'Swift Concurrency & Actors',
      'Modular SwiftUI Component Design', 'Offline-First Architecture',
      'Multi-Tenant SaaS Design', 'Unit & UI Testing', 'Performance Profiling',
      'TestFlight Beta Management', 'Agile/Scrum', 'Code Reviews',
      'Responsive iPad & iPhone Layouts', 'Component-Driven Design Systems'
    ]
  }

  const projects = [
    {
      title: 'BillPay-POS — iPad Payment System',
      subtitle: 'Swift 6, SwiftUI, Firebase, GCP, MXMerchant, AnyPay · Sep 2025 – Nov 2025',
      description: 'Built and owned end-to-end as the sole iOS developer — from the first line of architecture to TestFlight deployment. The app processes 50,000+ monthly transactions across multiple healthcare clinics on a multi-tenant SaaS platform.',
      technologies: ['Swift 6', 'SwiftUI', 'Firebase', 'GCP', 'MXMerchant', 'AnyPay SDK'],
      features: [
        'Integrated MXMerchant and AnyPay SDKs with BBPOS Bluetooth card readers for smooth card-present payments',
        'Designed real-time Firestore sync with offline-first resilience so the app works even when connectivity drops',
        'Built secure REST API pipelines and HIPAA-aware patient data handling',
        'Reduced debugging time by 75% through structured OSLog logging and Instruments profiling',
        'Owned the full TestFlight distribution pipeline and led internal QA before every release',
      ],
      link: 'https://github.com/PKD118'
    },
    {
      title: 'Foodier! & Foodier Restaurant',
      subtitle: 'SwiftUI, Firebase, MapKit · 2023',
      description: 'Built two companion apps — a customer-facing food delivery app and a restaurant management app — that work together in real time. Won 1st place at the iOS App Showcase 2023.',
      technologies: ['SwiftUI', 'Firebase', 'MapKit'],
      achievements: ['1st Place — iOS App Showcase, 2023'],
      features: [
        'Designed a reusable SwiftUI component system from scratch',
        'Integrated live map tracking via MapKit so customers could follow their order as it moved',
        'All data flowed live through Firestore with no refresh needed',
        'Built full Firebase authentication and user session management',
      ],
      link: 'https://github.com/PKD118/Foodier'
    },
    {
      title: 'CfL — Care for Love',
      subtitle: 'Java (Android), Firebase · 2023',
      description: 'Built a health-monitoring app for cardiac patients where doctors and caregivers could track vitals in real time. Covered the full delivery cycle from code to documentation.',
      technologies: ['Java', 'Android', 'Firebase'],
      features: [
        'Firebase authentication and cloud sync so patient data stayed secure across devices',
        'Real-time vitals tracking with condition-driven health suggestions',
        'Comprehensive unit and UI tests with full UML documentation and polished mockups',
      ],
      link: 'https://github.com/PKD118/CFL'
    },
    {
      title: 'Teleport 24/7',
      subtitle: 'Java, Laravel, Apache Derby, MySQL · 2022',
      description: 'Courier management platform built with both Laravel and Java NetBeans for end-to-end delivery operations. Won Best Java Project in the CSE 2200 course.',
      technologies: ['Java', 'Laravel', 'Apache Derby', 'MySQL'],
      achievements: ['Best Java Project — CSE 2200 Course, 2022'],
      features: [
        'Cross-platform interface covering both web and desktop',
        'Full backend integration with database connectivity',
        'End-to-end delivery operations management system',
      ],
      link: 'https://github.com/PKD118/Teleport-Java-App'
    }
  ]

  const lab3Bullets = [
    'Sole iOS developer for BillPay-POS, a healthcare payment system processing 50,000+ monthly transactions across multiple clinics on a multi-tenant SaaS platform',
    'Architected and shipped scalable features using Swift 6, SwiftUI, and MVVM with clean REST API integration and robust JSON handling',
    'Integrated MXMerchant terminal and BBPOS Bluetooth card reader, enabling smooth card-present payments at the point of care',
    'Collaborated daily with cross-functional teams across the US in an Agile environment, coordinating with backend, QA, and product to ship reliable features on schedule',
    'Cut debugging time by 75% by introducing structured OSLog-based logging and systematic Instruments profiling across the codebase',
    'Owned the full TestFlight distribution pipeline and led internal QA cycles before every release to ensure production stability',
  ]

  const sahiTechBullets = [
    "Built WidgetKit extensions and Apple Watch complications delivering glanceable, up-to-date information on Apple's most personal screens",
    "Developed modular, reusable SwiftUI components and clean REST API data handlers that plugged directly into the team's existing architecture",
    'Contributed to sprint planning, code reviews, and iterative feature delivery as part of a fully remote Agile team across multiple time zones',
  ]

  const cseBullets = [
    'Coordinated operations and communication for over 500 students across technical, creative, and academic teams',
    'Fostered collaboration across departments, developing strong skills in leadership, accountability, and team empathy',
    'Built attention to detail, task tracking, and documentation practices — skills now applied directly in QA workflows',
  ]

  const BadgeList = ({ items, color }) => (
    <div className="flex flex-wrap gap-2">
      {items.map(s => <Badge key={s} className={color}>{s}</Badge>)}
    </div>
  )

  const BulletList = ({ items }) => (
    <ul className="space-y-3 text-slate-600 dark:text-slate-300">
      {items.map((item, i) => (
        <li key={i} className="flex items-start">
          <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  )

  const navClass = (item) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      activeSection === item
        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
        : 'text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
    }`

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => scrollToSection('home')}
              className="text-xl font-bold text-slate-900 dark:text-white hover:opacity-75 transition-opacity"
            >
              Biduyt Das
            </button>
            <div className="hidden md:flex ml-10 items-baseline space-x-4">
              {navItems.map(item => (
                <button key={item} onClick={() => scrollToSection(item)} className={navClass(item)}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-slate-700 dark:text-slate-300">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
            {navItems.map(item => (
              <button key={item} onClick={() => scrollToSection(item)} className={`block w-full text-left ${navClass(item)}`}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="home" className="pt-16 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <img src={userImage} alt="Biduyt Das" className="w-32 h-32 mx-auto mb-6 rounded-full object-cover shadow-lg" />
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Biduyt Das</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
            iOS Developer with hands-on production experience building a healthcare fintech POS system handling 50,000+ monthly transactions. Sole iOS developer at LAB3, taking full ownership from architecture to TestFlight deployment. Driven to grow fast, ship real products, and make a meaningful impact through technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={() => scrollToSection('projects')} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg">
              View My Work
            </Button>
            <Button variant="outline" className="px-8 py-3 text-lg" onClick={() => scrollToSection('contact')}>
              Get In Touch
            </Button>
            <a href="/Biduyt_Das_CV.pdf" download>
              <Button variant="outline" className="px-8 py-3 text-lg">
                <Download className="h-4 w-4 mr-2" /> Download CV
              </Button>
            </a>
          </div>
          <div className="flex justify-center space-x-6 mt-8">
            <a href="mailto:pkdasbiduyt@gmail.com" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"><Mail className="h-6 w-6" /></a>
            <a href="https://www.linkedin.com/in/biduytdas/" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"><Linkedin className="h-6 w-6" /></a>
            <a href="https://github.com/PKD118" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"><Github className="h-6 w-6" /></a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">About Me</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              iOS developer with production experience building secure, scalable mobile applications. Currently the sole iOS developer at LAB3, specializing in Swift, SwiftUI, and MVVM architecture with deep experience in payment gateway integrations, third-party SDKs, and real-time data synchronization.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">My Journey</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                As a Computer Science graduate from Khulna University of Engineering & Technology, I've gone from building academic projects to owning a production iOS app that processes real payments for real patients every day. At LAB3 I built BillPay-POS from the ground up — architecture, integrations, testing, and deployment — entirely on my own.
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                My core stack is Swift 6, SwiftUI, and Firebase, with deep experience in payment SDK integration (MXMerchant, AnyPay), Bluetooth card readers, real-time Firestore sync, and offline-first design. I've built secure authentication flows, robust REST API pipelines, and optimized performance with Instruments profiling.
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Outside of code I served as General Secretary of the CSE Association at KUET, coordinating operations for 500+ students across technical, creative, and academic teams. That experience shaped how I collaborate, communicate, and take ownership — skills I bring to every sprint.
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                I write about what I learn at{' '}
                <a href="https://learnwithbiduyt.blogspot.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  learnwithbiduyt.blogspot.com
                </a>
              </p>
              <div className="flex items-center text-slate-600 dark:text-slate-300">
                <MapPin className="h-5 w-5 mr-2" /> Sylhet, Bangladesh
              </div>
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle className="text-lg">Education</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">BSc Engineering in CSE</h4>
                    <p className="text-slate-600 dark:text-slate-300">Khulna University Of Engineering & Technology</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Jan 2020 – Sep 2025</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Higher Secondary Certificate</h4>
                    <p className="text-slate-600 dark:text-slate-300">MC College</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">2017 – 2019</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">Interests</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {['Table Tennis', 'AI', 'Prompt Engineering', 'Software Architecture', 'Blogging', 'Team Collaboration', 'Agile Practices'].map(i => (
                      <Badge key={i} variant="secondary">{i}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Skills & Technologies</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              A comprehensive overview of my technical skills across iOS development, backend integration, and engineering practices.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader><CardTitle className="text-lg">Programming Languages</CardTitle></CardHeader>
              <CardContent><BadgeList items={skills.languages} color="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Frameworks & SDKs</CardTitle></CardHeader>
              <CardContent><BadgeList items={skills.frameworks} color="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Databases</CardTitle></CardHeader>
              <CardContent><BadgeList items={skills.databases} color="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Tools & Platforms</CardTitle></CardHeader>
              <CardContent><BadgeList items={skills.tools} color="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" /></CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader><CardTitle className="text-lg">Engineering Practices</CardTitle></CardHeader>
              <CardContent><BadgeList items={skills.practices} color="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" /></CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Featured Projects</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Real shipped products — from production healthcare payment systems to award-winning iOS apps.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative h-[480px] rounded-xl overflow-hidden cursor-pointer shadow-md"
                style={{ perspective: '1000px' }}
              >
                {/* Front — image with title */}
                <div
                  className="absolute inset-0 transition-all duration-500 ease-in-out"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(0deg)',
                  }}
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white text-xl font-bold mb-1">{project.title}</h3>
                      <p className="text-slate-300 text-xs">{project.subtitle}</p>
                    </div>
                  </div>
                </div>

                {/* Back — content, revealed on hover */}
                <div
                  className="absolute inset-0 bg-white dark:bg-slate-800 p-5 flex flex-col justify-between
                    opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0
                    transition-all duration-500 ease-in-out overflow-y-auto"
                >
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-slate-900 dark:text-white font-bold text-lg">{project.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{project.subtitle}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{project.description}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-slate-900 dark:text-white mb-1">Technologies:</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map(tech => <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>)}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-slate-900 dark:text-white mb-1">Key Features:</h4>
                      <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                        {project.features.map((f, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {project.achievements && (
                      <div className="flex flex-wrap gap-1">
                        {project.achievements.map((a, i) => (
                          <Badge key={i} className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs">🏆 {a}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-3">
                      <Button variant="outline" className="w-full text-sm">
                        <ExternalLink className="h-3.5 w-3.5 mr-2" /> View Project
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Experience</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              My professional journey — from healthcare payment systems to remote Agile teams and student leadership.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-8">

            {/* LAB3 */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">Junior iOS Developer</CardTitle>
                    <CardDescription className="text-lg">LAB3</CardDescription>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Boston, MA (Remote)</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Sep 2025 – Present</Badge>
                </div>
              </CardHeader>
              <CardContent><BulletList items={lab3Bullets} /></CardContent>
            </Card>

            {/* SahiTech */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">iOS Developer Intern</CardTitle>
                    <CardDescription className="text-lg">SahiTech Ltd.</CardDescription>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Dhaka, Bangladesh (Remote)</p>
                  </div>
                  <Badge variant="outline">Jun 2025 – Aug 2025</Badge>
                </div>
              </CardHeader>
              <CardContent><BulletList items={sahiTechBullets} /></CardContent>
            </Card>

            {/* CSE Association */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">General Secretary</CardTitle>
                    <CardDescription className="text-lg">CSE Association, KUET</CardDescription>
                  </div>
                  <Badge variant="outline">Apr 2023 – Apr 2024</Badge>
                </div>
              </CardHeader>
              <CardContent><BulletList items={cseBullets} /></CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Get In Touch</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Always open to discussing new opportunities, collaborations, or just a chat about iOS development.
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
                <CardDescription>Feel free to reach out through any of these channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { icon: <Mail className="h-5 w-5 text-blue-600" />, label: 'Email', value: 'pkdasbiduyt@gmail.com', href: 'mailto:pkdasbiduyt@gmail.com' },
                  { icon: <Phone className="h-5 w-5 text-blue-600" />, label: 'Phone', value: '+8801637793410', href: 'tel:+8801637793410' },
                  { icon: <Linkedin className="h-5 w-5 text-blue-600" />, label: 'LinkedIn', value: 'linkedin.com/in/biduytdas', href: 'https://www.linkedin.com/in/biduytdas/' },
                  { icon: <Github className="h-5 w-5 text-blue-600" />, label: 'GitHub', value: 'github.com/PKD118', href: 'https://github.com/PKD118' },
                ].map(({ icon, label, value, href }) => (
                  <div key={label} className="flex items-center space-x-3">
                    {icon}
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{label}</p>
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">{value}</a>
                    </div>
                  </div>
                ))}
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Location</p>
                    <p className="text-slate-600 dark:text-slate-300">Sylhet, Bangladesh</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Let's Connect</CardTitle>
                <CardDescription>Open to opportunities in iOS and mobile development</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600 dark:text-slate-300">I'm currently looking for opportunities in:</p>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                  {['iOS Development (Swift, SwiftUI)', 'Mobile App Development (Production-grade)', 'Healthcare & Fintech Applications', 'Remote & Cross-functional Teams'].map(item => (
                    <li key={item} className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3" />{item}
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    onClick={() => window.open('mailto:pkdasbiduyt@gmail.com?subject=Portfolio Inquiry', '_blank')}
                  >
                    <Mail className="h-4 w-4 mr-2" /> Send Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Biduyt Das</h3>
          <p className="text-slate-400 mb-6">iOS Developer · Swift & SwiftUI · Healthcare Fintech</p>
          <div className="flex justify-center space-x-6 mb-8">
            <a href="mailto:pkdasbiduyt@gmail.com" className="text-slate-400 hover:text-white transition-colors"><Mail className="h-6 w-6" /></a>
            <a href="https://linkedin.com/in/biduytdas" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><Linkedin className="h-6 w-6" /></a>
            <a href="https://github.com/PKD118" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><Github className="h-6 w-6" /></a>
          </div>
          <div className="border-t border-slate-800 pt-8">
            <p className="text-slate-400 text-sm">© 2025 Biduyt Das. Built with React and Tailwind CSS.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default App
