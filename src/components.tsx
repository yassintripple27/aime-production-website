import { useEffect, useRef, useState } from 'react';
import type { ReactNode, RefObject } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Menu, Plus, X } from 'lucide-react';
import { navigation, services, studioEmail } from './data';
import type { GalleryImage, Project } from './data';

export function Wordmark({ large = false }: { large?: boolean }) {
  return (
    <span className={`wordmark${large ? ' wordmark-large' : ''}`} aria-label="AIME Production">
      <span className="wordmark-name">aime<span className="wordmark-dot" /></span>
      <span className="wordmark-sub">PRODUCTION</span>
    </span>
  );
}

export function LinkButton({ to, children, variant = 'text', className = '' }: {
  to: string; children: ReactNode; variant?: 'primary' | 'outline' | 'text'; className?: string;
}) {
  return (
    <a className={`link-button button-${variant} ${className}`} href={`#${to}`} onClick={() => {
      if (window.location.hash === `#${to}`) window.scrollTo({ top: 0, behavior: 'smooth' });
    }}>
      <span>{children}</span><ArrowUpRight size={17} strokeWidth={1.6} aria-hidden="true" />
    </a>
  );
}

export function SectionLabel({ number, children, light = false }: { number?: string; children: ReactNode; light?: boolean }) {
  return <div className={`section-label${light ? ' on-light' : ''}`}>
    {number ? <><span className="section-number">{number}</span><span className="label-slash">/</span></> : <span className="small-square" />}
    <span>{children}</span>
  </div>;
}

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={{ opacity: 0, y: reduced ? 0 : 25 }}
    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-35px' }}
    transition={{ duration: reduced ? 0 : 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function useModal(open: boolean, ref: RefObject<HTMLDivElement | null>, onClose: () => void) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const frame = requestAnimationFrame(() => ref.current?.querySelector<HTMLElement>('button, a[href]')?.focus());
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeRef.current();
      if (event.key !== 'Tab' || !ref.current) return;
      const items = Array.from(ref.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), [tabindex="0"]'));
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
      previousFocus?.focus({ preventScroll: true });
    };
  }, [open, ref]);
}

export function Header({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useModal(open, menuRef, () => setOpen(false));
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 901px)');
    const closeOnDesktop = () => { if (media.matches) setOpen(false); };
    media.addEventListener('change', closeOnDesktop);
    return () => media.removeEventListener('change', closeOnDesktop);
  }, []);
  const isActive = (path: string) => path === '/' ? pathname === '/' : pathname.startsWith(path);
  return <>
    <header className="site-header">
      <div className="header-inner">
        <a className="brand-link" href="#/" aria-label="AIME Production home" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><Wordmark /></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(item => <a key={item.path} href={`#${item.path}`} className={isActive(item.path) ? 'active' : ''}
            onClick={() => { if (pathname === item.path) window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            aria-current={isActive(item.path) ? 'page' : undefined}>{item.label}</a>)}
        </nav>
        <div className="header-actions">
          <LinkButton to="/contact" variant="primary" className="header-cta">Start a project</LinkButton>
          <button className="icon-button menu-toggle" aria-label="Open navigation menu" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(true)}><Menu size={24} strokeWidth={1.5} /></button>
        </div>
      </div>
    </header>
    <AnimatePresence>
      {open && <motion.div id="mobile-navigation" ref={menuRef} className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu"
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
        <div className="mobile-menu-top"><a href="#/" onClick={() => setOpen(false)}><Wordmark /></a><button className="icon-button" aria-label="Close navigation menu" onClick={() => setOpen(false)}><X size={28} /></button></div>
        <nav aria-label="Mobile navigation">{navigation.map((item, i) => <a href={`#${item.path}`} key={item.path} className={isActive(item.path) ? 'active' : ''} onClick={() => { setOpen(false); window.scrollTo(0, 0); }}>
          <span className="mobile-nav-number">0{i + 1}</span><span>{item.label}</span><ArrowUpRight size={30} />
        </a>)}</nav>
        <div className="mobile-menu-bottom"><p>Good things start with a conversation.</p><a href={`mailto:${studioEmail}`}>{studioEmail}<ArrowUpRight size={16} /></a></div>
      </motion.div>}
    </AnimatePresence>
  </>;
}

