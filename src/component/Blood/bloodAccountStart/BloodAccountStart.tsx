import { bloodDonatationFormValues } from '@/util/external/yup/initialValues'
import { bloodDonatationFormValidation } from '@/util/external/yup/yupValidations'
import { BloodGroup } from '@/util/types/Enums/BasicEnums'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { onBloodDonationSubmit } from './Logic'
import { toast } from 'react-toastify'
import ModelHeader from '@/component/Util/Model/ModelHeader'
import { signIn, useSession } from 'next-auth/react'
import { userDetailsFromUseSession } from '@/util/data/helper/authHelper'
import { getServerSession } from 'next-auth'
import API_axiosInstance from '@/util/external/axios/api_axios_instance'
import BloodDonorForm from '@/util/context/BloodDonorForm'
import { BloodDonorFormContext } from '@/util/context/Context'
import LoadingComponent from '@/component/Util/LoadingComponent'
import ViewDonorProfile from './ViewDonorProfile'



function BloodAccountStart({ onComplete, profile }): React.ReactElement {

    // const { update } = useSession()
    const session = useSession()

    const { donor_id, setDonor } = useContext(BloodDonorFormContext)
    const [isBloodDonorFormLoading, setBloodDonorFormLoading] = useState(false)
    const [currentLocation, setCurrentLocation] = useState([123, 123]);


    // alert(donor_id)
    const [bloodDonorDetails, setBloodDonor] = useState(profile)

    async function findDonorDetails() {
        try {
            const profile = userDetailsFromUseSession(session, "user");
            // let bloodId = profile.blood_donor_id;
            const bloodToken = profile.blood_token;
            const token = profile.token;
            // alert(bloodToken)
            if (bloodToken && token) {
                // alert("The token" + token)
                // if (!bloodId) {


                //     const findProfile = await API_axiosInstance.get(`/profile/get_profile`, { headers: { authorization: `Bearer ${token}` } });
                //     const response = findProfile.data;

                //     if (response.status) {
                //         const { profile } = response.data;
                //         if (profile) {
                //             bloodId = profile.blood_donor_id
                //         } else {
                //             return false
                //         }
                //     } else {
                //         return false
                //     }
                // }



                const findBloodDonor = await API_axiosInstance.get(`/blood/get_profile`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                        bloodAuthorization: `Bearer ${bloodToken}`
                    }
                });
                const response = findBloodDonor.data;
                if (response.status) {
                    const profile = response.profile;
                    setBloodDonor(profile)
                }
                console.log(findBloodDonor);

                setBloodDonorFormLoading(false)
            } else {
                setBloodDonorFormLoading(false)
            }
        } catch (e) {
            console.log(e);
            setBloodDonorFormLoading(false)
        }
    }

    useEffect(() => {
        setBloodDonor(profile)
    }, [profile])

    // useEffect(() => {
    //     findDonorDetails()
    // }, [session])



    async function successCB(donor_id: string) {
        const user = userDetailsFromUseSession(session, "user")
        const updateProfile = await API_axiosInstance.patch("/profile/update_profile", { user_profile: { blood_donor_id: donor_id } }, { headers: { authorization: `Bearer ${user.token}` } })
        console.log(updateProfile);
        setDonor(donor_id)
        toast.success("Blood donation profile is opened")
        console.log(session);
        onComplete()
    }

    useEffect(() => {
        console.log("Session updated:", session);
        console.log("User details from session:", userDetailsFromUseSession(session, "user"));
    }, [session]);

    function errorCB(err) {
        toast.error(err)
        onComplete()
    }




    return (
        <LoadingComponent closeOnClick={false} isLoading={isBloodDonorFormLoading} paddingNeed={false}>


            <div className='bg-gray-100  rounded-t  rounded-b min-h-10 min-w-96 '>
                <>
                    <ModelHeader title={"Start Blood Account"} />
                    <div className='p-5'>
                        <Formik initialValues={bloodDonatationFormValues} validationSchema={bloodDonatationFormValidation} onSubmit={(val) => {
                            console.log(currentLocation);

                            if (!currentLocation) {
                                toast.error("Please allow the location")
                                return;
                            }
                            onBloodDonationSubmit(val, currentLocation, successCB, errorCB)
                        }}>
                            <Form>
                                <div className='mb-5'>
                                    <label htmlFor="" className='text-sm'>Enter full name</label>
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
                                            Object.values(BloodGroup).map((each) => {
                                                return (
                                                    <option key={each} value={each}>{each}</option>
                                                )
                                            })
                                        }
                                    </Field>
                                    <ErrorMessage name='blood_group' component={"div"} className='errorMessage'></ErrorMessage>
                                </div>
                                <button type="submit" className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Save & Submit</button>
                            </Form>
                        </Formik>
                    </div>
                </>
            </div>
        </LoadingComponent>
    )
}

export default BloodAccountStart