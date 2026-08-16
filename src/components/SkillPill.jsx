import styled from 'styled-components'

const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: var(--radius-pill);
  font-family: var(--font-mono);
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
  cursor: default;
  transition: transform var(--transition-base), border-color var(--transition-base),
    box-shadow var(--transition-base), background var(--transition-base),
    color var(--transition-base);

  &:hover {
    transform: translateY(-3px);
    border-color: transparent;
    background: var(--gradient-main);
    color: #fff;
    box-shadow: var(--shadow-glow);
  }
`

export default function SkillPill({ children }) {
  return <Pill>{children}</Pill>
}
