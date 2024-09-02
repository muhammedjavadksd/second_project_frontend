import LoadingComponent from "@/component/Util/LoadingComponent"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { Fragment, useContext, useEffect, useState } from "react"
import CreateFormBackground from "../../CreateFormBackground"
import { fundRaiserBankAccoutInitialValues } from "@/util/external/yup/initialValues"
import { fundRaiserBankAccoutValidation } from "@/util/external/yup/yupValidations"
import { onBankAccountSubmit } from "@/util/external/yup/formSubmission"
import { OnGoingApplicationContext } from "@/util/context/Context"
import { useSelector } from "react-redux"
import { IReduxStore } from "@/util/types/InterFace/UtilInterface"
import { toast } from "react-toastify"


function FundRaiserBankAccount({ state }) {

    const { currentApplication, setApplication } = useContext(OnGoingApplicationContext)
    const [initialValues, setInitialValues] = useState<Record<string, any>>(fundRaiserBankAccoutInitialValues);
    const selectData = useSelector((store: IReduxStore) => store.fund_raiser);

    useEffect(() => {
        if (selectData.account_number) {
            setInitialValues({
                account_number: selectData.account_number,
                ifsc_code: selectData.ifsc_code,
                holder_name: selectData.holder_name,
                account_type: selectData.account_type,
                currentApplication: null
            })
        }
    }, [])


    function successCB() {
        state((prev) => prev + 1)
    }

    function errorCb(msg: string) {
        toast.error(msg)
    }

    return (
        <Fragment>
            <CreateFormBackground>
                <Formik enableReinitialize initialValues={initialValues} validationSchema={fundRaiserBankAccoutValidation} onSubmit={(val) => {
                    val.currentApplication = currentApplication;
                    console.log(val)

                    onBankAccountSubmit(val, successCB, errorCb);
                }}>
                    <Form>

                        <div className="mb-5">
                            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Account number</label>
                            <Field type="text" id="account_number" name="account_number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter account number" />
                            <ErrorMessage name="account_number" component="div" className="errorMessage" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">IFSC Code</label>
                            <Field type="text" id="ifsc_code" name="ifsc_code" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter IFSC code" />
                            <ErrorMessage name="ifsc_code" component="div" className="errorMessage" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Holder name</label>
                            <Field type="text" id="holder_name" name="holder_name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter holder name" />
                            <ErrorMessage name="holder_name" component="div" className="errorMessage" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Holder name</label>
                            <Field as="select" type="text" id="̉account_type" name="account_type" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Select account type">
                                <option value="">Account type</option>
                                <option value="saving">Saving Account</option>
                                <option value="current">Current Account</option>
                            </Field>
                            <ErrorMessage name="account_type" component="div" className="errorMessage" />
                        </div>
                        <div className='ml-auto w-full overflow-hidden gap-3 flex justify-end'>
                            <button type="button" className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => state((prev) => prev - 1)}><i className="fa-solid fa-chevron-left"></i> Prev </button>
                            <button type="submit" className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next <i className="fa-solid fa-chevron-right"></i></button>
                        </div>
                    </Form>
                </Formik>
            </CreateFormBackground >
        </Fragment >
    )
}

export default FundRaiserBankAccount