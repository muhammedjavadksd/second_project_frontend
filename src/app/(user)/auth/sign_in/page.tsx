"use client"
import SimpleHeader from '@/component/Header/SimpleHeader'
import React, { useState, FunctionComponent, useContext } from 'react'
import AuthSideCanvas from '@/component/Auth/Common/AuthSideCanvas'
import UserBlackedRouter from '@/component/LoginComponent/UserBlackedRouter'
import { UserAuthStepInterFace } from '@/util/types/InterFace/PropInterFace'
import { bannerSlider, loginSteps } from '@/util/data/stepsForm'

function SignIn(): React.ReactElement {

  let [loginStepIndex, setLoginStepIndex] = useState<number>(0)

  const LoginStepComponent: FunctionComponent<UserAuthStepInterFace> = loginSteps[loginStepIndex];



  return (
    <UserBlackedRouter>
      <div className='h-screen  '>
        <SimpleHeader />

        <div className="container mx-auto h-full ">
          <div className="grid grid-cols-2 items-stretch h-full">
            <div className='flex  flex-col justify-center'>
              <div className="container">
                <LoginStepComponent state={setLoginStepIndex}></LoginStepComponent>
                <div className="mt-5 ">
                </div>
              </div>
            </div>
            <div className="canvasLogin relative">

              <div className='canvasLoginArea flex items-center h-full bg-cover bg-no-repeat absolute right-0 top-0 w-full -z-10' style={{ right: "-80px", backgroundImage: `url('${process.env.NEXT_PUBLIC_PUBLIC_IMAGE_URL}/promotion/check_promo.png')` }}>
                <AuthSideCanvas bannerTitle={bannerSlider[0].title}></AuthSideCanvas>

              </div>
            </div>
          </div>
        </div>
      </div>
    </UserBlackedRouter>
  )
}

export default SignIn