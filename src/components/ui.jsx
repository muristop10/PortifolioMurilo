import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  width: 100%;
  max-width: var(--container-width);
  margin-inline: auto;
  padding-inline: 24px;
`

export const Section = styled.section`
  padding: 100px 0;
  position: relative;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(p) => p.$cols || 3}, 1fr);
  gap: ${(p) => p.$gap || '24px'};

  @media (max-width: 860px) {
    grid-template-columns: repeat(${(p) => Math.min(p.$cols || 3, 2)}, 1fr);
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

const buttonStyles = css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: var(--radius-pill);
  font-weight: 600;
  font-size: 0.95rem;
  transition: transform var(--transition-base), box-shadow var(--transition-base),
    opacity var(--transition-base), border-color var(--transition-base);

  ${(p) =>
    p.$variant === 'outline'
      ? css`
          background: transparent;
          border: 1px solid var(--border-soft);
          color: var(--text-primary);

          &:hover {
            border-color: var(--accent-soft);
            transform: translateY(-3px);
          }
        `
      : css`
          background: var(--gradient-main);
          color: #fff;
          border: 1px solid transparent;
          box-shadow: var(--shadow-glow);

          &:hover {
            transform: translateY(-3px);
            opacity: 0.92;
          }
        `}
`

export const ButtonLink = styled.a`
  ${buttonStyles}
`

export const ButtonRouterLink = styled(Link)`
  ${buttonStyles}
`
