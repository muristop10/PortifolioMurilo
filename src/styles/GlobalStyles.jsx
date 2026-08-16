import { createGlobalStyle } from 'styled-components'

/**
 * Todas as variáveis de cor, tipografia e métricas do projeto vivem aqui.
 * Qualquer componente pode consumir via var(--nome-da-variavel).
 * Paleta herdada do banner/README: gradiente roxo -> azul.
 */
const GlobalCss = createGlobalStyle`
  :root {
    /* === paleta principal === */
    --gradient-start: #6a11cb;
    --gradient-end: #2575fc;
    --gradient-main: linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%);
    --gradient-dark: linear-gradient(135deg, #2b0a5e 0%, #151f4a 55%, #05060d 100%);

    /* === superfícies === */
    --bg-void: #05060d;
    --bg-base: #0b0d17;
    --bg-elevated: #12142a;
    --bg-card: rgba(255, 255, 255, 0.04);
    --bg-card-hover: rgba(255, 255, 255, 0.07);
    --border-soft: rgba(255, 255, 255, 0.09);
    --border-strong: rgba(255, 255, 255, 0.18);

    /* === texto === */
    --text-primary: #f2f4ff;
    --text-secondary: #c9d3ff;
    --text-muted: #9aa0c3;

    /* === acentos === */
    --accent: #79c0ff;
    --accent-soft: #a5d6ff;
    --accent-green: #7ee787;

    /* === tipografia (3 papéis: display, texto corrido, utilitária/código) === */
    --font-display: 'Poppins', 'Segoe UI', Helvetica, Arial, sans-serif;
    --font-body: 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif;
    --font-mono: 'JetBrains Mono', Consolas, 'Courier New', monospace;

    /* === métricas === */
    --radius-sm: 8px;
    --radius-md: 16px;
    --radius-pill: 999px;
    --container-width: 1140px;
    --shadow-glow: 0 16px 40px rgba(106, 17, 203, 0.35);
    --transition-base: 0.3s ease;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    min-height: 100vh;
    background-color: var(--bg-void);
    background-image:
      radial-gradient(circle at 12% 18%, rgba(106, 17, 203, 0.28), transparent 45%),
      radial-gradient(circle at 88% 0%, rgba(37, 117, 252, 0.22), transparent 50%),
      radial-gradient(circle at 50% 100%, rgba(106, 17, 203, 0.14), transparent 60%);
    background-attachment: fixed;
    color: var(--text-primary);
    font-family: var(--font-body);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  h1, h2, h3, h4 {
    font-family: var(--font-display);
    line-height: 1.15;
    font-weight: 700;
  }

  code, pre {
    font-family: var(--font-mono);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  button {
    font: inherit;
    color: inherit;
    background: none;
    border: none;
    cursor: pointer;
  }

  :focus-visible {
    outline: 2px solid var(--accent-soft);
    outline-offset: 3px;
  }

  ::selection {
    background: var(--gradient-end);
    color: #fff;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: var(--bg-void);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--gradient-main);
    border-radius: var(--radius-pill);
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`

export default function GlobalStyles({ children }) {
  return (
    <>
      <GlobalCss />
      {children}
    </>
  )
}
