
import { BsXCircle, BsArrowUpCircle } from "react-icons/bs"
import { useStateView } from "src/hooks/useStateView"
import "./OrlHeader.css"

type OrlHeaderProps = {}
  
export function OrlHeader(props: OrlHeaderProps) {
    const [view, setView] = useStateView({hasOrl: true, minimizeOrlBanner: true})
    if (!view?.hasOrl) return <div/>
    const m = view.minimizeOrlBanner
    
    return <div className="OrmHeader"
        role="button"
        tabIndex={0}
        aria-label={m ? "Expand banner" : "Minimize banner"}
        title={m ? "Expand banner" : "Minimize banner"}
        onClick={e => {
            setView({minimizeOrlBanner: m ? null : true})
        }}
        onKeyDown={e => {
            if (e.key === "Enter" || e.key === " ") {
                setView({minimizeOrlBanner: m ? null : true})
            }
        }}
    >
        {m ? null : <>
            <span>{gvar.gsm.options.rules.status}</span>
            <BsArrowUpCircle size={"1.285rem"}/>
            <BsXCircle
                role="button"
                tabIndex={0}
                aria-label="Dismiss"
                title="Dismiss"
                onClickCapture={(e: React.MouseEvent) => {
                    setView({hasOrl: false})
                    e.stopPropagation()
                }}
                onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") {
                        setView({hasOrl: false})
                        e.stopPropagation()
                    }
                }}
                size={"1.285rem"}
            />
        </>}
    </div>
}