'use client';
import Link from 'next/link';

const TARGETS = [
  {
    slug: 'english-to-swift-ui-spec',
    label: 'English → UI',
    sublabel: 'Swift / SwiftUI',
    tag: 'macOS · iOS · watchOS',
    color: '#f5a623',
    description: 'Compile English UI descriptions into declarative SwiftUI views for Apple platforms.',
    icon: '◈',
  },
  {
    slug: 'english-to-chatbot-rust-spec',
    label: 'English → Chatbot',
    sublabel: 'Rust / WebAssembly',
    tag: 'Web · Browser · WASM',
    color: '#ef5350',
    description: 'Compile conversational flow descriptions into a Rust-based chatbot engine, deployed as WASM.',
    icon: '◎',
  },
  {
    slug: 'english-to-api-go-spec',
    label: 'English → API',
    sublabel: 'Go',
    tag: 'Backend · REST · Microservices',
    color: '#26c6da',
    description: 'Compile API endpoint and data model descriptions into a high-performance Go service.',
    icon: '◇',
  },
  {
    slug: 'english-to-web-rust-spec',
    label: 'English → Web',
    sublabel: 'Rust / WASM',
    tag: 'Frontend · SPA · Browser',
    color: '#ab47bc',
    description: 'Compile web application descriptions into a full Rust/WASM single-page application.',
    icon: '○',
  },
  {
    slug: 'english-to-swift-backend-spec',
    label: 'English → Backend',
    sublabel: 'Swift / Vapor',
    tag: 'Server-Side · REST · ORM',
    color: '#4fc3f7',
    description: 'Compile backend service descriptions into a complete Vapor server-side Swift application.',
    icon: '◉',
  },
];

const PIPELINE_STEPS = [
  { num: '01', title: 'Intent Parsing', desc: 'An LLM interprets natural language input, identifying components, attributes, and relationships.' },
  { num: '02', title: 'Intermediate Representation', desc: 'The parsed intent is formalized into a language-agnostic JSON schema — the stable blueprint.' },
  { num: '03', title: 'Code Generation', desc: 'A deterministic, template-driven generator traverses the IR and emits clean, compilable code.' },
];

const LANG_STACK = [
  { lang: 'Swift', role: 'UI + Backend', color: '#f5a623' },
  { lang: 'Rust', role: 'Web + Chatbot', color: '#ef5350' },
  { lang: 'Go', role: 'API + Services', color: '#26c6da' },
];

