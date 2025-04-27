"use client"

import { useState, useEffect, useRef } from "react"
import {
  ChevronDown,
  Code,
  Zap,
  Globe,
  Package,
  Heart,
  Instagram,
  Contact,
} from "lucide-react"

import "./index.css"; 

function App() {
  const [searchActive, setSearchActive] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const featuresRef = useRef(null)
  const ecosystemRef = useRef(null)
  const communityRef = useRef(null)
  const sponsorsRef = useRef(null)

  const techTeam = [
      { id:"1", pf:"/adityaraj.png",name:"Aditya Raj" },
      { id:"2", pf:"/ranj.png",name:"Ranjeesh Pandey" },
      { id:"3", pf:"/deepak.png",name:"Deepak Manral" },
  ]

  const creativeTeam = [
    { id:"1", pf:"/omtyagi.png",name:"Om Tyagi" },
    { id:"2", pf:"/aishwarya.png",name:"Aishwarya Singh" },
    { id:"3", pf:"/riyat.png",name:"Riya Tyagi" },
    { id:"4", pf:"/anushka.png",name:"Anushka Sharma" },
  //  { id:"5", pf:"/sample-profile-photo.png",name:"nam5" },
   // { id:"6", pf:"/sample-profile-photo.png",name:"nam6" },
]

const managmentTeam = [
  { id:"1", pf:"/kp.png",name:"Kartikey Pandey" },
  { id:"2", pf:"/ravi.png",name:"Ravi Mishra" },
  { id:"3", pf:"/shivam.png",name:"Shivam Kasaudhan" },
  { id:"4", pf:"/rka.png",name:"Rajesh Attri" },
 // { id:"5", pf:"/shivam.png",name:"Shivam Kasaudhan" },
 // { id:"4", pf:"/sample-profile-photo.png",name:"nam4" },
 // { id:"5", pf:"/sample-profile-photo.png",name:"nam5" },
 // { id:"6", pf:"/sample-profile-photo.png",name:"nam6" },
]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    const sections = [featuresRef.current, ecosystemRef.current, communityRef.current, sponsorsRef.current]

    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el)
    })

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section)
      })
      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.unobserve(el)
      })
    }
  }, [])

  return (
    <div className="te-app">
      {/* Navigation Bar */}
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          <div className="navbar-left">
            <a href="#" className="logo">
              <div className="te-logo">
                <div className="enthiran-logo-bg"></div>
                <span>Team Enthiran</span>
              </div>
            </a>
          </div>

          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`hamburger ${mobileMenuOpen ? "open" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          <nav className={`navbar-nav ${mobileMenuOpen ? "mobile-open" : ""}`}>
            <a href="https://maps.app.goo.gl/7xVqdz3juV9jGCdr5" className="nav-link">
              Location
            </a>
            <a href="#ecosystem" className="nav-link">
              Registrations
            </a>
            <a href="#prizes_" className="nav-link">
              Prizes
            </a>
            <div className="dropdown">
              <button className="dropdown-btn">
                Our Team <ChevronDown size={16} />
              </button>
              <div className="dropdown-content">
                <a href="#technicalteam">Technical</a>
                <a href="#creativeteam">Creative</a>
                <a href="#managementteam">Management</a>
              </div>
            </div>
            
            <div className="social-links">
              <a href="https://www.instagram.com/teamenthiran/" className="social-link">
                <Instagram size={19} />
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="hero">
          <div className="te-conf animate-on-scroll">
            <div className="te-conf-badge">
              <div className="te-conf-icon">
              </div>
              Team Enthiran
            </div>
          </div>

          <h1 className="hero-title animate-on-scroll">
            WebMimic
            <br />
            <span className="hero-subtitle">Hackathon</span>
          </h1>

          <p className="hero-description animate-on-scroll">
            A quick Web Development Hackathon to test
            <br />
            your skills and win exiciting prizes.
          </p>

          <div className="hero-buttons animate-on-scroll">
            <a href="https://forms.gle/K6a6VoHBshASNyHX8" className="btn btn-primary">
              Registrations
            </a>
            <a href="https://wa.me/919450579493" className="btn btn-secondary">
              <Contact size={18} />
              Contact Us
            </a>
          </div>

          {/* Background Animation */}
          <div className="background-animation">

            <div className="line line-1">json</div>
            <div className="line line-2">html</div>
            <div className="line line-3">css</div>
            <div className="line line-4">js</div>
            <div className="line line-5">ts</div>
            <div className="line line-6">jsx</div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features-section" ref={featuresRef}>
          <div className="container">
            <h2 className="section-title animate-on-scroll">
              Quick <span className="gradient-text">Hackathon</span>
            </h2>
            <p className="section-description animate-on-scroll">
              A Quick Web Development Hackathon to test your skills in web development in Two Hours using HTML, CSS and JS
            </p>

            <div className="features-grid">
              <div className="feature-card animate-on-scroll">
                <div className="feature-icon">
                  <Zap size={24} />
                </div>
                <h3>Limted Time</h3>
                <p>Start to End in Two Hours only. Skill Matters</p>
              </div>

              <div className="feature-card animate-on-scroll">
                <div className="feature-icon">
                  <Code size={24} />
                </div>
                <h3>Code</h3>
                <p>Code in HTML, CSS and JS only in offline platforms.</p>
              </div>

              <div className="feature-card animate-on-scroll">
                <div className="feature-icon">
                  <Package size={24} />
                </div>
                <h3>Resources</h3>
                <p>Resources Will be provided on the spot.</p>
              </div>

              <div className="feature-card animate-on-scroll">
                <div className="feature-icon">
                  <Globe size={24} />
                </div>
                <h3>NO Cheating</h3>
                <p>Say NO to internet and AI Tools, test your skills.</p>
              </div>
            </div>

            <div className="code-example animate-on-scroll">
              <div className="code-header">
                <span>Terminal</span>
              </div>
              <div className="code-content">
                <pre>
                 <code>{`console.log(\`Are you ready? \${true | false}\`);`}</code>
                 </pre>
               </div>

            </div>
          </div>
        </section>

        {/* Ecosystem Section */}
        <section id="prizes_" className="ecosystem-section" ref={ecosystemRef}>
          <div className="container">
            <h2 className="section-title animate-on-scroll">
              Exiting <span className="gradient-text">Rewards</span>
            </h2>
            <p className="section-description animate-on-scroll">
              Prize pool worth upto Rs.5000
            </p>

            <div className="frameworks-grid">
              <div className="framework-card animate-on-scroll">
                <div className="framework-logo headphone-logo"></div>
                <h3>Headphones</h3>
              </div>

              <div className="framework-card animate-on-scroll">
                <div className="framework-logo neck-logo"></div>
                <h3>Neck Band</h3>
              </div>

              <div className="framework-card animate-on-scroll">
                <div className="framework-logo spk-logo"></div>
                <h3>Speakers</h3>
              </div>

              <div className="framework-card animate-on-scroll">
                <div className="framework-logo mouse-logo"></div>
                <h3>Gaming Mouse</h3>
              </div>

              <div className="framework-card animate-on-scroll">
                <div className="framework-logo certi-logo"></div>
                <h3>Certificates</h3>
              </div>

            </div>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" className="community-section" ref={communityRef}>
          <div className="container">
            <h2 className="section-title animate-on-scroll">
              About <span className="gradient-text">Team Enthiran</span>
            </h2>
            <p className="section-description animate-on-scroll">
              Official Technical Club of GCET
            </p>

            <div className="stats-grid">
              <div className="stat-card animate-on-scroll">
                <div className="stat-number">70+</div>
                <div className="stat-label">Members</div>
              </div>

              <div className="stat-card animate-on-scroll">
                <div className="stat-number">30+</div>
                <div className="stat-label">Core Team</div>
              </div>

              <div className="stat-card animate-on-scroll">
                <div className="stat-number">20+</div>
                <div className="stat-label">Sucessfull Hackathons</div>
              </div>

              <div className="stat-card animate-on-scroll">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Rewards Given</div>
              </div>
            </div>

            <div className="testimonials-grid">
              <div className="testimonial-card animate-on-scroll">
                <p>"We are the Technical Face of the Galgotias College. We Create, Innovate and Grow"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                  </div>
                  <div className="author-info">
                    <div className="author-name">Siddharth Mishra</div>
                    <div className="author-role">Head</div>
                  </div>
                </div>
              </div>

              <div className="testimonial-card animate-on-scroll">
                <p>"Team Enthiran gives me more learning exprience and oppourtinuties in the college" </p>
                     <div className="testimonial-author">
                  <div className="author-avatar2">
                  </div>
                  <div className="author-info">
                    <div className="author-name">Aditya Raj</div>
                    <div className="author-role">Co-ordinator</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sponsors Section */}
        <section id="sponsors" className="sponsors-section" ref={sponsorsRef}>
  <div className="container">
    <h2 className="section-title animate-on-scroll">
      Our <span className="gradient-text">Sponsors</span>
    </h2>
    <p className="section-description animate-on-scroll">
      We are proudly sponsored by Physics Wallah and Student Council GCET.
    </p>

    <div className="sponsors-grid">
      <div className="sponsor-tier">
        <h3 className="tier-title">Sponsored By</h3>
        <div className="sponsor-logos">
          <div className="sponsor-logo animate-on-scroll">
            <img src="/pw.jpg" alt="Sponsor Logo 1" />
          </div>
          <div className="sponsor-logo animate-on-scroll">
            <img src="/council.png" alt="Sponsor Logo 2" />
          </div>
        </div>
      </div>
    </div>

    <div className="become-sponsor animate-on-scroll">
      <a href="https://forms.gle/Qgezbx7Ba6kuGn2w8" className="btn btn-primary">
        <Heart size={16} />
        Become a Sponsor
      </a>
    </div>
  </div>
