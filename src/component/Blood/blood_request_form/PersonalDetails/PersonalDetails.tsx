import CreateFormBackground from "@/component/FundRaiser/CreateFormBackground";
import LoadingComponent from "@/component/Util/LoadingComponent";
import { bloodRequestPersonalDetailsInitialValue } from "@/util/external/yup/initialValues";
import { bloodRequestPersonalDetailsValidation } from "@/util/external/yup/yupValidations";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { onBloodRequestPersonalDetailSubmit } from "./Logic";
import { toast } from "react-toastify";
import const_data from "@/util/data/const";
import { IOnGoingBloodRequest, IOnGoingBloodRequestProvider } from "@/util/types/InterFace/UtilInterface";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { userDetailsFromGetSession } from "@/util/data/helper/authHelper";
import { log } from "console";
import { SessionStorageKeys } from "@/util/types/Enums/BasicEnums";


function BloodPersonalDetails({ state }): React.ReactElement {


    const bloodRequestFirstPhase = JSON.parse(sessionStorage.getItem(SessionStorageKeys.BloodRequestFormPhase) ?? '{}') // useContext<IOnGoingBloodRequestProvider>(OnGoingBloodRequestContext)
    const [initialValues, setInitialValues] = useState({
        patient_name: "",
        relation: "",
        age: '',
        gender: "",
        address: "",
        email_address: "",
        phone_number: ""
    })
    const router = useRouter()

    useEffect(() => {
        console.log(bloodRequestFirstPhase);

        if (bloodRequestFirstPhase && bloodRequestFirstPhase.patient_name != "" && bloodRequestFirstPhase.patient_name != null) {
            setInitialValues({
                patient_name: bloodRequestFirstPhase.patient_name,
                relation: bloodRequestFirstPhase.relation,
                age: bloodRequestFirstPhase.age,
                gender: bloodRequestFirstPhase.gender,
                address: bloodRequestFirstPhase.address,
                phone_number: bloodRequestFirstPhase.phone_number,
                email_address: bloodRequestFirstPhase.email_address,
            })
        }
    }, [])



    async function onSubmit(val) {
        const session = await getSession();
        const user = userDetailsFromGetSession(session, "user");


        try {

            sessionStorage.setItem(SessionStorageKeys.BloodRequestFormPhase, JSON.stringify({
                address: val.address,
                email_address: val.email_address,
                age: val.age,
                gender: val.gender,
                patient_name: val.patient_name,
                phone_number: val.phone_number,
                relation: val.relation
            } as IOnGoingBloodRequest))

            if (user) {
                state((prev) => prev + 1)
            } else {
                router.push("/auth/sign_up?next=blood/request&step_index=1")
            }
        } catch (e) {
            toast.error("Something went wrong")
        }
    }



    const [isLoading, setIsLoading] = useState(false)

    return (
        <>
            <LoadingComponent closeOnClick={false} isLoading={isLoading} paddingNeed={false} >
                <CreateFormBackground>
                    <Formik onSubmit={onSubmit} enableReinitialize initialValues={initialValues} validationSchema={bloodRequestPersonalDetailsValidation}>
                        <Form>
                            <div className="mb-5">
                                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Patient name</label>
                                <Field type="text" id="patient_name" name="patient_name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Patient name" />
                                <ErrorMessage name="patient_name" component="div" className="errorMessage" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Relationship</label>
                                <Field type="text" id="relation" name="relation" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" as="select">
                                    <option value="">Select the relationship</option>
                                    {
                                        const_data.RELATIONSHIP.map((relation) => {
                                            return <option key={relation} value={relation}>{relation}</option>
                                        })
                                    }
                                </Field>
                                <ErrorMessage name="relation" component="div" className="errorMessage" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select the gender</label>
                                <Field type="text" id="gender" name="gender" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" as="select">
                                    <option value="">Select the gender</option>
                                    {
                                        const_data.GENDERS.map((gender) => {
                                            return <option key={gender} value={gender}>{gender}</option>
                                        })
                                    }
                                </Field>
                                <ErrorMessage name="gender" component="div" className="errorMessage" />
                            </div>


                            <div className="mb-5">
                                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Patient Age</label>
                                <Field type="text" id="age" name="age" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="age" />
                                <ErrorMessage name="age" component="div" className="errorMessage" />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                                <Field type="text" id="phone_number" name="phone_number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter phone number" />
                                <ErrorMessage name="phone_number" component="div" className="errorMessage" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                                <Field type="text" id="email_address" name="email_address" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter email address" />
                                <ErrorMessage name="email_address" component="div" className="errorMessage" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                <Field type="text" id="address" name="address" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter full address" />
                                <ErrorMessage name="address" component="div" className="errorMessage" />
                            </div>
                            <div className="overflow-hidden">

                                <button
                                    type="submit"
                                    className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Next <i className="fa-solid fa-chevron-right"></i>
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </CreateFormBackground>
            </LoadingComponent>
        </>
    )
}

export default BloodPersonalDetails