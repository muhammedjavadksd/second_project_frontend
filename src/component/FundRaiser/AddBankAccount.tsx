import { ErrorMessage, Field, Form, Formik } from "formik"
import LoadingComponent from "../Util/LoadingComponent"
import ModelHeader from "../Util/Model/ModelHeader"
import { fundRaiserBankAccoutInitialValues } from "@/util/external/yup/initialValues"
import { fundRaiserBankAccoutValidation } from "@/util/external/yup/yupValidations"
import { useRef, useState } from "react"
import { addBankAccount, addBankAccountByAdmin } from "@/util/data/helper/APIHelper"
import { toast } from "react-toastify"
import { BankAccountType } from "@/util/types/Enums/BasicEnums"

function AddBankAccount({ onFinish, fund_id, role }: { onFinish: Function, fund_id: string, role: "admin" | "user" }) {

    const [addBankAcocuntLoader, setBankAccountLoader] = useState<boolean>(false)
    const addBankAccountForm = useRef(null);

    async function onAddBankAccount(val) {
        try {
            const data = role == "admin" ? await addBankAccountByAdmin(fund_id, val) : await addBankAccount(fund_id, val)
            if (data.status) {
                toast.success("Bank account created success")
                addBankAccountForm.current.resetForm()
            } else {
                toast.error(data.msg)
            }
        } catch (e) {
            toast.error("Something went wrong")
        } finally {
            setBankAccountLoader(false)
            onFinish()
        }
    }


    return (
        <LoadingComponent closeOnClick={false} isLoading={addBankAcocuntLoader} paddingNeed={false}>
            <>
                <ModelHeader title="Add bank account"></ModelHeader>
                <div className='bg-white p-5 w-96'>
                    <Formik innerRef={addBankAccountForm} initialValues={fundRaiserBankAccoutInitialValues} validationSchema={fundRaiserBankAccoutValidation} onSubmit={(val) => {
                        setBankAccountLoader(true)
                        onAddBankAccount(val)
                    }}>
                        <Form>
                            <div className='w-full rounded-lg  block mb-2.5'>
                                <label htmlFor="holder_name" className='text-sm mb-1 block'>Account holder name</label>
                                <Field type="text" name="holder_name" id="holder_name" placeholder="Enter account holder name" className="block shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full" />
                                <ErrorMessage className='errorMessage' component="div" name='holder_name' />
                            </div>
                            <div className='w-full rounded-lg  block mb-2.5'>
                                <label htmlFor="account_number" className='text-sm mb-2 block'>Account number</label>
                                <Field type="password" name="account_number" id="account_number" placeholder="Enter account number" className="block shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full" />
                                <ErrorMessage className='errorMessage' component="div" name='account_number' />
                            </div>
                            <div className='w-full rounded-lg  block mb-2.5'>
                                <label htmlFor="re_account_number" className='text-sm mb-2 block'>Re enter account number</label>
                                <Field type="text" name="re_account_number" id="re_account_number" placeholder="Re enter account number" className="block shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full" />
                                <ErrorMessage className='errorMessage' component="div" name='re_account_number' />
                            </div>
                            <div className='w-full rounded-lg  block mb-2.5'>
                                <label htmlFor="ifsc_code" className='text-sm mb-1 block'>IFSC Code</label>
                                <Field type="text" name="ifsc_code" id="ifsc_code" placeholder="Enter IFSC Code" className="block shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full" />
                                <ErrorMessage className='errorMessage' component="div" name='ifsc_code' />
                            </div>
                            <div className='w-full rounded-lg  block mb-2.5'>
                                <label htmlFor="account_type" className='text-sm mb-1 block'>Account Type</label>
                                <Field as="select" type="text" name="account_type" id="account_type" placeholder="Enter account type" className="block shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full">
                                    <option>Select bank account</option>
                                    {
                                        Object.values(BankAccountType).map((each) => {
                                            return <option key={each} value={each}>{each}</option>
                                        })
                                    }
                                </Field>
                                <ErrorMessage className='errorMessage' component="div" name='account_type' />
                            </div>
                            <button type="submit" className="mt-3 col-span-2 w-full bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300">
                                Save
                            </button>
                        </Form>
                    </Formik>
                </div></>
        </LoadingComponent>
    )
}

export default AddBankAccount