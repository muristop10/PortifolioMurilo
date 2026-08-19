import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styled, { keyframes } from 'styled-components'
import { Section, Container } from '../components/ui'
import RevealWrapper from '../components/RevealWrapper'
import React from 'react'

/**
 * Cada item pode ser uma foto (padrão) ou um vídeo (type: 'video').
 * Para vídeos: `src` é o arquivo de vídeo e `poster` é a imagem de capa
 * usada como thumbnail na grade — a modal só carrega o vídeo em si
 * quando o usuário clica.
 *
 * Exemplo de item de vídeo (duplique e ajuste os campos):
 * {
 *   id: 13,
 *   type: 'video',
 *   src: '/videos/seu-video.mp4',
 *   poster: '/images/poster-do-video.jpg',
 *   label: 'Nome do Vídeo',
 *   category: 'Categoria',
 *   aspect: '16 / 9',
 * }
 */
const photos = [
  {
    id: 1,
    src: '/images/bateria1.jpg',
    label: 'Bateria',
    category: 'Bateria',
    aspect: '3 / 4',
  },
  {
    id: 2,
    src: '/images/bateria2.jpg',
    label: 'Bateria 2',
    category: 'Bateria',
    aspect: '3 / 4',
  },
  {
    id: 3,
    type: 'video',
    src: '/images/bateria3.mp4',
    poster: '/images/bateria3.mp4',
    label: 'Bateria 3',
    category: 'Bateria',
    aspect: '9 / 16',
  },
  {
    id: 4,
    src: '/images/viagens1.jpg',
    label: 'Viagens 1',
    category: 'Viagens',
    aspect: '16 / 9',
  },
  {
    id: 5,
    src: '/images/viagens2.jpg',
    label: 'Viagens 2',
    category: 'Viagens',
    aspect: '3 / 4',
  },
  {
    id: 6,
    src: '/images/viagens3.jpg',
    label: 'Viagens 3',
    category: 'Viagens',
    aspect: '4 / 3',
  },
  {
    id: 7,
    src: '/images/maia1.jpg',
    label: 'Maia',
    category: 'Pets',
    aspect: '3 / 4',
  },
  {
    id: 8,
    src: '/images/amora1.jpg',
    label: 'Amora',
    category: 'Pets',
    aspect: '9 / 16',
  },
  {
    id: 9,
    src: '/images/amoraMaia.jpg',
    label: 'Amora e Maia',
    category: 'Pets',
    aspect: '4 / 3',
  },
  {
    id: 10,
    src: '/images/murilo-elo1.jpg',
    label: 'Murilo e Elo',
    category: 'Elo',
    aspect: '4 / 3',
  },
  {
    id: 11,
    src: '/images/murilo-elo2.jpg',
    label: 'Murilo e Elo 2',
    category: 'Elo',
    aspect: '4 / 3',
  },
  {
    id: 12,
    src: '/images/murilo-elo3.jpg',
    label: 'Murilo e Elo 3',
    category: 'Elo',
    aspect: '6 / 7',
  },
]

// Decide se um aspect ratio ("largura / altura") é retrato (mais alto que largo).
function isPortraitAspect(aspect) {
  const [width, height] = aspect.split('/').map(Number)
  return width / height < 1
}

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
  font-size: clamp(2.4rem, 5vw, 3.6rem);
  background: var(--gradient-main);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
`

const PageSubtitle = styled.p`
  max-width: 46ch;
  color: var(--text-secondary);
  font-size: 1.05rem;
`

const IntroBlock = styled.div`
  margin-bottom: clamp(3rem, 6vw, 5rem);
`

const Marker = styled.div`
  position: absolute;
  left: -63px;
  top: 1.4rem;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--bg-elevated);
  border: 2px solid var(--border-strong);
  transition: transform var(--transition-base), background var(--transition-base),
    border-color var(--transition-base), box-shadow var(--transition-base);
  z-index: 2;

  @media (max-width: 640px) {
    left: -46px;
    width: 11px;
    height: 11px;
  }
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease, filter 0.7s ease;
`

const CategoryTag = styled.span`
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.35rem 0.8rem;
  border-radius: var(--radius-pill);
  background: rgba(5, 6, 13, 0.55);
  backdrop-filter: blur(6px);
  border: 1px solid var(--border-soft);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-soft);
  opacity: 0.85;
  transition: opacity var(--transition-base), transform var(--transition-base);
