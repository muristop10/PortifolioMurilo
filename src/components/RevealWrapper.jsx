import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  opacity: 0;
  transform: translateY(${(p) => p.$distance}px);
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: ${(p) => p.$delay}ms;

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    opacity: 1;
    transform: none;
  }
`

/**
 * Revela o conteúdo (fade + slide-up) quando entra na viewport.
 * Uso: <RevealWrapper delay={100}>...</RevealWrapper>
 */
export default function RevealWrapper({ children, delay = 0, distance = 24, as }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(node)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Wrapper
      ref={ref}
      as={as}
      className={visible ? 'is-visible' : ''}
      $delay={delay}
      $distance={distance}
    >
      {children}
    </Wrapper>
  )
}
