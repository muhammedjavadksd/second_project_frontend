import React, { useContext, useEffect, useState } from 'react'
import CreateFormBackground from '../../CreateFormBackground'
import FormInputWithBg from '../../FormInputWithBg'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { onInitialCreate } from './Logic'
import { createInitialValidation, initialValuesForCreate } from './Data'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { OnGoingApplicationContext } from '@/util/context/Context'
import LoadingComponent from '@/component/Util/LoadingComponent'
import { useDispatch, useSelector } from 'react-redux'
import { getMainCategory, getSubCategory } from '@/util/data/helper/utilHelper'
import { setDocsPresignedUrl, setPicturesPresignedUrl, updateFundRaiseData } from '@/util/external/redux/slicer/fundRaiserForm'
import { IReduxStore } from '@/util/types/InterFace/UtilInterface'

function Basic({ state }) {

  const [createInitialValue, setInitialValues] = useState(initialValuesForCreate)
  const dispatch = useDispatch();

  const navigation = useRouter();
  const [isLoading, setLoading] = useState(false)
  const { currentApplication, setApplication } = useContext(OnGoingApplicationContext)
  const currentApplicationData = useSelector((state: IReduxStore) => state.fund_raiser);
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    if (currentApplicationData.amount) {
      setInitialValues({
        amount: currentApplicationData.amount,
        category: currentApplicationData.category,
        sub_category: currentApplicationData.sub_category,
        phone_number: currentApplicationData.phone_number,
        email_id: currentApplicationData.email_id,
      })
      setSubCategory(getSubCategory(currentApplicationData.category))
    }
  }, [])

  function onSuccess(fund_raiser_id) {
    if (fund_raiser_id) {
      console.log("The fund is :" + fund_raiser_id);
      setApplication(fund_raiser_id)
      console.log(state);
      state((prev) => prev + 1)

    }
    setLoading(false)
  }

  function onError(err) {
    if (err.statusCode == 401) {
      return navigation.replace("/auth/sign_in")
    }
    toast.error(err?.msg ?? "Something went wrong")
    setLoading(false)
  }

  //amount

  return (
    <LoadingComponent paddingNeed={false} isLoading={isLoading} closeOnClick={false}>
      <CreateFormBackground>
        <Formik enableReinitialize onSubmit={(val) => {
          setLoading(true)
          onInitialCreate(val, onSuccess, onError)
        }} initialValues={createInitialValue} validationSchema={createInitialValidation}>
          {({ setFieldValue }) => (
            <Form>
              <div className="mb-5">
                <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">How much amount do you want to raise?</label>
                <Field type="number" name="amount" id="amount" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter the amount" />
                <ErrorMessage component={"div"} className='errorMessage' name="amount"></ErrorMessage>
              </div>
              <FormInputWithBg>
                <label htmlFor="category" className="block mb-0 text-sm font-medium text-gray-900 dark:text-white">I am raising funds for :</label>
                <Field onChange={(e) => {
                  setFieldValue('category', e.target.value)
                  setSubCategory(getSubCategory(e.target.value))
                }} as="select" id="category" name="category" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" >
                  <option value="">Select Category</option>
                  {
                    getMainCategory().map((item) => {
                      return (
                        <option value={item}>{item}</option>
                      )
                    })
                  }
                </Field>
                <ErrorMessage component={"div"} className='errorMessage' name="category"></ErrorMessage>

              </FormInputWithBg>
              <FormInputWithBg>
                <label htmlFor="sub_category" className="block mb-0 text-sm font-medium text-gray-900 dark:text-white">The raised fund will help :</label>
                <Field as="select" id="sub_category" name="sub_category" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" >
                  <option value="">Select Sub Category</option>
                  {
                    subCategory.map((item) => {
                      return (
                        <option value={item}>{item}</option>
                      )
                    })
                  }
                </Field >
                <ErrorMessage component={"div"} className='errorMessage' name="sub_category"></ErrorMessage>
              </FormInputWithBg >



              <div className="mb-5" >
                <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Enter phone number</label >
                <Field type="number" name="phone_number" id="phone_number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required placeholder="Enter phone number" />
                <ErrorMessage component={"div"} className='errorMessage' name="phone_number"></ErrorMessage>
              </div >

              <div className="mb-5" >
                <label htmlFor="email_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Enter Email ID</label >
                <Field type="email_id" name="email_id" id="email_id" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                <ErrorMessage component={"div"} className='errorMessage' name="email_id"></ErrorMessage>
              </div >

              <div className="flex items-start mb-5" >
                <div className="flex items-center h-5" >

                  <input
                    id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                </div >
                <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" > I agree with the < a href="#" className="text-blue-600 hover:underline dark:text-blue-500" > terms and conditions</a ></label >
              </div >
              <div className='ml-auto flex gap-3 justify-end w-full overflow-hidden'>
                <button type="submit" className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next <i className="fa-solid fa-chevron-right"></i></button >
              </div >
            </Form >
          )
          }
        </Formik >

      </CreateFormBackground >
    </LoadingComponent >
  )
}

export default Basic