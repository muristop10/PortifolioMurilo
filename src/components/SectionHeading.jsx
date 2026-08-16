import styled from 'styled-components'

const Wrap = styled.div`
  text-align: ${(p) => (p.$center ? 'center' : 'left')};
`

const Kicker = styled.span`
  display: block;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--accent-soft);
  opacity: 0.85;
  margin-bottom: 10px;
`

const Title = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  margin-bottom: 16px;
`

const Bar = styled.span`
  display: block;
  width: 64px;
  height: 4px;
  border-radius: 2px;
  background: var(--gradient-main);
  margin-inline: ${(p) => (p.$center ? 'auto' : '0')};
  margin-bottom: ${(p) => (p.$noMargin ? '0' : '36px')};
`

/**
 * Cabeçalho de seção padrão: eyebrow (kicker) + título + barrinha de destaque.
 */
export default function SectionHeading({ kicker, title, center = false, noMargin = false }) {
  return (
    <Wrap $center={center}>
      {kicker && <Kicker>{kicker}</Kicker>}
      <Title>{title}</Title>
      <Bar $center={center} $noMargin={noMargin} />
    </Wrap>
  )
}
