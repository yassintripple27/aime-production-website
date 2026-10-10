import { motion, useReducedMotion } from 'framer-motion';
import { ContactCallout, LinkButton, ProcessLine, ProjectCard, Reveal, SectionLabel, ServiceAccordion, Wordmark } from '../components';
import { projects } from '../data';

export default function Home() {
  const reduced = useReducedMotion();
  return <>
    <section className="hero" aria-labelledby="hero-heading">
      <motion.img className="hero-image" src="/images/aime-hero.jpg" alt="A cinema camera sculpted by warm light in a dark production studio" fetchPriority="high"
        initial={{ scale: reduced ? 1 : 1.06 }} animate={{ scale: 1 }} transition={{ duration: 2.1, ease: [0.16, 1, 0.3, 1] }} />
      <div className="hero-shade" />
      <div className="container hero-inner">
        <motion.div className="hero-content" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: reduced ? 0 : 0.13 } } }}>
          <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.65 }} className="hero-brand"><Wordmark large /></motion.div>
          <motion.h1 id="hero-heading" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.65 }}>CREATE A STORY.<br />THAT <span>INSPIRES.</span></motion.h1>
          <motion.p className="hero-description" variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.65 }}>We create strategic, visual and cinematic experiences<br className="desktop-break" /> for brands, organizations and individuals.</motion.p>
          <motion.div className="hero-actions" variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.65 }}>
            <LinkButton to="/work" variant="primary">View projects</LinkButton><LinkButton to="/contact">Start a project</LinkButton>
          </motion.div>
        </motion.div>
      </div>
    </section>

    <div id="creative-process"><ProcessLine /></div>

    <section className="home-services section-padding" aria-labelledby="home-services-heading"><div className="container expertise-grid">
      <Reveal className="expertise-intro"><SectionLabel number="01">Our expertise</SectionLabel><h2 id="home-services-heading">WHAT WE<br />CREATE<span className="accent">.</span></h2>
        <p>Different disciplines. One creative vision.<br />From the first idea to the final experience.</p><LinkButton to="/services">Explore our services</LinkButton>
      </Reveal>
      <Reveal delay={0.1}><ServiceAccordion /></Reveal>
    </div></section>

    <section className="home-work section-padding" aria-labelledby="home-work-heading"><div className="container">
      <Reveal className="section-topline"><div><SectionLabel number="02">A few things we've made</SectionLabel><h2 id="home-work-heading">SELECTED WORK<span className="accent">.</span></h2></div><LinkButton to="/work">All projects</LinkButton></Reveal>
      <div className="home-project-grid">{projects.slice(0, 3).map((project, index) => <Reveal delay={index * 0.1} key={project.slug}><ProjectCard project={project} index={index} /></Reveal>)}</div>
      <p className="concept-note">A selection of self-initiated concepts and visual studies. An expression of what we can create together.</p>
    </div></section>

    <section className="about-teaser section-padding" aria-labelledby="about-teaser-heading"><div className="container">
      <Reveal><SectionLabel number="03" light>The studio</SectionLabel></Reveal>
      <div className="about-teaser-grid"><Reveal><h2 id="about-teaser-heading">WE CREATE<br />WITH PURPOSE<span>.</span></h2></Reveal><Reveal delay={0.1} className="about-teaser-copy">
        <p>AIME Production is an independent creative studio connecting strategy, design and production. We turn ideas into identities, experiences and visual stories that mean something.</p>
        <p className="serif-statement">Good thinking. Lasting impact.</p><LinkButton to="/about">Get to know AIME</LinkButton>
      </Reveal></div>
      <div className="about-teaser-baseline"><span>CREATIVE DIRECTOR / BRAND DESIGNER</span><span>INDEPENDENT BY DESIGN.</span></div>
    </div></section>
    <ContactCallout />
  </>;
}