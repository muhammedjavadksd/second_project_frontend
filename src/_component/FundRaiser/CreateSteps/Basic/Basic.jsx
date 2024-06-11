import React, { useContext, useState } from 'react'
import CreateFormBackground from '../../CreateFormBackground'
import FormInputWithBg from '../../FormInputWithBg'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { FUND_RAISER_FOR } from '@/app/_util/_const/const'
import { onInitialCreate } from './Logic'
import { createInitialValidation, createInitialValue } from './Data'
import { getMainCategory, getSubCategory } from '@/app/_util/_const/helperFunctions'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { OnGoingApplicationContext } from '@/app/_util/context/Context'
// import { OnGoingApplicationContext } from '@/app/_util/context/onGoingingFundRaise'

function Basic({ state }) {

  let navigation = useRouter();
  let { currentApplication, setApplication } = useContext(OnGoingApplicationContext)

  function onSuccess(fund_raiser_id) {

    if (fund_raiser_id) {
      // console.log("The fund is :" + fund_raiser_id);
      setApplication(fund_raiser_id)
      state((prev) => prev + 1)
    }
  }

  function onError(err) {
    if (err.statusCode == 401) {
      // return navigation.replace("/auth/sign_in")
    }
    toast.error(err ?? "Something went wrong")
  }

  let [subCategory, setSubCategory] = useState([]);
  //amount

  return (
    <CreateFormBackground>
      <Formik enableReinitialize onSubmit={(val) => onInitialCreate(val, onSuccess, onError)} initialValues={createInitialValue} validationSchema={createInitialValidation}>
        {({ setFieldValue }) => (
          <Form>
            <div class="mb-5">
              <label for="amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">How much amount do you want to raise?</label>
              <Field type="number" name="amount" id="amount" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter the amount" />
              <ErrorMessage component={"div"} className='errorMessage' name="amount"></ErrorMessage>
            </div>
            <FormInputWithBg>
              <label for="category" class="block mb-0 text-sm font-medium text-gray-900 dark:text-white">I am raising funds for :</label>
              <Field onChange={(e) => {
                setFieldValue('category', e.target.value)
                setSubCategory(getSubCategory(e.target.value))
              }} as="select" id="category" name="category" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" >
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
              <label for="sub_category" class="block mb-0 text-sm font-medium text-gray-900 dark:text-white">The raised fund will help :</label>
              <Field as="select" id="sub_category" name="sub_category" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" >
                <option value="">Select Sub Category</option>
                {
                  subCategory.map((item) => {
                    return (
                      <option value={item}>{item}</option>
                    )
                  })
                }
              </Field>
              <ErrorMessage component={"div"} className='errorMessage' name="sub_category"></ErrorMessage>
            </FormInputWithBg>



            <div class="mb-5">
              <label for="phone_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter phone number</label>
              <Field type="number" name="phone_number" id="phone_number" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required placeholder="Enter phone number" />
              <ErrorMessage component={"div"} className='errorMessage' name="phone_number"></ErrorMessage>
            </div>

            <div class="mb-5">
              <label for="email_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Email ID</label>
              <Field type="email_id" name="email_id" id="email_id" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
              <ErrorMessage component={"div"} className='errorMessage' name="email_id"></ErrorMessage>
            </div>

            <div class="flex items-start mb-5">
              <div class="flex items-center h-5">
                <input id="terms" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
              </div>
              <label for="terms" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
            </div>
            <div className='ml-auto flex gap-3 justify-end w-full overflow-hidden'>
              <button type="submit" class="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next <i class="fa-solid fa-chevron-right"></i></button>
            </div>
          </Form>
        )}
      </Formik>

    </CreateFormBackground>
  )
}

export default Basic