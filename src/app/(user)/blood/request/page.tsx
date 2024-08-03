"use client"
import Header from '@/component/Header/Header'
import Footer from '@/component/Util/Footer'
import React, { FunctionComponent, useState } from 'react'
import OnGoingingFundRaise from '@/util/context/onGoingingFundRaise'
import BannerForCreating from '@/component/FundRaiser/BannerForCreating'
import { requestBanner } from './Data'


// Patient name
// Unit need
// Date of need
//Blood group
//relation
//Hospital name, hospital id
//Address
//Phone number


function CreateFundRaisingPost(): React.ReactElement {

    let [step, setStep] = useState<number>(0)
    let StepForm: FunctionComponent<FundRaiseCreationStep> = CreateFormComponent(createFormIndex);


    return (
        <OnGoingingFundRaise>
            <div>
                <Header />
                <div className='container mx-auto'>
                    <div className='grid grid-cols-2 mt-5 flex items-center'>
                        <div>
                            <BannerForCreating circle_image_design={true} image={requestBanner[step].image} title={requestBanner[step].title} subTitle={requestBanner[step].sub_title} />
                        </div>
                        <div className='w-full'>
                            {/* <StepForm state={step} /> */}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </OnGoingingFundRaise>
    )
}

export default CreateFundRaisingPost