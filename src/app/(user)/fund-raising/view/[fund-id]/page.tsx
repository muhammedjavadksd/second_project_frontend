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
          <div style={{ backgroundColor: "#fff2e5" }} className='flex gap-5 text-base rounded-lg p-2 pl-10 pe-10 text-center text-red-900'>
            <svg _ngcontent-my-app-c207="" xmlns="http://www.w3.org/2000/svg" width="20" height="20" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 297 297" className="ng-tns-c207-0"><g _ngcontent-my-app-c207="" className="ng-tns-c207-0"><path _ngcontent-my-app-c207="" d="M259.352,219.903H37.647c-5.485,0-9.933,4.447-9.933,9.933v41.586c0,5.486,4.447,9.934,9.933,9.934h221.705 c5.485,0,9.933-4.447,9.933-9.934v-41.586C269.285,224.351,264.838,219.903,259.352,219.903z" fill="#c1272d" className="ng-tns-c207-0"></path><path _ngcontent-my-app-c207="" d="M47.58,164.191c0-5.485-4.447-9.934-9.934-9.934H9.934c-5.486,0-9.934,4.448-9.934,9.934c0,5.485,4.447,9.933,9.934,9.933 h27.713C43.133,174.124,47.58,169.677,47.58,164.191z" fill="#c1272d" className="ng-tns-c207-0"></path><path _ngcontent-my-app-c207="" d="M58.335,88.046c1.938,1.94,4.481,2.91,7.023,2.91s5.084-0.97,7.023-2.909c3.88-3.878,3.88-10.168,0.001-14.047 L58.525,60.141c-3.876-3.879-10.166-3.879-14.047-0.001c-3.88,3.879-3.88,10.168-0.001,14.047L58.335,88.046z" fill="#c1272d" className="ng-tns-c207-0"></path><path _ngcontent-my-app-c207="" d="M231.641,90.956c2.542,0,5.085-0.97,7.023-2.91l13.857-13.859c3.879-3.879,3.879-10.168-0.001-14.047 c-3.879-3.88-10.169-3.879-14.047,0.001L224.616,74c-3.879,3.879-3.879,10.169,0.001,14.047 C226.557,89.986,229.098,90.956,231.641,90.956z" fill="#c1272d" className="ng-tns-c207-0"></path><path _ngcontent-my-app-c207="" d="M287.066,154.258h-27.714c-5.486,0-9.934,4.448-9.934,9.934c0,5.485,4.447,9.933,9.934,9.933h27.714 c5.486,0,9.934-4.447,9.934-9.933C297,158.706,292.553,154.258,287.066,154.258z" fill="#c1272d" className="ng-tns-c207-0"></path><path _ngcontent-my-app-c207="" d="M148.499,63.234c5.485,0,9.934-4.447,9.934-9.934V25.578c0-5.486-4.448-9.934-9.934-9.934 c-5.485,0-9.933,4.447-9.933,9.934v27.723C138.566,58.787,143.014,63.234,148.499,63.234z" fill="#c1272d" className="ng-tns-c207-0"></path><path _ngcontent-my-app-c207="" d="M241.573,164.191c0-51.336-41.753-93.102-93.073-93.102s-93.073,41.766-93.073,93.102v33.169c0,4.95,4.05,9,9,9h168.146 c4.95,0,9-4.05,9-9V164.191z" fill="#c1272d" className="ng-tns-c207-0"></path></g></svg>
            This fundraiser is in an urgent need of funds
          </div>
        </div>
        <div className='mb-8 block'>
          <h2 className='text-center  mt-5 text-4xl font-bold text-gray-700'>Help Save Little Rudra's Life From Leukaemia!</h2>
        </div>
        <div className='mt-5'>
          <div className='flex gap-10 mt-5'>
            <div className='w-3/4 mb-5'>
              <div className='bg-white shadow rounded-sm'>
                <img className='w-full' src='https://kettocdn.gumlet.io/media/campaign/918000/918777/image/66a305756fc51.jpg?w=768&dpr=2.0'></img>


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
                <button className='w-full font-medium text-white p-3 text-lg bg-blue-600 mt-3 rounded-lg'><i className="fa-brands fa-square-facebook"></i> Spred  via Facebook</button>
                <button className='w-full font-medium text-white p-3 text-lg bg-green-900 mt-3 rounded-lg'><i className="fa-brands fa-square-whatsapp"></i> Spred  via Whatsapp</button>
                <p className='mt-2'>Every Social media share can bring ₹5000</p>
              </div>
              <div className='mt-3'>
                <h4 className='text-3xl font-medium'>{const_data.MONEY_ICON}34,000 </h4>
                <p>Raised of {const_data.MONEY_ICON}20,000,0000</p>
              </div>
              <div className='raisingRange shadow h-3 mt-3 rounded-lg w-full bg-green-300'>
                <div style={{ width: "80%" }} className='rounded-lg bg-green-500 h-full'></div>
              </div>

              <div className='mt-5 flex justify-between w-full'>
                <span className="raised supporters ng-star-inserted  text-gray-500">
                  <span className='text-2xl font-bold text-black'>705</span> supporters
                </span>
                <span className="raised supporters ng-star-inserted text-gray-500">
                  <span className='text-2xl font-bold text-black'>18 </span>  Days Left
                </span>

              </div>
              <div className="flex flex-col mt-5 items-center p-4 bg-white shadow-lg rounded-lg">

                <div className="flex flex-col items-center mb-4">
                  <div className="flex items-center justify-start mb-2">
                    <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full">
                      <strong>MR</strong>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm text-gray-500">Campaigner</div>
                      <div className="text-lg font-semibold text-gray-800 capitalize">
                        Mahendar Reddy Bakangari
                      </div>
                      <div className="flex items-center mt-1 text-gray-600">
                        <span className="material-icons text-base">location_on</span>
                        <span className="ml-1">Hyderabad</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-px bg-gray-300 my-4"></div>

                  <div className="flex items-center justify-start mb-2">
                    <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full">
                      <strong>RS</strong>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm text-gray-500">Campaigner</div>
                      <div className="text-lg font-semibold text-gray-800 capitalize">
                        Mahendar Reddy Bakangari
                      </div>
                      <div className="flex items-center mt-1 text-gray-600">
                        <span className="material-icons text-base">location_on</span>
                        <span className="ml-1">Hyderabad</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="flex flex-col mt-5  bg-white shadow-lg rounded-lg">
                <div className="px-5 py-5">
                  <div className="text-1xl font-bold text-left">
                    705 Supporters
                  </div>
                </div>
                <div className="w-full h-px bg-gray-300 "></div>
                <div className="flex flex-col items-center">
                  <div className="flex p-3 items-center w-full justify-start mb-2">
                    <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full">
                      <strong>MR</strong>
                    </div>
                    <div className="ml-4">
                      <div className="text-lg font-semibold text-gray-800 capitalize">
                        Mahendar Reddy
                      </div>
                      <div className="flex items-center mt-1 text-gray-600">
                        <span className="material-icons text-base">{const_data.MONEY_ICON}10,000</span>
                        <span className="ml-1">Hyderabad</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-px bg-gray-300 "></div>


                </div>
                <div className="flex flex-col items-center">
                  <div className="flex p-3 items-center w-full justify-start mb-2">
                    <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full">
                      <strong>MR</strong>
                    </div>
                    <div className="ml-4">
                      <div className="text-lg font-semibold text-gray-800 capitalize">
                        Mahendar Reddy
                      </div>
                      <div className="flex items-center mt-1 text-gray-600">
                        <span className="material-icons text-base">{const_data.MONEY_ICON}10,000</span>
                        <span className="ml-1">Hyderabad</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div >
  )
}

export default ViewFundRaising