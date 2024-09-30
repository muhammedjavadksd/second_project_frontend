import { updateBloodRequest } from "@/util/data/helper/APIHelper"
import { bloodApproveUnitValues } from "@/util/external/yup/initialValues"
import { bloodApproveValidation } from "@/util/external/yup/yupValidations"
import { BloodDonationStatus } from "@/util/types/Enums/BasicEnums"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { toast } from "react-toastify"


function BloodApproveForm({ successCb, errorCb, donation_id }) {

    async function onSubmit({ unit }) {
        try {
            const update = await updateBloodRequest(BloodDonationStatus.Approved, donation_id, unit)
            console.log(update);

            if (update.status) {
                successCb()
            } else {
                errorCb(update.msg)
            }
        } catch (e) {
            console.log(e);
            errorCb("Something went wrong")
        }
    }

    return (
        <div className='bg-white  shadow-md p-5 w-96 max-h-screen'>
            <Formik validationSchema={bloodApproveValidation} initialValues={bloodApproveUnitValues} onSubmit={(val) => onSubmit(val)}>
                <Form>
                    <div className='w-full rounded-lg  block'>
                        <label htmlFor="weight" className='text-sm mb-2 block'>Number of unit you have received</label>
                        <Field type="number" name="unit" id="unit" placeholder="Enter the number of unit you have received" className="block shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full" />
                        <ErrorMessage className='errorMessage' component="div" name='unit' />
                    </div>
                    <button
                        type="submit"
                        className="mt-3 col-span-2 w-full bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
                    >
                        Submit
                    </button>
                </Form>
            </Formik>
        </div>
    )
}

export default BloodApproveForm