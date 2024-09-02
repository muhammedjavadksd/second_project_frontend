import { BiddingProductUnit } from "@/util/types/Enums/BasicEnums";
import { Field } from "formik";
import { Fragment } from "react";


function ProductDetailsStepTwo() {

    return (
        <Fragment>
            <div className='mb-3'>
                <label htmlFor="">Product unit</label>
                <Field type="text" as="select" placeholder="Select product unit" name="product_unit" id="product_unit" className="shadow-sm mt-1  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value="">Select product unit</option>
                    {
                        Object.keys(BiddingProductUnit).map((item) => {
                            return <option value={item}>{item}</option>
                        })
                    }
                </Field>
            </div>

            <div className='mb-3'>
                <label htmlFor="">Product quantity</label>
                <Field type="number" placeholder="Enter the product quantity" name="quantity" id="quantity" className="shadow-sm mt-1  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>


            <div className='mb-3'>
                <label htmlFor="">Expected price</label>
                <Field type="number" placeholder="Expected price" name="expected_price" id="expected_price" className="shadow-sm mt-1  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>

            <div className='mb-3'>
                <label htmlFor="">Brand</label>
                <Field type="number" placeholder="Enter the brand name" name="brand" id="brand" className="shadow-sm mt-1  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>

            <div className="mt-5">
                <h4 className="font-bold">Hint</h4>
                <ul className="mt-3 list-decimal pl-4">
                    <li>
                        The expected price should be the minimum price. Any amount above this will be donated to the fundraiser.
                    </li>
                    <li>
                        If you choose to donate the full amount, the expected price will be given to the fundraiser.
                    </li>
                    <li>
                        If you don't have a valid brand, please enter the appropriate category for the product.
                    </li>
                </ul>
            </div>


        </Fragment>
    )
}

export default ProductDetailsStepTwo