'use client';
import Link from 'next/link';

const docs = [
  {
    slug: 'english-to-swift-ui-spec',
    label: 'SwiftUI Engine',
    tag: 'UI / macOS / iOS',
    color: '#f5a623',
    description: 'Architecture specification for the three-stage pipeline that compiles natural English descriptions into declarative SwiftUI code for Apple platforms.',
  },
  {
    slug: 'english-to-swift-backend-spec',
    label: 'Swift Backend Engine',
    tag: 'Vapor / Server-Side',
    color: '#4fc3f7',
    description: 'Architecture specification for generating complete Vapor server-side Swift applications from natural language descriptions of APIs, data models, and business logic.',
  },
  {
    slug: 'english-to-x-targets',
    label: '100 Compilation Targets',
    tag: 'Reference / Research',
    color: '#a5d6a7',
    description: 'A comprehensive reference list of 100 compilation targets across 10 categories, from SwiftUI and Go microservices to Solidity smart contracts and Quantum Assembly.',
  },
];

const PIPELINE_STEPS = [
  {
    num: '01',
    title: 'Intent Parsing',
    desc: 'An LLM interprets natural language input, identifying components, attributes, and relationships.',
  },
  {
    num: '02',
    title: 'Intermediate Representation',
    desc: 'The parsed intent is formalized into a language-agnostic JSON schema — the stable blueprint.',
  },
  {
    num: '03',
    title: 'Code Generation',
    desc: 'A deterministic, template-driven generator traverses the IR and emits clean, compilable code.',
  },
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
        background: 'rgba(10,10,10,0.9)',
        backdropFilter: 'blur(12px)',
        zIndex: 100,
      }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontWeight: 700,
          fontSize: '1.1rem',
          color: 'var(--accent)',
          letterSpacing: '0.1em',
        }}>MJX</span>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/docs" style={{ color: 'var(--muted)', fontSize: '0.85rem', fontFamily: 'JetBrains Mono, monospace', textDecoration: 'none' }}>
            /docs
          </Link>
          <a
            href="https://github.com/mjx-project/mjx"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#000',
              background: 'var(--accent)',
              padding: '0.3rem 0.9rem',
              borderRadius: '3px',
              fontSize: '0.78rem',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '0.05em',
            }}
          >
            GitHub ↗
          </a>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section style={{
        padding: '7rem 2rem 5rem',
        maxWidth: '1100px',
        margin: '0 auto',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 1px 1px, #222 1px, transparent 0)',
          backgroundSize: '32px 32px',
          opacity: 0.4,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative' }}>
          <div className="animate-fade-up" style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            color: 'var(--accent)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}>
            Open Source · v0.1.0 · MIT License
          </div>

          <h1 className="animate-fade-up delay-100" style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.04em',
            color: '#fff',
            marginBottom: '0.25rem',
          }}>
            English
          </h1>
          <h1 className="animate-fade-up delay-200" style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.04em',
            color: 'var(--accent)',
            marginBottom: '2rem',
          }}>
            to <span style={{ color: '#fff' }}>{'{X}'}</span>
          </h1>

          <p className="animate-fade-up delay-300" style={{
            fontSize: '1.1rem',
            color: '#999',
            maxWidth: '540px',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontWeight: 300,
          }}>
            A compiler that transforms plain English into any programming language, framework, or platform. SwiftUI. Vapor. Go. Terraform. Solidity. 100 targets and counting.
          </p>

          <div className="animate-fade-up delay-400" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/docs" style={{
              background: 'var(--accent)',
              color: '#000',
              padding: '0.7rem 1.6rem',
              borderRadius: '3px',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              fontSize: '0.85rem',
              textDecoration: 'none',
              letterSpacing: '0.05em',
            }}>
              Read the Docs →
            </Link>
            <a href="https://github.com/mjx-project/mjx" style={{
              border: '1px solid var(--border)',
              color: 'var(--text)',
              padding: '0.7rem 1.6rem',
              borderRadius: '3px',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 400,
              fontSize: '0.85rem',
              textDecoration: 'none',
              letterSpacing: '0.05em',
            }}>
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ── Terminal Demo ───────────────────────────────────────── */}
      <section style={{ padding: '0 2rem 5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div className="animate-fade-up delay-500" style={{
          background: '#0d0d0d',
          border: '1px solid var(--border)',
          borderLeft: '3px solid var(--accent)',
          borderRadius: '8px',
          padding: '1.5rem 2rem',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.85rem',
        }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '1rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
          </div>
          <div style={{ color: 'var(--muted)' }}>$ mjx compile --target swiftui</div>
          <div style={{ color: '#888', marginTop: '0.5rem' }}>&gt; Input: <span style={{ color: '#c8c8c8' }}>"Create a vertical stack with a large Welcome! title and a Get Started button below it."</span></div>
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
        padding: '4rem 2rem',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.7rem',
            color: 'var(--accent)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}>
            Compilation Pipeline
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}>
            {PIPELINE_STEPS.map((step) => (
              <div key={step.num} className="pipeline-card" style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '1.5rem',
              }}>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--border)',
                  marginBottom: '0.75rem',
                  lineHeight: 1,
                }}>
                  {step.num}
                </div>
                <div style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  color: '#fff',
                  marginBottom: '0.5rem',
                }}>
                  {step.title}
                </div>
                <div style={{
                  fontSize: '0.88rem',
                  color: '#888',
                  lineHeight: 1.6,
                  fontFamily: 'IBM Plex Sans, sans-serif',
                }}>
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Docs Grid ───────────────────────────────────────────── */}
      <section style={{ padding: '5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.7rem',
          color: 'var(--accent)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '2rem',
        }}>
          Documentation
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {docs.map((doc) => (
            <Link key={doc.slug} href={`/docs/${doc.slug}`} style={{ textDecoration: 'none' }}>
              <div className="doc-card" style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '1.75rem',
                height: '100%',
                cursor: 'pointer',
              }}>
                <span style={{
                  display: 'inline-block',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: doc.color,
                  border: `1px solid ${doc.color}`,
                  padding: '0.2rem 0.5rem',
                  borderRadius: '2px',
                  marginBottom: '1rem',
                }}>
                  {doc.tag}
                </span>
                <div style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.15rem',
                  color: '#fff',
                  marginBottom: '0.75rem',
                  lineHeight: 1.2,
                }}>
                  {doc.label}
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: '#777',
                  lineHeight: 1.6,
                  fontFamily: 'IBM Plex Sans, sans-serif',
                }}>
                  {doc.description}
                </div>
                <div style={{
                  marginTop: '1.25rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.75rem',
                  color: doc.color,
                }}>
                  Read →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.8rem',
          color: 'var(--muted)',
        }}>
          MJX — MIT License — Open Source
        </span>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.75rem',
          color: 'var(--border)',
        }}>
          english → {'{'} any language {'}'}
        </span>
      </footer>
    </div>
  );
}
