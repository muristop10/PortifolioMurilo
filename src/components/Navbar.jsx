import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { FiMenu, FiX } from 'react-icons/fi'

const Nav = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  background: rgba(5, 6, 13, 0.65);
  border-bottom: 1px solid var(--border-soft);
`

const Inner = styled.div`
  max-width: var(--container-width);
  margin-inline: auto;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Brand = styled(NavLink)`
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1.15rem;
  background: var(--gradient-main);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
`

const Links = styled.nav`
  display: flex;
  gap: 8px;

  @media (max-width: 760px) {
    position: fixed;
    top: 63px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: rgba(5, 6, 13, 0.97);
    padding: 12px;
    border-bottom: 1px solid var(--border-soft);
    transform-origin: top;
    transform: scaleY(${(p) => (p.$open ? 1 : 0)});
    opacity: ${(p) => (p.$open ? 1 : 0)};
    pointer-events: ${(p) => (p.$open ? 'auto' : 'none')};
    transition: transform 0.25s ease, opacity 0.25s ease;
  }
`

const NavItem = styled(NavLink)`
  padding: 10px 16px;
  border-radius: var(--radius-pill);
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--text-muted);
  transition: color var(--transition-base), background var(--transition-base);

  &:hover {
    color: var(--text-primary);
  }

  &.active {
    color: #fff;
    background: var(--bg-card);
  }
`

const Toggle = styled.button`
  display: none;
  font-size: 1.4rem;

  @media (max-width: 760px) {
    display: block;
  }
`

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <Nav>
      <Inner>
        <Brand to="/" onClick={close}>
          &lt;Murilo/&gt;
        </Brand>
        <Links $open={open}>
          <NavItem to="/" end onClick={close}>
            Home
          </NavItem>
          <NavItem to="/projetos" onClick={close}>
            Projetos
          </NavItem>
          <NavItem to="/galeria" onClick={close}>
            Galeria
          </NavItem>
          <NavItem to="/contato" onClick={close}>
            Contato
          </NavItem>
        </Links>
        <Toggle onClick={() => setOpen(!open)} aria-label="Abrir menu">
          {open ? <FiX /> : <FiMenu />}
        </Toggle>
      </Inner>
    </Nav>
  )
}
