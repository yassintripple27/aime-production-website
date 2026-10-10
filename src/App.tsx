import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { Footer, Header, LinkButton, SectionLabel } from './components';
import { projects } from './data';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Work from './pages/Work';
import Project from './pages/Project';
import Contact from './pages/Contact';

const pageTitles: Record<string, string> = {
  '/': 'Create a story. Design that lasts.',
  '/about': 'About the studio',
  '/services': 'Our services',
  '/work': 'Selected work',
  '/contact': 'Start a project',
};

function currentRoute() {
  return window.location.hash.slice(1) || '/';
}

export default function App() {
  const [route, setRoute] = useState(currentRoute);
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);
  const [pathname, query = ''] = route.split('?');
  const params = new URLSearchParams(query);
  const project = pathname.startsWith('/work/') ? projects.find(item => item.slug === pathname.split('/')[2]) : undefined;

  useEffect(() => {
    const onHashChange = () => setRoute(currentRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const pageTitle = project?.title || pageTitles[pathname] || 'Page not found';
    document.title = `AIME Production | ${pageTitle}`;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (!firstRender.current) mainRef.current?.focus({ preventScroll: true });
    firstRender.current = false;
  }, [route, pathname, project]);

  let page;
  if (pathname === '/') page = <Home />;
  else if (pathname === '/about') page = <About />;
  else if (pathname === '/services') page = <Services service={params.get('service') || ''} />;
  else if (pathname === '/work') page = <Work />;
  else if (pathname === '/contact') page = <Contact initialService={params.get('service') || ''} initialMethod={params.get('method') || ''} />;
  else if (project) page = <Project project={project} />;
  else page = <section className="page-intro not-found"><div className="container"><SectionLabel>404 / A little off-script</SectionLabel><h1>LET'S FIND<br />A NEW <span className="accent">DIRECTION.</span></h1><p>This page isn't part of the story. There's plenty more to explore.</p><LinkButton to="/" variant="primary">Back to the studio</LinkButton></div></section>;

  return <MotionConfig reducedMotion="user">
    <a className="skip-link" href="#main-content" onClick={event => { event.preventDefault(); mainRef.current?.focus(); }}>Skip to content</a>
    <Header pathname={pathname} />
    <main id="main-content" ref={mainRef} tabIndex={-1}>
      <AnimatePresence mode="wait" initial={false}><motion.div key={pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>{page}</motion.div></AnimatePresence>
    </main>
    <Footer />
  </MotionConfig>;
}
