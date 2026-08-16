import styled from 'styled-components'
import { contacts } from '../data/contacts.js'

const Wrap = styled.footer`
  background: var(--gradient-dark);
  border-top: 1px solid var(--border-soft);
  padding: 56px 24px 32px;
  text-align: center;
`

const Signature = styled.p`
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1.3rem;
  color: var(--text-secondary);
  margin-bottom: 22px;
`

const IconRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 26px;

  a {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.06);
    color: var(--text-secondary);
    font-size: 1.1rem;
    transition: transform var(--transition-base), background var(--transition-base),
      color var(--transition-base);
  }

  a:hover {
    transform: translateY(-4px);
    background: var(--gradient-main);
    color: #fff;
  }
`

const Copy = styled.p`
  font-size: 0.8rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
`

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <Wrap>
      <Signature>&lt;/Murilo&gt;</Signature>
      <IconRow>
        {contacts.map(({ id, icon: Icon, href, label }) => (
          <a key={id} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
            <Icon />
          </a>
        ))}
      </IconRow>
      <Copy>© {year} Murilo Thomé — feito com React &amp; styled-components</Copy>
    </Wrap>
  )
}
