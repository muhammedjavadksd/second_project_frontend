import React from 'react'
import { loginSteps } from '../AuthData/Data'


interface RenderAuthStepsInterFace {
  index: number
}

function RenderAuthSteps({ index }: RenderAuthStepsInterFace) {
  return loginSteps[index]
}

export default RenderAuthSteps


