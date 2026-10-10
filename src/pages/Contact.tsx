import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowRight, ArrowUpRight, Check, CheckCheck, Copy, Download, Mail, RotateCcw } from 'lucide-react';
import { Reveal, SectionLabel } from '../components';
import { services, studioEmail } from '../data';

type InquiryValues = {
  name: string; company: string; email: string; phone: string; project: string;
  message: string; timeline: string; budget: string; preferred: string;
};
type Errors = Partial<Record<keyof InquiryValues | 'services', string>>;
const emptyValues: InquiryValues = { name: '', company: '', email: '', phone: '', project: '', message: '', timeline: '', budget: '', preferred: 'Email' };
const draftKey = 'aime-project-draft-v1';
const serviceOptions = [...services.map(service => ({ id: service.id, label: service.title })), { id: 'multiple', label: 'Multiple Services' }, { id: 'unsure', label: "Not sure? Let's discuss" }];

function readDraft(): { values: InquiryValues; selected: string[] } {
  try {
    const stored = JSON.parse(localStorage.getItem(draftKey) || 'null');
    if (stored && typeof stored.values === 'object' && stored.values !== null) {
      const values = { ...emptyValues };
      for (const key of Object.keys(values) as (keyof InquiryValues)[]) {
        if (typeof stored.values[key] === 'string') values[key] = stored.values[key];
      }
      return { values, selected: Array.isArray(stored.selected) ? stored.selected.filter((id: unknown) => serviceOptions.some(option => option.id === id)) : [] };
    }
  } catch { /* A blocked or malformed draft should never prevent an inquiry. */ }
  return { values: { ...emptyValues }, selected: [] };
}

function Field({ name, label, value, onChange, error, required = false, type = 'text', autoComplete, placeholder }: {
  name: keyof InquiryValues; label: string; value: string; onChange: (name: keyof InquiryValues, value: string) => void;
  error?: string; required?: boolean; type?: string; autoComplete?: string; placeholder?: string;
}) {
  return <div className={`form-field${error ? ' has-error' : ''}`}><label htmlFor={`inquiry-${name}`}>{label}{required && <span className="required-mark">*</span>}</label>
    <input id={`inquiry-${name}`} name={name} type={type} value={value} onChange={event => onChange(name, event.target.value)} required={required} autoComplete={autoComplete} placeholder={placeholder} maxLength={name === 'email' ? 254 : 160} aria-invalid={!!error} aria-describedby={error ? `error-${name}` : undefined} />
    {error && <span className="field-error" id={`error-${name}`}>{error}</span>}
  </div>;
}

