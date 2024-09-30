import CreateFormBackground from "@/component/FundRaiser/CreateFormBackground"
import LoadingComponent from "@/component/Util/LoadingComponent"
import const_data from "@/util/data/const"
import { ErrorMessage, Field, Form, Formik } from "formik"
import React, { useContext, useEffect, useState } from "react"
import { onBloodDetailsSubmit } from "./Logic"
import { bloodRequestDetailsInitialVaues, bloodRequestPersonalDetailsInitialValue } from "@/util/external/yup/initialValues"
import { bloodRequestDetailsValidation } from "@/util/external/yup/yupValidations"
import { SelectedHospital } from "@/util/types/InterFace/UtilInterface"
import LocationItem from "@/component/Util/LocationItem"
// import { OnGoingBloodRequestContext } from "@/util/context/Context"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { SessionStorageKeys } from "@/util/types/Enums/BasicEnums"
import ReactSelect, { ActionMeta, InputActionMeta } from "react-select"
import Select from 'react-select'
import { findPlaces } from "@/util/data/helper/APIHelper"


function BloodRequestDetails({ state }): React.ReactElement {

    const [isLoading, setLoding] = useState<boolean>(false)
    const [selectedLocation, setSelectedLocation] = useState<SelectedHospital>(null);
    const bloodRequestFirstPhase = JSON.parse(sessionStorage.getItem(SessionStorageKeys.BloodRequestFormPhase) ?? '{}')
    const router = useRouter()
    const [location, setLocation] = useState([]);
    const [isSearching, setSearching] = useState<boolean>(false)

    async function findNearestPlace(query) {
        console.log(query);

        try {
            setSearching(true)
            const find = await findPlaces(query)
            console.log(find);

            if (find) {
                const allLocation = find.map((city) => {

                    const streetName = city?.display_name
                    const streetId = city?.place_id
                    return {
                        value: streetId,
                        label: streetName
                    }
                })
                console.log(allLocation);

                setLocation(allLocation)
            } else {
                setSearching(false)
            }
        } catch (e) {
            console.log(e);
            setSearching(false)
        }
    }

    useEffect(() => {
        setSearching(false)
    }, [location])

    useEffect(() => {
        findNearestPlace("Arimala")
    }, [])

    function ifNotLogged() {
        router.replace("/auth/sign_up?next=blood/request&step_index=1")
    }

    function successCallback(msg: string) {
        toast.success(msg);
        router.replace("/blood/request/success");
        sessionStorage.clear();
    }

    function errorCallback(msg: string) {
        toast.error(msg)
    }

    return (
        <>
            <LoadingComponent closeOnClick={false} isLoading={isLoading} paddingNeed={false} >
                <CreateFormBackground>
                    <Formik onSubmit={(val) => {
                        // alert("S")
                        if (!selectedLocation) {
                            toast.error("Select valid hospita")
                            return;
                        }
                        val.personal_details = bloodRequestFirstPhase;
                        onBloodDetailsSubmit(val, selectedLocation['value'], successCallback, errorCallback, ifNotLogged)
                    }
                    } initialValues={bloodRequestDetailsInitialVaues} validationSchema={bloodRequestDetailsValidation}>
                        <Form>
                            <div className="mb-5">
                                <label htmlFor="blood_group" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select the blood group</label>
                                <Field as="select" type="text" id="blood_group" name="blood_group" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" >
                                    <option value="">Select the blood group</option>
                                    {
                                        const_data.BLOOD_GROUPS.map((bgroup) => {
                                            return <option key={bgroup} value={bgroup}>{bgroup}</option>
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
                                <div className="absolute  top-10 z-10 right-10">
                                    <div className={`${!isSearching && "hidden"}`}>
                                        <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                    </div>

                                    {/* <LoadingComponent closeOnClick={false} isLoading={true} paddingNeed={false} ><></></LoadingComponent> */}
                                </div>
                                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select hospital</label>
                                <Select options={location}
                                    //     onChange={(new)=>{
                                    // }}
                                    onChange={(newVal) => {
                                        console.log(newVal)
                                        setSelectedLocation(newVal)
                                    }}
                                    onInputChange={(newPlace) => {
                                        // alert(newPlace)
                                        findNearestPlace(newPlace)
                                    }}>
                                </Select>

                                {/* <Field type="text" id="hospital_name" name="hospital_name" className=" shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-ligh" /> */}
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
            </LoadingComponent >
        </>
    )
}

export default BloodRequestDetails