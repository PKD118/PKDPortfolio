import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Download, Menu, X } from 'lucide-react'
import userImage from './assets/cv.jpeg' // Import the user's image
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const skills = {
    languages: ['Java', 'Python', 'C++', 'C', 'JavaScript', 'C#', 'SQL', 'Swift'],
    frameworks: ['Firebase', 'SwiftUI', 'Laravel', 'Selenium'],
    databases: ['MongoDB', 'MySQL', 'Oracle', 'Apache Derby'],
    tools: ['GitHub', 'VS Code', 'Android Studio', 'Xcode', 'Firebase Console', 'MongoDB Compass', 'Jira'],
    practices: ['OOP', 'Data Structures & Algorithms', 'Manual Testing', 'UI Testing', 'Test Case Design', 'GitHub Issue Tracking', 'Agile Workflow', 'Basic Automation', 'CI/CD pipelines']
  }

  const projects = [
    {
      title: 'Foodier! & Foodier Restaurant',
      description: 'A full-stack iOS food delivery system with real-time data handling, authentication, and MapKit-based tracking services.',
      technologies: ['SwiftUI', 'Firebase', 'MapKit'],
      achievements: ['First place in iOS App Showcase, 2023'],
      features: [
        'Real-time order tracking',
        'User authentication',
        'Location-based services',
        'Restaurant management system',
        'Unit and UI testing'
      ],
      project_link: 'https://github.com/PKD118/Foodier'
    },
    {
      title: 'CfL (Care for Love)',
      description: 'A health monitoring Android app focused on cardiac patient care with condition-driven suggestions.',
      technologies: ['Java', 'Android', 'Firebase'],
      features: [
        'Health condition monitoring',
        'Personalized suggestions',
        'Modular UI design',
        'Firebase data management',
        'Comprehensive testing'
      ],
      project_link: 'https://github.com/PKD118/CFL'
    },
    {
      title: 'Teleport 24/7',
      description: 'Courier management platforms built with both Laravel and Java NetBeans for end-to-end delivery operations.',
      technologies: ['Java', 'Laravel', 'Apache Derby', 'MySQL'],
      achievements: ['Best Java Project – CSE 2200 Course, 2022'],
      features: [
        'Cross-platform interface',
        'Backend integration',
        'Delivery operations management',
        'Database connectivity',
        'Multi-platform development'
      ],
      project_link: 'https://github.com/PKD118/Teleport-Java-App'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Biduyt Das</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === item
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                        : 'text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                    activeSection === item
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                      : 'text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="mb-8">
              <img 
                src={userImage} 
                alt="Biduyt Das"
                className="w-32 h-32 mx-auto mb-6 rounded-full object-cover shadow-lg"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Biduyt Das</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
              Fresh CSE graduate passionate about iOS and Android development, 
              full-stack projects, and quality assurance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
              >
                View My Work
              </Button>
              <Button 
                variant="outline" 
                className="px-8 py-3 text-lg"
                onClick={() => scrollToSection('contact')}
              >
                Get In Touch
              </Button>
            </div>
            <div className="flex justify-center space-x-6 mt-8">
              <a href="mailto:pkdasbiduyt@gmail.com" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                <Mail className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/biduytdas/" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://github.com/PKD118" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">About Me</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              I'm a passionate software developer with strong foundations in computer science and hands-on experience in full-stack development.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">My Journey</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                As a Fresh Computer Science graduate from Khulna University of Engineering & Technology, 
                I've developed strong foundations in software development, object-oriented programming, and full-stack project experience.
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                I'm hands-on with multiple programming languages including Java, C++, Python, and web/mobile frameworks 
                like Firebase and SwiftUI. My experience spans debugging, manual and UI testing, and version control workflows.
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                I'm passionate about writing clean, maintainable code and eager to contribute to scalable backend and frontend systems. 
                I also have experience in quality assurance, with knowledge of manual testing, basic test automation, and defect tracking.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-slate-600 dark:text-slate-300">
                  <MapPin className="h-5 w-5 mr-2" />
                  Sylhet, Bangladesh
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-300">
                  <Phone className="h-5 w-5 mr-2" />
                  +8801637793410
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">BSc Engineering in CSE</h4>
                      <p className="text-slate-600 dark:text-slate-300">Khulna University Of Engineering & Technology</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">2020 - Present</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">Higher Secondary Certificate</h4>
                      <p className="text-slate-600 dark:text-slate-300">MC College</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">2017 - 2019</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Interests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {['Table Tennis','AI', 'Prompt Engineering', 'Software Architecture', 'Blogging', 'Team Collaboration', 'Agile Practices'].map((interest) => (
                      <Badge key={interest} variant="secondary">{interest}</Badge>
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-4">
                    Check out my blog: <a href="https://learnwithbiduyt.blogspot.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">learnwithbiduyt.blogspot.com</a>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Skills & Technologies</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              A comprehensive overview of my technical skills and expertise across various domains.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Programming Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.languages.map((skill) => (
                    <Badge key={skill} className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Frameworks & Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.frameworks.map((skill) => (
                    <Badge key={skill} className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Databases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.databases.map((skill) => (
                    <Badge key={skill} className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tools & Platforms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((skill) => (
                    <Badge key={skill} className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Software Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.practices.map((skill) => (
                    <Badge key={skill} className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Featured Projects</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Here are some of my notable projects that showcase my skills in full-stack development, mobile apps, and quality assurance.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-2">Key Features:</h4>
                      <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {project.achievements && (
                      <div>
                        <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-2">Achievements:</h4>
                        <div className="space-y-1">
                          {project.achievements.map((achievement, idx) => (
                            <Badge key={idx} className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs">
                              🏆 {achievement}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {project.project_link && (
                    <div className="mt-4">
                      <a href={project.project_link} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="w-full">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Project
                        </Button>
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

{/* Experience Section */}
<section id="experience" className="py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Experience</h2>
      <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
        My leadership and organizational experience that has shaped my collaborative and project management skills.
      </p>
    </div>
    
    <div className="max-w-3xl mx-auto space-y-8">
      {/* General Secretary */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">General Secretary</CardTitle>
              <CardDescription className="text-lg">CSE Association, KUET</CardDescription>
            </div>
            <Badge variant="outline">2023/04 – 2024/04</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-slate-600 dark:text-slate-300">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Coordinated operations and communication for over 500 students
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Fostered collaboration across technical, creative, and academic teams
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Cultivated skills in leadership, accountability, and team empathy
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Developed strong attention to detail, task tracking, and documentation practices—skills now applied in QA workflows
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* iOS Developer Intern */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">iOS Developer Intern</CardTitle>
              <CardDescription className="text-lg">SahiTech Ltd. (Remote)</CardDescription>
              <p className="text-sm text-slate-500 dark:text-slate-400">Dhaka, Bangladesh (working from home)</p>
            </div>
            <Badge variant="outline">2025/06 – Present</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-slate-600 dark:text-slate-300">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Developed iOS, iPadOS, and watchOS features using Swift and SwiftUI
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Integrated Firebase (Auth, Firestore) and REST APIs for secure, real-time data sync
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Created modular UI components following clean architecture principles
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Built WidgetKit extensions and lightweight Watch complications
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
</section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Get In Touch</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              I'm always open to discussing new opportunities, collaborations, or just having a chat about technology.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                  <CardDescription>Feel free to reach out through any of these channels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Email</p>
                      <a href="mailto:pkdasbiduyt@gmail.com" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
                        pkdasbiduyt@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Phone</p>
                      <a href="tel:+8801637793410" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
                        +8801637793410
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Location</p>
                      <p className="text-slate-600 dark:text-slate-300">Sylhet, Bangladesh</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Linkedin className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">LinkedIn</p>
                      <a href="https://www.linkedin.com/in/biduytdas/" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
                        linkedin.com/in/biduytdas
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Github className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">GitHub</p>
                      <a href="https://github.com/PKD118" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
                        github.com/PKD118
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Let's Connect</CardTitle>
                  <CardDescription>I'm interested in opportunities in software development and quality assurance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600 dark:text-slate-300">
                    I'm currently looking for opportunities in:
                  </p>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      Mobile App Development (iOS, Android)
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      Software Development (Full-stack, Backend, Frontend)
                    </li>
                  </ul>
                  
                  <div className="pt-4">
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      onClick={() => window.open('mailto:pkdasbiduyt@gmail.com?subject=Portfolio Inquiry', '_blank')}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Biduyt Das</h3>
            <p className="text-slate-400 mb-6">iOS and Mobile App Developer</p>
            <div className="flex justify-center space-x-6 mb-8">
              <a href="mailto:pkdasbiduyt@gmail.com" className="text-slate-400 hover:text-white transition-colors">
                <Mail className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com/in/biduytdas" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://github.com/PKD118" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Github className="h-6 w-6" />
              </a>
            </div>
            <div className="border-t border-slate-800 pt-8">
              <p className="text-slate-400 text-sm">
                © 2024 Biduyt Das. Built with React and Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

