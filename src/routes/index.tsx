import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Play, Clapperboard, AudioLines, Scissors, Layers, Menu, X, Mail, Copy, Check, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ProjectForm } from '@/components/portfolio/project-form';
import { VIDEOS, FILTERS, thumb, embed, EMAIL, DISCORD, type Video } from '@/lib/portfolio';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'CrazyKrack — Video Editor for Creators & Brands' },
    { name: 'description', content: 'Story-driven video editing for creators and brands. Explore 12 gaming, vlog and business samples, and start a project with CrazyKrack.' },
    { property: 'og:title', content: 'CrazyKrack — Video Editor for Creators & Brands' },
    { property: 'og:description', content: 'Sharp hooks. Intentional pacing. Stories worth watching. Explore the work and share your next video project.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

const SERVICES = [
  { title: 'Gaming & creator edits', text: 'High-energy cuts, well-timed humor and a story that carries the action. Minecraft, Roblox, Fortnite and IRL gaming.', icon: Clapperboard },
  { title: 'Storytelling & pacing', text: 'A compelling opening, a clear narrative and room for the moments that matter. Every cut has a reason.', icon: Scissors },
  { title: 'Sound design', text: 'Clean dialogue, considered music and precise sound effects that bring rhythm and impact to your footage.', icon: AudioLines },
  { title: 'Vlogs & brand content', text: 'Personality-led vlogs and polished business videos that communicate clearly without losing the human touch.', icon: Layers },
];

function Counter({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(value);
  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => { const progress = Math.min((now - start) / 1000, 1); setCount(Math.round(value * (1 - Math.pow(1 - progress, 3)))); if (progress < 1) frame = requestAnimationFrame(tick); };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);
  return <div ref={ref} className="stat-card glass rounded-2xl"><span aria-hidden="true" className="font-display text-4xl font-semibold text-foreground">{count.toString().padStart(2, '0')}<span className="text-primary">.</span></span><span className="sr-only">{value}</span><span className="text-sm text-muted-foreground">{label}</span></div>;
}

function Index() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');
  const [active, setActive] = useState<Video | null>(null);
  const [menu, setMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const list = filter === 'All' ? VIDEOS : VIDEOS.filter(video => video.cat === filter);
  useEffect(() => {
    const shell = shellRef.current;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!shell) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => shell.style.setProperty('--mesh-offset', media.matches ? '0px' : `${Math.min(shell.scrollTop * 0.025, 110)}px`));
    };
    shell.addEventListener('scroll', update, { passive: true });
    media.addEventListener('change', update);
    update();
    return () => { shell.removeEventListener('scroll', update); media.removeEventListener('change', update); cancelAnimationFrame(frame); };
  }, []);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach(node => { node.classList.add('reveal-ready'); observer.observe(node); });
    return () => observer.disconnect();
  }, []);
  async function copyDiscord() {
    try { await navigator.clipboard.writeText('crzykrackz22'); setCopied(true); setCopyFailed(false); }
    catch { setCopyFailed(true); }
  }
  return <div id="top" ref={shellRef} className="portfolio-shell relative">
    <div className="ambient-mesh" aria-hidden="true" />
    <header className="site-header sticky top-0 z-40">
      <div className="nav-capsule glass page-width flex h-16 items-center justify-between gap-4 rounded-full px-4 sm:px-6">
        <a href="#top" aria-label="CrazyKrack home" className="flex items-center gap-2.5 font-display text-lg font-bold"><span className="brand-mark"><Scissors size={18} /></span>Crazy<span className="-ml-2 text-primary-glow">Krack</span><span className="text-primary">.</span></a>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">{['Work', 'Services', 'About', 'Contact'].map(s => <a className="nav-link" key={s} href={`#${s.toLowerCase()}`}>{s}</a>)}</nav>
        <div className="flex items-center gap-2"><Button asChild className="hidden rounded-full sm:inline-flex"><a href="#contact">Start a Project <ArrowUpRight /></a></Button><Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenu(!menu)} aria-label={menu ? 'Close navigation' : 'Open navigation'} aria-expanded={menu}>{menu ? <X /> : <Menu />}</Button></div>
      </div>
      {menu && <nav aria-label="Mobile navigation" className="page-width flex flex-col gap-1 border-t border-border py-4 md:hidden">{['Work', 'Services', 'About', 'Contact'].map(s => <Button key={s} asChild variant="ghost" className="justify-start"><a href={`#${s.toLowerCase()}`} onClick={() => setMenu(false)}>{s}</a></Button>)}</nav>}
    </header>
    <main>
      <section className="hero relative">
        <div className="hero-grid" aria-hidden="true" />
        <div className="page-width relative text-center">
        <div className="hero-object glass" data-float="hero">
          <p className="eyebrow justify-center"><span className="status-dot" /> VIDEO EDITOR FOR CREATORS & BRANDS</p>
          <h1 className="hero-brand text-gradient">CrzyKrackz</h1>
          <h2 className="hero-headline mx-auto mt-3 max-w-5xl font-display text-5xl font-semibold leading-[1.13] sm:text-6xl lg:text-7xl">Your story.<br /><span className="text-gradient">Impossible to skip.</span></h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">I’m CrazyKrack. I turn raw footage into videos that make people stay — with sharp hooks, intentional pacing and sound that hits.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3"><Button asChild size="lg" className="h-12 rounded-full shadow-glow"><a href="#work"><Play size={16} fill="currentColor" /> View Work</a></Button><Button asChild variant="outline" size="lg" className="h-12 rounded-full bg-background/30"><a href="#contact">Start a Project <ArrowUpRight /></a></Button></div>
          <p className="mt-6 text-xs text-muted-foreground">Gaming · Vlogs · Business · Stories worth watching</p>
        </div>
          <div className="hero-reel mt-10 sm:mt-12" aria-label="Featured video samples">
            {[VIDEOS[0], VIDEOS[5], VIDEOS[8]].filter((v): v is Video => !!v).map(video => <Button key={video.id} variant="ghost" onClick={() => setActive(video)} className="reel-frame group relative h-auto overflow-hidden rounded-xl p-0" aria-label={`Preview featured ${video.cat} video`}><img src={thumb(video)} alt={`${video.cat} video sample`} referrerPolicy="no-referrer" className="h-full w-full object-cover" /><span className="reel-shade" /><span className="absolute bottom-3 left-4 text-xs font-semibold text-primary-foreground">{video.cat}</span><span className="play-circle absolute right-3 bottom-3"><Play size={14} fill="currentColor" /></span></Button>)}
          </div>
          <a href="#work" className="mx-auto mt-7 flex w-fit items-center gap-2 text-xs text-muted-foreground">Explore the work <ArrowDown size={14} /></a>
        </div>
      </section>

      <section id="work" className="section-band page-width">
        <div data-reveal className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow">01 / THE PORTFOLIO</p><h2 className="section-title glass-heading mt-3">The work speaks.</h2></div><p className="section-intro glass glass-pill max-w-sm text-sm leading-relaxed text-muted-foreground">Different worlds. The same attention to detail.<br />A selection of gaming, creator and brand edits.</p></div>
        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter videos by category">{FILTERS.map(f => <Button key={f} onClick={() => setFilter(f)} variant={filter === f ? 'default' : 'outline'} aria-pressed={filter === f} className={`h-10 rounded-full px-4 ${filter === f ? 'shadow-glow' : 'bg-transparent text-muted-foreground'}`}>{f}{f === 'All' && <span className="ml-1 text-xs opacity-70">12</span>}</Button>)}</div>
        <p aria-live="polite" className="mt-5 text-xs text-muted-foreground">{list.length} {list.length === 1 ? 'sample' : 'samples'} · {filter === 'All' ? 'All categories' : filter}</p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map((video, index) => <article key={video.id} className="work-card glass group overflow-hidden rounded-2xl">
          <Button variant="ghost" onClick={() => setActive(video)} className="relative block aspect-video h-auto w-full overflow-hidden rounded-none p-0" aria-label={`Preview ${video.cat} sample ${index + 1}`}><img src={thumb(video)} alt={`${video.cat} edit thumbnail`} loading="lazy" referrerPolicy="no-referrer" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /><span className="thumbnail-shade" /><span className="play-circle thumbnail-play"><Play size={19} fill="currentColor" /></span></Button>
          <div className="flex items-center justify-between px-5 py-4"><span className="category-tag">{video.cat}</span><Button variant="ghost" onClick={() => setActive(video)} className="h-8 px-0 text-xs text-foreground">Preview <ArrowUpRight /></Button></div>
        </article>)}</div>
        {list.length === 0 && <div className="py-20 text-center"><Clapperboard className="mx-auto mb-4 text-muted-foreground" /><h3 className="text-xl">No samples in this category yet.</h3><Button variant="link" onClick={() => setFilter('All')}>View all work <ArrowUpRight /></Button></div>}
      </section>

      <section className="attention-band section-band"><div className="attention-pod glass page-width grid gap-8 rounded-[2rem] p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div data-reveal><p className="eyebrow">MORE THAN A CLEAN CUT</p><h2 className="section-title glass-heading mt-3">Editing built<br />for <span className="text-primary-glow">attention.</span></h2><p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">The click gets someone in. The edit gives them a reason to stay. I focus on the experience from the first frame to the final beat.</p><div className="mt-8 grid max-w-md grid-cols-2 gap-4"><Counter value={VIDEOS.length} label="Video samples" /><Counter value={FILTERS.length - 1} label="Content categories" /></div></div>
        <div data-reveal><div className="space-y-3">{[['01', 'A hook with a purpose', 'Establish the story early and give viewers a reason to keep watching.'], ['02', 'Pacing that feels right', 'Cut the dead time, build momentum and let important moments breathe.'], ['03', 'Sound & story in sync', 'Use dialogue, music and sound design to guide the emotion of the edit.']].map(([n,t,d]) => <div key={n} className="process-step glass flex gap-5 rounded-2xl p-5"><span className="pt-1 font-mono text-xs text-primary">{n}</span><div><h3 className="text-lg font-semibold">{t}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p></div></div>)}</div><p className="retention-note mt-4 text-xs leading-relaxed text-muted-foreground">CTR is mainly influenced by your title, thumbnail and packaging. Editing supports watch time and retention — it doesn’t guarantee more clicks or specific results.</p></div>
      </div></section>

      <section id="services" className="section-band page-width"><div data-reveal><p className="eyebrow">02 / THE CRAFT</p><h2 className="section-title glass-heading mt-3">Your footage. A better finish.</h2></div><div className="mt-9 grid gap-5 sm:grid-cols-2">{SERVICES.map((service, i) => <article data-reveal key={service.title} className="service-card glass rounded-[1.75rem] p-7"><div className="flex items-center justify-between"><span className="service-icon"><service.icon size={23} /></span><span className="font-mono text-xs text-muted-foreground">0{i + 1}</span></div><h3 className="mt-6 text-xl font-semibold">{service.title}</h3><p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{service.text}</p></article>)}</div></section>

      <section id="about" className="section-band"><div data-reveal className="about-pod glass page-width grid gap-8 rounded-[2rem] p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr]"><div><p className="eyebrow">03 / BEHIND THE EDIT</p><h2 className="section-title glass-heading mt-3">Hey, I’m<br /><span className="text-primary-glow">CrazyKrack.</span></h2><p className="mt-5 text-sm text-muted-foreground">The detail-oriented editor behind the timeline.</p><div className="about-signature glass-pill mt-7 flex items-center gap-3 text-muted-foreground"><Scissors size={18} /><span className="text-xs">Thoughtful cuts. Clear stories. Human connection.</span></div></div><div className="about-copy glass-pill space-y-5 text-base leading-relaxed text-muted-foreground"><p>I turn raw footage into engaging stories for creators and brands. From Minecraft and Roblox to vlogs, IRL gaming, Fortnite and business content, my focus is on clean cuts, strong pacing and moments that keep viewers watching.</p><p>I believe every video needs more than effects. It needs rhythm, clarity and a story worth staying for.</p><p className="text-foreground">If you want an editor who cares about the details from the first hook to the final cut, let’s work together.</p><Button asChild variant="link" className="h-auto px-0 text-primary-glow"><a href="#contact">Tell me what you’re creating <ArrowUpRight /></a></Button></div></div></section>

      <section id="contact" className="section-band"><div className="contact-layout page-width grid items-start gap-7 lg:grid-cols-[0.8fr_1.2fr]"><div data-reveal className="contact-pod glass rounded-[2rem] p-6 sm:p-8 lg:sticky lg:top-28"><p className="eyebrow">04 / LET’S COLLABORATE</p><h2 className="section-title glass-heading mt-3">Start a<br /><span className="text-gradient">great project.</span></h2><p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">Have footage ready or an idea taking shape? Share a little about your project, and let’s find the right direction.</p><div className="mt-8 space-y-6"><div><p className="mb-2 text-xs text-muted-foreground">PREFER EMAIL?</p><a href={`mailto:${EMAIL}`} className="contact-email glass-pill flex items-center gap-2 text-sm font-medium hover:text-primary-glow"><Mail size={17} className="shrink-0" /><span className="break-all">{EMAIL}</span><ArrowUpRight size={16} className="shrink-0" /></a></div><div className="contact-discord glass-pill"><p className="mb-2 text-xs text-muted-foreground">LET’S TALK ON DISCORD</p><div className="flex items-center gap-2"><Button asChild variant="outline" className="rounded-full"><a href={DISCORD} target="_blank" rel="noreferrer"><MessageCircle /> crzykrackz22 <ArrowUpRight /></a></Button><Button variant="ghost" size="icon" title="Copy Discord username" aria-label="Copy Discord username" onClick={copyDiscord}>{copied ? <Check /> : <Copy />}</Button></div><p aria-live="polite" className="mt-2 text-xs text-muted-foreground">{copied ? 'Username copied — add me in Discord.' : copyFailed ? 'Copy unavailable. Add crzykrackz22 in Discord.' : 'Add crzykrackz22 as a friend in Discord.'}</p></div></div></div><ProjectForm /></div></section>
    </main>
    <footer className="site-footer pb-28 pt-5 sm:pb-24"><div className="footer-pod glass page-width flex flex-col justify-between gap-5 rounded-[2rem] p-6 sm:flex-row sm:items-center sm:rounded-full sm:px-8"><div><a href="#top" className="font-display text-base font-semibold">CrazyKrack<span className="text-primary">.</span></a><p className="mt-2 text-xs text-muted-foreground">© {new Date().getFullYear()} CrazyKrack. All rights reserved.</p></div><nav aria-label="Footer navigation" className="flex flex-wrap gap-5 text-xs text-muted-foreground">{['Work', 'Services', 'About', 'Contact'].map(s => <a key={s} href={`#${s.toLowerCase()}`} className="hover:text-foreground">{s}</a>)}</nav><a href="#top" className="flex items-center gap-2 text-xs text-muted-foreground">Back to top <ArrowUpRight size={14} /></a></div></footer>
    <div className="preview-dock" role="group" aria-label="Quick video previews"><div className="floating-previews"><Button onClick={() => setActive(VIDEOS.find(v => v.cat === 'Minecraft') ?? null)} variant="ghost" className="preview-bubble glass" title="Preview Minecraft" aria-label="Minecraft"><Play size={18} fill="currentColor" /><span>Minecraft</span></Button><Button onClick={() => setActive(VIDEOS.find(v => v.cat === 'Roblox') ?? null)} variant="ghost" className="preview-bubble preview-bubble-blue glass" title="Preview Roblox" aria-label="Roblox"><Play size={18} fill="currentColor" /><span>Roblox</span></Button></div></div>
    <Dialog open={!!active} onOpenChange={open => { if (!open) setActive(null); }}><DialogContent className="video-dialog glass w-[calc(100%-2rem)] max-w-4xl overflow-hidden rounded-[2rem] p-0"><div className="px-5 py-4 pr-12"><DialogTitle className="text-base">{active?.cat} <span className="font-normal text-muted-foreground">/ Video preview</span></DialogTitle><DialogDescription className="sr-only">Watch the selected portfolio video.</DialogDescription></div>{active && <div className="video-dialog-frame aspect-video"><iframe key={active.id} src={embed(active)} className="h-full w-full" allow="autoplay; encrypted-media; fullscreen" allowFullScreen title={`${active.cat} video`} /></div>}</DialogContent></Dialog>
  </div>;
}
