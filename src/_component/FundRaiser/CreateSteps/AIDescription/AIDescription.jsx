import React, { useContext, useEffect, useState } from 'react'
import CreateFormBackground from '../../CreateFormBackground';
import { useSelector } from 'react-redux';
import getAIDescription, { onDescriptionSubmit } from './Logic';
import { Field, Form, Formik } from 'formik';
import { AI_description_validation, ai_descriptionInitialValues } from './Data';
import LoadingComponent from '@/_component/Util/LoadingComponent';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { OnGoingApplicationContext } from '@/app/_util/context/Context';
// import CreateFormBackground from '../CreateFormBackground'

function AIDescription({ state }) {

    let { currentApplication, setApplication } = useContext(OnGoingApplicationContext)

    let [initialValues, setInitialValues] = useState({});
    let [isLoading, setLoading] = useState(true)
    let router = useRouter();
    let currentApplicationData = useSelector((state) => state.fund_raiser);
    let isWorking = false;
    let fetchAIData = () => {
        if (currentApplicationData.amount && currentApplicationData.documents.length && !isWorking) {
            // setLoading(true)
            isWorking = true;
            console.log("Enterd");
            // setRequest(0)
            getAIDescription(currentApplicationData.amount, currentApplicationData.category, currentApplicationData.sub_category, currentApplicationData.raiser_name, currentApplicationData.raiser_age, currentApplicationData.benificiary_relation, currentApplicationData.description, currentApplicationData.city, currentApplicationData.pinCode, currentApplicationData.state, currentApplicationData.district).then((data) => {
                console.log("The wait is over");
                console.log("The ai data");
                console.log(data);
                setInitialValues({
                    ai_description: data.trim()
                })
                setLoading(false)
                // setRequest(1)
            }).catch((err) => {
                console.log(err);
                console.log("Error occured");
                setLoading(false)

                // setRequest(1)
            })
        }
    }

    useEffect(() => {
        console.log(currentApplicationData.pictures.length, currentApplicationData.documents.length);
        fetchAIData();
    }, [])

    function reGenerateAIDescription() {
        setLoading(true)
        fetchAIData();
    }

    function successCB() {
        router.replace("/fund-raising/success?fund-id=123")
    }

    function errorCB(err) {
        alert(err)
        toast.error("Something went wrong")
    }



    return (
        <LoadingComponent closeOnClick={false} isLoading={isLoading} paddingNeed={false}>
            <CreateFormBackground>
                <div className='w-full mb-2 ml-auto' style={{ display: "flex" }}>
                    <button onClick={reGenerateAIDescription} class="bg-blue-500 ml-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Re-generate FROM AI
                    </button>
                </div>
                <Formik onSubmit={(val) => {
                    val.currentApplication = currentApplication
                    onDescriptionSubmit(val, successCB, errorCB)
                }} initialValues={initialValues} enableReinitialize validationSchema={AI_description_validation}>
                    <Form>
                        <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">

                            <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                <label for="comment" class="sr-only">Your comment</label>
                                <Field id="ai_description" rows='15' name="ai_description" as="textarea" className="w-full *:first-letter:first-line:w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" />
                                {/* <textarea value={description} id="comment" rows="15" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required >
                                {description}
                            </textarea> */}
                            </div>
                            <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">

                                <div class="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                                    {/* <button type="button" class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                                            <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6" />
                                        </svg>
                                        <span class="sr-only">Attach file</span>
                                    </button>
                                    <button type="button" class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                            <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                        </svg>
                                        <span class="sr-only">Set location</span>
                                    </button>
                                    <button type="button" class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                        </svg>
                                        <span class="sr-only">Upload image</span>
                                    </button> */}
                                </div>
                            </div>
                        </div>


                        <div className='ml-auto w-full overflow-hidden gap-3 flex justify-end'>
                            <button type="button" class="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => state((prev) => prev - 1)}><i class="fa-solid fa-chevron-left"></i> Prev </button>
                            <button type="submit" class="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Submit </button>
                        </div>
                    </Form>
                </Formik>

            </CreateFormBackground>
        </LoadingComponent>
    )
}

export default AIDescription