export function ProcessLine({ compact = false }: { compact?: boolean }) {
  return <div className={`process-line${compact ? ' process-compact' : ''}`} aria-label="Our process: ideas, strategy, design, production">
    <div className="container process-inner">{['Ideas', 'Strategy', 'Design', 'Production'].map((step, i) => <div className="process-step" key={step}>
      <span>{step}</span>{i < 3 ? <ArrowRight aria-hidden="true" strokeWidth={1.2} /> : <span className="process-asterisk" aria-hidden="true">*</span>}
    </div>)}</div>
  </div>;
}

export function ServiceAccordion({ detailed = false, initialService = '' }: { detailed?: boolean; initialService?: string }) {
  const [active, setActive] = useState(services.some(service => service.id === initialService) ? initialService : (detailed ? services[0].id : ''));
  useEffect(() => {
    if (!services.some(service => service.id === initialService)) return;
    setActive(initialService);
    const timer = window.setTimeout(() => {
      document.getElementById(`${detailed ? 'full' : 'preview'}-${initialService}-button`)?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start',
      });
    }, 400);
    return () => window.clearTimeout(timer);
  }, [initialService, detailed]);
  return <div className={`service-list${detailed ? ' detailed-services' : ''}`}>
    {services.map(service => {
      const expanded = active === service.id;
      const id = `${detailed ? 'full' : 'preview'}-${service.id}`;
      return <div className={`service-row${expanded ? ' expanded' : ''}`} key={service.id}>
        <h3><button className="service-toggle" onClick={() => setActive(expanded ? '' : service.id)} aria-expanded={expanded} aria-controls={`${id}-content`} id={`${id}-button`}>
          <span className="service-number">{service.number}</span>
          <span className="service-heading">{service.title}{detailed && <span className="service-summary">{service.description}</span>}</span>
          <Plus className="service-plus" size={22} strokeWidth={1.3} aria-hidden="true" />
        </button></h3>
        <AnimatePresence initial={false}>
          {expanded && <motion.div id={`${id}-content`} role="region" aria-labelledby={`${id}-button`} className="service-expand"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
            <div className="service-content">
              {detailed && <div className="service-image"><img src={service.image} alt={service.imageAlt} loading="lazy" /></div>}
              <div className="service-content-text">
                {!detailed && <p>{service.description}</p>}
                {detailed ? service.groups ? <div className="photography-groups">{service.groups.map(group => <div key={group.title}><h4>{group.title}</h4><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div> :
                  <ul className="service-items">{service.items.map(item => <li key={item}>{item}</li>)}</ul> :
                  <p className="service-short-list">{service.items.slice(0, 3).join(' / ')}</p>}
                <LinkButton to={detailed ? `/contact?service=${service.id}` : `/services?service=${service.id}`}>{detailed ? "Let's create together" : 'Explore this service'}</LinkButton>
              </div>
            </div>
          </motion.div>}
        </AnimatePresence>
      </div>;
    })}
  </div>;
}

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return <a className="project-card" href={`#/work/${project.slug}`} aria-label={`View ${project.title} project`}>
    <div className="project-image-wrap"><img src={project.image} alt={project.imageAlt} loading="lazy" /><span className="project-image-action" aria-hidden="true"><ArrowUpRight size={28} strokeWidth={1.5} /></span></div>
    <div className="project-meta"><span>{project.categories[0]}</span><span className="project-index">{String(index + 1).padStart(2, '0')}</span></div>
    <h3>{project.title}<ArrowUpRight size={21} strokeWidth={1.5} aria-hidden="true" /></h3>
    <p>{project.description}</p>
    <span className="project-view">View project <ArrowRight size={14} aria-hidden="true" /></span>
  </a>;
}

