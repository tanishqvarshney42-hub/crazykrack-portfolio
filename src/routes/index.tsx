import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CrazyKrack — Video Editor Portfolio" },
      { name: "description", content: "CrazyKrack edits Minecraft, Roblox, Fortnite, vlog, IRL gaming and business videos with strong pacing, sound design and retention." },
      { property: "og:title", content: "CrazyKrack — Videos that make people stay." },
      { property: "og:description", content: "Video editing focused on storytelling, pacing, sound design and retention." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Cat = "Roblox" | "Minecraft" | "Vlog" | "Business" | "IRL Game" | "Fortnite";
type Video = { id: string; cat: Cat; yt?: boolean };

const VIDEOS: Video[] = [
  { id: "1IA007oPmuwiJZTf_V0omyJHpTqDYbmL-", cat: "Minecraft" },
  { id: "1V7LX2KYjlp8XZ707g6D-eBb81j-0GYBj", cat: "Minecraft" },
  { id: "1OTrgvi49DHt97nVHEw7EcdwyhLRDAuqa", cat: "Minecraft" },
  { id: "15WLHKHZMgXe3l_ipoE_HYjAIlDyo_nPc", cat: "Minecraft" },
  { id: "1AS1XuIN4giXJhNEg0DkaSaYgwyxTHfq1", cat: "Minecraft" },
  { id: "GVTeMVqFJzI", cat: "Roblox", yt: true },
  { id: "1yzU_ZpqUaSzOgGGNn2EFVgJ_271t1J21", cat: "Vlog" },
  { id: "1iGEYcnFHQn_Dnb8vnV42QmEXSZYCFQ_J", cat: "IRL Game" },
  { id: "16agkwkqhdy6j7krimkpBeOL2tW1EihIa", cat: "Fortnite" },
  { id: "1QGTHENrttWjYKPO_-3z_ML-v1uPtsIOY", cat: "Business" },
  { id: "17uclJyku9thvRQa3rhjTWGxHBUv14QSS", cat: "Business" },
  { id: "1qdv2jBxViXFuQ--ZgS8qgRduFBr1pDAK", cat: "Business" },
];
const FILTERS = ["All", "Roblox", "Minecraft", "Vlog", "Business", "IRL Game", "Fortnite"] as const;

const thumb = (v: Video) =>
  v.yt ? `https://img.youtube.com/vi/${v.id}/hqdefault.jpg` : `https://drive.google.com/thumbnail?id=${v.id}&sz=w1200`;
const embed = (v: Video) =>
  v.yt ? `https://www.youtube.com/embed/${v.id}?autoplay=1` : `https://drive.google.com/file/d/${v.id}/preview`;

const EMAIL = "tanishqvarshney42@gmail.com";
const DISCORD = "https://discord.com/users/crzykrackz22";

const SERVICES = [
  { t: "Gaming Edits", d: "Minecraft, Roblox, Fortnite and IRL gaming videos cut for energy, humor and replay value." },
  { t: "Storytelling & Pacing", d: "Strong hooks, tight structure and rhythm that keeps viewers watching to the end." },
  { t: "Sound Design", d: "SFX, music timing and clean audio that make every moment land harder." },
  { t: "Vlogs & Business", d: "Clear, polished edits for vlogs, brands and creators that communicate fast." },
];

function Index() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [active, setActive] = useState<Video | null>(null);
  const list = useMemo(() => (filter === "All" ? VIDEOS : VIDEOS.filter((v) => v.cat === filter)), [filter]);

  useEffect(() => {
    if (!active) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [active]);

  const first = (c: Cat) => VIDEOS.find((v) => v.cat === c)!;

  return (
    <div className="min-h-screen">
      <header className="sticky top-4 z-40 mx-auto mt-4 w-[calc(100%-2rem)] max-w-5xl">
        <nav className="glass flex items-center justify-between rounded-full px-5 py-3">
          <a href="#top" className="font-display text-lg font-bold">Crazy<span className="text-primary">Krack</span></a>
          <div className="hidden gap-6 text-sm text-muted-foreground sm:flex">
            {["Work", "Services", "About", "Contact"].map((s) => (
              <a key={s} href={`#${s.toLowerCase()}`} className="transition-colors hover:text-foreground">{s}</a>
            ))}
          </div>
          <a href="#contact" className="bg-gradient-primary rounded-full px-4 py-2 text-sm font-semibold text-primary-foreground">Hire me</a>
        </nav>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-4 sm:px-6">
        <section className="py-24 text-center sm:py-32">
          <span className="glass inline-block rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-primary-glow">Video Editor</span>
          <h1 className="text-gradient mx-auto mt-6 max-w-4xl text-5xl font-bold leading-[1.05] sm:text-7xl">Videos that make people stay.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            I edit with intention — sharp hooks, engaging storytelling, tight pacing and sound design built to hold attention and boost retention.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="#work" className="bg-gradient-primary shadow-glow rounded-full px-7 py-3 font-semibold text-primary-foreground transition-transform hover:scale-105">View my work</a>
            <a href="#contact" className="glass rounded-full px-7 py-3 font-semibold transition-colors hover:bg-accent">Let's talk</a>
          </div>
        </section>

        <section id="work" className="scroll-mt-28 py-16">
          <h2 className="text-3xl font-bold sm:text-4xl">Selected <span className="text-primary">Work</span></h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${filter === f ? "bg-gradient-primary shadow-glow text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((v) => (
              <article key={v.id} className="glass group overflow-hidden rounded-3xl transition-transform hover:-translate-y-1">
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img src={thumb(v)} alt={`${v.cat} edit thumbnail`} loading="lazy" referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex items-center justify-between p-4">
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary-glow">{v.cat}</span>
                  <button onClick={() => setActive(v)} className="bg-gradient-primary rounded-full px-4 py-2 text-sm font-semibold text-primary-foreground">▶ Preview</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className="scroll-mt-28 py-16">
          <h2 className="text-3xl font-bold sm:text-4xl">What I <span className="text-primary">do</span></h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {SERVICES.map((s, i) => (
              <div key={s.t} className="glass rounded-3xl p-7">
                <div className="bg-gradient-primary grid h-10 w-10 place-items-center rounded-2xl font-bold text-primary-foreground">{i + 1}</div>
                <h3 className="mt-4 text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="scroll-mt-28 py-16">
          <div className="glass rounded-[2rem] p-8 sm:p-12">
            <h2 className="text-3xl font-bold sm:text-4xl">About <span className="text-primary">me</span></h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>I'm CrazyKrack, a video editor who turns raw footage into engaging stories. From Minecraft and Roblox to vlogs, IRL gaming, Fortnite, and business content, I focus on clean cuts, strong pacing, sound design, and moments that keep viewers watching.</p>
              <p>I believe every video needs more than effects. It needs rhythm, clarity, and a story worth staying for.</p>
              <p className="text-foreground">If you’re looking for an editor who cares about the details from the first hook to the final cut, let’s work together.</p>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-28 py-16 pb-32 text-center">
          <h2 className="text-gradient text-4xl font-bold sm:text-5xl">Let's make your next video stick.</h2>
          <p className="mt-4 text-muted-foreground">Reach out by email or Discord.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={`mailto:${EMAIL}`} className="bg-gradient-primary shadow-glow break-all rounded-full px-6 py-3 font-semibold text-primary-foreground">✉ {EMAIL}</a>
            <a href={DISCORD} target="_blank" rel="noreferrer" className="glass rounded-full px-6 py-3 font-semibold hover:bg-accent">Discord · crzykrackz22</a>
          </div>
        </section>
      </main>

      <footer className="pb-24 text-center text-sm text-muted-foreground">© {new Date().getFullYear()} CrazyKrack</footer>

      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2">
        <button onClick={() => setActive(first("Minecraft"))} className="glass shadow-glow rounded-full px-4 py-2.5 text-sm font-semibold hover:bg-accent">▶ Minecraft</button>
        <button onClick={() => setActive(first("Roblox"))} className="bg-gradient-primary shadow-glow rounded-full px-4 py-2.5 text-sm font-semibold text-primary-foreground">▶ Roblox</button>
      </div>

      {active && (
        <div className="bg-overlay fixed inset-0 z-50 grid place-items-center p-4 backdrop-blur-md animate-in fade-in" onClick={() => setActive(null)}>
          <div className="glass w-full max-w-4xl overflow-hidden rounded-3xl animate-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-3">
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary-glow">{active.cat}</span>
              <button onClick={() => setActive(null)} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full hover:bg-accent">✕</button>
            </div>
            <div className="aspect-video bg-background">
              <iframe key={active.id} src={embed(active)} className="h-full w-full" allow="autoplay; encrypted-media; fullscreen" allowFullScreen title={`${active.cat} video`} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
