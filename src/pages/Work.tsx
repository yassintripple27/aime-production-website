import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ContactCallout, ProjectCard, Reveal, SectionLabel } from '../components';
import { projectCategories, projects } from '../data';

export default function Work() {
  const [category, setCategory] = useState('All');
  const visible = category === 'All' ? projects : projects.filter(project => project.categories.includes(category));
  return <>
    <section className="page-intro work-intro"><div className="container"><Reveal><SectionLabel>Ideas, made real</SectionLabel><h1>SELECTED<br /><span className="accent">WORK.</span><span className="heading-count">(0{projects.length})</span></h1>
      <div className="intro-bottom"><p>Ideas transformed into identities, experiences<br />and visual stories.</p><span className="intro-note">A CONTINUOUS CREATIVE EXPLORATION</span></div>
    </Reveal></div></section>
    <section className="work-list-section"><div className="container">
      <div className="project-filters" role="group" aria-label="Filter projects by discipline">{projectCategories.map(item => <button key={item} className={category === item ? 'active' : ''} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}<span>{item === 'All' ? projects.length : projects.filter(project => project.categories.includes(item)).length}</span></button>)}</div>
      <div className="work-results-line"><p aria-live="polite">{visible.length} {visible.length === 1 ? 'project' : 'projects'}{category !== 'All' ? ` / ${category}` : ' / All disciplines'}</p><span>STUDIO CONCEPTS & VISUAL STUDIES</span></div>
      <motion.div layout className="work-project-grid"><AnimatePresence mode="popLayout">{visible.map(project => <motion.article key={project.slug} layout initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.3 }}>
        <ProjectCard project={project} index={projects.indexOf(project)} />
      </motion.article>)}</AnimatePresence></motion.div>
      <p className="concept-note work-concept-note">These self-initiated projects showcase our creative direction and capabilities. Concept imagery is illustrative; photography credits are included in each relevant study.</p>
    </div></section>
    <ContactCallout />
  </>;
}