import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Line = styled.span`
  font-family: var(--font-mono);
  color: var(--accent-soft);
  font-size: clamp(1rem, 2.4vw, 1.25rem);

  &::after {
    content: '|';
    margin-left: 3px;
    animation: blink 1s step-start infinite;
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
`

/**
 * Efeito de máquina de escrever, alternando entre as frases de `words`.
 * Respeita prefers-reduced-motion (mostra a primeira frase, parada).
 */
export default function Typewriter({ words = [], typeSpeed = 70, deleteSpeed = 40, pause = 1400 }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      setText(words[0] || '')
      return
    }

    const current = words[index % words.length]
    let timeout

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed)
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deleteSpeed)
    } else if (deleting && text.length === 0) {
      setDeleting(false)
      setIndex((i) => i + 1)
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause])

  return <Line>{text}</Line>
}
