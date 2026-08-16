import styled from 'styled-components'
import { FiArrowRight, FiMail } from 'react-icons/fi'
import { Container, Section, ButtonRouterLink } from '../components/ui.jsx'
import RevealWrapper from '../components/RevealWrapper.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import SkillPill from '../components/SkillPill.jsx'
import CodeCard from '../components/CodeCard.jsx'
import Typewriter from '../components/Typewriter.jsx'
import { skillGroups } from '../data/skills.js'

const Hero = styled(Section)`
  padding-top: 168px;
`

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 56px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`

const Kicker = styled.p`
  font-family: var(--font-mono);
  color: var(--accent-soft);
  font-size: 0.95rem;
  margin-bottom: 14px;
`

const Name = styled.h1`
  font-size: clamp(2.4rem, 6vw, 4rem);
  font-weight: 800;
  line-height: 1.08;
  margin-bottom: 14px;
  background: var(--gradient-main);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
`

const TypeRow = styled.div`
  margin-bottom: 24px;
  min-height: 1.6em;
`

const Bio = styled.p`
  color: var(--text-muted);
  max-width: 520px;
  margin-bottom: 32px;
  line-height: 1.75;

  @media (max-width: 900px) {
    margin-inline: auto;
  }
`

const Actions = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    justify-content: center;
  }
`

const HeroVisual = styled.div`
  position: relative;
`

const Blob = styled.div`
  position: absolute;
  inset: -40px;
  background: var(--gradient-main);
  filter: blur(90px);
  opacity: 0.35;
  z-index: -1;
  border-radius: 50%;
`

const AboutText = styled.p`
  color: var(--text-muted);
  line-height: 1.8;
  max-width: 760px;
  font-size: 1.02rem;

  & + & {
    margin-top: 16px;
  }
`

const SkillGroupWrap = styled.div`
  margin-top: 40px;

  &:first-of-type {
    margin-top: 48px;
  }
`

const GroupTitle = styled.h3`
  font-family: var(--font-mono);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 14px;
`

const PillRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

const NowGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 56px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`

const NowCard = styled.div`
  padding: 26px;
  border-radius: var(--radius-md);
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
  transition: transform var(--transition-base), border-color var(--transition-base);

  &:hover {
    transform: translateY(-6px);
    border-color: var(--border-strong);
  }
`

const NowEmoji = styled.div`
  font-size: 1.6rem;
  margin-bottom: 12px;
`

const NowTitle = styled.h4`
  font-size: 1.02rem;
  margin-bottom: 8px;
`

const NowText = styled.p`
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.6;
`
    
const ClosingSection = styled(Section)`
  text-align: center;
`

const ClosingTitle = styled.h2`
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  font-weight: 800;
  margin-bottom: 24px;
`

export default function Home() {
  return (
    <>
      <Hero>
        <Container>
          <HeroGrid>
            <RevealWrapper>
              <div>
                <Kicker>// olá, eu sou o</Kicker>
                <Name>Murilo Thomé</Name>
                <TypeRow>
                  <Typewriter
                    words={[
                      'Dev em aprendizado',
                      'Sempre preparado pro desafio',
                      'Em busca de experiência!',
                    ]}
                  />
                </TypeRow>
                <Bio>
                  Estudo e construo aplicações web, do front-end ao back-end, sempre testando
                  novas ferramentas pra aprimorar minha lógica de programação. Atualmente moro
                  em Chapecó - SC, estagio na Desbravador Software e curso o ensino médio
                  integrado ao técnico em Desenvolvimento de Sistemas, pelo IFSC.
                </Bio>
                <Actions>
                  <ButtonRouterLink to="/projetos">
                    Ver projetos <FiArrowRight />
                  </ButtonRouterLink>
                  <ButtonRouterLink to="/contato" $variant="outline">
                    Fale comigo <FiMail />
                  </ButtonRouterLink>
                </Actions>
              </div>
            </RevealWrapper>

            <RevealWrapper delay={150}>
              <HeroVisual>
                <Blob />
                <CodeCard />
              </HeroVisual>
            </RevealWrapper>
          </HeroGrid>
        </Container>
      </Hero>

      <Section>
        <Container>
          <RevealWrapper>
            <SectionHeading kicker="// sobre-mim" title="Sobre mim" />
          </RevealWrapper>
          <RevealWrapper delay={100}>
            <AboutText>
              Sou estudante do ensino médio técnico integrado em Desenvolvimento de Sistemas
              pelo IFSC e estagiário na Desbravador Software, onde coloco a mão na massa em
              projetos reais enquanto sigo aprendendo. Gosto de explorar ferramentas e
              frameworks modernos, tanto no front quanto no back-end, e de entender como cada
              peça se encaixa pra construir algo que funcione bem de verdade.
            </AboutText>
            <AboutText>
              Fora do código, gosto de jogar Minecraft e trocar ideia com a galera no Discord —
              e sim, às vezes uma coisa vira inspiração pra outra (o banner lá do meu README que
              o diga).
            </AboutText>
          </RevealWrapper>
        </Container>
      </Section>

      <Section>
        <Container>
          <RevealWrapper>
            <SectionHeading kicker="// stack" title="Tecnologias & ferramentas" />
          </RevealWrapper>

          {skillGroups.map((group, i) => (
            <SkillGroupWrap key={group.title}>
              <RevealWrapper delay={i * 90}>
                <GroupTitle>{group.title}</GroupTitle>
                <PillRow>
                  {group.items.map((item) => (
                    <SkillPill key={item}>{item}</SkillPill>
                  ))}
                </PillRow>
              </RevealWrapper>
            </SkillGroupWrap>
          ))}

          <NowGrid>
            <RevealWrapper delay={0}>
              <NowCard>
                <NowEmoji>💼</NowEmoji>
                <NowTitle>Estagiando</NowTitle>
                <NowText>Na Desbravador Software, aplicando na prática o que aprendo.</NowText>
              </NowCard>
            </RevealWrapper>
            <RevealWrapper delay={90}>
              <NowCard>
                <NowEmoji>🎓</NowEmoji>
                <NowTitle>Estudando</NowTitle>
                <NowText>Técnico em Desenvolvimento de Sistemas, integrado ao IFSC.</NowText>
              </NowCard>
            </RevealWrapper>
            <RevealWrapper delay={180}>
              <NowCard>
                <NowEmoji>🚀</NowEmoji>
                <NowTitle>Sempre testando</NowTitle>
                <NowText>Novas ferramentas, libs e formas de escrever um código melhor.</NowText>
              </NowCard>
            </RevealWrapper>
          </NowGrid>
        </Container>
      </Section>

      <ClosingSection>
        <Container>
          <RevealWrapper>
            <ClosingTitle>Bora construir algo juntos?</ClosingTitle>
            <ButtonRouterLink to="/contato">
              Vamos conversar <FiArrowRight />
            </ButtonRouterLink>
          </RevealWrapper>
        </Container>
      </ClosingSection>
    </>
  )
}
