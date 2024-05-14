// import React from 'react'

import {createFormSteps} from './Data'


function createStepIndexUp(state)
{
  state((prev)=> prev+1)
}

function createStepIndexDown(state)
{
  state((prev)=> prev-1)
}
 
function CreateFormComponent(index)
{ 
  return createFormSteps[index]
}

 

module.exports= {
    CreateFormComponent,
    createStepIndexDown,
    createStepIndexUp
}