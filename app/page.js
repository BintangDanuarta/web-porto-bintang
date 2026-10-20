import Image from "next/image";
import SplashScreen from "./SplashScreen";
import PortfolioMotion from "./PortfolioMotion";
import PdfShowcase from "./PdfShowcase";
import GallerySection from "./GallerySection";
import SkyGradient from "./SkyGradient";
import ThemeToggle from "./ThemeToggle";
import HoverSky from "./HoverSky";

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
  ["The Most Outstanding · Productive · Discipline Staff", "Himtika Awards", "2023"],
];
function Pattern({ variant = 2, className = "" }) {
  return <Image className={`pattern ${className}`} src={`/images/Pattern ${variant}.svg`} width={653} height={653} alt="" aria-hidden="true" />;
}
export default function Home() {
  return <>
    <SplashScreen />
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="header-shell"><header className="site-header"><a className="wordmark" href="#top" aria-label="Bintang Danuarta, home"><Image src="/images/logo.png" alt="Bintang Danuarta" width={48} height={48} priority /></a><nav className="desktop-nav" aria-label="Primary"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Let’s talk ↗</a></nav><ThemeToggle /><PortfolioMotion /></header></div>
    <main id="main">
      <section className="hero hero-sky" id="top" aria-labelledby="hero-title">
        <div className="hero-sky-bg" aria-hidden="true"><SkyGradient /></div>
        <div className="hero-content">
          <div className="hero-topline"><span>Hello I'm...</span></div>
        <h1 id="hero-title" className="hero-name"><span>BINTANG</span><span>DANUARTA<span className="name-period">.</span></span></h1>
        <p className="hero-intro"><span className="wordflip" aria-label="Designer · Developer · Creative thinker"><span>Designer</span><span>Developer</span><span>Creative thinker</span></span><span className="intro-suffix">— shaping ideas into digital experiences.</span></p>
        <div className="hero-caption"><span>Portofolio Page</span><span>Scroll to explore ↓</span></div>
        </div>
      </section>
      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-heading" data-reveal><p className="eyebrow">01 / Selected work</p><h2 id="work-title">What  <span className="serif-text">I do</span></h2><p className="section-intro">Five projects across public services, productivity, play, and everyday life.</p></div>
        <div className="project-list">{projects.map((project, index) => <HoverSky as="article" className={`project ${project.color}`} key={project.title} style={{ "--card-index": index }}>
          <a className="project-visual" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} website in a new tab`}><span className="project-index">0{index + 1} / 05</span><div className="project-screen"><Image src={`/projects/${project.image}.jpg`} alt={`${project.title} website homepage`} width={1440} height={1000} sizes="(max-width: 720px) 90vw, 65vw" /></div><span className="project-open">Visit website ↗</span></a>
          <div className="project-info"><p className="eyebrow">{project.type}</p><h3><a href={project.url} target="_blank" rel="noopener noreferrer">{project.title}<span>↗</span></a></h3><p>{project.description}</p></div>
        </HoverSky>)}</div>
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
      <GallerySection />
      <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="contact-top"><p className="eyebrow">05 / Have a project in mind?</p><div className="contact-pattern-wrap" data-reveal><Pattern variant={1} className="contact-pattern" /></div></div><h2 id="contact-title" data-reveal>LET’S<br /><a href="mailto:bintangdanuarta@outlook.com">TALK<span>↗</span></a></h2><div className="contact-bottom"><a href="mailto:bintangdanuarta@outlook.com">bintangdanuarta@outlook.com</a><div className="contact-socials"><a href="https://www.linkedin.com/in/bintang-danuarta" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg><span>LinkedIn</span></a><a href="https://dribbble.com/BinDesign27" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z" /></svg><span>Dribbble</span></a><a href="https://github.com/BintangDanuarta" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.75-1.32-3.75-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.16 1.71 1.16 1 1.7 2.61 1.21 3.25.93.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.51 0-1.22.44-2.21 1.16-2.99-.12-.28-.5-1.42.11-2.95 0 0 .95-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.1-1.44 3.04-1.14 3.04-1.14.61 1.53.23 2.67.12 2.95.72.78 1.15 1.77 1.15 2.99 0 4.28-2.61 5.22-5.1 5.5.4.34.76 1.03.76 2.08v3.06c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" /></svg><span>GitHub</span></a><a href="https://www.instagram.com/bintanggg277/" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" /></svg><span>Instagram</span></a></div></div></section>
    </main>
  </>;
}