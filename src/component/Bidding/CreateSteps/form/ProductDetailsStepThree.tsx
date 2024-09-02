import { Field } from "formik"
import { Fragment } from "react"


function ProductDetailsStepThree() {
    return (
        <Fragment>

            <div className='mb-3'>
                <label htmlFor="">Delivery Timeframe</label>
                <Field type="date" placeholder="Enter the delivery time frame" name="delivery_timeframe" id="delivery_timeframe" className="shadow-sm mt-1  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>

            <div className='mb-3'>
                <label htmlFor="">Product docs (Warranty docs, Invoice)</label>
                <Field type="file" name="warranty_information" id="warranty_information" className="shadow-sm mt-1  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>

            <div className='mb-3'>
                <label htmlFor="">Additional notes</label>
                <Field type="text" as="textarea" placeholder="Additional notes" className="shadow-sm mt-1  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"></Field>
            </div>

            <div className='mb-3'>
                <label htmlFor="">Product description</label>
                <Field type="text" placeholder="Enter product description" as="textarea" name="product_name" id="product_name" className="shadow-sm mt-1  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>

            <div className="mt-5">
                <h4 className="font-bold">Hint</h4>
                <ul className="mt-3 list-decimal pl-4">
                    <li>Delivery timeline should the date of the item can delivery without any dealy</li>
                    <li>Upload docs such as warranty paper, invoice etc</li>
                </ul>
            </div>
        </Fragment>
    )
}

export default ProductDetailsStepThree