export function ContactCallout() {
  return <section className="contact-callout section-padding">
    <div className="container"><Reveal><SectionLabel>The next chapter</SectionLabel>
      <a className="contact-callout-link" href="#/contact">
        <h2>LET'S CREATE<br /><span>SOMETHING.</span></h2><span className="callout-arrow"><ArrowUpRight strokeWidth={1} aria-hidden="true" /></span>
      </a>
      <div className="callout-bottom"><p>Your idea. Our next great collaboration.</p><LinkButton to="/contact">Start a project</LinkButton></div>
    </Reveal></div>
  </section>;
}

export function Footer() {
  const socials = [
    { name: 'Instagram', href: 'https://www.instagram.com/explore/search/keyword/?q=AIME%20Production' },
    { name: 'Behance', href: 'https://www.behance.net/search/users?search=AIME%20Production' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/search/results/all/?keywords=AIME%20Production' },
    { name: 'YouTube', href: 'https://www.youtube.com/results?search_query=AIME+Production' },
  ];
  return <footer className="site-footer"><div className="container">
    <div className="footer-main">
      <div className="footer-brand"><a href="#/" aria-label="AIME Production home"><Wordmark /></a><p>Create a story.<br />Design that lasts.</p></div>
      <div className="footer-column"><h3>Explore</h3><nav aria-label="Footer navigation">{navigation.map(item => <a key={item.path} href={`#${item.path}`} onClick={() => {
        if ((window.location.hash.slice(1).split('?')[0] || '/') === item.path) window.scrollTo({ top: 0, behavior: 'smooth' });
      }}>{item.label}</a>)}</nav></div>
      <div className="footer-column footer-contact"><h3>Say hello</h3><a href={`mailto:${studioEmail}`}>{studioEmail}</a><a href="#/contact?method=Phone">Book a conversation <ArrowUpRight size={13} /></a><p>Independent studio.<br />Working worldwide.</p></div>
      <div className="footer-column"><h3>Discover</h3>{socials.map(social => <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`Find AIME Production on ${social.name} (opens in a new tab)`}>{social.name}<ArrowUpRight size={12} /></a>)}</div>
    </div>
    <div className="footer-bottom"><p>&copy; {new Date().getFullYear()} AIME Production. All rights reserved.</p><span>Strategy. Design. Production.</span><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top <ArrowDown size={13} className="back-top-arrow" /></button></div>
  </div></footer>;
}

export function GalleryLightbox({ images, index, onIndexChange, onClose }: {
  images: GalleryImage[]; index: number | null; onIndexChange: (index: number) => void; onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const open = index !== null;
  useModal(open, modalRef, onClose);
  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') { event.preventDefault(); onIndexChange((index + 1) % images.length); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); onIndexChange((index - 1 + images.length) % images.length); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [index, images.length, onIndexChange]);
  return <AnimatePresence>{index !== null && <motion.div ref={modalRef} className="lightbox" role="dialog" aria-modal="true" aria-labelledby="lightbox-caption"
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="lightbox-top"><span>PROJECT GALLERY / {String(index + 1).padStart(2, '0')} OF {String(images.length).padStart(2, '0')}</span><button className="icon-button" onClick={onClose} aria-label="Close image gallery"><X size={28} /></button></div>
    <button className="lightbox-prev icon-button" aria-label="Previous image" onClick={() => onIndexChange((index - 1 + images.length) % images.length)}><ChevronLeft size={30} /></button>
    <AnimatePresence mode="wait"><motion.figure key={index} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
      <img src={images[index].src} alt={images[index].alt} /><figcaption id="lightbox-caption" aria-live="polite">{images[index].caption}</figcaption>
    </motion.figure></AnimatePresence>
    <button className="lightbox-next icon-button" aria-label="Next image" onClick={() => onIndexChange((index + 1) % images.length)}><ChevronRight size={30} /></button>
  </motion.div>}</AnimatePresence>;
}

export function BackLink({ to = '/work', children = 'Back to all work' }: { to?: string; children?: ReactNode }) {
  return <a className="back-link" href={`#${to}`}><ArrowLeft size={16} />{children}</a>;
}