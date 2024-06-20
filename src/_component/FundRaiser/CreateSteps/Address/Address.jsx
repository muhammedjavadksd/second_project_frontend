import React, { useContext, useEffect, useState } from 'react'
// import CreateFormBackground from '../CreateFormBackground'
// CreateFormBackground
// import FormInputWithBg from '../FormInputWithBg'
import CreateFormBackground from '../../CreateFormBackground'
import FormInputWithBg from '../../FormInputWithBg'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { addressInitialValues, addressValidationSchema } from './Data'
import { onAddressSubmit } from './Logic'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { STATE_WITH_DIST } from '@/app/_util/_const/const'
import { OnGoingApplicationContext } from '@/app/_util/context/Context'
import LoadingComponent from '@/_component/Util/LoadingComponent'
import { useSelector } from 'react-redux'

function Address({ state }) {

  let [isLoading, setLoding] = useState(false)
  let router = useRouter()
  let [district, setDistrict] = useState([])
  let { currentApplication, setApplication } = useContext(OnGoingApplicationContext)
  let [addressDataInitialValues, setInitialValues] = useState(addressInitialValues)
  let selectData = useSelector((store) => store.fund_raiser);


  useEffect(() => {
    if (selectData.city) {
      setInitialValues({
        city: selectData.city,
        pinCode: selectData.pinCode,
        state: selectData.state,
        district: selectData.district,
        fullAddress: selectData.fullAddress,
      })
    }
  }, [])

  function onSuccess() {
    state((prev) => prev + 1)
  }

  function onError(err) {
    toast.error(err)
  }

  function ifNotLogged() {
    router.replace("/auth/sign_in")
  }

  return (
    <LoadingComponent closeOnClick={false} isLoading={isLoading} paddingNeed={false} >
      <CreateFormBackground>
        <Formik
          enableReinitialize
          initialValues={addressDataInitialValues}
          validationSchema={addressValidationSchema}
          onSubmit={(e) => {
            e.currentApplication = currentApplication
            onAddressSubmit(e, onSuccess, onError, ifNotLogged)
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              {/* current app {currentApplication} */}
              <div className="mb-5">
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

              <div className="mb-5">
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

              <div className="mb-5">
                <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select state :</label>
                <Field
                  onChange={(e) => {
                    let newValues = STATE_WITH_DIST[e.target.value];
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
                    Object.keys(STATE_WITH_DIST).map((item) => {
                      return <option value={item}>{item}</option>
                    })
                  }
                </Field>
                <ErrorMessage name="state" component="div" className="errorMessage" />
              </div>

              <div className="mb-5">
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
                      return <option value={item}>{item}</option>
                    })
                  }
                </Field>
                <ErrorMessage name="district" component="div" className="errorMessage" />
              </div>

              <div className="mb-5">
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

              <div className='ml-auto w-full overflow-hidden gap-3 flex justify-end'>
                <button
                  type="button"
                  className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => state((prev) => prev - 1)}
                >
                  <i className="fa-solid fa-chevron-left"></i> Prev
                </button>
                <button
                  type="submit"
                  className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Next <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </Form>
          )}
        </Formik>

      </CreateFormBackground>
    </LoadingComponent>
  )
}

export default Address