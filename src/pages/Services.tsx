import { ContactCallout, ProcessLine, Reveal, SectionLabel, ServiceAccordion } from '../components';

export default function Services({ service }: { service: string }) {
  return <>
    <section className="page-intro"><div className="container"><Reveal><SectionLabel>Our services</SectionLabel><h1>FROM FIRST IDEA.<br />TO <span className="accent">FINAL FRAME.</span></h1>
      <div className="intro-bottom"><p>Seven disciplines. One connected creative system.<br />Everything your vision needs to become real.</p><span className="intro-note">STRATEGY + DESIGN + PRODUCTION</span></div>
    </Reveal></div></section>
    <div className="container services-page-list"><ServiceAccordion detailed initialService={service} /></div>
    <section className="service-philosophy section-padding"><div className="container"><Reveal><SectionLabel>Better, together</SectionLabel><h2>NOT SEPARATE SERVICES.<br /><span className="accent">A SHARED CREATIVE VISION.</span></h2><p>Choose a single discipline or bring us the whole challenge. We connect the right thinking, people and production to make the work feel like one.</p></Reveal></div></section>
    <ProcessLine compact /><ContactCallout />
  </>;
}