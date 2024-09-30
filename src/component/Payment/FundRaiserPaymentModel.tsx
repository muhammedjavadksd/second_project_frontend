import const_data from "@/util/data/const"
import EditInput from "../Util/EditInput"
import { useEffect, useState } from "react"
import { ErrorMessage, Field, Form, Formik } from "formik";
import { fundRaisePaymentInitialValues } from "@/util/external/yup/initialValues";
import { fundRaisePaymentValidation } from "@/util/external/yup/yupValidations";
import { toast } from "react-toastify";
import { initialFundPayment } from "@/util/external/yup/formSubmission";
import CashFree from 'cashfree-sdk'

function OtherAmount({ onAmountSelect, initialValue }) {

    const [isOtherAmount, setOtherAmount] = useState<boolean>(false);
    const [currentAmount, setAmount] = useState<number>(initialValue);

    useEffect(() => {
        setAmount(initialValue)
    }, [initialValue])


    return (
        !isOtherAmount ? <button className="bg-white rounded-3xl shadow-inner border px-7 py-3" onClick={() => setOtherAmount(true)}>Other amount</button> :
            (
                <>

                    <div className="relative">
                        <button type="submit" className="absolute left-0 top-0 bottom-0  text-black  ps-3">{const_data.MONEY_ICON}</button>
                        <input
                            onChange={(e) => {
                                setAmount(+e.target.value)
                            }}
                            onBlur={(val) => {
                                onAmountSelect(val.target.value)
                            }} type="text" name="amount" value={currentAmount} id="amount" className="ps-5  shadow-inner border border-gray-200 max-w-full w-48 rounded-lg " placeholder="Enter the amount" />
                    </div>
                </>
            )
    )
}

function FundPaymentModel({ fund_id }) {

    function orderCreated(session_id) {
        if (window && window.Cashfree) {
            new window.Cashfree(session_id).redirect();
        } else {
            console.error("Cashfree SDK is not loaded");
            console.log("Redirect");
        }
    }


    const [amount, setAmount] = useState<number>(0)
    return (
        <div className="bg-white min-h-96 min-w-96 rounded-lg">
            <script src="https://sdk.cashfree.com/js/ui/2.0.0/cashfree.sandbox.js"></script>

            <div className="p-3 text-center bg-gray-300 rounded-ss-lg rounded-se-lg">
                <h2 className="text-blue-600 text-xl font-bold">Choose a donation amount</h2>
            </div>
            <div className="px-5 py-3">
                <p className="text-xs font-mono">Most Donors donate approx 2500 to this Fundraiser</p>

                <Formik initialValues={fundRaisePaymentInitialValues} validationSchema={fundRaisePaymentValidation} onSubmit={(val) => {
                    if (!amount) {
                        toast.error("Please select valid amount");
                        return;
                    }
                    initialFundPayment(val.full_name, +val.phone_number, val.email_id, val.hide_profile, amount, orderCreated, () => { }, fund_id)

                }}>
                    <Form>
                        <div className="mt-5 mb-5 flex flex-wrap w-[350px] justify-center gap-4">
                            <button type="button" onClick={() => setAmount(500)} className={`${amount == 500 ? "bg-gray-200" : "bg-white"}  rounded-3xl shadow-inner border px-7 py-3`}>{const_data.MONEY_ICON}500</button>
                            <button type="button" onClick={() => setAmount(1000)} className={`${amount == 1000 ? "bg-gray-200" : "bg-white"} rounded-3xl shadow-inner border px-7 py-3`}>{const_data.MONEY_ICON}1000</button>
                            <button type="button" onClick={() => setAmount(2000)} className={`${amount == 2000 ? "bg-gray-200" : "bg-white"} rounded-3xl shadow-inner border px-7 py-3`}>{const_data.MONEY_ICON}2000</button>
                            <OtherAmount initialValue={amount} onAmountSelect={(amount) => {
                                setAmount(amount)
                            }} />
                        </div>
                        <ErrorMessage className='errorMessage' component="div" name='amount' />
                        <div className="mb-4">
                            <label className="text-sm mb-2 block" htmlFor="">Enter your name</label>
                            <Field
                                type="text"
                                id="full_name"
                                name="full_name"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                placeholder="Enter full name"
                            />
                            <ErrorMessage className='errorMessage' component="div" name='full_name' />

                        </div>
                        <div className="mb-4">
                            <label className="text-sm mb-2 block" htmlFor="">Enter phone number</label>
                            <Field
                                type="text"
                                id="phone_number"
                                name="phone_number"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                placeholder="Enter phone number"
                            />
                            <ErrorMessage className='errorMessage' component="div" name='phone_number' />
                        </div>
                        <div className="mb-4">
                            <label className="text-sm mb-2 block" htmlFor="">Enter email address</label>
                            <Field
                                type="text"
                                id="email_id"
                                name="email_id"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                placeholder="Enter email address"
                            />
                            <ErrorMessage className='errorMessage' component="div" name='email_id' />
                        </div>

                        <div className="mb-4 flex gap-3">
                            <Field
                                type="checkbox"
                                id="hide_profile"
                                name="hide_profile"
                                className=""
                            />
                            <ErrorMessage className='errorMessage' component="div" name='hide_profile' />
                            <label typeof="button" className="text-sm mb-2 block" htmlFor="hide_profile">Want to hide your name from public</label>
                        </div>
                        <button type="submit" className="w-full font-medium text-white p-3 text-lg bg-green-400 rounded-lg">Pay now</button>

                    </Form>
                </Formik>
            </div>

        </div>
    )
}

export default FundPaymentModel