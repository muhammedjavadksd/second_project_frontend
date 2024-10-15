import { userDetailsFromUseSession } from '@/util/data/helper/authHelper';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';
import BloodCard from './IncomingBloodCard';
import { StatusCode } from '@/util/types/Enums/BasicEnums';
import ModelHeader from '../Util/Model/ModelHeader';
import { confirmAlert } from 'react-confirm-alert';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import FormikSelectField from '../Util/FormikFieldSelect';
import { bloodDonationFormInitialValues } from '@/util/external/yup/initialValues';
import { validationSchema } from '@/util/external/yup/yupValidations';
import DatePicker from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import API_axiosInstance from '@/util/external/axios/api_axios_instance';
import Image from 'next/image';
import 'react-confirm-alert/src/react-confirm-alert.css';
import PublicImage from '../Util/PublicImage';
import LoadingComponent from '../Util/LoadingComponent';


function BloodRequirementSingleItem({ req_id, group, unit, deadLine, location, username }) {

    const session = useSession();
    const router = useRouter();
    const formik = useRef(null);





    async function onDonation(val, onClose) {

        const userDetails = userDetailsFromUseSession(session, "user");
        const blood_token = userDetails.blood_token;
        const token = userDetails.token;

        try {

            const {
                donatedLast90Days = '',
                weight = '',
                seriousConditions = '',
                majorSurgeryOrIllness = '',
                surgeryOrIllnessDetails = '',
                chronicIllnesses = '',
                tattooPiercingAcupuncture = '',
                alcoholConsumption = '',
                tobaccoUse = '',
                pregnancyStatus = '',
                date = new Date()
            } = val;

            const sendDonationIntrest = await API_axiosInstance.post(`/blood/intrest/${req_id}`,
                {
                    donatedLast90Days,
                    weight,
                    seriousConditions,
                    majorSurgeryOrIllness,
                    surgeryOrIllnessDetails,
                    chronicIllnesses,
                    tattooPiercingAcupuncture,
                    alcoholConsumption,
                    tobaccoUse,
                    pregnancyStatus,
                    date
                },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                        bloodAuthorization: `Bearer ${blood_token}`
                    }
                });

            const response = sendDonationIntrest.data;
            if (response.status) {
                toast.success("You have showed intrest")
                onClose()
                router.push("/account/blood-account/expressed-intrest")
            } else {
                toast.error(response.msg)
            }
        } catch (e) {

            const msg = e?.response?.data?.msg ?? "Something went wrong";
            if (e?.response?.status == StatusCode.BAD_REQUEST) {
                toast.error(msg)
            } else {
                toast.warning("Create blood account to start donating")
                router.push("/blood/create-account")
            }
        } finally {
            onClose()
        }

    }


    function onDonateBlood() {


        confirmAlert({
            title: "Are you sure about it",
            message: "Are you sure about it?",
            customUI: ({ onClose, title, }) => {

                const CustomModal = () => {

                    const [isLoading, setLoading] = useState<boolean>(false);

                    return (
                        <LoadingComponent closeOnClick={false} isLoading={isLoading} paddingNeed={false}>
                            <>
                                <ModelHeader title={"Donate your blood"} />
                                <div className='bg-white  shadow-md p-5 w-96 max-h-screen' style={{ height: "600px" }}>
                                    <Formik
                                        innerRef={formik}
                                        validationSchema={validationSchema}
                                        initialValues={bloodDonationFormInitialValues}
                                        onSubmit={async (values) => {
                                            setLoading(true)
                                            await onDonation(values, onClose)
                                            setLoading(false)
                                        }}
                                    >
                                        {({ values, setFieldValue }) => (
                                            <Form className='overflow-auto h-full'>
                                                <div className='overflow-auto'>
                                                    <div className='mb-4'>
                                                        <label htmlFor="donatedLast90Days" className='text-sm mb-2 block'>Have you donated blood in the last 90 days?</label>
                                                        <Field as="select" name="donatedLast90Days" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full">
                                                            <option value="">Select</option>
                                                            <option value="true">Yes</option>
                                                            <option value="false">No</option>
                                                        </Field>
                                                        <ErrorMessage className='errorMessage' component="div" name='donatedLast90Days' />
                                                    </div>

                                                    <div className='mb-4'>
                                                        <label htmlFor="weight" className='text-sm mb-2 block'>What is your weight?</label>
                                                        <Field type="number" name="weight" id="weight" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full" placeholder="Enter your weight" />
                                                        <ErrorMessage className='errorMessage' component="div" name='weight' />
                                                    </div>

                                                    <div className='mb-4'>
                                                        <label htmlFor="seriousConditions" className='text-sm mb-2 block'>Have you ever been diagnosed with or treated for any of the following conditions?</label>
                                                        <FormikSelectField multiple={true} placeHolder={"Enter dignouse"} setFieldValue={(val) => { setFieldValue("seriousConditions", val) }} values={['HIV/AIDS', 'Hepatitis B or C', 'Cancer', 'Heart Disease', 'Tuberculosis']}></FormikSelectField>
                                                        <ErrorMessage className='errorMessage' component="div" name='seriousConditions' />
                                                    </div>

                                                    <div className='mb-4'>
                                                        <label htmlFor="majorSurgeryOrIllness" className='text-sm mb-2 block'>Have you had any major surgery or been seriously ill in the past 6 months?</label>
                                                        <Field as="select" name="majorSurgeryOrIllness" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full">
                                                            <option value="">Select</option>
                                                            <option value="true">Yes</option>
                                                            <option value="false">No</option>
                                                        </Field>
                                                        <ErrorMessage className='errorMessage' component="div" name='majorSurgeryOrIllness' />
                                                    </div>

                                                    {values.majorSurgeryOrIllness === 'true' && (
                                                        <div className='mb-4'>
                                                            <label htmlFor="surgeryOrIllnessDetails" className='text-sm mb-2 block'>Please specify the surgery or illness:</label>
                                                            <Field type="text" name="surgeryOrIllnessDetails" id="surgeryOrIllnessDetails" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full" placeholder="Enter details" />
                                                            <ErrorMessage className='errorMessage' component="div" name='surgeryOrIllnessDetails' />
                                                        </div>
                                                    )}
                                                    <div className='mb-4'>
                                                        <label htmlFor="chronicIllnesses" className='text-sm mb-2 block'>Do you have any chronic illnesses (e.g., diabetes, hypertension)?</label>
                                                        <Field as="select" name="chronicIllnesses" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full">
                                                            <option value="">Select</option>
                                                            <option value="true">Yes</option>
                                                            <option value="false">No</option>
                                                        </Field>
                                                        <ErrorMessage className='errorMessage' component="div" name='chronicIllnesses' />
                                                    </div>

                                                    <div className='mb-4'>
                                                        <label htmlFor="tattooPiercingAcupuncture" className='text-sm mb-2 block'>Have you had a tattoo, piercing, or acupuncture treatment in the past 12 months?</label>
                                                        <Field as="select" name="tattooPiercingAcupuncture" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full">
                                                            <option value="">Select</option>
                                                            <option value="true">Yes</option>
                                                            <option value="false">No</option>
                                                        </Field>
                                                        <ErrorMessage className='errorMessage' component="div" name='tattooPiercingAcupuncture' />
                                                    </div>

                                                    <div className='mb-4'>
                                                        <label htmlFor="alcoholConsumption" className='text-sm mb-2 block'>Have you consumed alcohol in the past 48 hours?</label>
                                                        <Field as="select" name="alcoholConsumption" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full">
                                                            <option value="">Select</option>
                                                            <option value="true">Yes</option>
                                                            <option value="false">No</option>
                                                        </Field>
                                                        <ErrorMessage className='errorMessage' component="div" name='alcoholConsumption' />
                                                    </div>

                                                    <div className='mb-4'>
                                                        <label htmlFor="tobaccoUse" className='text-sm mb-2 block'>Do you use tobacco products (e.g., cigarettes, chewing tobacco)?</label>
                                                        <Field as="select" name="tobaccoUse" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full">
                                                            <option value="">Select</option>
                                                            <option value="true">Yes</option>
                                                            <option value="false">No</option>
                                                        </Field>
                                                        <ErrorMessage className='errorMessage' component="div" name='tobaccoUse' />
                                                    </div>

                                                    <div className='mb-4'>
                                                        <label htmlFor="pregnancyStatus" className='text-sm mb-2 block'>Are you currently pregnant or have you been pregnant in the past 6 months? (For female donors)</label>
                                                        <Field as="select" name="pregnancyStatus" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full">
                                                            <option value="">Select</option>
                                                            <option value="true">Yes</option>
                                                            <option value="false">No</option>
                                                        </Field>
                                                        <ErrorMessage className='errorMessage' component="div" name='pregnancyStatus' />
                                                    </div>

                                                    <div className='mb-4'>
                                                        <label htmlFor="pregnancyStatus" className='text-sm mb-2 block'>Select the time for donating blood</label>

                                                        <div className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full">
                                                            <DatePicker
                                                                onChange={(val) => {
                                                                    setFieldValue("date", val)
                                                                }}
                                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full"
                                                                format="MM/DD/YYYY HH:mm A"
                                                                value={values.date}
                                                                plugins={[
                                                                    <TimePicker key="1" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full" position="bottom" />
                                                                ]}
                                                            />
                                                        </div>
                                                        <ErrorMessage className='errorMessage' component="div" name='date' />
                                                    </div>


                                                </div>


                                                <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Submit</button>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </>
                        </LoadingComponent>
                    )
                }


                return <CustomModal />
            }
        })
    }






    return (
        <>
            <div className="mb-5 w-full bg-white border border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700">
                <BloodCard location={location} group={group} onDonateBlood={onDonateBlood} unit={unit} username={username} deadLine={deadLine} />
            </div>

        </>
    )
}

export default BloodRequirementSingleItem