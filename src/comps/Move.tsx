import { GoArrowUp, GoArrowDown } from "react-icons/go"
import "./Move.css"

type MoveProps = {
  onMove: (down: boolean) => void
}

export function Move(props: MoveProps) {
  return <div className="Move">
    <button aria-label={gvar.gsm.token.up} title={gvar.gsm.token.up} className="icon" onClick={() => props.onMove(false)}>
      <GoArrowUp size="1.42rem"/>
    </button>
    <button aria-label={gvar.gsm.token.down} title={gvar.gsm.token.down} className="icon" onClick={() => props.onMove(true)}>
      <GoArrowDown size="1.42rem"/>
    </button>
  </div>
}