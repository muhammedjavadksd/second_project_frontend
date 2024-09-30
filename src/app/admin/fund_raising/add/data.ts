import BankUpdate from '@/component/FundRaiser/AdminCreateSteps/BankUpdate'
import BasicDetails from '@/component/FundRaiser/AdminCreateSteps/BasicUpdate'
import { FunctionComponent } from 'react'
import * as yup from 'yup'


const adminFundRaiserAddSteps: FunctionComponent[] = [
    BasicDetails,
    BankUpdate
]

export { adminFundRaiserAddSteps }