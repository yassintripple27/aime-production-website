import { useState } from 'react';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import { BackLink, GalleryLightbox, LinkButton, Reveal, SectionLabel } from '../components';
import { projects } from '../data';
import type { Project as ProjectData } from '../data';

export default function Project({ project }: { project: ProjectData }) {
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const next = projects[(projects.findIndex(item => item.slug === project.slug) + 1) % projects.length];
  const chapters = [
    { number: '02', title: 'THE CHALLENGE', body: project.challenge },
    { number: '03', title: 'THE STRATEGY', body: project.strategy },
    { number: '04', title: 'THE CREATIVE DIRECTION', body: project.direction },
    { number: '05', title: 'THE PRODUCTION', body: project.production },
  ];
  return <>
    <section className="project-intro page-intro"><div className="container"><BackLink /><Reveal><SectionLabel number="01">Project introduction</SectionLabel><h1>{project.title}<span className="accent">.</span></h1><p className="project-subtitle">{project.subtitle}</p>
      <dl className="project-facts"><div><dt>CLIENT / BRAND</dt><dd>{project.client}</dd></div><div><dt>YEAR</dt><dd>{project.year}</dd></div><div><dt>DISCIPLINE</dt><dd>{project.categories.join(' / ')}</dd></div></dl>
    </Reveal></div></section>
    <div className="project-cover"><img src={project.image} alt={project.imageAlt} fetchPriority="high" /></div>
    <section className="project-chapters section-padding"><div className="container">{chapters.map(chapter => <Reveal key={chapter.number} className="project-chapter"><SectionLabel number={chapter.number}>{chapter.title}</SectionLabel><p>{chapter.body}</p></Reveal>)}</div></section>
    <section className="project-result"><div className="container"><Reveal className="result-intro"><SectionLabel number="06">The final result</SectionLabel><h2>{project.subtitle}</h2><p>{project.result}</p></Reveal></div>
      <Reveal className="result-image"><img src={project.gallery[0].src} alt={project.gallery[0].alt} loading="lazy" /></Reveal>
    </section>
    <section className="project-gallery section-padding"><div className="container"><Reveal className="section-topline"><div><SectionLabel number="07">The details tell the story</SectionLabel><h2>PROJECT GALLERY.</h2></div><span className="gallery-instruction">SELECT AN IMAGE TO EXPLORE <Maximize2 size={13} /></span></Reveal>
      <div className="gallery-grid">{project.gallery.map((image, i) => <Reveal key={`${project.slug}-${i}`} delay={i * 0.07}><button className={`gallery-item${image.detail ? ' gallery-detail' : ''}`} onClick={() => setGalleryIndex(i)} aria-label={`Expand image: ${image.caption}`}><img src={image.src} alt={image.alt} loading="lazy" style={{ objectPosition: image.position || 'center' }} /><span className="gallery-expand"><Maximize2 size={20} /></span></button><p className="gallery-caption"><span>0{i + 1}</span>{image.caption}</p></Reveal>)}</div>
      {project.credit && <p className="photo-credit">{project.credit}</p>}
      <div className="project-inquiry"><p>Imagining something like this?</p><LinkButton to="/contact" variant="outline">Let's talk about it</LinkButton></div>
    </div></section>
    <section className="next-project"><div className="container"><SectionLabel number="08">Keep exploring</SectionLabel><a href={`#/work/${next.slug}`}><div><span>NEXT PROJECT</span><h2>{next.title}</h2></div><ArrowUpRight strokeWidth={1.1} /></a></div></section>
    <GalleryLightbox images={project.gallery} index={galleryIndex} onIndexChange={setGalleryIndex} onClose={() => setGalleryIndex(null)} />
  </>;
}