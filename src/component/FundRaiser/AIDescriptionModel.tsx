import { adminEditFundRaiser, userFundRaiserEdit } from "@/util/data/helper/APIHelper"
import { editFundRaiseDescriptionValidation } from "@/util/external/yup/yupValidations"
import { FundRaiserResponse } from "@/util/types/API Response/FundRaiser"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import LoadingComponent from "../Util/LoadingComponent"
import ModelHeader from "../Util/Model/ModelHeader"
import getAIDescription from "./CreateSteps/AIDescription/Logic"
import { FaMagic } from "react-icons/fa"


function AIDescriptionModel({ profile, successCallBack, finallyCallback, role }: { profile: FundRaiserResponse, successCallBack: Function, finallyCallback: Function, role: "user" | "admin" }) {

    const [AIDescriptionLoading, setDescriptionLoading] = useState<boolean>(false)
    const [AIDescription, setAiDescription] = useState<string>(null)

    useEffect(() => {
        setAiDescription(profile?.description)
    }, [profile])

    return (
        <LoadingComponent closeOnClick={false} isLoading={AIDescriptionLoading} paddingNeed={false}>
            <>
                <ModelHeader title="Edit description content"></ModelHeader>
                <div className='bg-white p-5 min-w-[600px] max-w-full'>
                    <Formik initialValues={{ description: AIDescription }} enableReinitialize validationSchema={editFundRaiseDescriptionValidation} onSubmit={(val) => {
                        setDescriptionLoading(true)
                        if (role == "user") {
                            userFundRaiserEdit(val, profile.fund_id).then((data) => {
                                if (data) {
                                    toast.success("Description content updated")
                                    successCallBack(val.description || "")
                                } else {
                                    toast.error("Something went wrong")
                                }
                            }).finally(() => {
                                finallyCallback()
                                setDescriptionLoading(false)
                            })
                        } else {
                            adminEditFundRaiser(profile.fund_id, val).then((data) => {
                                if (data) {
                                    toast.success("Description content updated")
                                    successCallBack(val.description || "")
                                } else {
                                    toast.error("Something went wrong")
                                }
                            }).finally(() => {
                                finallyCallback()
                                setDescriptionLoading(false)
                            })
                        }
                    }}>
                        <Form>
                            <div className='w-full rounded-lg  block'>
                                <div className='flex justify-between mb-2 items-center'>
                                    <label htmlFor="description" className='text-sm  block'>Description</label>
                                    <button onClick={() => {
                                        setDescriptionLoading(true)
                                        getAIDescription(profile.amount, profile.category, profile.sub_category, profile.full_name, profile.age, profile.benificiary_relation, profile.about, profile.city, profile.pincode, profile.state, profile.district).then((data) => {
                                            if (data) {
                                                setAiDescription(data)
                                                setDescriptionLoading(data)
                                            } else {
                                                toast.error("AI Generation failed")
                                            }
                                            console.log(data);

                                        }).catch((err) => {
                                            console.log(err);
                                        }).finally(() => {
                                            setDescriptionLoading(false)
                                        })
                                    }
                                    } type='button' className='text-sm flex gap-2 items-center bg-gray-200 rounded-lg p-2'>
                                        <FaMagic />
                                        Generate With AI
                                    </button>
                                </div>
                                <Field type="text" rows='12' as="textarea" name="description" id="description" placeholder="Enter description content" className="block shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full" />
                                <ErrorMessage className='errorMessage' component="div" name='description' />
                            </div>
                            <button type="submit" className="mt-3 col-span-2 w-full bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300">
                                Save
                            </button>
                        </Form>
                    </Formik>
                </div>
            </>
        </LoadingComponent>


    )
}

export default AIDescriptionModel