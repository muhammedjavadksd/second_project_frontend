import React, { useContext, useState } from 'react'
import { createContext } from 'vm';
import { OnGoingApplicationContext } from './Context';


function OnGoingingFundRaise({ children }) {

    let [currentApplication, setApplication] = useState(null)
    console.log(children);

    return (
        <OnGoingApplicationContext.Provider value={{ currentApplication, setApplication }}>
            {children}
        </OnGoingApplicationContext.Provider>
    )
}

export default OnGoingingFundRaise