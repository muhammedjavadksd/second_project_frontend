"use client"
import AuthSideCanvas from '@/_component/Auth/Common/AuthSideCanvas'
import FacebookProviderButton from '@/_component/Auth/Common/ProvideLoginButton/FacebookProviderButton'
import GoogleProviderButton from '@/_component/Auth/Common/ProvideLoginButton/GoogleProviderButton'
import SimpleHeader from '@/_component/Header/SimpleHeader'
import React, { FunctionComponent, useState } from 'react'
import { bannerSlider, signUpSteps } from '../AuthData/Data'
import UserBlackedRouter from '@/_component/LoginComponent/UserBlackedRouter'
import { useSession } from 'next-auth/react'
import { UserAuthStepInterFace } from '@/types/InterFace/PropInterFace'

function SignUp(): React.ReactElement {

  let session = useSession()
  let [signUpStepIndex, setSignUpStepIndex] = useState<number>(0)
  const SignUpComponentSteps: FunctionComponent<UserAuthStepInterFace> = signUpSteps[signUpStepIndex];

  return (
    <UserBlackedRouter session={session}>
      <div className='h-screen  '>
        <SimpleHeader />

        <div className="container mx-auto h-full ">
          <div className="grid grid-cols-2 items-stretch h-full">
            <div className='flex  flex-col justify-center'>
              <div className="container">
                <SignUpComponentSteps state={setSignUpStepIndex}></SignUpComponentSteps>
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

export default SignUp