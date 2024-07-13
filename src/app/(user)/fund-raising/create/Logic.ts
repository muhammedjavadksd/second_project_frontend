// import React from 'react'

import { FunctionComponent } from 'react'
import { createFormSteps } from './Data'
import Basic from '@/_component/FundRaiser/CreateSteps/Basic/Basic'
import { number } from 'yup'


function createStepIndexUp(state: Function): void {
  state((prev) => prev + 1)
}

function createStepIndexDown(state: Function): void {
  state((prev) => prev - 1)
}

function CreateFormComponent(index: number): FunctionComponent {
  return createFormSteps[index]
}

export {
  CreateFormComponent,
  createStepIndexDown,
  createStepIndexUp
}