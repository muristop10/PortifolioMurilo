import styled from 'styled-components'
import { Section, Container } from '../components/ui'
import RevealWrapper from '../components/RevealWrapper'
import React from 'react'

/**
 * Dados mockados — troque `image`, `githubUrl` e `demoUrl` pelos reais.
 * `demoUrl: null` é suportado de propósito (nem todo projeto tem live demo);
 * o botão "Live Demo" some sozinho quando isso acontece (veja projetos 2 e 4).
 */
const PROJECTS = [
  {
    id: 1,
    title: 'Aurora Dashboard',
    description:
      'Painel analítico em tempo real para squads de produto, com gráficos customizados e alertas configuráveis por métrica.',
    image: 'https://picsum.photos/seed/project-aurora/900/600',
    techs: ['React', 'TypeScript', 'D3.js', 'Node.js'],
    githubUrl: 'https://github.com/SEU_USUARIO/aurora-dashboard',
    demoUrl: 'https://aurora-dashboard.vercel.app',
  },
  {
    id: 2,
    title: 'Nimbus API Gateway',
    description:
      'Gateway de autenticação e rate-limiting para microsserviços, com painel de observabilidade integrado.',
    image: 'https://picsum.photos/seed/project-nimbus/900/600',
    techs: ['Go', 'Redis', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/SEU_USUARIO/nimbus-gateway',
    demoUrl: null,
  },
  {
    id: 3,
    title: 'Solstice E-commerce',
    description:
      'Loja headless com checkout otimizado, carrinho persistente e integração com múltiplos meios de pagamento.',
    image: 'https://picsum.photos/seed/project-solstice/900/600',
    techs: ['Next.js', 'Stripe', 'Prisma', 'Tailwind'],
    githubUrl: 'https://github.com/SEU_USUARIO/solstice-shop',
    demoUrl: 'https://solstice-shop.vercel.app',
  },
  {
    id: 4,
    title: 'Pulse Habit Tracker',
    description:
      'App de hábitos com streaks, lembretes locais e visualização de progresso em heatmap estilo GitHub.',
    image: 'https://picsum.photos/seed/project-pulse/900/600',
    techs: ['React Native', 'SQLite', 'Expo'],
    githubUrl: 'https://github.com/SEU_USUARIO/pulse-tracker',
    demoUrl: null,
  },
  {
    id: 5,
    title: 'Cartograph Studio',
    description:
      'Editor visual de mapas interativos para storytelling geográfico, com camadas customizáveis e exportação em SVG.',
    image: 'https://picsum.photos/seed/project-cartograph/900/600',
    techs: ['Vue', 'Mapbox GL', 'Firebase'],
    githubUrl: 'https://github.com/SEU_USUARIO/cartograph-studio',
    demoUrl: 'https://cartograph-studio.vercel.app',
  },
  {
    id: 6,
    title: 'Echo Chat Engine',
    description:
      'Motor de chat em tempo real com salas privadas, indicadores de digitação e histórico persistente.',
    image: 'https://picsum.photos/seed/project-echo/900/600',
    techs: ['Socket.io', 'Express', 'MongoDB'],
    githubUrl: 'https://github.com/SEU_USUARIO/echo-chat',
    demoUrl: 'https://echo-chat-demo.vercel.app',
  },
]

/* ---------- Ícones (genéricos — sem reproduzir marcas/logos de terceiros) ---------- */

function CodeBracketIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 18L4 13.5V10.5L9 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 18L20 13.5V10.5L15 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M13.5 4.5L10.5 19.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ============================================================
   STYLED COMPONENTS
   ============================================================ */

/* ---------- Cabeçalho da seção ---------- */

const Eyebrow = styled.span`
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.9rem;
`

const PageTitle = styled.h1`
  /* font-family já vem do reset global (h1,h2,h3,h4 -> var(--font-display)),
     mas deixo explícito aqui porque é um requisito de design citado à parte. */
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 5vw, 3.6rem);
  background: var(--gradient-main);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
`

const PageSubtitle = styled.p`
  max-width: 50ch;
  color: var(--text-muted);
  font-size: 1.05rem;
  line-height: 1.7;
`

const IntroBlock = styled.div`
  margin-bottom: clamp(3rem, 6vw, 4.5rem);
`

/* ---------- Grid ---------- */

const ProjectsGrid = styled.div`
  display: grid;
  /* align-items:stretch é o default do Grid — não precisa declarar.
     É o que faz todo card da mesma linha ter a mesma altura, o que por
     sua vez é o que permite o rodapé (CardFooter) alinhar entre eles. */
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.75rem;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

/* ---------- Card ---------- */

const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border-radius: var(--radius-md);
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: transform var(--transition-base), background var(--transition-base),
    border-color var(--transition-base), box-shadow var(--transition-base);

  &:hover {
    transform: translateY(-8px);
    background: var(--bg-card-hover);
    border-color: var(--border-strong);
    box-shadow: var(--shadow-glow);
  }
`

const ImageWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--bg-elevated);

  /* Scrim sutil: funde o rodapé da imagem na superfície de vidro do card. */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 60%, var(--bg-elevated) 100%);
    opacity: 0.75;
  }
`

const Thumb = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-base);

  ${Card}:hover & {
    transform: scale(1.05);
  }
`

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.85rem;
  padding: 1.75rem;
`

const CardTitle = styled.h3`
  font-family: var(--font-display);
  color: var(--text-primary);
  font-size: clamp(1.2rem, 2vw, 1.45rem);
`

const CardDescription = styled.p`
  font-family: var(--font-body);
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.7;
`

const TechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const TechPill = styled.li`
  padding: 0.32rem 0.75rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--border-soft);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  color: var(--accent-soft);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.02em;
`

const CardFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.25rem;
  margin-top: auto;
  padding-top: 1.1rem;
  border-top: 1px solid var(--border-soft);
`

const ActionLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-body);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-secondary);
  transition: color var(--transition-base);

  svg {
    transition: transform var(--transition-base);
  }

  &:hover {
    color: var(--accent);
  }

  &:hover svg {
    transform: translate(2px, -2px);
  }
`

/* ============================================================
   COMPONENTE
   ============================================================ */

// eslint-disable-next-line react/prop-types
export function ProjectCard({ project, index }) {
  return (
    <RevealWrapper delay={index * 0.08}>
      <Card>
        <ImageWrap>
          <Thumb src={project.image} alt={project.title} loading="lazy" decoding="async" />
        </ImageWrap>

        <CardBody>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>

          <TechList>
            {project.techs.map((tech) => (
              <TechPill key={tech}>{tech}</TechPill>
            ))}
          </TechList>

          <CardFooter>
            <ActionLink href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <CodeBracketIcon />
              GitHub
            </ActionLink>

            {project.demoUrl && (
              <ActionLink href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLinkIcon />
                Live Demo
              </ActionLink>
            )}
          </CardFooter>
        </CardBody>
      </Card>
    </RevealWrapper>
  )
}

export default function Projects() {
  return (
    <Section>
      <Container>
        <RevealWrapper>
          <IntroBlock>
            <Eyebrow>Trabalho Selecionado</Eyebrow>
            <PageTitle>Meus Projetos</PageTitle>
            <PageSubtitle>
              Uma seleção de trabalhos recentes, do primeiro commit ao deploy em produção.
            </PageSubtitle>
          </IntroBlock>
        </RevealWrapper>

        <ProjectsGrid>
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </ProjectsGrid>
      </Container>
    </Section>
  )
}