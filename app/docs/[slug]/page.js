import Link from 'next/link';
import { getAllDocSlugs, getDocBySlug } from '../../../lib/docs';

const DOC_META = {
  'english-to-swift-ui-spec': { label: 'SwiftUI Engine', tag: 'UI / macOS / iOS', color: '#f5a623' },
  'english-to-swift-backend-spec': { label: 'Swift Backend Engine', tag: 'Vapor / Server-Side', color: '#4fc3f7' },
  'english-to-x-targets': { label: '100 Compilation Targets', tag: 'Reference / Research', color: '#a5d6a7' },
};

export async function generateStaticParams() {
  const slugs = getAllDocSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const doc = await getDocBySlug(params.slug);
  const meta = DOC_META[params.slug] || {};
  return {
    title: `${meta.label || doc.title} — MJX`,
    description: doc.description,
  };
}

export default async function DocPage({ params }) {
  const doc = await getDocBySlug(params.slug);
  const meta = DOC_META[params.slug] || {};
  const accentColor = meta.color || '#f5a623';

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Nav */}
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
        <Link href="/docs" style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.75rem',
          color: 'var(--muted)',
          textDecoration: 'none',
        }}>← All Docs</Link>
      </nav>

      {/* Doc header */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
        padding: '3rem 2rem 2.5rem',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {meta.tag && (
            <span style={{
              display: 'inline-block',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: accentColor,
              border: `1px solid ${accentColor}`,
              padding: '0.2rem 0.5rem',
              borderRadius: '2px',
              marginBottom: '1rem',
            }}>
              {meta.tag}
            </span>
          )}
          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: '#fff',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}>
            {meta.label || doc.title}
          </h1>
        </div>
      </div>

      {/* Doc content */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem 6rem' }}>
        <article
          className="prose"
          dangerouslySetInnerHTML={{ __html: doc.contentHtml }}
        />
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <Link href="/docs" style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.78rem',
          color: 'var(--muted)',
          textDecoration: 'none',
        }}>
          ← Back to Docs
        </Link>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.72rem',
          color: 'var(--border)',
        }}>
          MJX — MIT License
        </span>
      </footer>
    </div>
  );
}