export default function Contact({ initialService, initialMethod }: { initialService: string; initialMethod: string }) {
  const [draft] = useState(readDraft);
  const [values, setValues] = useState<InquiryValues>(draft.values);
  const [selected, setSelected] = useState<string[]>(draft.selected);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [copyError, setCopyError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (serviceOptions.some(option => option.id === initialService)) setSelected(current => [...new Set([...current, initialService])]);
    if (['Email', 'Phone', 'Video call'].includes(initialMethod)) setValues(current => ({ ...current, preferred: initialMethod }));
  }, [initialService, initialMethod]);

  useEffect(() => {
    try { localStorage.setItem(draftKey, JSON.stringify({ values, selected })); }
    catch { setStorageAvailable(false); }
  }, [values, selected]);

  useEffect(() => {
    if (submitted) { successRef.current?.focus({ preventScroll: true }); successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  }, [submitted]);

  const update = (name: keyof InquiryValues, value: string) => {
    setValues(current => ({ ...current, [name]: value }));
    setErrors(current => ({ ...current, [name]: undefined }));
  };
  const toggleService = (id: string) => {
    setSelected(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
    setErrors(current => ({ ...current, services: undefined }));
  };
  const selectedLabels = selected.map(id => serviceOptions.find(option => option.id === id)?.label).filter(Boolean);
  const brief = [
    'AIME PRODUCTION / PROJECT INQUIRY', '', `Project: ${values.project}`, `Name: ${values.name}`,
    `Company: ${values.company || 'Not specified'}`, `Email: ${values.email}`, `Phone: ${values.phone || 'Not specified'}`,
    '', `Services: ${selectedLabels.join(', ')}`, `Timeline: ${values.timeline}`, `Budget (USD): ${values.budget}`,
    `Preferred contact: ${values.preferred}`, '', 'ABOUT THE PROJECT', values.message, '', 'Created with AIME Production project inquiry.',
  ].join('\n');
  const mailto = `mailto:${studioEmail}?subject=${encodeURIComponent(`Project inquiry: ${values.project}`)}&body=${encodeURIComponent(brief)}`;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Errors = {};
    if (!selected.length) next.services = 'Choose a service, or select "Not sure? Let\'s discuss".';
    if (!values.name.trim()) next.name = 'Please tell us your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = 'Please enter a valid email address.';
    if (!values.project.trim()) next.project = 'Give your project a name, even a working title.';
    if (values.message.trim().length < 20) next.message = 'Tell us a little more about your idea (at least 20 characters).';
    if (!values.timeline) next.timeline = 'Choose a timeline. Flexible is an option, too.';
    if (!values.budget) next.budget = 'Choose a budget range, or select "Let\'s discuss".';
    if (values.preferred === 'Phone' && values.phone.replace(/\D/g, '').length < 7) next.phone = 'Please add a phone number so we can call you.';
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() => { const first = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]'); first?.focus(); first?.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
      return;
    }
    try { localStorage.setItem(draftKey, JSON.stringify({ values, selected })); } catch { setStorageAvailable(false); }
    setSubmitted(true);
  };

  const download = () => {
    const url = URL.createObjectURL(new Blob([brief], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `aime-brief-${values.project.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50) || 'project'}.txt`;
    document.body.appendChild(anchor); anchor.click(); anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(brief); setCopied(true); setCopyError(''); }
    catch { setCopyError('Clipboard access is unavailable. You can download your brief instead.'); }
  };
  const reset = () => {
    if (!window.confirm('Clear the project draft saved on this device?')) return;
    setValues({ ...emptyValues }); setSelected([]); setErrors({}); setSubmitted(false); setCopied(false);
    try { localStorage.removeItem(draftKey); } catch { /* The form can still be reset without storage. */ }
  };

  return <>
    <section className="page-intro contact-intro"><div className="container"><Reveal><SectionLabel>Every great story starts somewhere</SectionLabel><h1>LET'S CREATE<br /><span className="accent">SOMETHING.</span></h1>
      <p className="contact-intro-text">Have a brand, campaign, film, digital project or visual idea?<br />Tell us what you're building.</p>
    </Reveal></div></section>
    <section className="contact-form-section"><div className="container contact-layout">
      <aside className="contact-aside"><SectionLabel>Open to possibilities</SectionLabel><h2>A GOOD IDEA.<br />A CONVERSATION.<br />A BEGINNING.</h2><p>You don't need a perfect brief.<br />Just a vision worth exploring.</p><a className="contact-email" href={`mailto:${studioEmail}`}>{studioEmail}<ArrowUpRight size={17} /></a>
        <div className="contact-aside-note"><span className="small-square" /><p>Independent studio.<br />Connected to the world.</p></div>
      </aside>
      {submitted ? <div className="inquiry-ready" ref={successRef} tabIndex={-1} aria-labelledby="inquiry-ready-title">
        <span className="inquiry-ready-icon"><CheckCheck size={33} strokeWidth={1.4} /></span><SectionLabel>Your next chapter</SectionLabel><h2 id="inquiry-ready-title">YOUR BRIEF<br />IS READY<span className="accent">.</span></h2>
        <p>Thanks, {values.name.trim().split(' ')[0]}. Your idea is taking shape. Open your email app to send your inquiry to the studio, or download a copy to keep.</p>
        <dl className="inquiry-summary"><div><dt>PROJECT</dt><dd>{values.project}</dd></div><div><dt>SERVICES</dt><dd>{selectedLabels.join(' / ')}</dd></div><div><dt>TIMELINE</dt><dd>{values.timeline}</dd></div></dl>
        <a className="link-button button-primary send-email-button" href={mailto}><span>Open email & send</span><Mail size={17} /></a>
        <p className="email-handoff-note">Nothing has been sent yet. Review the email in your mail app and press send to finish.</p>
        <div className="brief-actions"><button onClick={download}><Download size={16} />Download brief</button><button onClick={copy}><Copy size={15} />{copied ? 'Copied to clipboard' : 'Copy brief'}</button></div>
        {copyError && <p className="field-error" role="status">{copyError}</p>}
        <button className="edit-inquiry" onClick={() => { setSubmitted(false); setCopied(false); }}><RotateCcw size={14} />Edit your inquiry</button>
      </div> : <form ref={formRef} className="inquiry-form" onSubmit={submit} noValidate>
        <fieldset className="service-selection" tabIndex={-1} aria-invalid={!!errors.services} aria-describedby={errors.services ? 'error-services' : undefined}><legend><span className="form-step">01</span> WHAT CAN WE HELP YOU CREATE?<span className="required-mark">*</span></legend>
          <p className="form-helper">Choose one or more. The best ideas often cross disciplines.</p>
          <div className="service-choices">{serviceOptions.map(option => <label key={option.id} className={`service-choice${selected.includes(option.id) ? ' selected' : ''}`}><input type="checkbox" name="services" value={option.id} checked={selected.includes(option.id)} onChange={() => toggleService(option.id)} /><span className="custom-checkbox" aria-hidden="true">{selected.includes(option.id) && <Check size={12} strokeWidth={2.5} />}</span><span>{option.label}</span></label>)}</div>
          {errors.services && <span className="field-error" id="error-services">{errors.services}</span>}
        </fieldset>
        <div className="form-group-heading"><span className="form-step">02</span><h2>A LITTLE ABOUT YOU & YOUR IDEA.</h2></div>
        <div className="form-grid">
          <Field name="name" label="Your name" value={values.name} onChange={update} required error={errors.name} autoComplete="name" placeholder="Alex Morgan" />
          <Field name="company" label="Company / Organization" value={values.company} onChange={update} autoComplete="organization" placeholder="Your brand or organization" />
          <Field name="email" label="Email address" type="email" value={values.email} onChange={update} required error={errors.email} autoComplete="email" placeholder="you@company.com" />
          <Field name="phone" label="Phone number" type="tel" value={values.phone} onChange={update} error={errors.phone} required={values.preferred === 'Phone'} autoComplete="tel" placeholder="Include your country code" />
          <div className="full-width"><Field name="project" label="Project name" value={values.project} onChange={update} required error={errors.project} placeholder="A working title is a good start" /></div>
          <div className={`form-field full-width${errors.message ? ' has-error' : ''}`}><label htmlFor="inquiry-message">Tell us about your project<span className="required-mark">*</span></label><textarea id="inquiry-message" name="message" value={values.message} onChange={event => update('message', event.target.value)} placeholder="The idea, the challenge, the possibilities. We'd love to hear what you have in mind." rows={5} maxLength={4000} required aria-invalid={!!errors.message} aria-describedby={errors.message ? 'error-message' : undefined} />{errors.message && <span className="field-error" id="error-message">{errors.message}</span>}</div>
          <div className="form-field"><label htmlFor="inquiry-timeline">Timeline<span className="required-mark">*</span></label><select id="inquiry-timeline" name="timeline" value={values.timeline} onChange={event => update('timeline', event.target.value)} required aria-invalid={!!errors.timeline} aria-describedby={errors.timeline ? 'error-timeline' : undefined}><option value="" disabled>When are you looking to start?</option>{['As soon as possible', 'Within 1 month', '1-3 months', '3-6 months', 'Flexible'].map(option => <option key={option}>{option}</option>)}</select>{errors.timeline && <span className="field-error" id="error-timeline">{errors.timeline}</span>}</div>
          <div className="form-field"><label htmlFor="inquiry-budget">Budget range (USD)<span className="required-mark">*</span></label><select id="inquiry-budget" name="budget" value={values.budget} onChange={event => update('budget', event.target.value)} required aria-invalid={!!errors.budget} aria-describedby={errors.budget ? 'error-budget' : undefined}><option value="" disabled>Select an approximate range</option>{['Under $1,000', '$1,000 - $3,000', '$3,000 - $5,000', '$5,000 - $10,000', '$10,000+', "Let's discuss"].map(option => <option key={option}>{option}</option>)}</select>{errors.budget && <span className="field-error" id="error-budget">{errors.budget}</span>}</div>
          <div className="form-field full-width"><label htmlFor="inquiry-preferred">Preferred contact method</label><select id="inquiry-preferred" name="preferred" value={values.preferred} onChange={event => update('preferred', event.target.value)}>{['Email', 'Phone', 'Video call'].map(option => <option key={option}>{option}</option>)}</select></div>
        </div>
        {Object.values(errors).some(Boolean) && <p className="form-error-summary" role="alert">A few details need your attention. Please check the highlighted fields.</p>}
        <div className="form-submit"><button className="link-button button-primary" type="submit"><span>Send project inquiry</span><ArrowRight size={17} /></button><p>{storageAvailable ? 'Your draft stays on this device.' : 'Draft storage is unavailable in this browser.'}<br />You'll send your final brief through your email app.</p></div>
        {(values.name || values.message || selected.length > 0) && <button className="clear-draft" type="button" onClick={reset}>Clear saved draft</button>}
      </form>}
    </div></section>
    <div className="contact-closing"><div className="container"><span>GOOD THINGS START WITH A CONVERSATION.</span><ArrowUpRight size={23} /></div></div>
  </>;
}