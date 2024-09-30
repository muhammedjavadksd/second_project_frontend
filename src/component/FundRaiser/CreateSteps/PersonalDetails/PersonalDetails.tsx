import React, { useContext, useEffect, useState } from 'react'
import CreateFormBackground from '../../CreateFormBackground'
import FormInputWithBg from '../../FormInputWithBg'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import const_data from '@/util/data/const'
import { personalDetailsInitialValues, personalDetailsValidation } from './Data'
import { onPersonalDetailsSubmit } from './Logic'
import { OnGoingApplicationContext } from '@/util/context/Context'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { updateFundRaiseData } from '@/util/external/redux/slicer/fundRaiserForm'
import LoadingComponent from '@/component/Util/LoadingComponent'
import { IStore } from '@/util/types/InterFace/UtilInterface'
// import OnGoingApplicationContext from '@/util/context/onGoingingFundRaise'

function PersonalDetails({ state }) {

  let { currentApplication, setApplication } = useContext(OnGoingApplicationContext)
  let [personalDataInitialSet, setPersonalData] = useState(personalDetailsInitialValues)
  let [isLoading, setLoading] = useState(false);
  let router = useRouter();
  let dispatcher = useDispatch();
  let selectData = useSelector((store: IStore) => store.fund_raiser);

  useEffect(() => {
    console.log(personalDataInitialSet);
    if (selectData.raiser_name) {
      setPersonalData({
        raiser_name: selectData.raiser_name,
        raiser_age: selectData.raiser_age,
        benificiary_relation: selectData.benificiary_relation,
        description: selectData.description,
        currentApplication: currentApplication,
        deadline: selectData.deadline
      })
    }
  }, [])

  useEffect(() => {
    console.log(selectData);
  }, [selectData])

  console.log(currentApplication);

  function onSuccess(values) {
    state((prev) => prev + 1)
    setLoading(false)
  }

  function onError(err) {
    toast.error(err)
    setLoading(false)
  }

  function onNotLogged() {
    // router.push("/auth/sign_in")
  }


  return (
    <LoadingComponent closeOnClick={false} paddingNeed={false} isLoading={isLoading}>
      <CreateFormBackground>

        <Formik enableReinitialize initialValues={personalDataInitialSet} validationSchema={personalDetailsValidation} onSubmit={
          (val) => {
            setLoading(true)
            val.currentApplication = currentApplication
            onPersonalDetailsSubmit(val, onSuccess, onError, onNotLogged)
          }
        }>
          <Form>
            <div className="mb-5">
              <label htmlFor="raiser_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Raiser Full Name</label>
              <Field type="text" id="raiser_name" name="raiser_name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter raiser full name" />
              <ErrorMessage className='errorMessage' component={"div"} name='raiser_name'></ErrorMessage>
            </div>
            <div className="mb-5">
              <label htmlFor="raiser_age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Raiser Age</label>
              <Field type="number" id="raiser_age" name="raiser_age" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter raiser age" />
              <ErrorMessage className='errorMessage' component={"div"} name='raiser_age'></ErrorMessage>
            </div>
            <div className="mb-5">
              <label htmlFor="raiser_age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deadline of fund raise</label>
              <Field type="date" id="deadline" name="deadline" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Select the deadline date" />
              <ErrorMessage className='errorMessage' component={"div"} name='deadline'></ErrorMessage>
            </div>
            <FormInputWithBg>
              <label htmlFor="benificiary_relation" className="block mb-0 text-sm font-medium text-gray-900 dark:text-white">What is your relationship to the beneficiary :</label>
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
            </FormInputWithBg>

            <div className='mb-5'>
              <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Provide a detailed description of the cause you are fundraising for. </label>
              <Field rows={5} as="textarea" name="description" id="description" className="mb-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              <ErrorMessage className='errorMessage' component={"div"} name='description'></ErrorMessage>
            </div>


            <div className='ml-auto  w-full overflow-hidden gap-3 flex justify-end'>
              <button type="button" className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => state((prev) => prev - 1)}><i className="fa-solid fa-chevron-left"></i> Prev </button>
              <button type="submit" className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Next <i className="fa-solid fa-chevron-right"></i></button>
            </div>

          </Form>
        </Formik>

      </CreateFormBackground>
    </LoadingComponent>
  )
}

export default PersonalDetails