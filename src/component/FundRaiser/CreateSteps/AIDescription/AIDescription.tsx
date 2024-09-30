import React, { Fragment, useContext, useEffect, useState } from 'react'
import CreateFormBackground from '../../CreateFormBackground';
import { useDispatch, useSelector } from 'react-redux';
import getAIDescription, { onDescriptionSubmit } from './Logic';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { AI_description_validation } from './Data';
import LoadingComponent from '@/component/Util/LoadingComponent';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { OnGoingApplicationContext } from '@/util/context/Context';
import { clearFundRaiserData, updateFundRaiseData } from '@/util/external/redux/slicer/fundRaiserForm';
import { IReduxStore } from '@/util/types/InterFace/UtilInterface';
import { IAIDescriptionInitialValues } from '@/util/types/InterFace/FormInitialValues';
// import CreateFormBackground from '../CreateFormBackground'

function AIDescription({ state }) {

    const { currentApplication, setApplication } = useContext(OnGoingApplicationContext)

    const [initialValues, setInitialValues] = useState({});
    const [isLoading, setLoading] = useState(true)
    const router = useRouter();
    const currentApplicationData = useSelector((state: IReduxStore) => state.fund_raiser);
    const dispatch = useDispatch()
    let isWorking = false;
    const fetchAIData = () => {
        console.log(currentApplicationData);
        if (currentApplicationData.amount && currentApplicationData.documents.length && !isWorking) {
            // setLoading(true)
            isWorking = true;
            console.log("Enterd");
            // setRequest(0)
            getAIDescription(currentApplicationData.amount, currentApplicationData.category, currentApplicationData.sub_category, currentApplicationData.raiser_name, currentApplicationData.raiser_age, currentApplicationData.benificiary_relation, currentApplicationData.description, currentApplicationData.city, currentApplicationData.pinCode, currentApplicationData.state, currentApplicationData.district).then((data) => {
                console.log("The wait is over");
                console.log("The ai data");
                console.log(data);

                data && setInitialValues({
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

    function successCB(fund_id) {
        dispatch(clearFundRaiserData())
        router.replace(`/fund-raising/view/${fund_id}?success=true&isForce=true`)
    }

    function errorCB(err) {
        toast.error("Something went wrong")
    }



    return (
        <CreateFormBackground>
            <div className='w-full mb-2 ml-auto' style={{ display: "flex" }}>
                <button disabled={isLoading} onClick={reGenerateAIDescription} className="disabled:cursor-not-allowed disabled:opacity-50 bg-blue-500 ml-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Re-generate FROM AI
                </button>
            </div>
            <Formik onSubmit={(val: IAIDescriptionInitialValues) => {
                val.currentApplication = currentApplication
                onDescriptionSubmit(val, successCB, errorCB)
            }} initialValues={initialValues} enableReinitialize validationSchema={AI_description_validation}>
                <Form>
                    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">

                        <LoadingComponent closeOnClick={false} isLoading={isLoading} paddingNeed={false}>
                            <Fragment>
                                <label htmlFor="comment" className="sr-only">Your comment</label>
                                <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                    <Field id="ai_description" rows='15' name="ai_description" as="textarea" className="w-full *:first-letter:first-line:w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeHolder="Enter detail description" />
                                    <ErrorMessage name='ai_description' component={"div"} className='text-red-600'></ErrorMessage>
                                </div>
                            </Fragment>
                        </LoadingComponent>
                    </div>


                    <div className='ml-auto w-full overflow-hidden gap-3 flex justify-end'>
                        <button type="button" className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => state((prev) => prev - 1)}><i className="fa-solid fa-chevron-left"></i> Prev </button>
                        <button type="submit" className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Submit </button>
                    </div>
                </Form>
            </Formik>
        </CreateFormBackground>

    )
}

export default AIDescription