import { Fragment } from "react"
import ModelHeader from "../Util/Model/ModelHeader"
import ModelItem from "../Util/ModelItem"
import { ErrorMessage, Field, Form, Formik } from "formik";
import { closeBloodRequirementValidation, commentPostValidation } from "@/util/external/yup/yupValidations";
import { closeBloodRequirementInitialValues } from "@/util/external/yup/initialValues";
import { BloodCloseCategory } from "@/util/types/Enums/BasicEnums";
import { closeBloodRequest } from "@/util/data/helper/APIHelper";
import { toast } from "react-toastify";


function OnCloseForm({ onClose, blood_id, onSuccess }) {

    function closeRequest(val) {
        closeBloodRequest(blood_id, val.category, val.explanation).then((data) => {
            if (data) {
                toast.success("Blood requirement has been closed")
                onSuccess()
            } else {
                toast.error("Blood requirement closing failed")
            }
        }).catch((err) => {
            console.log(err);
            toast.error("Blood requirement closing failed")
        })
    }

    return (
        <ModelItem ZIndex={99} closeOnOutSideClock={true} isOpen={true} onClose={onClose} >
            <ModelHeader title={"Close blood request"} />
            <div className='bg-white  shadow-md p-5 w-96 max-h-screen'>
                <Formik validationSchema={closeBloodRequirementValidation} initialValues={closeBloodRequirementInitialValues} onSubmit={(val, { resetForm }) => {
                    closeRequest(val)
                }}>
                    <Form>
                        <div className='w-full rounded-lg  block'>
                            <label htmlFor="weight" className='text-sm mb-2 block'>Select closing reason</label>
                            <Field as="select" type="number" name="category" id="category" className="block shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full">
                                <option value="">Select reason</option>
                                {
                                    Object.values(BloodCloseCategory).map((item) => {
                                        return <option key={item} value={item}>{item}</option>
                                    })
                                }
                            </Field>
                            <ErrorMessage className='errorMessage' component="div" name='category' />
                        </div>
                        <div className='mt-3 w-full rounded-lg  block'>
                            <label htmlFor="weight" className='text-sm mb-2 block'>Enter the explanation</label>
                            <Field type="text" name="explanation" id="explanation" className="block shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full" />
                            <ErrorMessage className='errorMessage' component="div" name='explanation' />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button type="reset" className="mt-4 px-4 bg-transparent text-black  p-2 rounded">Reset</button>
                            <button type="submit" className="mt-4 px-4 bg-blue-500 text-white p-2 rounded">Submit</button>
                        </div>

                    </Form >
                </Formik >
            </div>
        </ModelItem>
    )
}

export default OnCloseForm