`

/* Botão de play sobreposto às thumbnails de vídeo. */
const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(5, 6, 13, 0.55);
  backdrop-filter: blur(4px);
  border: 1px solid var(--border-strong);
  color: var(--text-primary);
  z-index: 1;
  transition: transform var(--transition-base), background var(--transition-base),
    box-shadow var(--transition-base);

  svg {
    margin-left: 3px;
  }
`

const LabelBlock = styled.div`
  transform: translateY(10px);
  opacity: 0.92;
  transition: transform var(--transition-base), opacity var(--transition-base);
`

const Title = styled.h3`
  font-size: clamp(1.15rem, 2vw, 1.5rem);
  color: var(--text-primary);
`

const Description = styled.p`
  margin-top: 0.35rem;
  font-size: 0.92rem;
  color: var(--text-muted);
`

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: clamp(1.1rem, 3vw, 1.75rem);
  background: linear-gradient(
    to top,
    rgba(5, 6, 13, 0.88) 0%,
    rgba(5, 6, 13, 0.35) 45%,
    transparent 75%
  );
  opacity: 0.8;
  transition: opacity var(--transition-base), background var(--transition-base);
`

/**
 * IMPORTANTE: só usamos `max-width` pra limitar o tamanho — nunca
 * `max-height` junto de `width: 100%`, porque isso força o navegador a
 * cortar a altura sem reduzir a largura, distorcendo o aspect-ratio
 * (era exatamente o bug que deixava as fotos retrato "espremidas").
 * Em vez disso, fotos retrato ($portrait) recebem um max-width menor,
 * então a altura derivada do aspect-ratio já fica proporcional e
 * controlada. O max-height de 78vh é só uma rede de segurança para
 * telas muito baixas — raramente é acionado.
 */
const ImageFrame = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-md);
  aspect-ratio: var(--aspect, 4 / 3);
  width: 100%;
  max-width: ${({ $portrait }) => ($portrait ? '380px' : '640px')};
  max-height: 78vh;
  background: var(--bg-elevated);
  border: 1px solid var(--border-soft);
  box-shadow: 0 10px 30px rgba(5, 6, 13, 0.35);
  transition: border-color var(--transition-base), box-shadow var(--transition-base),
    transform var(--transition-base);

  @media (max-width: 1024px) {
    max-width: ${({ $portrait }) => ($portrait ? '320px' : '480px')};
  }

  @media (max-width: 640px) {
    max-width: ${({ $portrait }) => ($portrait ? 'min(78vw, 300px)' : '100%')};
  }
`

const ImageTrigger = styled.button`
  display: block;
  width: 100%;
  padding: 0;
  text-align: left;
  cursor: zoom-in;
`

const GalleryList = styled.ul`
  position: relative;
  padding-left: 96px;

  &::before {
    content: '';
    position: absolute;
    left: 40px;
    top: 0.5rem;
    bottom: 0.5rem;
    width: 2px;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      var(--gradient-start) 8%,
      var(--gradient-end) 92%,
      transparent 100%
    );
    opacity: 0.5;
  }

  @media (max-width: 640px) {
    padding-left: 64px;

    &::before {
      left: 24px;
    }
  }
`

const GalleryItem = styled.li`
  position: relative;
  padding-bottom: clamp(3rem, 7vw, 5.5rem);

  &:last-child {
    padding-bottom: 0;
  }

  &:hover ${Marker} {
    transform: scale(1.5);
    background: var(--gradient-main);
    border-color: transparent;
    box-shadow: var(--shadow-glow);
  }

  &:hover ${ImageFrame} {
    border-color: var(--border-strong);
    box-shadow: var(--shadow-glow);
    transform: translateY(-4px);
  }

  &:hover ${Img} {
    transform: scale(1.06);
    filter: brightness(1.04) saturate(1.1);
  }

  &:hover ${Overlay} {
    opacity: 1;
  }

  &:hover ${LabelBlock} {
    transform: translateY(0);
    opacity: 1;
  }

  &:hover ${CategoryTag} {
    opacity: 1;
    transform: translateY(-2px);
  }

  &:hover ${PlayButton} {
    background: var(--gradient-main);
    border-color: transparent;
    box-shadow: var(--shadow-glow);
    transform: translate(-50%, -50%) scale(1.1);
  }
`

const BackToTopWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: clamp(3rem, 6vw, 5rem);
`

const BackToTopButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 1.9rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--border-strong);
  background: transparent;
  color: var(--text-secondary);
  font-family: var(--font-display);
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  transition: background var(--transition-base), color var(--transition-base),
    transform var(--transition-base), box-shadow var(--transition-base);

  svg {
    transition: transform var(--transition-base);
  }

  &:hover {
    background: var(--gradient-main);
    color: #fff;
    border-color: transparent;
    transform: translateY(-3px);
    box-shadow: var(--shadow-glow);
  }

  &:hover svg {
    transform: translateY(-2px);
  }
`

function ArrowUpIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 19V5M12 5L6 11M12 5L18 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.94) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`

const scaleOut = keyframes`
  from { opacity: 1; transform: scale(1) translateY(0); }
  to { opacity: 0; transform: scale(0.94) translateY(10px); }
`

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1.25rem, 4vw, 3rem);
  background: rgba(5, 6, 13, 0.86);
  backdrop-filter: blur(10px);
  cursor: zoom-out;
  animation: ${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} 0.25s ease forwards;
`

const ModalContent = styled.div`
  position: relative;
  width: 100%;
  max-width: min(1080px, 92vw);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: default;
  animation: ${({ $isClosing }) => ($isClosing ? scaleOut : scaleIn)} 0.28s ease forwards;
`

const CloseButton = styled.button`
  position: fixed;
  top: clamp(1rem, 3vw, 1.75rem);
  right: clamp(1rem, 3vw, 1.75rem);
  z-index: 1001;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(18, 20, 42, 0.7);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-strong);
  color: var(--text-primary);
  transition: background var(--transition-base), transform var(--transition-base),
    box-shadow var(--transition-base);

  &:hover {
    background: var(--gradient-main);
    border-color: transparent;
    box-shadow: var(--shadow-glow);
    transform: scale(1.08);
  }
`

const ModalImageWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 72vh;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--bg-void);
  border: 1px solid var(--border-soft);
  box-shadow: var(--shadow-glow);
`

const ModalImage = styled.img`
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 72vh;
  object-fit: contain;
  display: block;
`

const ModalVideo = styled.video`
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 72vh;
  object-fit: contain;
  display: block;
`

const ModalCaption = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  max-width: 60ch;
`

const ModalTag = styled.span`
  display: inline-block;
  margin-bottom: 0.6rem;
  padding: 0.3rem 0.75rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--border-soft);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-soft);
`

const ModalTitle = styled.h3`
  font-size: clamp(1.3rem, 3vw, 1.9rem);
  color: var(--text-primary);
`

const ModalDescription = styled.p`
  margin-top: 0.5rem;
  color: var(--text-secondary);
  font-size: 1rem;
`

function PhotoThumbnail({ item, index, onOpen }) {
  return (
    <RevealWrapper delay={index * 0.06}>
      <ImageTrigger
        type="button"
        onClick={() => onOpen(item)}
        aria-label={`Ampliar foto: ${item.label}`}
      >
        <ImageFrame style={{ '--aspect': item.aspect }} $portrait={isPortraitAspect(item.aspect)}>
          <Img src={item.src} alt={item.label} loading="lazy" decoding="async" />
          <CategoryTag>{item.category}</CategoryTag>
          <Overlay>
            <LabelBlock>
              <Title>{item.label}</Title>
              {item.description && <Description>{item.description}</Description>}
            </LabelBlock>
          </Overlay>
        </ImageFrame>
      </ImageTrigger>
    </RevealWrapper>
  )
}

