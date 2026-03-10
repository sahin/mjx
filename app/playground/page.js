'use client';

import { useState } from 'react';
import Link from 'next/link';

const TARGETS = [
  {
    id: 'swiftui',
    label: 'SwiftUI',
    icon: '🍎',
    color: '#f5a623',
    description: 'English → Swift / SwiftUI (Apple UI)',
    placeholder: 'e.g. Create a vertical stack with a title "Welcome!" in large font and a blue "Get Started" button below it.',
  },
  {
    id: 'chatbot',
    label: 'Chatbot (Rust)',
    icon: '🤖',
    color: '#ef5350',
    description: 'English → Rust / WebAssembly (Chatbot)',
    placeholder: 'e.g. Start with "Hello! How can I help?". If the user says billing, ask "What is your billing question?".',
  },
  {
    id: 'api',
    label: 'API (Go)',
    icon: '⚡',
    color: '#26c6da',
    description: 'English → Go (REST API)',
    placeholder: 'e.g. Create a User API with a name and email field. Include GET /users and POST /users endpoints.',
  },
  {
    id: 'web',
    label: 'Web (Rust/WASM)',
    icon: '🦀',
    color: '#ab47bc',
    description: 'English → Rust / WASM (Web App)',
    placeholder: 'e.g. Create a counter app with a heading showing the count, an increment button, and a decrement button.',
  },
  {
    id: 'backend',
    label: 'Backend (Swift)',
    icon: '🚀',
    color: '#4fc3f7',
    description: 'English → Swift / Vapor (Backend)',
    placeholder: 'e.g. Create a Blog Post model with title and content. Add full CRUD endpoints and protect create/delete.',
  },
];

