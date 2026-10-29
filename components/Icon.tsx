import type { IconName } from '@/lib/content';

const paths: Record<IconName, React.ReactNode> = {
  web: <><rect x="6" y="10" width="36" height="26" rx="3" /><path d="M6 18h36M18 42h12M24 36v6" /></>,
  mobile: <><rect x="14" y="4" width="20" height="40" rx="4" /><path d="M21 38h6" /></>,
  ai: <><circle cx="24" cy="24" r="6" /><circle cx="24" cy="24" r="16" strokeDasharray="3 5" /><path d="M24 2v6M24 40v6M2 24h6M40 24h6" /></>,
  brand: <><path d="M8 40L24 8l16 32z" /><circle cx="24" cy="30" r="4" /></>,
  cloud: <><path d="M12 34a8 8 0 010-16 12 12 0 0123-3 9 9 0 011 19z" /><path d="M20 40h8" /></>,
  growth: <><path d="M6 40l12-14 8 8 16-22" /><path d="M32 12h10v10" /></>,
};

export function Icon({ name }: { name: IconName }) {
  return <svg className="card__icon" viewBox="0 0 48 48" aria-hidden="true">{paths[name]}</svg>;
}