</section>

        {/* Our Team */}
<section className="our-team-section" id="our-team">
  <div className="container">
    <div className="our-team-box">
      <h2>Our <span className="gradient-text">Team</span></h2>
    </div>
    <div className="team-head">
  
    <h2 className="gradient-title">Team Heads</h2>
   

    <div className="head">
    <div className="head_1 ">
    <span className="head_1_profile">

    </span>
    <span>
      <h2>SIDDHARTH MISHRA</h2>
    </span>
    </div>
    <div className="head_2">
      <span className="head_2_profile">
       
      </span>
      <span>
        <h2>SHARIYA ZEHRA</h2>
      </span> 
      </div>
      
    </div>
  </div>
  <section id="technicalteam">
  <div className=" ">
  <h2 className="gradient-title">Technical Team</h2>
  <div className=" team">
  {techTeam.map((member)=>(
      <div className="techy" key={member.id}>

        <span className="member_profile"  style={{
          display:"inline-block",
        width: "8rem",
        height: "8rem",
        backgroundImage: `url("${member.pf}")`,
        borderRadius:"50%",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
             
        </span>

      <span>
        <h2>{member.name}</h2>
      </span>
      </div>
    ))}
  </div>
      </div>
      </section>

 <section id="creativeteam">
  <div className=" ">
  <h2 className="gradient-title">Creative Team</h2>
  <div className=" team">
  {creativeTeam.map((member)=>(
      <div className="techy" key={member.id}>

        <span className="member_profile"  style={{
          display:"inline-block",
        width: "8rem",
        height: "8rem",
        backgroundImage: `url("${member.pf}")`,
        borderRadius:"50%",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
             
        </span>

      <span>
        <h2>{member.name}</h2>
      </span>
      </div>
    ))}
  </div>
  </div>
  </section>

<section id="managementteam">
  <div className=" ">
  <h2 className="gradient-title">Managment Team</h2>
  <div className=" team">
  {managmentTeam.map((member)=>(
      <div className="techy" key={member.id}>

        <span className="member_profile"  style={{
          display:"inline-block",
        width: "8rem",
        height: "8rem",
        backgroundImage: `url("${member.pf}")`,
        borderRadius:"50%",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
             
        </span>

      <span>
        <h2>{member.name}</h2>
      </span>
      </div>
    ))}
  </div>
      </div>  
      </section>
      
    </div>
</section>

      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-bottom">
            <div className="copyright">© {new Date().getFullYear()} Team Enthiran</div>
            <div className="footer-meta-links">
              <a href="mailto:adityaraj94505@gmail.com">Contact Developer</a>
              <a href="https://www.freepik.com/">Images by FreePik</a>
              <a href="https://www.vite.dev">Inspired by vite.dev</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