export default function PlaygroundPage() {
  const [selectedTarget, setSelectedTarget] = useState(TARGETS[0]);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [ir, setIr] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('code');

  const handleCompile = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setOutput('');
    setIr('');
    setError('');

    try {
      const res = await fetch('/api/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target: selectedTarget.id, input }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Compilation failed');
      }

      const data = await res.json();
      setOutput(data.code);
      setIr(data.ir);
      setActiveTab('code');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#e8e8e8', fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {/* Nav */}
      <nav style={{ borderBottom: '1px solid #1a1a1a', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px' }}>
        <Link href="/" style={{ color: '#f5a623', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '1rem', textDecoration: 'none', letterSpacing: '-0.02em' }}>
          MJX
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link href="/docs" style={{ color: '#888', fontSize: '0.85rem', textDecoration: 'none' }}>Docs</Link>
          <Link href="/playground" style={{ color: '#f5a623', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600 }}>Playground</Link>
          <a href="https://github.com/sahin/mjx" target="_blank" rel="noopener noreferrer" style={{ color: '#888', fontSize: '0.85rem', textDecoration: 'none' }}>GitHub</a>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: '#f5a623', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Live Compiler
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, fontFamily: "'Syne', sans-serif", letterSpacing: '-0.03em' }}>
            English → {selectedTarget.label}
          </h1>
          <p style={{ color: '#666', marginTop: '0.5rem', fontSize: '0.95rem' }}>
            Type a description in plain English and compile it to {selectedTarget.label} code in real time.
          </p>
        </div>

        {/* Target Selector */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {TARGETS.map((t) => (
            <button
              key={t.id}
              onClick={() => { setSelectedTarget(t); setOutput(''); setIr(''); setError(''); setInput(''); }}
              style={{
                padding: '0.4rem 0.9rem',
                borderRadius: '6px',
                border: selectedTarget.id === t.id ? `1px solid ${t.color}` : '1px solid #222',
                background: selectedTarget.id === t.id ? `${t.color}18` : 'transparent',
                color: selectedTarget.id === t.id ? t.color : '#666',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.78rem',
                cursor: 'pointer',
                fontWeight: selectedTarget.id === t.id ? 700 : 400,
                transition: 'all 0.15s',
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Main Editor */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', minHeight: '480px' }}>
          {/* Input Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                English Input
              </span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: '#333' }}>
                {selectedTarget.description}
              </span>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={selectedTarget.placeholder}
              style={{
                flex: 1,
                background: '#0f0f0f',
                border: '1px solid #1e1e1e',
                borderRadius: '8px',
                color: '#e8e8e8',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.88rem',
                padding: '1rem',
                resize: 'none',
                outline: 'none',
                lineHeight: 1.7,
                minHeight: '360px',
              }}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') handleCompile();
              }}
            />
            <button
              onClick={handleCompile}
              disabled={loading || !input.trim()}
              style={{
                padding: '0.75rem 1.5rem',
                background: loading || !input.trim() ? '#1a1a1a' : selectedTarget.color,
                color: loading || !input.trim() ? '#444' : '#000',
                border: 'none',
                borderRadius: '8px',
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                letterSpacing: '0.05em',
                transition: 'all 0.15s',
              }}
            >
              {loading ? '⟳ Compiling...' : `⌘↵  Compile to ${selectedTarget.label}`}
            </button>
          </div>

          {/* Output Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={() => setActiveTab('code')}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.72rem',
                  color: activeTab === 'code' ? selectedTarget.color : '#555',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '0',
                  borderBottom: activeTab === 'code' ? `1px solid ${selectedTarget.color}` : '1px solid transparent',
                  paddingBottom: '2px',
                }}
              >
                Generated Code
              </button>
              <span style={{ color: '#333', fontSize: '0.7rem' }}>|</span>
              <button
                onClick={() => setActiveTab('ir')}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.72rem',
                  color: activeTab === 'ir' ? selectedTarget.color : '#555',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '0',
                  borderBottom: activeTab === 'ir' ? `1px solid ${selectedTarget.color}` : '1px solid transparent',
                  paddingBottom: '2px',
                }}
              >
                IR (JSON)
              </button>
            </div>

            <div
              style={{
                flex: 1,
                background: '#0f0f0f',
                border: `1px solid ${output || ir ? '#1e1e1e' : '#1a1a1a'}`,
                borderRadius: '8px',
                padding: '1rem',
                overflow: 'auto',
                minHeight: '360px',
                position: 'relative',
              }}
            >
              {error && (
                <div style={{ color: '#ef5350', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem', lineHeight: 1.6 }}>
                  ✗ {error}
                </div>
              )}
              {loading && (
                <div style={{ color: '#555', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</span>
                  Parsing English intent...
                </div>
              )}
              {!loading && !error && !output && !ir && (
                <div style={{ color: '#2a2a2a', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem', lineHeight: 1.8 }}>
                  <div>// Output will appear here</div>
                  <div>// Press ⌘↵ or click Compile</div>
                </div>
              )}
              {!loading && !error && (
                <pre style={{
                  margin: 0,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.8rem',
                  lineHeight: 1.7,
                  color: '#c8c8c8',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}>
                  {activeTab === 'code' ? output : ir}
                </pre>
              )}
            </div>

            {output && (
              <button
                onClick={() => navigator.clipboard.writeText(activeTab === 'code' ? output : ir)}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'transparent',
                  border: '1px solid #222',
                  borderRadius: '6px',
                  color: '#555',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  alignSelf: 'flex-end',
                }}
              >
                Copy to clipboard
              </button>
            )}
          </div>
        </div>

        {/* Example prompts */}
        <div style={{ marginTop: '3rem', borderTop: '1px solid #111', paddingTop: '2rem' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: '#444', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
            Example Prompts
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem' }}>
            {[
              { target: TARGETS[0], prompt: 'Create a login form with an email field, a password field, and a Sign In button.' },
              { target: TARGETS[1], prompt: 'Build a support bot that asks for the user\'s order number and then checks the status.' },
              { target: TARGETS[2], prompt: 'Create a Product API with name, price, and stock fields. Include full CRUD endpoints.' },
              { target: TARGETS[3], prompt: 'Build a todo list app with an input to add items and a button to delete each one.' },
              { target: TARGETS[4], prompt: 'Create a User model with email and password. Add a POST /register and POST /login endpoint.' },
            ].map((ex, i) => (
              <button
                key={i}
                onClick={() => { setSelectedTarget(ex.target); setInput(ex.prompt); setOutput(''); setIr(''); setError(''); }}
                style={{
                  background: '#0f0f0f',
                  border: '1px solid #1a1a1a',
                  borderRadius: '8px',
                  padding: '0.85rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: '#888',
                  fontSize: '0.82rem',
                  lineHeight: 1.5,
                  transition: 'border-color 0.15s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = ex.target.color}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1a1a1a'}
              >
                <div style={{ color: ex.target.color, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {ex.target.icon} {ex.target.label}
                </div>
                {ex.prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
