"use client"
import Header from '@/component/Header/Header'
import Footer from '@/component/Util/Footer'
import TabItem from '@/component/Util/TabItem'
import const_data from '@/util/data/const'
import { FundRaiserTabItems } from '@/util/types/Enums/BasicEnums'
// import { FundRaiserTabItems } from '@/util/external/types/Enums/BasicEnums'
import React, { useState } from 'react'

function ViewFundRaising(): React.ReactElement {

  let [tabListing, setTabListing] = useState<FundRaiserTabItems>(FundRaiserTabItems.ABOUT)

  return (
    <div>
      <Header />
      <div className='container mx-auto'>
        <div className='flex justify-center mt-5'>
          <div className='bg-red-500 text-sm rounded-md p-2 pl-10 pe-10 text-center text-white'>
            This fundraiser is in an urgent need of funds
          </div>
        </div>
        <h2 className='text-center  mt-5 text-2xl'>Help Save Little Rudra's Life From Leukaemia!</h2>
        <div >
          <div className='flex gap-10 mt-5 flex items-center'>
            <div className='w-3/4 mb-5'>
              <div className='bg-white shadow rounded-sm'>
                <img className='w-full' src='https://kettocdn.gumlet.io/media/campaign/625000/625122/image/627fff291f29d.png?w=768&dpr=2.0'></img>


                <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                  <li className="me-2">
                    <button onClick={() => setTabListing(FundRaiserTabItems.ABOUT)} aria-current="page" className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500">About</button>
                  </li>
                  <li className="me-2">
                    <button onClick={() => setTabListing(FundRaiserTabItems.DOCUMENT)} className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Document</button>
                  </li>
                  <li className="me-2">
                    <button onClick={() => setTabListing(FundRaiserTabItems.UPDATE)} className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Update's</button>
                  </li>
                  <li className="me-2">
                    <button onClick={() => setTabListing(FundRaiserTabItems.COMMENT)} className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Comment's</button>
                  </li>
                </ul>

                <div className='tabWrapperGroup'>
                  <TabItem keyid={1} isShow={tabListing == FundRaiserTabItems.ABOUT}>
                    <>
                      <h4 className='text-center text-2xl font-medium mb-3'>About the Fundraiser</h4>

                      <div className='mb-5'>
                        <p >Six years ago, when Rudra was born, the celebrations were unending. Everybody showered their blessings on him.
                          Yet today, my little nephew is courageously fighting a terrifying battle for a six-year-old boy.</p>
                        <img className='w-full rounded-lg mt-5' src='https://kettocdn.gumlet.io/media/campaign/625000/625122/image/62ed23fbb170e.jpg?w=700&dpr=2.0'></img>
                      </div>
                      <div className='mb-5'>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                        <img className='w-full rounded-lg mt-5' src='https://kettocdn.gumlet.io/media/campaign/625000/625122/image/62ed240eb9e70.jpg?w=700&dpr=2.0'></img>
                      </div>
                      <div className='mb-5'>
                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                          The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
                        <img className='w-full rounded-lg mt-5' src='https://kettocdn.gumlet.io/media/campaign/625000/625122/image/62ed2409dadcf.jpg?w=700&dpr=2.0'></img>
                      </div>
                    </>
                  </TabItem>
                  <TabItem keyid={2} isShow={tabListing == FundRaiserTabItems.DOCUMENT}>
                    <h4>Document's</h4>
                  </TabItem>
                  <TabItem keyid={3} isShow={tabListing == FundRaiserTabItems.UPDATE}>
                    <h4>Updates</h4>
                  </TabItem>
                  <TabItem keyid={4} isShow={tabListing == FundRaiserTabItems.COMMENT}>
                    <h4>Comment's</h4>
                  </TabItem>
                </div>

              </div>
            </div>
            <div className='w-1/4'>
              <div className='flex flex-col'>
                <button className='w-full font-medium text-white p-3 text-lg bg-green-400 rounded-lg'>Donate Now</button>
                <button className='w-full font-medium text-white p-3 text-lg bg-blue-600 mt-3 rounded-lg'>Spred to The World</button>
              </div>
              <div className='mt-3'>
                <h4 className='text-3xl font-medium'>{const_data.MONEY_ICON}34,000 </h4>
                <p>Raised of {const_data.MONEY_ICON}20,000,0000</p>
              </div>
              <div className='raisingRange shadow h-3 rounded-lg w-full bg-slate-400'>
                <div style={{ width: "80%" }} className='rounded-lg bg-white h-full'></div>
              </div>

            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ViewFundRaising