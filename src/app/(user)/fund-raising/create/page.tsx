"use client"
import BannerForCreating from '@/component/FundRaiser/BannerForCreating'
import Header from '@/component/Header/Header'
import Footer from '@/component/Util/Footer'
import React, { FunctionComponent, useEffect, useState } from 'react'
import OnGoingingFundRaise from '@/util/context/onGoingingFundRaise'
import { FundRaiseCreationStep } from '@/util/types/InterFace/PropInterFace'
import { CreateFundRaiseFormComponent, FundRaiserbannerData } from '@/util/data/stepsForm'


function CreateFundRaisingPost(): React.ReactElement {

  let [createFormIndex, setCreateFormIndex] = useState<number>(0)
  let StepForm: FunctionComponent<FundRaiseCreationStep> = CreateFundRaiseFormComponent(createFormIndex);



  return (
    <OnGoingingFundRaise>
      <div>
        <Header />
        <div className='container mx-auto'>
          <div className='grid grid-cols-2 mt-5 flex items-center'>
            <div>
              <BannerForCreating circle_image_design={false} image={FundRaiserbannerData[createFormIndex].image} title={FundRaiserbannerData[createFormIndex].title} subTitle={FundRaiserbannerData[createFormIndex].subTitle} />
            </div>
            <div className='w-full'>
              <StepForm state={setCreateFormIndex} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </OnGoingingFundRaise>


  )
}

export default CreateFundRaisingPost