"use client"
import { onBloodDonationSubmit } from "@/component/Blood/bloodAccountStart/Logic";
import Header from "@/component/Header/Header";
import UserPrivateRouter from "@/component/LoginComponent/UserPrivateRouter";
import AskLocation from "@/component/Util/AskLocation";
import BreadCrumb from "@/component/Util/BreadCrumb";
import LocationItem from "@/component/Util/LocationItem";
import ModelItem from "@/component/Util/ModelItem";
import { userDetailsFromUseSession } from "@/util/data/helper/authHelper";
import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import { bloodDonatationFormValues } from "@/util/external/yup/initialValues";
import { bloodDonatationFormValidation } from "@/util/external/yup/yupValidations";
import { BloodGroup } from "@/util/types/Enums/BasicEnums";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";


function Page() {

    const [currentLocation, setCurrentLocation] = useState(null);
    const [formInitialValues, setInitialValues] = useState(bloodDonatationFormValues);

    const session = useSession()
    const router = useRouter();
    const formik = useRef(null)

    useEffect(() => {
        const userData = userDetailsFromUseSession(session, "user");
        console.log(userData);
        setInitialValues({ email_address: userData.email, full_name: `${userData.first_name}  ${userData.last_name}`, phone_number: userData.phone, location: null, blood_group: null });
    }, [session])

    async function successCB(donor_id: string) {
        const user = userDetailsFromUseSession(session, "user")
        await API_axiosInstance.patch("/profile/update_profile", { user_profile: { blood_donor_id: donor_id } }, { headers: { authorization: `Bearer ${user.token}` } })
        router.replace("/account/blood-account")
    }

    useEffect(() => {
        onLocationSelect()
    }, [])

    function onLocationSelect() {
        navigator.geolocation.getCurrentPosition(async ({ coords }) => {
            console.log(coords);
            setCurrentLocation(coords)
        })
    }

    return (
        <UserPrivateRouter>

            <ModelItem ZIndex={99} closeOnOutSideClock={false} isOpen={!(!!currentLocation)} onClose={() => { }}>
                <AskLocation />
            </ModelItem>

            <div className="bg-gray-100">
                <Header />
                <div className='container mx-auto'>

                    <div className="mt-5">
                        <BreadCrumb path={['Home', 'Bidding', 'Create']} />
                    </div>

                    <div className="grid -mt-36 justify-center  items-center min-h-screen grid-cols-2  ">
                        <div>
                            <div>
                                <div className="pe-10">
                                    <h1 className="text-4xl font-bold ">Together, Let&apos;s Save Lives</h1>
                                    <p className="mt-3 text-lg text-gray-700">
                                        Your decision to donate blood could be the difference between life and death for someone in need. By creating your blood donor profile, you take the first step toward becoming a hero for patients relying on blood donations for survival.
                                    </p>
                                    <p className="mt-2 text-gray-600">
                                        Complete the form carefully to ensure you&apos;re notified whenever someone requires your specific blood type. Every drop counts, and your help can make all the difference.
                                    </p>
                                </div>

                            </div>
                        </div>
                        <div className="w-full">

                            <Formik innerRef={formik} enableReinitialize initialValues={formInitialValues} validationSchema={bloodDonatationFormValidation} onSubmit={(val) => {
                                console.log("Current location");
                                console.log(currentLocation);

                                if (!currentLocation) {
                                    toast.error("Please allow the location")
                                    return;
                                }
                                onBloodDonationSubmit(val, currentLocation, successCB, (err) => toast.error(err))
                            }
                            }>
                                {({ errors }) => (
                                    <Form>
                                        {/* {
                                            Object.values(errors).map((err, index) => {
                                                return <span key={index} >{err}</span>
                                            })
                                        } */}
                                        <div className='mb-5'>
                                            <label htmlFor="" className='text-sm'>Enter full name </label>
                                            <Field placeholder="Enter full name" name="full_name" id="full_name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                                            <ErrorMessage name='full_name' component={"div"} className='errorMessage'></ErrorMessage>
                                        </div>
                                        <div className='mb-5'>
                                            <label htmlFor="" className='text-sm'>Enter phone number</label>
                                            <Field placeholder="Enter phone number" name="phone_number" id="phone_number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                                            <ErrorMessage name='phone_number' component={"div"} className='errorMessage'></ErrorMessage>
                                        </div>
                                        <div className='mb-5'>
                                            <label htmlFor="" className='text-sm'>Enter email address</label>
                                            <Field placeholder="Enter email address" name="email_address" id="email_address" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                                            <ErrorMessage name='email_address' component={"div"} className='errorMessage'></ErrorMessage>
                                        </div>

                                        <div>
                                            <label htmlFor="" className='text-sm'>Select your blood group</label>
                                            <Field as="select" name="blood_group" id="blood_group" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                                                <option>Select Blood Group</option>
                                                {
                                                    Object.values(BloodGroup).map((each, index) => {
                                                        return (
                                                            <option key={index} value={each}>{each}</option>
                                                        )
                                                    })
                                                }
                                            </Field>
                                            <ErrorMessage name='blood_group' component={"div"} className='errorMessage'></ErrorMessage>
                                        </div>

                                    </Form>
                                )}
                            </Formik>


                        </div>
                    </div>
                    <div className="buttonNavigation shadow-2xl bg-white fixed bottom-0  left-0 right-0 min-h-20">
                        <div className="flex p-4 pb-0 h-full  items-center justify-between">
                            <div></div>
                            <button onClick={() => {
                                if (formik.current) {
                                    console.log("Formik submitting");
                                    formik.current.handleSubmit()
                                } else {
                                    console.log(formik);
                                    console.log("Form reference not found");
                                }

                            }} className={`bg-green-600 rounded-lg px-7 py-2 text-white hover:bg-green-800`}>Save & Submit</button>
                        </div>
                    </div>

                </div >
            </div>
        </UserPrivateRouter >
    )
}

export default Page