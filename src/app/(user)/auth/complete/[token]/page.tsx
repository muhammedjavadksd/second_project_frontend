"use client"
import AuthSideCanvas from '@/component/Auth/Common/AuthSideCanvas'
import FacebookProviderButton from '@/component/Auth/Common/ProvideLoginButton/FacebookProviderButton'
import GoogleProviderButton from '@/component/Auth/Common/ProvideLoginButton/GoogleProviderButton'
import SimpleHeader from '@/component/Header/SimpleHeader'
import React, { FunctionComponent, useContext, useState } from 'react'
import UserBlackedRouter from '@/component/LoginComponent/UserBlackedRouter'
import { useSession } from 'next-auth/react'
import { UserAuthStepInterFace } from '@/util/types/InterFace/PropInterFace'
import { useRouter } from 'next/navigation'
import { bannerSlider } from '../../AuthData/Data'
import AddPhoneNumber from '@/component/Auth/Steps/SignUp/AddPhoneNumber'
// import { OnGoingBloodRequestContext } from '@/util/context/Context'

function AccountComplelte(): React.ReactElement {


    return (
        <UserBlackedRouter>
            <div className='h-screen  '>
                <SimpleHeader />

                <div className="container mx-auto h-full ">
                    <div className="grid grid-cols-2 items-stretch h-full">
                        <div className='flex  flex-col justify-center'>
                            <div className="container">
                                <AddPhoneNumber />
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

export default AccountComplelte