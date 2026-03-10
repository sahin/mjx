export default function WasmAppPage() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#111' }}>
      <iframe
        src="/wasm/index.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
        }}
        title="MJX — English to Code (Rust/WASM)"
        allow="clipboard-write"
      />
    </div>
  );
}
