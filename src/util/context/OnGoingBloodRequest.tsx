import { useState } from "react"
import { IOnGoingBloodRequest } from "../types/InterFace/UtilInterface"
import { OnGoingBloodRequestContext } from "./Context"


function OnGoingBloodRequest({ children }) {

    const [bloodRequestFirstPhase, setFirstPhase] = useState<IOnGoingBloodRequest>(null)

    return (
        <OnGoingBloodRequestContext.Provider value={{ bloodRequestFirstPhase, setFirstPhase }}>
            {children}
        </OnGoingBloodRequestContext.Provider>
    )
}

export default OnGoingBloodRequest