export default function Home() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── Nav ─────────────────────────────────────────────────── */}
      <nav style={{
        borderBottom: '1px solid var(--border)',
        padding: '0 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
        position: 'sticky',
        top: 0,
        background: 'rgba(10,10,10,0.92)',
        backdropFilter: 'blur(12px)',
        zIndex: 100,
      }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '1.1rem', color: 'var(--accent)', letterSpacing: '0.1em' }}>MJX</span>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/docs" style={{ color: 'var(--muted)', fontSize: '0.85rem', fontFamily: 'JetBrains Mono, monospace', textDecoration: 'none' }}>/docs</Link>
          <a href="https://github.com/sahin/mjx" target="_blank" rel="noopener noreferrer" style={{
            color: '#000', background: 'var(--accent)', padding: '0.3rem 0.9rem', borderRadius: '3px',
            fontSize: '0.78rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.05em',
          }}>GitHub ↗</a>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section style={{ padding: '6rem 2rem 4rem', maxWidth: '1100px', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 1px 1px, #222 1px, transparent 0)',
          backgroundSize: '32px 32px', opacity: 0.35, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '10%', right: '-5%', width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 70%)', pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative' }}>
          <div className="animate-fade-up" style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: 'var(--accent)',
            letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem',
          }}>
            Open Source · v0.2.0 · MIT License
          </div>

          <h1 className="animate-fade-up delay-100" style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', lineHeight: 1.0,
            letterSpacing: '-0.04em', color: '#fff', marginBottom: '0.2rem',
          }}>English</h1>
          <h1 className="animate-fade-up delay-200" style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', lineHeight: 1.0,
            letterSpacing: '-0.04em', color: 'var(--accent)', marginBottom: '2rem',
          }}>
            to <span style={{ color: '#fff' }}>{'{X}'}</span>
          </h1>

          <p className="animate-fade-up delay-300" style={{
            fontSize: '1.05rem', color: '#999', maxWidth: '520px', lineHeight: 1.75,
            marginBottom: '1.5rem', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 300,
          }}>
            A compiler that transforms plain English into any programming language, framework, or platform. Define your intent. We generate the code.
          </p>

          {/* Language stack pills */}
          <div className="animate-fade-up delay-300" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {LANG_STACK.map(l => (
              <span key={l.lang} style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem',
                color: l.color, border: `1px solid ${l.color}22`,
                background: `${l.color}11`, padding: '0.3rem 0.8rem', borderRadius: '2px',
              }}>
                {l.lang} <span style={{ color: '#555', marginLeft: '4px' }}>/ {l.role}</span>
              </span>
            ))}
          </div>

          <div className="animate-fade-up delay-400" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/docs" style={{
              background: 'var(--accent)', color: '#000', padding: '0.7rem 1.6rem', borderRadius: '3px',
              fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '0.85rem',
              textDecoration: 'none', letterSpacing: '0.05em',
            }}>Read the Docs →</Link>
            <a href="https://github.com/sahin/mjx" style={{
              border: '1px solid var(--border)', color: 'var(--text)', padding: '0.7rem 1.6rem', borderRadius: '3px',
              fontFamily: 'JetBrains Mono, monospace', fontWeight: 400, fontSize: '0.85rem',
              textDecoration: 'none', letterSpacing: '0.05em',
            }}>View on GitHub</a>
          </div>
        </div>
      </section>

      {/* ── 5 Targets Grid ──────────────────────────────────────── */}
      <section style={{ padding: '0 2rem 5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--accent)',
          letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem',
        }}>Compilation Targets</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1px',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          overflow: 'hidden',
          background: 'var(--border)',
        }}>
          {TARGETS.map((t) => (
            <Link key={t.slug} href={`/docs/${t.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'var(--surface)',
                padding: '1.75rem',
                height: '100%',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#161616'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface)'; }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.4rem', color: t.color }}>{t.icon}</span>
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: t.color, border: `1px solid ${t.color}44`,
                    padding: '0.2rem 0.5rem', borderRadius: '2px',
                  }}>{t.tag}</span>
                </div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#fff', marginBottom: '0.25rem' }}>
                  {t.label}
                </div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: t.color, marginBottom: '0.75rem' }}>
                  {t.sublabel}
                </div>
                <div style={{ fontSize: '0.83rem', color: '#777', lineHeight: 1.6, fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  {t.description}
                </div>
                <div style={{ marginTop: '1.25rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: t.color }}>
                  Read spec →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Image Showcase ──────────────────────────────────────── */}
      <section style={{ padding: '0 2rem 5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Live Previews</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
          {[
            { src: '/images/target-swiftui.png', label: 'SwiftUI Engine', color: '#f5a623' },
            { src: '/images/target-chatbot.png', label: 'Chatbot (Rust/WASM)', color: '#ef5350' },
            { src: '/images/target-api-go.png', label: 'API (Go)', color: '#26c6da' },
          ].map((img) => (
            <div key={img.src} style={{ borderRadius: '8px', overflow: 'hidden', border: `1px solid ${img.color}22`, position: 'relative' }}>
              <img src={img.src} alt={img.label} style={{ width: '100%', display: 'block' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.85))', padding: '1rem 0.85rem 0.75rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: img.color }}>
                {img.label}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          {[
            { src: '/images/target-web-rust.png', label: 'Web App (Rust/WASM)', color: '#ab47bc' },
            { src: '/images/target-swift-backend.png', label: 'Backend (Swift/Vapor)', color: '#4fc3f7' },
          ].map((img) => (
            <div key={img.src} style={{ borderRadius: '8px', overflow: 'hidden', border: `1px solid ${img.color}22`, position: 'relative' }}>
              <img src={img.src} alt={img.label} style={{ width: '100%', display: 'block' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.85))', padding: '1rem 0.85rem 0.75rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: img.color }}>
                {img.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Playground CTA ──────────────────────────────────────── */}
      <section style={{ padding: '4rem 2rem', background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', textAlign: 'center' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>Live Compiler</div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '2rem', letterSpacing: '-0.03em', color: '#fff', margin: '0 0 1rem' }}>Try it in your browser</h2>
          <p style={{ color: '#666', lineHeight: 1.7, marginBottom: '2rem', fontSize: '0.9rem', fontFamily: 'IBM Plex Sans, sans-serif' }}>
            The MJX Playground lets you type a plain English description and compile it to any of the five target languages in real time — no installation required.
          </p>
          <Link href="/playground" style={{ background: 'var(--accent)', color: '#000', padding: '0.75rem 1.75rem', borderRadius: '4px', textDecoration: 'none', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.05em' }}>
            Open Playground →
          </Link>
        </div>
      </section>

      {/* ── Terminal Demo ───────────────────────────────────────── */}
      <section style={{ padding: '0 2rem 5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          background: '#0d0d0d', border: '1px solid var(--border)',
          borderLeft: '3px solid var(--accent)', borderRadius: '8px',
          padding: '1.5rem 2rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem',
        }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '1rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
          </div>
          <div style={{ color: 'var(--muted)' }}>$ mjx compile --target swiftui</div>
          <div style={{ color: '#888', marginTop: '0.5rem' }}>&gt; Input: <span style={{ color: '#c8c8c8' }}>"Create a vertical stack with a large Welcome! title and a Get Started button."</span></div>
          <div style={{ color: '#888', marginTop: '0.5rem' }}>&gt; Parsing intent...</div>
          <div style={{ color: '#888' }}>&gt; Generating IR...</div>
          <div style={{ color: 'var(--accent)', marginTop: '0.5rem' }}>&gt; Output: ContentView.swift ✓</div>
          <div style={{ color: '#555', marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
            <span style={{ color: 'var(--accent)' }}>struct</span> <span style={{ color: '#4fc3f7' }}>ContentView</span>: <span style={{ color: '#a5d6a7' }}>View</span> {'{'}
            <br />&nbsp;&nbsp;<span style={{ color: 'var(--accent)' }}>var</span> body: <span style={{ color: 'var(--accent)' }}>some</span> View {'{'}
            <br />&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#4fc3f7' }}>VStack</span>(spacing: 20) {'{'}
            <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#4fc3f7' }}>Text</span>(<span style={{ color: '#a5d6a7' }}>"Welcome!"</span>).<span style={{ color: '#888' }}>font</span>(.<span style={{ color: '#4fc3f7' }}>largeTitle</span>)
            <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#4fc3f7' }}>Button</span>(<span style={{ color: '#a5d6a7' }}>"Get Started"</span>) {'{'} ... {'}'}
            <br />&nbsp;&nbsp;&nbsp;&nbsp;{'}'}
            <br />&nbsp;&nbsp;{'}'}
            <br />{'}'}
          </div>
        </div>
      </section>

      {/* ── Pipeline ────────────────────────────────────────────── */}
      <section style={{
        padding: '4rem 2rem', borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)', background: 'var(--surface)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--accent)',
            letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '2rem',
          }}>Compilation Pipeline</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {PIPELINE_STEPS.map((step) => (
              <div key={step.num} style={{
                background: 'var(--bg)', border: '1px solid var(--border)',
                borderRadius: '6px', padding: '1.5rem',
              }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '2rem', fontWeight: 700, color: 'var(--border)', marginBottom: '0.75rem', lineHeight: 1 }}>
                  {step.num}
                </div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: '#fff', marginBottom: '0.5rem' }}>
                  {step.title}
                </div>
                <div style={{ fontSize: '0.88rem', color: '#888', lineHeight: 1.6, fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid var(--border)', padding: '2rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
      }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color: 'var(--muted)' }}>
          MJX — MIT License — Open Source
        </span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--border)' }}>
          english → {'{'} ui · chatbot · api · web · backend {'}'}
        </span>
      </footer>
    </div>
  );
}
