import React, { useContext, useState } from 'react'
import { } from 'vm';
import { BloodDonorFormContext } from './Context';


function BloodDonorForm({ children }): React.ReactElement {

    let [donor_id, setDonor] = useState()

    return (
        <BloodDonorFormContext.Provider value={{ donor_id, setDonor }}>
            {children}
        </BloodDonorFormContext.Provider>

    )
}

export default BloodDonorForm