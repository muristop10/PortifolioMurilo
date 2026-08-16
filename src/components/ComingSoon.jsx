import styled from 'styled-components'
import { FiArrowLeft } from 'react-icons/fi'
import { Container, Section, ButtonRouterLink } from './ui.jsx'
import RevealWrapper from './RevealWrapper.jsx'
import SectionHeading from './SectionHeading.jsx'

const Wrap = styled(Section)`
  padding-top: 168px;
  min-height: 68vh;
  display: flex;
  align-items: center;
`

const Center = styled.div`
  text-align: center;
  max-width: 560px;
  margin-inline: auto;
`

const Tag = styled.span`
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  padding: 6px 14px;
  border-radius: var(--radius-pill);
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
  color: var(--accent-soft);
  margin-bottom: 22px;
`

const Desc = styled.p`
  color: var(--text-muted);
  margin: 18px 0 32px;
  line-height: 1.7;
`

/**
 * Placeholder consistente com a identidade visual, usado pelas páginas
 * que ainda serão codadas (Projetos, Galeria, Contato).
 */
export default function ComingSoon({ kicker, title, description }) {
  return (
    <Wrap>
      <Container>
        <RevealWrapper>
          <Center>
            <Tag>em construção</Tag>
            <SectionHeading kicker={kicker} title={title} center noMargin />
            <Desc>{description}</Desc>
            <ButtonRouterLink to="/" $variant="outline">
              <FiArrowLeft /> Voltar pra home
            </ButtonRouterLink>
          </Center>
        </RevealWrapper>
      </Container>
    </Wrap>
  )
}
