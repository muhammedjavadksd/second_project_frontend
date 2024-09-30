import { Field } from 'formik'
import React from 'react'

function BankDetails() {
    return (
        <>
            <div className='mb-3'>
                <label htmlFor="">Bank name</label>
                <Field type="text" placeholder="Enter the bank name" name="bank_name" id="bank_name" className="shadow-sm mt-1  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>

            <div className='mb-3'>
                <label htmlFor="">IFSC code</label>
                <Field type="text" placeholder="Enter IFSC code" name="ifsc_code" id="ifsc_code" className="shadow-sm mt-1  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>

            <div className='mb-3'>
                <label htmlFor="">Bank holder name</label>
                <Field type="text" placeholder="Enter holder name" name="holder_name" id="holder_name" className="shadow-sm mt-1  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>

            <div className='mb-3'>
                <label htmlFor="">Accout Type</label>
                <Field type="text" placeholder="Select the accout tyoe" name="account_type" id="account_type" className="shadow-sm mt-1  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" as="select">
                    <option>Select the accout type</option>
                    <option value="saving">Saving account</option>
                    <option value="current">Current account</option>
                </Field>
            </div>
            <div className="mt-5">
                <h4 className="font-bold">Hint</h4>
                <ul className="mt-3 list-decimal pl-4">
                    <li>The bidding amount will credit to this account</li>
                    <li>If you choose to donate full amount, then you won't recive amount</li>
                    <li>if you choose to donate profile amount, then the base amount will send to this account</li>
                </ul>
            </div>
        </>
    )
}

export default BankDetails