/* eslint-disable react/no-unescaped-entities */
"use client"
import SimpleHeader from '@/_component/Header/SimpleHeader'
import React, { useState } from 'react'
import { bannerSlider, loginSteps } from '../AuthData/Data'
import SliderComponent from '@/_component/Util/SliderComponent'
import AuthSideCanvas from '@/_component/Auth/Common/AuthSideCanvas'
import SignInPhoneNumber from '@/_component/Auth/Steps/SignIn/SignInPhoneNumber'
import GoogleProviderButton from '@/_component/Auth/Common/ProvideLoginButton/GoogleProviderButton'
import FacebookProviderButton from '@/_component/Auth/Common/ProvideLoginButton/FacebookProviderButton'
import BlackedRouter from '@/_component/LoginComponent/BlackedRouter'

function SignIn() {

  let [loginStepIndex, setLoginStepIndex] = useState(0)

  const LoginStepComponent = loginSteps[loginStepIndex];




  return (
    <BlackedRouter>
      <div className='h-screen  '>
        <SimpleHeader />

        <div className="container mx-auto h-full ">
          <div className="grid grid-cols-2 items-stretch h-full">
            <div className='flex  flex-col justify-center'>
              <div className="container">
                <LoginStepComponent state={setLoginStepIndex}></LoginStepComponent>
                <div className="mt-5 max-w-sm ">
                  <div className="mb-2">
                    <GoogleProviderButton></GoogleProviderButton>
                  </div>
                  <FacebookProviderButton></FacebookProviderButton>
                </div>
              </div>
            </div>
            <div className="canvasLogin relative">

              <div className='canvasLoginArea flex items-center h-full bg-cover bg-no-repeat absolute right-0 top-0 w-full -z-10' style={{ right: "-80px", backgroundImage: `url('${process.env.PUBLIC_IMAGE_URL}/promotion/check_promo.png')` }}>
                <AuthSideCanvas bannerTitle={bannerSlider[0].title}></AuthSideCanvas>

              </div>
            </div>
          </div>
        </div>
      </div>
    </BlackedRouter>
  )
}

export default SignIn