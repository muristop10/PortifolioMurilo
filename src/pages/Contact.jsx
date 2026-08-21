import { useState } from 'react'
import styled from 'styled-components'
import { Section, Container } from '../components/ui'
import RevealWrapper from '../components/RevealWrapper'
import React from 'react'
import { contacts } from '../data/contacts'

function MailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4 6.5L12 13L20 6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CodeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function PhoneIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 3.5C6 4 5 5.2 5 7c0 5.5 6.5 12 12 12 1.8 0 3-1 3.5-2 .3-.6 0-1-.4-1.3l-2.6-1.9c-.4-.3-1-.3-1.4.1l-.9.9c-.3.3-.8.3-1.2 0a10 10 0 0 1-4-4c-.3-.4-.3-.9 0-1.2l.9-.9c.4-.4.4-1 .1-1.4L9.3 3.9c-.3-.4-.7-.6-1.3-.4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="6.5" width="18" height="13" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="13" r="3.6" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8 6.5L9.2 4.5H14.8L16 6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H10l-4 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowIcon() {
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

function ClipboardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="7" y="5" width="10" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M9.5 5V3.8C9.5 3.4 9.8 3 10.3 3H13.7C14.2 3 14.5 3.4 14.5 3.8V5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.5L9.5 17L19 6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
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
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
`

const ContactsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1.25rem;
`

/* Componente polimórfico: renderiza como <a> pros links externos/mailto
   e como <button> pro card do Discord (via prop `as="button"`). */
const ContactCard = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.85rem;
  width: 100%;
  padding: 1.6rem;
  border-radius: var(--radius-md);
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
  text-align: left;
  transition: transform var(--transition-base), border-color var(--transition-base),
    box-shadow var(--transition-base), background var(--transition-base);

  &:hover {
    transform: translateY(-6px);
    border-color: var(--border-strong);
    background: var(--bg-card-hover);
    box-shadow: var(--shadow-glow);
  }
`

const IconBadge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: var(--radius-sm);
  background: var(--bg-elevated);
  border: 1px solid var(--border-soft);
  color: var(--accent);
  transition: background var(--transition-base), color var(--transition-base),
    border-color var(--transition-base), transform var(--transition-base);

  ${ContactCard}:hover & {
    background: var(--gradient-main);
    color: #fff;
    border-color: transparent;
    transform: rotate(-4deg) scale(1.05);
  }
`

const PlatformLabel = styled.span`
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-muted);
`

const ValueText = styled.span`
  font-size: 1.02rem;
  color: var(--text-primary);
  word-break: break-word;
`

const CopyHint = styled.span`
  font-family: var(--font-mono);
  font-size: 0.76rem;
  color: ${({ $copied }) => ($copied ? 'var(--accent-green)' : 'var(--text-muted)')};
  transition: color var(--transition-base);
`

const CornerHint = styled.span`
  position: absolute;
  top: 1.4rem;
  right: 1.4rem;
  display: flex;
  color: var(--text-muted);
  transition: transform var(--transition-base), color var(--transition-base);

  ${ContactCard}:hover & {
    color: var(--accent);
    transform: translate(3px, -3px);
  }
`

export default function Contact() {
  const [copiedId, setCopiedId] = useState(null)

  const handleCopy = async (item) => {
    try {
      await navigator.clipboard.writeText(item.value)
      setCopiedId(item.id)
      setTimeout(() => {
        setCopiedId((current) => (current === item.id ? null : current))
      }, 1800)
    } catch {
    }
  }

  return (
    <Section>
      <Container>
        <RevealWrapper>
          <IntroBlock>
            <Eyebrow>Contato</Eyebrow>
            <PageTitle>Vamos conversar</PageTitle>
            <PageSubtitle>
              Pode me chamar por qualquer um desses canais — respondo rapidinho.
            </PageSubtitle>
          </IntroBlock>
        </RevealWrapper>

        <ContactsGrid>
          {contacts.map((item, index) => {
            const Icon = item.icon
            const isCopied = copiedId === item.id

            return (
              <RevealWrapper key={item.id} delay={index * 0.06}>
                {item.copyOnly ? (
                  <ContactCard as="button" type="button" onClick={() => handleCopy(item)}>
                    <IconBadge>
                      <Icon />
                    </IconBadge>
                    <PlatformLabel>{item.label}</PlatformLabel>
                    <ValueText>{item.value}</ValueText>
                    <CopyHint $copied={isCopied}>
                      {isCopied ? 'Copiado!' : 'Toque para copiar'}
                    </CopyHint>
                    <CornerHint aria-hidden="true">
                      {isCopied ? <CheckIcon /> : <ClipboardIcon />}
                    </CornerHint>
                  </ContactCard>
                ) : (
                  <ContactCard
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                  >
                    <IconBadge>
                      <Icon />
                    </IconBadge>
                    <PlatformLabel>{item.label}</PlatformLabel>
                    <ValueText>{item.value}</ValueText>
                    <CornerHint aria-hidden="true">
                      <ArrowIcon />
                    </CornerHint>
                  </ContactCard>
                )}
              </RevealWrapper>
            )
          })}
        </ContactsGrid>
      </Container>
    </Section>
  )
}