function VideoThumbnail({ item, index, onOpen }) {
  return (
    <RevealWrapper delay={index * 0.06}>
      <ImageTrigger
        type="button"
        onClick={() => onOpen(item)}
        aria-label={`Assistir vídeo: ${item.label}`}
      >
        <ImageFrame style={{ '--aspect': item.aspect }} $portrait={isPortraitAspect(item.aspect)}>
          <Img src={item.poster} alt={item.label} loading="lazy" decoding="async" />
          <PlayButton aria-hidden="true">
            <PlayIcon />
          </PlayButton>
          <CategoryTag>{item.category}</CategoryTag>
          <Overlay>
            <LabelBlock>
              <Title>{item.label}</Title>
              {item.description && <Description>{item.description}</Description>}
            </LabelBlock>
          </Overlay>
        </ImageFrame>
      </ImageTrigger>
    </RevealWrapper>
  )
}

export default function Gallery() {
  const [activePhoto, setActivePhoto] = useState(null)
  const [isClosing, setIsClosing] = useState(false)
  const closeButtonRef = useRef(null)
  const lastFocusedRef = useRef(null)
  const videoRef = useRef(null)

  const openModal = (item) => {
    lastFocusedRef.current = document.activeElement
    setIsClosing(false)
    setActivePhoto(item)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsClosing(true)
  }

  const handleAnimationEnd = () => {
    if (isClosing) {
      setActivePhoto(null)
      setIsClosing(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    if (!activePhoto || isClosing) return undefined

    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeModal()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      // Pausa o vídeo (se houver) sempre que a modal fecha ou troca de item.
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
      lastFocusedRef.current?.focus()
    }
  }, [activePhoto, isClosing])

  return (
    <>
      <Section>
        <Container>
          <RevealWrapper>
            <IntroBlock>
              <Eyebrow>Fotografias</Eyebrow>
              <PageTitle>Galeria</PageTitle>
              <PageSubtitle>
                Uma seleção de registros e trabalhos pessoais. Role para conhecer
                cada um deles.
              </PageSubtitle>
            </IntroBlock>
          </RevealWrapper>

          <GalleryList>
            {photos.map((item, index) => (
              <GalleryItem key={item.id}>
                <Marker aria-hidden="true" />
                {item.type === 'video' ? (
                  <VideoThumbnail item={item} index={index} onOpen={openModal} />
                ) : (
                  <PhotoThumbnail item={item} index={index} onOpen={openModal} />
                )}
              </GalleryItem>
            ))}
          </GalleryList>

          <RevealWrapper>
            <BackToTopWrap>
              <BackToTopButton onClick={scrollToTop} type="button">
                <ArrowUpIcon />
                Voltar ao topo
              </BackToTopButton>
            </BackToTopWrap>
          </RevealWrapper>
        </Container>
      </Section>

      {activePhoto &&
        createPortal(
          <ModalOverlay
            onClick={closeModal}
            $isClosing={isClosing}
            onAnimationEnd={handleAnimationEnd}
          >
            <ModalContent
              role="dialog"
              aria-modal="true"
              aria-label={
                activePhoto.type === 'video'
                  ? `Vídeo: ${activePhoto.label}`
                  : `Foto ampliada: ${activePhoto.label}`
              }
              onClick={(event) => event.stopPropagation()}
              $isClosing={isClosing}
            >
              <CloseButton
                ref={closeButtonRef}
                type="button"
                onClick={closeModal}
                aria-label="Fechar"
              >
                <CloseIcon />
              </CloseButton>

              <ModalImageWrap>
                {activePhoto.type === 'video' ? (
                  <ModalVideo
                    ref={videoRef}
                    src={activePhoto.src}
                    poster={activePhoto.poster}
                    controls
                    autoPlay
                    muted
                    playsInline
                  />
                ) : (
                  <ModalImage src={activePhoto.src} alt={activePhoto.label} />
                )}
              </ModalImageWrap>

              <ModalCaption>
                <ModalTag>{activePhoto.category}</ModalTag>
                <ModalTitle>{activePhoto.label}</ModalTitle>
                {activePhoto.description && (
                  <ModalDescription>{activePhoto.description}</ModalDescription>
                )}
              </ModalCaption>
            </ModalContent>
          </ModalOverlay>,
          document.body
        )}
    </>
  )
}