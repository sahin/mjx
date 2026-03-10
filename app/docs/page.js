'use client';
import Link from 'next/link';

const DOCS = [
  {
    slug: 'english-to-swift-ui-spec',
    label: 'English → UI',
    sublabel: 'Swift / SwiftUI',
    icon: '🍎',
    tag: 'macOS · iOS · watchOS',
    color: '#f5a623',
    description: 'Compile plain English UI descriptions into declarative, production-ready SwiftUI code for Apple platforms.',
    preview: `Text("Welcome!")
    .font(.largeTitle)
    .fontWeight(.bold)`,
    examples: ['Welcome Screen', 'Profile Card', 'Login Form', 'Settings Form'],
  },
  {
    slug: 'english-to-chatbot-rust-spec',
    label: 'English → Chatbot',
    sublabel: 'Rust / WebAssembly',
    icon: '🤖',
    tag: 'Web · Browser · WASM',
    color: '#ef5350',
    description: 'Compile conversational flow descriptions into a high-performance, sandboxed Rust/WASM finite state machine.',
    preview: `match self.state {
    ChatState::Welcome => {
        if lower.contains("billing") {
            self.state = ChatState::Billing;`,
    examples: ['Welcome Bot', 'Lead Capture', 'Order Status'],
  },
  {
    slug: 'english-to-api-go-spec',
    label: 'English → API',
    sublabel: 'Go',
    icon: '⚡',
    tag: 'Backend · REST · Microservices',
    color: '#26c6da',
    description: 'Compile API endpoint and data model descriptions into a high-performance, statically-compiled Go backend service.',
    preview: `func GetUsers(w http.ResponseWriter,
    r *http.Request) {
    json.NewEncoder(w).Encode(users)
}`,
    examples: ['User CRUD', 'Product + PostgreSQL', 'Auth-Protected API'],
  },
  {
    slug: 'english-to-web-rust-spec',
    label: 'English → Web',
    sublabel: 'Rust / WASM',
    icon: '🦀',
    tag: 'Frontend · SPA · Browser',
    color: '#ab47bc',
    description: 'Compile web application descriptions into a complete, high-performance Rust/WASM SPA using the Yew framework.',
    preview: `let count = use_state(|| 0i32);
html! {
    <h1>{ *count }</h1>
    <button onclick={on_increment}>`,
    examples: ['Counter App', 'To-Do List', 'Two-Page Router'],
  },
  {
    slug: 'english-to-swift-backend-spec',
    label: 'English → Backend',
    sublabel: 'Swift / Vapor',
    icon: '🚀',
    tag: 'Server-Side · REST · ORM',
    color: '#4fc3f7',
    description: 'Compile API descriptions into complete Vapor server-side Swift applications with Fluent ORM database integration.',
    preview: `func list(req: Request) async throws
    -> [Todo] {
    try await Todo.query(on: req.db).all()
}`,
    examples: ['Todo API', 'Blog API + Auth', 'Product + Migration'],
  },
  {
    slug: 'english-to-x-targets',
    label: '100 Compilation Targets',
    sublabel: 'Reference List',
    icon: '📋',
    tag: 'Research · Reference',
    color: '#a5d6a7',
    description: 'A comprehensive reference list of 100 potential compilation targets across 10 categories, from SwiftUI to Solidity smart contracts.',
    preview: `// 10 categories × 10 targets each
// UI · Backend · Web · Database
// DevOps · API · AI/ML · Scripts
// Data · Emerging`,
    examples: ['All 100 targets', '10 categories', 'With descriptions'],
  },
];

