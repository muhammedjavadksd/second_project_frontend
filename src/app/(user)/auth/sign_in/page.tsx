"use client"
import SimpleHeader from '@/_component/Header/SimpleHeader'
import React, { useState, FunctionComponent } from 'react'
import { bannerSlider, loginSteps } from '../AuthData/Data'
import AuthSideCanvas from '@/_component/Auth/Common/AuthSideCanvas'
import GoogleProviderButton from '@/_component/Auth/Common/ProvideLoginButton/GoogleProviderButton'
import FacebookProviderButton from '@/_component/Auth/Common/ProvideLoginButton/FacebookProviderButton'
import UserBlackedRouter from '@/_component/LoginComponent/UserBlackedRouter'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import { UserAuthStepInterFace } from '@/util/types/InterFace/PropInterFace'

function SignIn(): React.ReactElement {

  let [loginStepIndex, setLoginStepIndex] = useState<number>(0)
  // let session = useSession()

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
                <div className="mt-5 max-w-sm ">
                  <div className="mb-2">
                    <GoogleProviderButton></GoogleProviderButton>
                  </div>
                  <FacebookProviderButton></FacebookProviderButton>
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