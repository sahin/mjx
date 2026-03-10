'use client';
import Link from 'next/link';

const DOCS = [
  {
    slug: 'english-to-swift-ui-spec',
    label: 'English → UI',
    sublabel: 'Swift / SwiftUI',
    tag: 'macOS · iOS · watchOS',
    color: '#f5a623',
    description: 'Architecture specification for the three-stage pipeline that compiles natural English descriptions into declarative SwiftUI code for Apple platforms.',
  },
  {
    slug: 'english-to-chatbot-rust-spec',
    label: 'English → Chatbot',
    sublabel: 'Rust / WebAssembly',
    tag: 'Web · Browser · WASM',
    color: '#ef5350',
    description: 'Architecture for compiling conversational flow descriptions into a high-performance, secure Rust chatbot engine deployed as WebAssembly.',
  },
  {
    slug: 'english-to-api-go-spec',
    label: 'English → API',
    sublabel: 'Go',
    tag: 'Backend · REST · Microservices',
    color: '#26c6da',
    description: 'Architecture for compiling API endpoint and data model descriptions into a high-performance, statically-compiled Go backend service.',
  },
  {
    slug: 'english-to-web-rust-spec',
    label: 'English → Web',
    sublabel: 'Rust / WASM',
    tag: 'Frontend · SPA · Browser',
    color: '#ab47bc',
    description: 'Architecture for compiling web application descriptions into a complete, high-performance single-page application using Rust and WebAssembly.',
  },
  {
    slug: 'english-to-swift-backend-spec',
    label: 'English → Backend',
    sublabel: 'Swift / Vapor',
    tag: 'Server-Side · REST · ORM',
    color: '#4fc3f7',
    description: 'Architecture specification for generating complete Vapor server-side Swift applications from natural language descriptions of APIs and data models.',
  },
  {
    slug: 'english-to-x-targets',
    label: '100 Compilation Targets',
    sublabel: 'Reference List',
    tag: 'Research · Reference',
    color: '#a5d6a7',
    description: 'A comprehensive reference list of 100 potential compilation targets across 10 categories, from SwiftUI to Solidity smart contracts.',
  },
];

export default function DocsIndex() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <nav style={{
        borderBottom: '1px solid var(--border)', padding: '0 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '56px', background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <Link href="/" style={{
          fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '1.1rem',
          color: 'var(--accent)', letterSpacing: '0.1em', textDecoration: 'none',
        }}>MJX</Link>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--muted)' }}>/docs</span>
      </nav>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--accent)',
          letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem',
        }}>Documentation</div>
        <h1 style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '2.5rem',
          color: '#fff', letterSpacing: '-0.03em', marginBottom: '0.5rem',
        }}>MJX Docs</h1>
        <p style={{ color: '#888', fontFamily: 'IBM Plex Sans, sans-serif', fontSize: '1rem', marginBottom: '3rem' }}>
          Architecture specifications for all 5 compilation targets, plus the full 100-target reference list.
        </p>

        {/* Primary 5 targets */}
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--muted)',
          letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem',
        }}>Core Targets</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginBottom: '2.5rem', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden', background: 'var(--border)' }}>
          {DOCS.slice(0, 5).map((doc) => (
            <Link key={doc.slug} href={`/docs/${doc.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'var(--surface)', padding: '1.1rem 1.5rem', gap: '1rem',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#161616'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface)'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flex: 1 }}>
                  <div style={{ minWidth: '120px' }}>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>{doc.label}</div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', color: doc.color, marginTop: '2px' }}>{doc.sublabel}</div>
                  </div>
                  <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: '0.82rem', color: '#666', flex: 1 }}>
                    {doc.description.slice(0, 110)}...
                  </div>
                </div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', color: doc.color, flexShrink: 0 }}>→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Reference */}
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--muted)',
          letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem',
        }}>Reference</div>
        <div style={{ border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
          {DOCS.slice(5).map((doc) => (
            <Link key={doc.slug} href={`/docs/${doc.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'var(--surface)', padding: '1.1rem 1.5rem', gap: '1rem',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#161616'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface)'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flex: 1 }}>
                  <div style={{ minWidth: '120px' }}>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>{doc.label}</div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', color: doc.color, marginTop: '2px' }}>{doc.sublabel}</div>
                  </div>
                  <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: '0.82rem', color: '#666', flex: 1 }}>
                    {doc.description.slice(0, 110)}...
                  </div>
                </div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', color: doc.color, flexShrink: 0 }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
