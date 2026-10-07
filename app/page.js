import Image from "next/image";
import SplashScreen from "./SplashScreen";
import PortfolioMotion from "./PortfolioMotion";
import PdfShowcase from "./PdfShowcase";

const projects = [
  { title: "Simkopdes", type: "Public services · Design system", url: "https://simkopdes.go.id/", image: "simkopdes", description: "A portal for Koperasi Desa/Kelurahan Merah Putih. Cooperative services, brought into one place.", color: "sage" },
  { title: "Manajer Agenda", type: "Work management · Web app", url: "https://manajer-agenda.vercel.app/", image: "agenda", description: "Calendars, Kanban tasks, meeting rooms, and reports. A place to keep the work organised.", color: "lavender" },
  { title: "Kemenkop Arcade", type: "Interactive games · Web", url: "https://kemenkop-arcade.vercel.app/", image: "arcade", description: "A different way to explore cooperatives: deliver products, manage a cooperative, and play through quizzes.", color: "yellow" },
  { title: "Treash", type: "Waste management · Website", url: "https://treash.vercel.app/", image: "treash", description: "Introducing a waste management app, from waste scanning and collector tracking to recycling education.", color: "green" },
  { title: "Sambi.co", type: "Student freelancing · Platform", url: "https://sambi-co.vercel.app/", image: "sambi", description: "Connecting Indonesian students with freelance clients, from student verification to project applications.", color: "peach" },
];
const experience = [
  ["Kementerian Koperasi RI", "UI/UX Designer", "Mar 2025 — Present", "Design systems and frontend for Koperasi Merah Putih."],
  ["KontraS", "UI/UX Designer", "Sep 2023 — Mar 2024", "Website redesign, user flows, navigation, and visual identity."],
];
const achievements = [
  ["1st place", "UI/UX Competition", "Pekan IT 2022"],
  ["1st place", "UI/UX Competition", "Semantik 2023"],
  ["1st place", "Business Plan Competition · UI Designer", "Compfair 2024"],
  ["1st place", "Project Plan Competition · UI Designer & Front End", "Semantik 2025"],
  ["Leader", "Google Developer Student Clubs Unsika", "Aug 2023 — Oct 2024 · 592 active members"],
  ["Head of Education Division", "Himtika Unsika", "Dec 2023 — Dec 2024"],
  ["Board Member, Commission B", "BLM Fasilkom Unsika", "Jan 2025 — Present"],
  ["The Most Outstanding · Productive · Discipline Staff", "Himtika Awards", "2023"],
];
function Pattern({ variant = 2, className = "" }) {
  return <Image className={`pattern ${className}`} src={`/images/Pattern ${variant}.svg`} width={653} height={653} alt="" aria-hidden="true" />;
}
export default function Home() {
  return <>
    <SplashScreen />
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="header-shell"><header className="site-header"><a className="wordmark" href="#top" aria-label="Bintang Danuarta, home"><Image src="/images/logo.png" alt="Bintang Danuarta" width={48} height={48} priority /></a><nav className="desktop-nav" aria-label="Primary"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Let’s talk ↗</a></nav><PortfolioMotion /></header></div>
    <main id="main">
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-topline"><span>Hello</span><span>I’m...</span></div>
        <h1 id="hero-title" className="hero-name"><span>BINTANG</span><span>DANUARTA<span className="name-period">.</span></span></h1>
        <p className="hero-intro"><span className="wordflip" aria-label="Designer · Developer · Creative thinker"><span>Designer</span><span>Developer</span><span>Creative thinker</span></span><span className="intro-suffix">— shaping ideas into digital experiences.</span></p>
        <div className="hero-caption"><span>Portfolio / Selected work</span><span>Scroll to explore ↓</span></div>
      </section>
      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-heading" data-reveal><p className="eyebrow">01 / Selected work</p><h2 id="work-title">What  <span className="serif-text">I do</span></h2><p className="section-intro">Five projects across public services, productivity, play, and everyday life.</p></div>
        <div className="project-list">{projects.map((project, index) => <article className={`project ${project.color}`} key={project.title} style={{ "--card-index": index }}>
          <a className="project-visual" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} website in a new tab`}><span className="project-index">0{index + 1} / 05</span><div className="project-screen"><Image src={`/projects/${project.image}.jpg`} alt={`${project.title} website homepage`} width={1440} height={1000} sizes="(max-width: 720px) 90vw, 65vw" /></div><span className="project-open">Visit website ↗</span></a>
          <div className="project-info"><p className="eyebrow">{project.type}</p><h3><a href={project.url} target="_blank" rel="noopener noreferrer">{project.title}<span>↗</span></a></h3><p>{project.description}</p></div>
        </article>)}</div>
      </section>
      <PdfShowcase />
      <div className="about-experience-region">
      <section className="about-section" id="about" aria-labelledby="about-title">
        <figure className="about-portrait" data-reveal>
          <div className="portrait-placeholder">
            <Image
              src="/images/bintang.jpg"
              alt="Bintang Danuarta"
              fill
              sizes="(max-width: 720px) 90vw, (max-width: 1200px) 40vw, 460px"
              className="portrait-photo"
            />
            <Pattern variant={1} className="portrait-pattern" />
          </div>
          <figcaption><span>Bintang Danuarta</span><span>Bekasi, Indonesia</span></figcaption>
        </figure>
        <div className="about-copy" data-reveal>
          <p className="eyebrow">02 / About me</p>
          <h2 id="about-title">Interfaces.<br /><span className="serif-text">With people in mind.</span></h2>
          <p>I’m Bintang Danuarta, a UI/UX designer based in Bekasi, Indonesia. My work centres on web interfaces, with attention to how people navigate a product and find the information they need.</p>
          <p>The design work includes user flows, page layouts, and visual hierarchy. These decisions shape how information is presented and how people move from one task to the next.</p>
          <p>Design systems are another part of my work, connecting individual screens through shared components and patterns. The focus is on consistency while allowing room for the needs of each page.</p>
          <a className="text-link" href="/bintang-danuarta-cv.pdf" download>Download my CV <span aria-hidden="true">↓</span></a>
        </div>
      </section>
      <section className="experience-section" aria-labelledby="experience-title"><div className="experience-heading" data-reveal><p className="eyebrow">03 / Experience</p><h2 id="experience-title">Where I’ve<br /><span className="serif-text">put it to work.</span></h2></div><div className="experience-content"><div className="experience-list">{experience.map(([company, role, date, detail]) => <article className="experience-row" key={company} data-reveal><span className="experience-date">{date}</span><div><h3 className="institution-name" aria-label={company}><span aria-hidden="true">{company.split(" ").map((word, index) => <span className="institution-word" key={`${word}-${index}`}><span style={{ "--word-index": index }}>{word}</span>{" "}</span>)}</span></h3><p>{role}</p><p className="experience-detail">{detail}</p></div></article>)}</div><div className="achievements-block"><p className="eyebrow">Also beyond the day job</p><div className="achievements-list">{achievements.map(([role, event, date], index) => <article className="achievement-row" key={`${role}-${event}-${index}`} data-reveal><span className="achievement-date">{date}</span><div><h3>{role}</h3><p>{event}</p></div></article>)}</div></div></div></section>
      </div>
      <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="contact-top"><p className="eyebrow">05 / Have a project in mind?</p><div className="contact-pattern-wrap" data-reveal><Pattern variant={1} className="contact-pattern" /></div></div><h2 id="contact-title" data-reveal>LET’S<br /><a href="mailto:bintangdanuarta@outlook.com">TALK<span>↗</span></a></h2><div className="contact-bottom"><a href="mailto:bintangdanuarta@outlook.com">bintangdanuarta@outlook.com</a><div><a href="https://www.linkedin.com/in/bintang-danuarta" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://dribbble.com/BinDesign27" target="_blank" rel="noopener noreferrer">Dribbble ↗</a></div></div></section>
    </main>
  </>;
}