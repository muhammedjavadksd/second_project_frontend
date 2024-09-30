import { Field } from 'formik'
import React from 'react'

function BasicDetails() {
    return (
        <>
            <div className='mb-3'>
                <label htmlFor="">Enter full name</label>
                <Field type="text" placeholder="Enter full name" name="full_name" id="full_name" className="shadow-sm mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <div className='mb-3'>
                <label htmlFor="">Email address</label>
                <Field type="email" placeholder="Enter email address" name="email_address" id="email_address" className="shadow-sm mt-1  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <div className='mb-3'>
                <label htmlFor="">Phone number</label>
                <Field type="number" placeholder="Enter phone number" name="phone_number" id="phone_number" className="shadow-sm mt-1  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <div className="mt-5">
                <h4 className="font-bold">Hint</h4>
                <ul className="mt-3 list-decimal pl-4">
                    <li>Enter you full name (Eg: Muhammed Javad)</li>
                    <li>Email addres should be valid to get notification</li>
                    <li>Phone number must be Indian to maintain contact</li>
                </ul>
            </div>
        </>
    )
}

export default BasicDetails