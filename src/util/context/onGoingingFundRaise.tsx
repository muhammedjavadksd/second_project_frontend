import React, { useContext, useState } from 'react'
import { createContext } from 'vm';
import { OnGoingApplicationContext } from './Context';


function OnGoingingFundRaise({ children }): React.ReactElement {

    let [currentApplication, setApplication] = useState(null)

    return (
        <OnGoingApplicationContext.Provider value={{ currentApplication, setApplication }}>
            {children}
        </OnGoingApplicationContext.Provider>

    )
}

export default OnGoingingFundRaise