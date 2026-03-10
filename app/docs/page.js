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

export default function DocsIndex() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <nav style={{
        borderBottom: '1px solid var(--border)',
        padding: '0 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
        background: 'rgba(10,10,10,0.95)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <Link href="/" style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontWeight: 700,
          fontSize: '1.1rem',
          color: 'var(--accent)',
          letterSpacing: '0.1em',
          textDecoration: 'none',
        }}>MJX</Link>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.75rem',
          color: 'var(--muted)',
        }}>/docs</span>
      </nav>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.7rem',
          color: 'var(--accent)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>
          Documentation
        </div>
        <h1 style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: '2.5rem',
          color: '#fff',
          letterSpacing: '-0.03em',
          marginBottom: '0.5rem',
        }}>
          MJX Docs
        </h1>
        <p style={{
          color: '#888',
          fontFamily: 'IBM Plex Sans, sans-serif',
          fontSize: '1rem',
          marginBottom: '3rem',
        }}>
          Architecture specifications, engine designs, and the complete reference list of 100 compilation targets.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {docs.map((doc) => (
            <Link key={doc.slug} href={`/docs/${doc.slug}`} style={{ textDecoration: 'none' }}>
              <div className="doc-list-item" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '1.25rem 1.5rem',
                gap: '1rem',
              }}>
                <div>
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.62rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: doc.color,
                    marginRight: '0.75rem',
                  }}>
                    {doc.tag}
                  </span>
                  <span style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: '#fff',
                  }}>
                    {doc.label}
                  </span>
                  <p style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: '0.82rem',
                    color: '#666',
                    marginTop: '0.3rem',
                  }}>
                    {doc.description.slice(0, 120)}...
                  </p>
                </div>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: doc.color,
                  flexShrink: 0,
                }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
