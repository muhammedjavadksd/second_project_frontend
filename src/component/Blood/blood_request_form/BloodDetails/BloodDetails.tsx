import CreateFormBackground from "@/component/FundRaiser/CreateFormBackground"
import LoadingComponent from "@/component/Util/LoadingComponent"
import const_data from "@/util/data/const"
import { ErrorMessage, Field, Form, Formik } from "formik"
import React, { useContext, useState } from "react"
import { onBloodDetailsSubmit } from "./Logic"
import { bloodRequestDetailsInitialVaues, bloodRequestPersonalDetailsInitialValue } from "@/util/external/yup/initialValues"
import { bloodRequestDetailsValidation } from "@/util/external/yup/yupValidations"
import { SelectedHospital } from "@/util/types/InterFace/UtilInterface"
import LocationItem from "@/component/Util/LocationItem"
// import { OnGoingBloodRequestContext } from "@/util/context/Context"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { SessionStorageKeys } from "@/util/types/Enums/BasicEnums"



function BloodRequestDetails({ state }): React.ReactElement {

    const [isLoading, setLoding] = useState<boolean>(false)
    const [selectedLocation, setSelectedLocation] = useState<SelectedHospital>({ display_name: null, location: { lat: null, lon: null }, name: null, place_id: null, type: null });
    const bloodRequestFirstPhase = JSON.parse(sessionStorage.getItem(SessionStorageKeys.BloodRequestFormPhase) ?? '{}')
    const router = useRouter()



    function ifNotLogged() {
        router.replace("/auth/sign_up?next=blood/request&step_index=1")
    }

    function successCallback(msg: string) {
        toast.success(msg);
        router.replace("/");
    }

    function errorCallback(msg: string) {
        toast.error(msg)
    }

    return (
        <>
            <LoadingComponent closeOnClick={false} isLoading={isLoading} paddingNeed={false} >
                <CreateFormBackground>
                    <Formik onSubmit={(val) => {
                        val.personal_details = bloodRequestFirstPhase;
                        onBloodDetailsSubmit(val, successCallback, errorCallback, ifNotLogged)
                    }
                    } initialValues={bloodRequestDetailsInitialVaues} validationSchema={bloodRequestDetailsValidation}>
                        <Form>
                            <div className="mb-5">
                                <label htmlFor="blood_group" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select the blood group</label>
                                <Field as="select" type="text" id="blood_group" name="blood_group" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" >
                                    <option value="">Select the blood group</option>
                                    {
                                        const_data.BLOOD_GROUPS.map((bgroup) => {
                                            return <option value={bgroup}>{bgroup}</option>
                                        })
                                    }
                                </Field>
                                <ErrorMessage name="blood_group" component="div" className="errorMessage" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="unit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select the unit</label>
                                <Field type="text" id="unit" name="unit" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"></Field>
                                <ErrorMessage name="unit" component="div" className="errorMessage" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Needed for Blood</label>
                                <Field type="date" id="needed_date" name="needed_date" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                                <ErrorMessage name="needed_date" component="div" className="errorMessage" />
                            </div>

                            <div className="mb-5 w-full relative">
                                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select hospital</label>
                                <Field type="text" id="hospital_name" name="hospital_name" className=" shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-ligh" />
                                {/* <ul className="absolute w-full rounded-lg shadow-lg">
                                    <li><LocationItem /></li>
                                </ul> */}
                                <ErrorMessage name="hospital_name" component="div" className="errorMessage" />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Has the patient sought out neighbors, friends, and relatives to get the blood donors they need?</label>
                                <Field as="select" type="text" id="enquired_with_others" name="enquired_with_others" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                                    <option>Select</option>
                                    <option value={'true'}>Yes</option>
                                    <option value={'false'}>No</option>
                                </Field>
                                <ErrorMessage name="enquired_with_others" component="div" className="errorMessage" />
                            </div>



                            <div className="overflow-hidden ">
                                <button
                                    type="submit"
                                    className="ml-5 float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Next <i className="fa-solid fa-chevron-right"></i>
                                </button>
                                <button type="button" onClick={() => state((prev) => prev - 1)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                    <i className="fa-solid fa-chevron-left me-5"></i>
                                    Prev
                                </button>

                            </div>

                        </Form>
                    </Formik>
                </CreateFormBackground>
            </LoadingComponent>
        </>
    )
}

export default BloodRequestDetails