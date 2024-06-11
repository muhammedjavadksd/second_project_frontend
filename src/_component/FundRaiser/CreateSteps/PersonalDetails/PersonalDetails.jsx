import React, { useContext } from 'react'
import CreateFormBackground from '../../CreateFormBackground'
import FormInputWithBg from '../../FormInputWithBg'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { FUND_RAISER_FOR } from '@/app/_util/_const/const'
import { personalDetailsInitialValues, personalDetailsValidation } from './Data'
import { onPersonalDetailsSubmit } from './Logic'
import { OnGoingApplicationContext } from '@/app/_util/context/Context'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
// import { OnGoingApplicationContext } from '@/app/_util/context/onGoingingFundRaise'

function PersonalDetails({ state }) {

  let { currentApplication, setApplication } = useContext(OnGoingApplicationContext)
  let router = useRouter();

  console.log(currentApplication);

  function onSuccess() {
    state((prev) => prev + 1)
  }

  function onError(err) {
    toast.error(err)
  }

  function onNotLogged() {
    router.push("/auth/sign_in")
  }


  return (
    <CreateFormBackground>
      {/* The  ddata {currentApplication} */}

      <Formik initialValues={personalDetailsInitialValues} validationSchema={personalDetailsValidation} onSubmit={
        (val) => {
          val.currentApplication = currentApplication
          onPersonalDetailsSubmit(val, onSuccess, onError, onNotLogged)
        }
      }>
        <Form>
          <div class="mb-5">
            <label for="raiser_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Raiser Full Name</label>
            <Field type="text" id="raiser_name" name="raiser_name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter raiser full name" />
            <ErrorMessage className='errorMessage' component={"div"} name='raiser_name'></ErrorMessage>
          </div>
          <div class="mb-5">
            <label for="raiser_age" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Raiser Age</label>
            <Field type="number" id="raiser_age" name="raiser_age" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter raiser age" />
            <ErrorMessage className='errorMessage' component={"div"} name='raiser_age'></ErrorMessage>
          </div>
          <FormInputWithBg>
            <label for="benificiary_relation" class="block mb-0 text-sm font-medium text-gray-900 dark:text-white">What is your relationship to the beneficiary :</label>
            <Field as="select" id="benificiary_relation" name='benificiary_relation' class="mb-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected value={""}>Choose a relation</option>
              {
                FUND_RAISER_FOR.map((each) => {
                  return (
                    <option value={each}>{each}</option>
                  )
                })
              }
            </Field>
            <ErrorMessage className='errorMessage' component={"div"} name='benificiary_relation'></ErrorMessage>
          </FormInputWithBg>

          <div className='mb-5'>
            <label for="description" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Provide a detailed description of the cause you are fundraising for. </label>
            <Field rows={5} as="textarea" name="description" id="description" class="mb-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            <ErrorMessage className='errorMessage' component={"div"} name='description'></ErrorMessage>
          </div>


          <div className='ml-auto  w-full overflow-hidden gap-3 flex justify-end'>
            <button type="button" class="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => state((prev) => prev - 1)}><i class="fa-solid fa-chevron-left"></i> Prev </button>
            <button type="submit" class="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Next <i class="fa-solid fa-chevron-right"></i></button>
          </div>

        </Form>
      </Formik>

    </CreateFormBackground>
  )
}

export default PersonalDetails