import styled from 'styled-components'

const Window = styled.div`
  background: #0d1117;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
  font-family: var(--font-mono);
  width: 100%;
  max-width: 380px;
  margin-inline: auto;
`

const Bar = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.04);
`

const Dot = styled.span`
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: ${(p) => p.$color};
`

const Body = styled.div`
  padding: 22px 20px 26px;
  font-size: 0.92rem;
  color: #c9d1d9;
`

const Line = styled.div`
  padding-left: ${(p) => (p.$indent ? '20px' : '0')};
  white-space: pre;
  line-height: 1.85;
`

const Key = styled.span`
  color: var(--accent-green);
`

const Str = styled.span`
  color: var(--accent-soft);
`

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 16px;
  margin-left: 4px;
  background: #fff;
  vertical-align: middle;
  animation: blink 1.1s steps(1) infinite;

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
`

export default function CodeCard() {
  return (
    <Window>
      <Bar>
        <Dot $color="#ff5f56" />
        <Dot $color="#ffbd2e" />
        <Dot $color="#27c93f" />
      </Bar>
      <Body>
        <Line>
          <Key>const</Key> dev = {'{'}
        </Line>
        <Line $indent>
          nome: <Str>"Murilo"</Str>,
        </Line>
        <Line $indent>
          sentimento: <Str>"Dedicação, bora pra cima!"</Str>,
        </Line>
        <Line $indent>
          local: <Str>"Chapecó, SC"</Str>,
        </Line>
        <Line $indent>
          mindset: <Str>"Muito café e muita força!"</Str>
        </Line>
        <Line>
          {'}'}
          <Cursor />
        </Line>
      </Body>
    </Window>
  )
}
