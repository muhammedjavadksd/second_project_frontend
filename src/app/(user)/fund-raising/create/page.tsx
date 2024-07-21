"use client"
import BannerForCreating from '@/component/FundRaiser/BannerForCreating'
import Header from '@/component/Header/Header'
import Footer from '@/component/Util/Footer'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { CreateFormComponent } from './Logic'
import { bannerData } from './Data'
import OnGoingingFundRaise from '@/util/context/onGoingingFundRaise'
import { FundRaiseCreationStep } from '@/util/types/InterFace/PropInterFace'


function CreateFundRaisingPost(): React.ReactElement {

  let [createFormIndex, setCreateFormIndex] = useState<number>(0)
  let StepForm: FunctionComponent<FundRaiseCreationStep> = CreateFormComponent(createFormIndex);



  return (
    <OnGoingingFundRaise>
      <div>
        <Header />
        <div className='container mx-auto'>
          <div className='grid grid-cols-2 mt-5 flex items-center'>
            <div>
              <BannerForCreating image={bannerData[createFormIndex].image} title={bannerData[createFormIndex].title} subTitle={bannerData[createFormIndex].subTitle} />
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