const S = {
  page: { background: '#0e0e0e', minHeight: '100vh', color: '#f0f0f0', fontFamily: "'Inter', -apple-system, sans-serif" },
  nav: { position: 'sticky', top: 0, zIndex: 100, background: 'rgba(14,14,14,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 2rem', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  logo: { fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '0.95rem', color: '#f5a623', textDecoration: 'none', letterSpacing: '0.1em' },
  navRight: { display: 'flex', gap: '1.5rem', alignItems: 'center' },
  navLink: { color: '#555', fontSize: '0.82rem', fontFamily: "'JetBrains Mono', monospace", textDecoration: 'none' },
  body: { maxWidth: '1100px', margin: '0 auto', padding: '3.5rem 2rem 6rem' },
  eyebrow: { fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: '#f5a623', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' },
  h1: { fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: '0.5rem' },
  subtitle: { fontSize: '0.95rem', color: '#666', lineHeight: 1.7, marginBottom: '3rem' },
  sectionLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#3a3a3a', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden', marginBottom: '3rem' },
  card: (color) => ({
    background: '#0e0e0e',
    padding: '1.5rem',
    textDecoration: 'none',
    display: 'block',
    transition: 'background 0.12s',
    cursor: 'pointer',
    borderLeft: `2px solid transparent`,
  }),
  cardHover: (color) => ({ background: '#141414', borderLeft: `2px solid ${color}` }),
  cardTop: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' },
  cardIcon: { fontSize: '1.4rem' },
  cardLabel: { fontSize: '1rem', fontWeight: 700, color: '#e8e8e8', letterSpacing: '-0.01em', marginBottom: '2px' },
  cardSublabel: (color) => ({ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color, fontWeight: 600 }),
  cardDesc: { fontSize: '0.82rem', color: '#666', lineHeight: 1.7, marginBottom: '1rem' },
  codePreview: { fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', lineHeight: 1.7, color: '#555', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '5px', padding: '0.75rem', marginBottom: '1rem', whiteSpace: 'pre' },
  examplesRow: { display: 'flex', gap: '0.35rem', flexWrap: 'wrap' },
  exBadge: (color) => ({ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', fontWeight: 600, padding: '2px 6px', borderRadius: '3px', background: `${color}12`, color, border: `1px solid ${color}28`, letterSpacing: '0.03em' }),
  // Reference row
  refRow: { border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' },
  refCard: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0e0e0e', padding: '1.1rem 1.5rem', gap: '1rem', textDecoration: 'none', transition: 'background 0.12s' },
};

function DocCard({ doc }) {
  return (
    <Link href={`/docs/${doc.slug}`} style={S.card(doc.color)}
      onMouseEnter={e => { e.currentTarget.style.background = '#141414'; e.currentTarget.style.borderLeft = `2px solid ${doc.color}`; }}
      onMouseLeave={e => { e.currentTarget.style.background = '#0e0e0e'; e.currentTarget.style.borderLeft = '2px solid transparent'; }}
    >
      <div style={S.cardTop}>
        <div>
          <div style={S.cardLabel}>{doc.icon} {doc.label}</div>
          <div style={S.cardSublabel(doc.color)}>{doc.sublabel}</div>
        </div>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: doc.color }}>→</span>
      </div>
      <p style={S.cardDesc}>{doc.description}</p>
      <div style={S.codePreview}>{doc.preview}</div>
      <div style={S.examplesRow}>
        {doc.examples.map(ex => (
          <span key={ex} style={S.exBadge(doc.color)}>{ex}</span>
        ))}
      </div>
    </Link>
  );
}

export default function DocsIndex() {
  return (
    <div style={S.page}>
      <nav style={S.nav}>
        <Link href="/" style={S.logo}>MJX</Link>
        <div style={S.navRight}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', color: '#f5a623' }}>/docs</span>
          <Link href="/playground" style={S.navLink}>Playground</Link>
          <Link href="/app" style={{ ...S.navLink, color: '#f5a623', fontWeight: 700 }}>WASM App ↗</Link>
        </div>
      </nav>

      <div style={S.body}>
        <div style={S.eyebrow}>Documentation</div>
        <h1 style={S.h1}>MJX Specification Docs</h1>
        <p style={S.subtitle}>
          Architecture specifications for all 5 compilation targets. Each doc includes a split-screen view with
          English input on the left and the generated code on the right — with interactive example switches.
        </p>

        {/* Core Targets grid */}
        <div style={S.sectionLabel}>Core Targets — 5 Engines</div>
        <div style={S.grid}>
          {DOCS.slice(0, 5).map(doc => <DocCard key={doc.slug} doc={doc} />)}
        </div>

        {/* Reference */}
        <div style={S.sectionLabel}>Reference</div>
        <div style={S.refRow}>
          {DOCS.slice(5).map(doc => (
            <Link key={doc.slug} href={`/docs/${doc.slug}`} style={S.refCard}
              onMouseEnter={e => { e.currentTarget.style.background = '#141414'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#0e0e0e'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.2rem' }}>{doc.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#e0e0e0' }}>{doc.label}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: doc.color, marginTop: '2px' }}>{doc.sublabel}</div>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#555', maxWidth: '500px' }}>{doc.description}</div>
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: doc.color, flexShrink: 0 }}>→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
