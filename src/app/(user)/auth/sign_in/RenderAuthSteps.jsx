import React from 'react'
import { loginSteps } from '../AuthData/Data'

function RenderAuthSteps({index}) {
 
  return loginSteps[index]
}

export default RenderAuthSteps

 
