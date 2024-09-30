import { BiddingProductUnit } from '@/util/types/Enums/BasicEnums'
import { Field } from 'formik'
import React from 'react'

function ProductDetails() {
    return (
        <>
            <div className='mb-3'>
                <label htmlFor="">Product name</label>
                <Field type="text" placeholder="Enter product name" name="product_name" id="product_name" className="shadow-sm mt-1  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>



            <div className='mb-3'>
                <label htmlFor="">Product category</label>
                <Field type="text" placeholder="Select product category" name="category" id="category" className="shadow-sm mt-1  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>

            <div className='mb-3'>
                <label htmlFor="">Product sub category</label>
                <Field type="text" placeholder="Select sub product category" name="sub_category" id="sub_category" className="shadow-sm mt-1  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>



            <div className="mt-5">
                <h4 className="font-bold">Hint</h4>
                <ul className="mt-3 list-decimal pl-4">
                    <li>Please include the full product name, e.g., iPhone 14 Pro Max, 256GB.</li>
                    <li>If the product has additional labels or specifications, please include them along with the product name.</li>
                </ul>
            </div>
        </>
    )
}

export default ProductDetails