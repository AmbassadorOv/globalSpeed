import { useMemo } from "react"
import { checkFilterDeviation, requestSyncContextMenu } from "../utils/configUtils"
import { GoArrowLeft} from "react-icons/go"
import { FaGithub, FaRegCircle } from "react-icons/fa";
import { FaPowerOff, FaVolumeUp } from "react-icons/fa"
import { useStateView } from "../hooks/useStateView"
import { getDefaultAudioFx, getDefaultFx } from "../defaults"
import { useCaptureStatus } from "../hooks/useCaptureStatus"
import { AnyDict, ORL_CONTEXT_KEYS } from "src/types"
import { releaseTabCapture } from "src/background/utils/tabCapture"
import { Gear, Pin, Zap } from "src/comps/svgs";
import { pushView } from "src/utils/state";
import "./Header.css"
import { FaCircleDot } from "react-icons/fa6";
import { feedbackText } from "src/utils/helper";


const SUPPORTS_TAB_CAPTURE = !!(chrome.tabCapture?.capture && chrome.offscreen?.createDocument)

type HeaderProps = {
  panel: number
  setPanel: (newPanel: number) => void
}

export function Header(props: HeaderProps) {
  const [view, setView] = useStateView({enabled: true, isPinned: true, superDisable: true, circleWidget: true, circleWidgetIcon: true})

  if (!view) return <div></div>

  const clearPin = async (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e?.preventDefault()
    if (e && !view.isPinned) return 
    // If pinning, assume user wants the Orl overrides. 
    let orlTransfer: AnyDict = {}
    if (!view.isPinned) {
      const incipit = `r:${gvar.tabInfo.tabId}:`
      const raw = await chrome.storage.local.get(ORL_CONTEXT_KEYS.map(k => incipit.concat(k)))
      const entries = Object.entries(raw).map(([k, v]) => [k.slice(incipit.length), v]).filter(([k, v]) => v != null)
      if (entries.length) {
        orlTransfer = Object.fromEntries(entries)
      }
    }
    setView({...orlTransfer, isPinned: !view.isPinned})
  }

  return (
    <div className="Header">

      {/* Status */}
      <button
        aria-label={`${gvar.gsm.token.toggle} ${gvar.gsm.token.extension}`}
        title={`${gvar.gsm.token.toggle} ${gvar.gsm.token.extension}`}
        className={view.enabled ? "active" : "muted"}
        onClick={() => {
          setView({enabled: !view.enabled, latestViaShortcut: false})
        }}
        onContextMenu={e => {
          e.preventDefault()
          setView({superDisable: true})
          requestSyncContextMenu()
        }}
      >
        <FaPowerOff size="1.21rem"/>
      </button>

      {/* Pin */}
      <button
        aria-label={gvar.gsm.token.pinTooltip}
        title={gvar.gsm.token.pinTooltip}
        className={`pin ${view.isPinned ? "active" : "muted"}`}
        onClick={() => clearPin()}
        onContextMenu={e => clearPin(e)}
      >
        <Pin size="1.42rem"/>
      </button>

      {/* Circle gesture */}
      {(props.panel === 0 && view.circleWidgetIcon) ? (
        <CircleIcon active={view.circleWidget} onClick={() => {}}/>
      ) : <div className="noPadding"/>}

      {/* Audio FX */}
      {(props.panel === 0 && SUPPORTS_TAB_CAPTURE) ? (
        <AudioIcon onClick={() => props.setPanel(2)}/>
      ) : <div className="noPadding"/>}

      {/* FX */}
      {props.panel === 0 ? (
        <FxIcon enabled={view?.enabled} onClick={() => props.setPanel(1)}/>
      ) : <div className="noPadding"/>}

      {/* Back button */}
      {props.panel !== 0 ? (
        <button
          aria-label={gvar.gsm.token.back}
          title={gvar.gsm.token.back}
          onClick={e => props.setPanel(0)}
        >
          <GoArrowLeft size="1.42rem"/>
        </button>
      ) : <div className="noPadding"/>}

      {/* Options page */}
      <button
        aria-label={gvar.gsm.token.openPage}
        title={gvar.gsm.token.openPage}
        onClick={e => {
          chrome.runtime.openOptionsPage()
        }}
      >
        <Gear size="1.42rem"/>
      </button>

      {/* Github */}
      <button
        aria-label={gvar.gsm.options.help.issueDirective}
        title={gvar.gsm.options.help.issueDirective}
        onClick={e => {
          window.open("https://github.com/polywock/globalSpeed", "_blank")
        }}
      >
        <FaGithub size="1.28rem"/>
      </button>
      
    </div>
  )
}



type FxIconProps = {
  onClick: () => void,
  enabled: boolean 
}

export function FxIcon(props: FxIconProps) {
  const [view, setView] = useStateView({elementFx: true, backdropFx: true})

  const fxActive = useMemo(() => {
    if (view && props.enabled) {
      if (view.backdropFx?.enabled && (checkFilterDeviation(view.backdropFx.filters) ||checkFilterDeviation(view.backdropFx.transforms))) return true 
      if (view.elementFx?.enabled && (checkFilterDeviation(view.elementFx.filters) ||checkFilterDeviation(view.elementFx.transforms))) return true 
    }
    return false 
  }, [props.enabled, view])

  return (
    <button
      aria-label={gvar.gsm.token.filters}
      title={gvar.gsm.token.filters}
      className={`beat ${fxActive ? "active" : ""}`} 
      onClick={e => props.onClick()}
      onContextMenu={e => {
        e.preventDefault()
        setView({elementFx: getDefaultFx(), backdropFx: getDefaultFx()})
      }}
    >
      <Zap size="1.42rem"/>
    </button>
  )
}


type AudioIconProps = {
  onClick: () => void
}

export function AudioIcon(props: AudioIconProps) {
  const status = useCaptureStatus()

  return (
    <button
      aria-label={gvar.gsm.command.afxCapture}
      title={gvar.gsm.command.afxCapture}
      className={`beat ${status ? "active" : ""}`} 
      onClick={props.onClick}
      onContextMenu={e => {
        e.preventDefault()
        releaseTabCapture(gvar.tabInfo.tabId)
        pushView({override: {
          audioFx: getDefaultAudioFx(),
          audioFxAlt: null,
          audioPan: null
        }, tabId: gvar.tabInfo.tabId})
      }}
    >
      <FaVolumeUp size="1.2rem"/>
    </button>
  )
}



type CircleIconProps = {
  onClick: () => void,
  active?: boolean
}

export function CircleIcon(props: CircleIconProps) {

  return (
    <button
      aria-label={gvar.gsm.options.flags.widget.option}
      title={gvar.gsm.options.flags.widget.option}
      className={`beat ${props.active ? "active" : ""}`} 
      onContextMenu={e => {
        e.preventDefault()
        pushView({override: {
          circleWidget: false
        }, tabId: gvar.tabInfo.tabId})
      }}
      onClick={() => {
        pushView({override: {
          circleWidget: !props.active
        }, tabId: gvar.tabInfo.tabId})
        if (!props.active) feedbackText(gvar.gsm.options.flags.widget.headerTooltip, null, 2400)
      }}
    >
      <FaCircleDot size="1.02rem"/>
    </button>
  )
}