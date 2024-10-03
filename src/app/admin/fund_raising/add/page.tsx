'use client'
import React, { useRef, useState } from 'react'
import AdminLayout from '@/component/Admin/AdminLayout'
import AdminPrivateRouter from '@/component/LoginComponent/AdminPrivateRouter'
import AdminBreadCrumb from '@/component/Util/AdminBreadCrumb'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import const_data from '@/util/data/const'
import { toast } from 'react-toastify'
import { getMainCategory, getSubCategory } from '@/util/data/helper/utilHelper'
import { adminAddFundRaiserInitialValues } from '@/util/external/yup/initialValues'
import { adminAddFundRaiser } from '@/util/data/helper/APIHelper'
import { useRouter } from 'next/navigation'
import { adminAddFundRaiseValidation } from '@/util/external/yup/yupValidations'
import getAIDescription from '@/component/FundRaiser/CreateSteps/AIDescription/Logic'
import LoadingComponent from '@/component/Util/LoadingComponent'

function AdminFundRaiseAdd(): React.ReactElement {

    let router = useRouter();
    let [subCategory, setSubCategory] = useState([])
    const [district, setDistrict] = useState([])
    const [isLoading, setLoading] = useState(false)


    const reGenerateAIDescription = (val) => {
        try {
            console.log(val);
            const data = getAIDescription(val?.amount, val.category, val.sub_category, val.raiser_name, val.raiser_age, val.benificiary_relation, val.description, val.city, val.pinCode, val.state, val.district)
            return data
        } catch (e) {
            return null
        }
    }



    return (
        <AdminPrivateRouter>
            <AdminLayout onSearch={() => { }}>

                <AdminBreadCrumb title={"Add Fund Raiser"} root={{ title: "Dashboard", href: "/" }} paths={[{ title: "Fund Raiser's", href: "/fund_raising" }, { title: "Add", href: "/admin/fund_raising/add" }]} />
                <div className='mt-5'>
                    <div className="gap-10">
                        <Formik
                            onSubmit={(val, { resetForm }) => {
                                adminAddFundRaiser(val).then((data) => {
                                    if (data) {
                                        router.push(`detail_view/${data}`)
                                    } else {
                                        toast.error("Something went wrong")
                                    }
                                }).catch((err) => { })
                            }}
                            validationSchema={adminAddFundRaiseValidation}
                            initialValues={adminAddFundRaiserInitialValues}
                        >
                            {({ errors, values, setFieldValue, setFieldTouched, handleSubmit, isValid, dirty }) => {

                                const canProceed = Object.keys(errors).length == 1 && !!errors['description']
                                const canRegenerate = Object.keys(errors).length == 0

                                return <Form>
                                    <div className="grid  gap-x-10 gap-y-5 grid-cols-2 mb-1">

                                        <div>
                                            <label htmlFor="raiser_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Raiser Full Name</label>
                                            <Field type="text" id="raiser_name" name="raiser_name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter raiser full name" />
                                            <ErrorMessage className='errorMessage' component={"div"} name='raiser_name'></ErrorMessage>
                                        </div>

                                        <div>
                                            <label htmlFor="raiser_age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Raiser Age</label>
                                            <Field type="number" id="raiser_age" name="raiser_age" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter raiser age" />
                                            <ErrorMessage className='errorMessage' component={"div"} name='raiser_age'></ErrorMessage>
                                        </div>

                                        <div>
                                            <label htmlFor="deadline" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deadline of fund raise</label>
                                            <Field type="date" id="deadline" name="deadline" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Select the deadline date" />
                                            <ErrorMessage className='errorMessage' component={"div"} name='deadline'></ErrorMessage>
                                        </div>

                                        <div>
                                            <label htmlFor="benificiary_relation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">What is your relationship to the beneficiary :</label>
                                            <Field as="select" id="benificiary_relation" name='benificiary_relation' className="mb-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option selected value={""}>Choose a relation</option>
                                                {
                                                    const_data.RELATIONSHIP.map((each) => {
                                                        return (
                                                            <option key={each} value={each}>{each}</option>
                                                        )
                                                    })
                                                }
                                            </Field>
                                            <ErrorMessage className='errorMessage' component={"div"} name='benificiary_relation'></ErrorMessage>
                                        </div>



                                        <div>
                                            <label htmlFor="amount" className='text-sm  mb-2 block'>Enter amount</label>
                                            <Field type="number" name="amount" id="amount" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter amount for the fund raise" />
                                            <ErrorMessage className='errorMessage' component={"div"} name='amount'></ErrorMessage>
                                        </div>


                                        <div>
                                            <label htmlFor="category" className="block mb-0 text-sm font-medium text-gray-900 dark:text-white">Category :</label>
                                            <Field onChange={(e) => {
                                                setFieldValue('category', e.target.value)
                                                setSubCategory(getSubCategory(e.target.value))
                                            }} as="select" id="category" name="category" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" >
                                                <option value="">Select Category</option>
                                                {
                                                    getMainCategory().map((item) => {
                                                        return (
                                                            <option key={item} value={item}>{item}</option>
                                                        )
                                                    })
                                                }
                                            </Field>
                                            <ErrorMessage component={"div"} className='errorMessage' name="category"></ErrorMessage>
                                        </div>

                                        <div>
                                            <label htmlFor="sub_category" className="block mb-0 text-sm font-medium text-gray-900 dark:text-white">The raised fund will help :</label>
                                            <Field as="select" id="sub_category" name="sub_category" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" >
                                                <option value="">Select Sub Category</option>
                                                {
                                                    subCategory.map((item) => {
                                                        return (
                                                            <option key={item} value={item}>{item}</option>
                                                        )
                                                    })
                                                }
                                            </Field >
                                            <ErrorMessage component={"div"} className='errorMessage' name="sub_category"></ErrorMessage>
                                        </div >



                                        <div>
                                            <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Enter phone number</label >
                                            <Field type="number" name="phone_number" id="phone_number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter phone number" />
                                            <ErrorMessage component={"div"} className='errorMessage' name="phone_number"></ErrorMessage>
                                        </div >

                                        <div>
                                            <label htmlFor="email_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Enter Email ID</label >
                                            <Field type="email_id" name="email_id" id="email_id" placeHolder="Enter email address" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                                            <ErrorMessage component={"div"} className='errorMessage' name="email_id"></ErrorMessage>
                                        </div >

                                        <div>
                                            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                                            <Field
                                                type="text"
                                                id="city"
                                                name="city"
                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                placeholder="Enter city"
                                            />
                                            <ErrorMessage name="city" component="div" className="errorMessage" />
                                        </div>

                                        <div>
                                            <label htmlFor="pinCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pin code</label>
                                            <Field
                                                type="text"
                                                id="pinCode"
                                                name="pinCode"
                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                placeholder="Enter pin code"
                                            />
                                            <ErrorMessage name="pinCode" component="div" className="errorMessage" />
                                        </div>

                                        <div>
                                            <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select state :</label>
                                            <Field
                                                onChange={(e) => {
                                                    const newValues = const_data.STATE_WITH_DISTRICT[e.target.value];
                                                    setFieldValue("state", e.target.value)
                                                    // console.log(newValues);
                                                    if (newValues) {
                                                        setDistrict(newValues)
                                                    }
                                                }}
                                                as="select"
                                                id="state"
                                                name="state"
                                                className="mb-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                                <option value="" label="Choose a state" />
                                                {
                                                    Object.keys(const_data.STATE_WITH_DISTRICT).map((item) => {
                                                        return <option key={item} value={item}>{item}</option>
                                                    })
                                                }
                                            </Field>
                                            <ErrorMessage name="state" component="div" className="errorMessage" />
                                        </div>

                                        <div>
                                            <label htmlFor="district" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select district :</label>
                                            <Field
                                                as="select"
                                                id="district"
                                                name="district"
                                                className="mb-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                                <option value="" label="Choose a district" />
                                                {
                                                    district.map((item) => {
                                                        return <option key={item} value={item}>{item}</option>
                                                    })
                                                }
                                            </Field>
                                            <ErrorMessage name="district" component="div" className="errorMessage" />
                                        </div>
                                    </div>

                                    <div className="grid mt-3 gap-x-10 gap-y-5 grid-cols-2 mb-1">
                                        <div>
                                            <label htmlFor="fullAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter full address</label>
                                            <Field
                                                as="textarea"
                                                id="fullAddress"
                                                name="fullAddress"
                                                rows="4"
                                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Write your address here..."
                                            />
                                            <ErrorMessage name="fullAddress" component="div" className="errorMessage" />
                                        </div>

                                        <div>
                                            <label htmlFor="about" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">About the fund raiser </label>
                                            <Field rows={4} as="textarea" name="about" id="about" className="mb-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            <ErrorMessage className='errorMessage' component={"div"} name='about'></ErrorMessage>
                                        </div>


                                    </div>





                                    {
                                        (canProceed && dirty || values['description']) && <div className='mt-5'>
                                            <div className='flex justify-between'>
                                                <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Provide a detailed description of the cause you are fundraising for. </label>
                                                <button type="button" disabled={isLoading} onClick={() =>

                                                    (canProceed || canRegenerate) && (
                                                        setLoading(true),
                                                        reGenerateAIDescription(values).then((data) => setFieldValue("description", data)).finally(() => {
                                                            setLoading(false)
                                                        })
                                                    )
                                                } className={`${!(canProceed || canRegenerate) && "cursor-not-allowed"} bg-blue-500 ml-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full`}>
                                                    Re-generate FROM AI
                                                </button>
                                            </div>
                                            <LoadingComponent closeOnClick={false} isLoading={isLoading} paddingNeed={false} >
                                                <Field rows={4} as="textarea" name="description" id="description" className="mb-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            </LoadingComponent>
                                            <ErrorMessage className='errorMessage' component={"div"} name='description'></ErrorMessage>
                                        </div>
                                    }

                                    <div className='mt-5 ml-auto flex gap-3 justify-end w-full overflow-hidden'>
                                        <button type="submit" disabled={!(!!values['description'])} className={`${(!(!!values['description'])) && "cursor-not-allowed"} float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>Next <i className="fa-solid fa-chevron-right"></i></button>
                                    </div >
                                </Form>
                            }}
                        </Formik>
                    </div>
                </div>

            </AdminLayout>
        </AdminPrivateRouter >
    )
}

export default AdminFundRaiseAdd
