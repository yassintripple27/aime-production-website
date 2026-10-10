import { ArrowUpRight } from 'lucide-react';
import { ContactCallout, LinkButton, ProcessLine, Reveal, SectionLabel } from '../components';

const principles = [
  { number: '01', title: 'CREATIVE THINKING', text: 'We develop ideas that have meaning, purpose and visual direction. Curiosity is where every good story begins.' },
  { number: '02', title: 'STRATEGIC DIRECTION', text: 'We build creative solutions around brand objectives and communication goals. Good design starts with the right questions.' },
  { number: '03', title: 'VISUAL PRODUCTION', text: 'We turn ideas into identities, content, films, photography, graphics and visual experiences. Thoughtfully made, from beginning to end.' },
];

export default function About() {
  return <>
    <section className="page-intro about-intro"><div className="container"><Reveal><SectionLabel>About AIME</SectionLabel>
      <h1>WE CREATE<br />WITH <span className="accent">PURPOSE.</span></h1>
      <div className="intro-bottom"><p>Independent thinking. Connected disciplines.<br />A shared belief in the power of a good idea.</p><span className="intro-role">CREATIVE DIRECTOR<br />/ BRAND DESIGNER</span></div>
    </Reveal></div></section>
    <Reveal className="about-full-image"><img src="/images/forma-space.jpg" alt="Sunlight moving across a thoughtfully designed architectural space" /></Reveal>
    <section className="section-padding studio-story"><div className="container story-grid"><Reveal><SectionLabel number="01">The way we see it</SectionLabel></Reveal><Reveal>
      <h2>ONE STUDIO.<br />MANY WAYS TO<br /><span className="accent">MAKE AN IMPACT.</span></h2>
      <p>AIME Production brings strategy, design and production into one creative conversation. We work with brands, organizations and individuals who believe that how something is made matters as much as how it looks.</p>
      <p>Our approach is collaborative and intentional. We listen closely, question the obvious and connect the right disciplines to turn a starting point into a complete visual experience.</p>
      <p className="serif-statement">Visual stories with purpose.</p>
    </Reveal></div></section>
    <section className="principles-section section-padding"><div className="container"><Reveal><SectionLabel number="02">How we think</SectionLabel><h2>THOUGHTFUL AT EVERY STAGE.</h2></Reveal>
      <div className="principles-grid">{principles.map((principle, i) => <Reveal key={principle.number} delay={i * 0.08}><span className="principle-number">{principle.number}<ArrowUpRight size={19} /></span><h3>{principle.title}</h3><p>{principle.text}</p></Reveal>)}</div>
    </div></section>
    <ProcessLine compact />
    <section className="skills-section section-padding"><div className="container"><Reveal><SectionLabel number="03" light>The craft behind the idea</SectionLabel><h2>THINKING MEETS MAKING.</h2></Reveal>
      <div className="skills-grid"><Reveal><h3>Skills</h3><p className="skills-intro">A connected set of creative disciplines.</p><ul>{['Creative Direction', 'Brand Strategy & Identity', 'Visual Communication', 'Content & Campaign Development', 'Film Direction & Motion Design', 'Photography & Art Direction', '2D / 3D Design & Visualisation'].map(skill => <li key={skill}>{skill}</li>)}</ul></Reveal>
        <Reveal delay={0.1}><h3>Software / Tools</h3><p className="skills-intro">The tools serve the idea. Never the other way around.</p><ul>{['Adobe Illustrator & Photoshop', 'Adobe InDesign', 'Adobe Premiere Pro', 'Adobe After Effects', 'DaVinci Resolve', 'Figma', 'Blender & Cinema 4D'].map(tool => <li key={tool}>{tool}</li>)}</ul></Reveal>
      </div><LinkButton to="/services">See what we can create</LinkButton>
    </div></section>
    <ContactCallout />
  </>;
}