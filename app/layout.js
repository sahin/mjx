import './globals.css';

export const metadata = {
  title: 'MJX — English-to-{X} Compiler',
  description: 'An open-source framework for compiling plain English into any programming language, framework, or platform.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
