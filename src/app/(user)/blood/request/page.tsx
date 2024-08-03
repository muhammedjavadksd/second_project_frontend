"use client"
import Header from '@/component/Header/Header'
import Footer from '@/component/Util/Footer'
import React, { FunctionComponent, useState } from 'react'
import BannerForCreating from '@/component/FundRaiser/BannerForCreating'
import { requestBanner } from './Data'
import { CreateFormComponent } from './Logic'
import { FundRaiseCreationStep } from '@/util/types/InterFace/PropInterFace'
// import OnGoingBloodRequest from '@/util/context/OnGoingBloodRequest'
import { useSearchParams } from 'next/navigation'


// Patient name
// Unit need
// Date of need
//Blood group
//relation
//Hospital name, hospital id
//Address
//Phone number


function CreateFundRaisingPost(): React.ReactElement {

    const params = useSearchParams();
    const stepIndex = +params.get("step_index") ?? 0

    let [step, setStep] = useState<number>(stepIndex)
    let StepForm: FunctionComponent<FundRaiseCreationStep> = CreateFormComponent(step);



    return (
        <div>
            <Header />
            <div className='container mx-auto'>
                <div className='grid grid-cols-2 mt-5 flex items-center'>
                    <div>
                        <BannerForCreating circle_image_design={true} image={requestBanner[step].image} title={requestBanner[step].title} subTitle={requestBanner[step].sub_title} />
                    </div>
                    <div className='w-full'>
                        <StepForm state={setStep} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CreateFundRaisingPost