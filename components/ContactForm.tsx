'use client';

import { FormEvent, useEffect, useState } from 'react';
import { CONTACT_EMAIL, needs } from '@/lib/content';

// Opens the visitor's mail client with the brief. Swap for an API route / form service to capture leads.
export function ContactForm({ source = 'Home page' }: { source?: string }) {
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);
  // Ad attribution: keep utm_* / gclid / fbclid so every brief shows which campaign it came from.
  const [tracking, setTracking] = useState('');
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    setTracking(['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid']
      .filter(k => q.get(k)).map(k => `${k}=${q.get(k)}`).join(' · '));
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const get = (k: string) => String(d.get(k) ?? '').trim();
    const errors = {
      name: !get('name'),
      email: !/^\S+@\S+\.\S+$/.test(get('email')),
      message: !get('message'),
    };
    setInvalid(errors);
    if (Object.values(errors).some(Boolean)) return;

    const body = `Name: ${get('name')}\nEmail: ${get('email')}\nCompany: ${get('company') || '—'}\nNeeds: ${d.getAll('need').join(', ') || '—'}\nPage: ${source}${tracking ? `\nCampaign: ${tracking}` : ''}\n\n${get('message')}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('New project brief — ' + get('name'))}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field = (id: string, label: string, opts: { type?: string; area?: boolean; required?: boolean } = {}) => (
    <div className={`field${invalid[id] ? ' is-invalid' : ''}`}>
      {opts.area
        ? <textarea id={`f-${id}`} name={id} rows={3} required={opts.required} placeholder=" " />
        : <input id={`f-${id}`} name={id} type={opts.type ?? 'text'} required={opts.required} placeholder=" " />}
      <label htmlFor={`f-${id}`}>{label}</label>
    </div>
  );

  return (
    <form className="form" noValidate onSubmit={onSubmit}>
      {field('name', 'Your name', { required: true })}
      {field('email', 'Work email', { type: 'email', required: true })}
      {field('company', 'Company')}
      <fieldset className="chips">
        <legend className="mono">I need help with</legend>
        {needs.map(n => (
          <label key={n}><input type="checkbox" name="need" value={n} /><span>{n}</span></label>
        ))}
      </fieldset>
      {field('message', 'Tell us about the project', { area: true, required: true })}
      <button type="submit" className="btn btn--wide" data-magnetic>
        {sent ? 'Opening your email…' : 'Send brief'} <span className="arrow">→</span>
      </button>
      <p className="form__note mono">Signed NDA available before you share details.</p>
    </form>
  );
}
