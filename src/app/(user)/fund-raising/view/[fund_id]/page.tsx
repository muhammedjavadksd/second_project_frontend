"use client"
import FundRaiserAboutContent from '@/component/FundRaiser/AboutContent'
import BankAccountCard from '@/component/FundRaiser/BankAccountPublic'
import SuccessBanner from '@/component/FundRaiser/SuccessBanner'
import Header from '@/component/Header/Header'
import FundPaymentModel from '@/component/Payment/FundRaiserPaymentModel'
import FundRaiserCommentSection from '@/component/section/FundRaiser/FundRaiserCommentSection'
import FundRaiserSlider from '@/component/section/Home/FundRaiserSlider'
import DangerUIConfirm from '@/component/Util/DangerUIConfirm'
import Footer from '@/component/Util/Footer'
import LoadImage from '@/component/Util/ImageLoading'
import ImageModel from '@/component/Util/ImageModel'
import ModelItem from '@/component/Util/ModelItem'
import PublicImage from '@/component/Util/PublicImage'
import SectionTitle from '@/component/Util/SectionTitle'
import SpalshScreen from '@/component/Util/SplashScreen'
import TabItem from '@/component/Util/TabItem'
import const_data from '@/util/data/const'
import { findDonationHistroyApi, findFundRaiserByCategory, getSingleActiveFundRaiser } from '@/util/data/helper/APIHelper'
import { createFundRaiserWhatsappMessage, findNameAvatar, formatDateToMonthNameAndDate, isUrgentFundRaiser } from '@/util/data/helper/utilHelper'
import API_axiosInstance from '@/util/external/axios/api_axios_instance'
import { FundRaiserResponse, IDonateHistoryTemplate } from '@/util/types/API Response/FundRaiser'
import { FundRaiserTabItems, PaymentVia } from '@/util/types/Enums/BasicEnums'
import { FormActionResponse } from '@/util/types/InterFace/UtilInterface'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'


function ViewFundRaising(): React.ReactElement {

  let [tabListing, setTabListing] = useState<FundRaiserTabItems>(FundRaiserTabItems.ABOUT)
  const params = useSearchParams()
  const router = useRouter()
  const success = params.get("success")
  const isForce = params.get("isForce")
  const { fund_id } = useParams();
  const [orderMethod, setorderMethod] = useState<PaymentVia>(null);
  const [focusModelImage, setFocusImage] = useState(null);
  const [fundRaiserPictures, setPictures] = useState<string[]>([])
  const [fundRaiserDocuments, setDocuments] = useState<string[]>([])
  const [focusPicture, setFocusPictures] = useState<string>(fundRaiserPictures[0])
  const [matchedProfile, setMatchedProfile] = useState<FundRaiserResponse[]>([])
  const [fundRaiserProfile, setProfile] = useState<FundRaiserResponse>(null)
  const [isDonationOpen, openDonationForm] = useState<boolean>(false)
  const [donationHistory, setDonationHistroy] = useState<IDonateHistoryTemplate[]>([])
  const [totalDonated, setDonatedCount] = useState<number>(0)
  async function findDonationHistory() {
    const history = await findDonationHistroyApi(2, 1, fund_id.toString());
    setDonationHistroy(history.paginated)
    setDonatedCount(history.total_records)
  }

  useEffect(() => {
    orderMethod != null && openDonationForm(true)
  }, [orderMethod])

  async function findFundRaiserProfile() {
    const findProfile: FormActionResponse = await getSingleActiveFundRaiser(fund_id.toString(), isForce == "true");
    if (findProfile.status) {
      const response: FundRaiserResponse = findProfile.data
      setProfile(findProfile.data);
      findDonationHistory()
      setPictures(response.picture)
      setDocuments(response.documents)
      setFocusPictures(response.picture[0])
      findFundRaiserByCategory(response.category).then((data) => setMatchedProfile(data.paginated));
    } else {
      if (findProfile.msg == "CLOSED") {
        router.replace("/fund-raising/closed")
      } else {
        router.replace("/not-found")
      }
    }
  }



  useEffect(() => {
    findFundRaiserProfile()
  }, [])

  useEffect(() => {
    if (fundRaiserProfile) {
      document.title = `Help ${fundRaiserProfile?.full_name || ""} for their ${fundRaiserProfile?.category || ""}`
      const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement || document.createElement('link');


      favicon.rel = 'icon';
      favicon.href = fundRaiserProfile.picture[0]; // Specify the new favicon path here
      document.head.appendChild(favicon);


      return () => {
        document.title = "Life link"
        favicon.href = "null"
      }
    }
  }, [fundRaiserProfile])




  if (!fundRaiserProfile) {
    return <SpalshScreen />
  }

  const collectedPercentage = (+fundRaiserProfile.collected) / (fundRaiserProfile.amount) * 100
  const dateLeft = new Date(fundRaiserProfile.deadline).getDate() - new Date().getDate()





  return (
    <>
      <div>
        <ImageModel ZIndex='99' imageURL={focusModelImage} isOpen={!!focusModelImage} onImageClose={() => setFocusImage(null)}></ImageModel>


        <Header />
        <ModelItem ZIndex={10} closeOnOutSideClock={true} isOpen={isDonationOpen} onClose={() => {
          confirmAlert({
            title: "Are you sure want to cancel donation?",
            message: "cancel donation?",
            customUI: ({ onClose, title }) => {
              return <DangerUIConfirm onClose={onClose} onConfirm={() => {
                openDonationForm(false)
                onClose()
              }} title={title}></DangerUIConfirm>
            }
          })
        }} >
          <FundPaymentModel fund_id={fundRaiserProfile.fund_id} type={orderMethod} />
        </ModelItem>

        {success && (
          <SuccessBanner title={"Congrats! Your fundraiser is now active and you can begin receiving donations."} shareURL={`${window.location.host}/fund-raising/view/${fund_id}`}></SuccessBanner>
        )}

        <div className='container mx-auto'>
          {
            isUrgentFundRaiser(fundRaiserProfile?.deadline) && <div className='flex justify-center mt-5'>
              <div style={{ backgroundColor: "#fff2e5" }} className='flex gap-5 text-base rounded-lg p-2 pl-10 pe-10 text-center text-red-900'>
                <svg _ngcontent-my-app-c207="" xmlns="http://www.w3.org/2000/svg" width="20" height="20" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 297 297" className="ng-tns-c207-0"><g _ngcontent-my-app-c207="" className="ng-tns-c207-0"><path _ngcontent-my-app-c207="" d="M259.352,219.903H37.647c-5.485,0-9.933,4.447-9.933,9.933v41.586c0,5.486,4.447,9.934,9.933,9.934h221.705 c5.485,0,9.933-4.447,9.933-9.934v-41.586C269.285,224.351,264.838,219.903,259.352,219.903z" fill="#c1272d" className="ng-tns-c207-0"></path><path _ngcontent-my-app-c207="" d="M47.58,164.191c0-5.485-4.447-9.934-9.934-9.934H9.934c-5.486,0-9.934,4.448-9.934,9.934c0,5.485,4.447,9.933,9.934,9.933 h27.713C43.133,174.124,47.58,169.677,47.58,164.191z" fill="#c1272d" className="ng-tns-c207-0"></path><path _ngcontent-my-app-c207="" d="M58.335,88.046c1.938,1.94,4.481,2.91,7.023,2.91s5.084-0.97,7.023-2.909c3.88-3.878,3.88-10.168,0.001-14.047 L58.525,60.141c-3.876-3.879-10.166-3.879-14.047-0.001c-3.88,3.879-3.88,10.168-0.001,14.047L58.335,88.046z" fill="#c1272d" className="ng-tns-c207-0"></path><path _ngcontent-my-app-c207="" d="M231.641,90.956c2.542,0,5.085-0.97,7.023-2.91l13.857-13.859c3.879-3.879,3.879-10.168-0.001-14.047 c-3.879-3.88-10.169-3.879-14.047,0.001L224.616,74c-3.879,3.879-3.879,10.169,0.001,14.047 C226.557,89.986,229.098,90.956,231.641,90.956z" fill="#c1272d" className="ng-tns-c207-0"></path><path _ngcontent-my-app-c207="" d="M287.066,154.258h-27.714c-5.486,0-9.934,4.448-9.934,9.934c0,5.485,4.447,9.933,9.934,9.933h27.714 c5.486,0,9.934-4.447,9.934-9.933C297,158.706,292.553,154.258,287.066,154.258z" fill="#c1272d" className="ng-tns-c207-0"></path><path _ngcontent-my-app-c207="" d="M148.499,63.234c5.485,0,9.934-4.447,9.934-9.934V25.578c0-5.486-4.448-9.934-9.934-9.934 c-5.485,0-9.933,4.447-9.933,9.934v27.723C138.566,58.787,143.014,63.234,148.499,63.234z" fill="#c1272d" className="ng-tns-c207-0"></path><path _ngcontent-my-app-c207="" d="M241.573,164.191c0-51.336-41.753-93.102-93.073-93.102s-93.073,41.766-93.073,93.102v33.169c0,4.95,4.05,9,9,9h168.146 c4.95,0,9-4.05,9-9V164.191z" fill="#c1272d" className="ng-tns-c207-0"></path></g></svg>
                This fundraiser is in an urgent need of funds
              </div>
            </div>
          }


          <div className='mb-8 block'>
            <h2 className='text-center  mt-5 text-4xl font-bold text-gray-700'>Help {fundRaiserProfile.full_name} for their {fundRaiserProfile.category}</h2>
          </div>



          <div className='mt-5'>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
              <div className="md:col-span-3">






                <div className='bg-white shadow rounded-sm'>
                  <div>
                    <LoadImage skeltonHeight={600} unoptimized className='w-full' imageurl={focusPicture} />
                    <ul className='flex gap-5 bg-white shadow-lg py-5 ml-5'>
                      {
                        fundRaiserPictures.map((pic, index) => {
                          return (
                            <li key={index} onClick={() => setFocusPictures(pic)} className={pic == focusPicture && 'border-b-4 border-s-4 border-t-4 border-e-4 border-blue-600'}>
                              <LoadImage skeltonHeight={50} unoptimized className="w-20" imageurl={pic}></LoadImage>
                            </li>
                          )
                        })
                      }
                    </ul>

                  </div>


                  <ul className="flex overflow-scroll text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <li>
                      <button onClick={() => setTabListing(FundRaiserTabItems.ABOUT)} aria-current="page" className={`inline-block   text-black ${tabListing == FundRaiserTabItems.ABOUT ? 'bg-blue-200' : 'bg-white'} py-5 px-10 shadow-inner border active dark:bg-gray-800 `}>About</button>
                    </li>
                    <li>
                      <button onClick={() => setTabListing(FundRaiserTabItems.DOCUMENT)} className={`inline-block   text-black ${tabListing == FundRaiserTabItems.DOCUMENT ? 'bg-blue-200' : 'bg-white'} py-5 px-10 shadow-inner border active dark:bg-gray-800 `}>Document</button>
                    </li>

                    <li>
                      <button onClick={() => setTabListing(FundRaiserTabItems.PAYEMENT_METHOD)} className={`inline-block   text-black ${tabListing == FundRaiserTabItems.PAYEMENT_METHOD ? 'bg-blue-200' : 'bg-white'} py-5 px-10 shadow-inner border active dark:bg-gray-800 `}>Payment&apos;s</button>
                    </li>

                    <li>
                      <button onClick={() => setTabListing(FundRaiserTabItems.COMMENT)} className={`inline-block   text-black ${tabListing == FundRaiserTabItems.COMMENT ? 'bg-blue-200' : 'bg-white'} py-5 px-10 shadow-inner border active dark:bg-gray-800 `}>Comment&apos;s</button>
                    </li>
                  </ul>

                  <div className='tabWrapperGroup'>
                    <TabItem keyid={1} isShow={tabListing == FundRaiserTabItems.ABOUT}>
                      <div style={{ height: "600px" }} className='overflow-auto'>
                        <h4 className='text-center font-bold text-3xl mb-3'>About the Fundraiser</h4>
                        <div className='mb-3'>
                          {fundRaiserProfile.about}
                        </div>
                        <FundRaiserAboutContent description={fundRaiserProfile?.description || ""} fundRaiserPictures={fundRaiserProfile.picture} />
                      </div>
                    </TabItem>
                    <TabItem keyid={2} isShow={tabListing == FundRaiserTabItems.DOCUMENT}>
                      <div>
                        <h4 className='text-center text-2xl font-bold mb-3'>Document&apos;s</h4>
                        <ul>
                          {
                            fundRaiserDocuments.map((each, index) => {
                              return (
                                <li key={index} className='cursor-pointer mb-5' onClick={() => setFocusImage(each)}>
                                  <LoadImage skeltonHeight={600} unoptimized imageurl={each} className="w-full" />
                                </li>
                              )
                            })
                          }
                        </ul>
                      </div>
                    </TabItem>

                    <TabItem keyid={3} isShow={tabListing == FundRaiserTabItems.PAYEMENT_METHOD}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 ">
                        <BankAccountCard accountNumber={fundRaiserProfile?.bank_account?.account_number?.toString() || ""} holderName={fundRaiserProfile?.bank_account?.holder_name?.toString() || ""} ifsc={fundRaiserProfile?.bank_account?.ifsc_code?.toString() || ""} type={fundRaiserProfile?.bank_account?.account_type || null} />
                        <div className='bg-[#f7f7f7] border '>
                          <div className='pt-3 flex justify-center'>
                            <Image width={240} height={240} src={"/images/payments/upi.png"} alt={''} />
                          </div>
                          <div className="qrBlur relative">
                            <Image width={450} height={240} src={"/images/payments/qr.png"} alt={''} />
                            <div className='absolute top-0 w-full h-full backdrop-blur-sm	 flex justify-center items-center'>
                              <button onClick={() => setorderMethod(PaymentVia.UPI)} className="bg-blue-600 p-2 text-sm text-white rounded-lg">Generate QR Code</button>
                            </div>
                          </div>
                          <h4 className='text-center'>Pay with QR Code</h4>
                        </div>
                        <div className='bg-[#f7f7f7] border '>
                          <div className='pt-3 flex justify-center'>
                            <Image width={100} height={20} src={"/images/payments/paytm.png"} alt={''} />
                          </div>
                          <div className="qrBlur relative">
                            <Image width={450} height={240} src={"/images/payments/qr.png"} alt={''} />
                            <div className='absolute top-0 w-full h-full backdrop-blur-sm	 flex justify-center items-center'>
                              <button onClick={() => setorderMethod(PaymentVia.PAYTM)} className="bg-blue-600 p-2 text-sm text-white rounded-lg">Generate QR Code</button>
                            </div>
                          </div>
                          <h4 className='text-center'>Pay with Paytm Wallet</h4>
                        </div>
                      </div>
                    </TabItem>

                    <TabItem keyid={4} isShow={tabListing == FundRaiserTabItems.COMMENT}>
                      <FundRaiserCommentSection fund_id={fund_id} />
                    </TabItem>
                  </div>

                </div>
              </div>
              <div className="md:col-span-1 p-5 md:p-0">






                <div className='flex flex-col'>

                  <button onClick={() => setorderMethod(PaymentVia.Manual)} className='w-full font-medium text-white p-3 text-lg bg-green-400 rounded-lg'>Donate Now</button>

                  <div className="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="" data-size="">
                    <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(document.location.href)}`} className="flex gap-5  items-center justify-center w-full font-medium text-white p-3 text-lg bg-blue-600 mt-3 rounded-lg">
                      <i className="fa-brands fa-square-facebook"></i>
                      Spred  via Facebook
                    </a>
                  </div>
                  <div id="fb-root"></div>

                  <button onClick={() => router.push(createFundRaiserWhatsappMessage(fundRaiserProfile, document.location.href))} className='w-full font-medium text-white p-3 text-lg bg-green-900 mt-3 rounded-lg'><i className="fa-brands bg-transparent fa-whatsapp"></i> Spred  via Whatsapp</button>
                  <p className='mt-2'>Every Social media share can bring ₹5000</p>
                </div>
                <div className='mt-3'>
                  <h4 className='text-3xl font-medium'>{const_data.MONEY_ICON}{fundRaiserProfile.amount} </h4>
                  <p>We have collected {const_data.MONEY_ICON}{fundRaiserProfile.collected}</p>
                </div>
                <div className='raisingRange shadow h-3 mt-3 rounded-lg w-full bg-green-300'>
                  <div style={{ width: `${collectedPercentage}%`, minWidth: "10px" }} className='rounded-lg bg-green-500 h-full'></div>
                </div>



                <div className='mt-5 flex justify-between w-full'>
                  <span className="raised supporters ng-star-inserted  text-gray-500">
                    <span className='text-2xl font-bold text-black'>{totalDonated}</span> supporters
                  </span>

                  <span className="raised supporters ng-star-inserted text-gray-500">
                    <span className='text-2xl font-bold text-black'>{Math.abs(dateLeft)} </span>  Days Left
                  </span>
                </div>





                <div className="flex flex-col mt-5 items-start p-4 bg-white shadow-lg rounded-lg">
                  <div className="flex flex-col items-start">
                    <div className="flex items-start justify-start ">
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full">
                        <strong>
                          <i className="fa-solid fa-list"></i>
                        </strong>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm text-gray-500">Category</div>
                        <div className="text-lg font-semibold text-gray-800 capitalize">
                          {fundRaiserProfile.category} (<span className='font-mono text-sm'>{fundRaiserProfile.sub_category}</span>)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col mt-5 items-start  bg-white shadow-lg rounded-lg">
                  <div className="flex w-full flex-col items-start">
                    <div className="flex pb-2 pt-2  p-3 items-start justify-start ">
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full">
                        <strong>
                          <i className="fa-solid fa-map-pin"></i>
                        </strong>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm text-gray-500">State</div>
                        <div className="text-lg font-semibold text-gray-800 capitalize">
                          {fundRaiserProfile.state}
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-px bg-gray-300 mt-2"></div>

                    <div className="flex  pb-2 pt-2  p-3 items-start justify-start mt-2.5">
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full">
                        <strong>
                          <i className="fa-solid fa-map"></i>
                        </strong>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm text-gray-500">Distrcit</div>
                        <div className="text-lg font-semibold text-gray-800 capitalize">
                          {fundRaiserProfile.district}
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-px bg-gray-300 mt-2"></div>

                    <div className="flex  pb-5  pt-2 p-3 items-start justify-start mt-2.5">
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full">
                        <strong>
                          <i className="fa-solid fa-location-pin"></i>
                        </strong>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm text-gray-500">City</div>
                        <div className="text-lg font-semibold text-gray-800 capitalize">
                          {fundRaiserProfile.city}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="flex flex-col mt-5 items-center p-4 bg-white shadow-lg rounded-lg">

                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-start">
                      <div className="w-16 h-12 flex items-center justify-center bg-gray-200 rounded-full">
                        <strong>{findNameAvatar(fundRaiserProfile.full_name)}</strong>
                      </div>
                      <div className="ml-4 w-full">
                        <div className="text-lg font-semibold text-gray-800 capitalize">
                          {fundRaiserProfile.full_name}
                        </div>
                        {fundRaiserProfile.full_address}
                      </div>
                    </div>
                  </div>
                </div>


                <div className="flex flex-col mt-5  bg-white shadow-lg rounded-lg">
                  <div className="px-5 py-5">
                    <div className="text-1xl font-bold text-left">
                      {totalDonated} Supporters
                    </div>
                  </div>
                  <div className="w-full h-px bg-gray-300 "></div>
                  {
                    donationHistory.map((histroy, index) => {
                      return (
                        <div key={index} className="flex flex-col items-center">
                          <div className="flex p-3 items-center w-full justify-start mb-2">
                            <div className="w-16 h-12 flex items-center justify-center bg-gray-200 rounded-full">
                              <strong>{findNameAvatar(histroy.name)}</strong>
                            </div>
                            <div className="ml-4 w-full">
                              <div className="text-lg font-semibold text-gray-800 capitalize">
                                {histroy.name}
                              </div>
                              <div className="gap-1 flex items-center w-full mt-1 text-gray-600">
                                <span className="material-icons text-base">{const_data.MONEY_ICON}{histroy.amount}</span>
                                on
                                <span className="ml-1 font-bold">{formatDateToMonthNameAndDate(histroy.date)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="w-full h-px bg-gray-300 "></div>
                        </div>
                      )
                    })
                  }
                </div>


              </div>

            </div>
          </div>
        </div >

        <div>
          {(matchedProfile && matchedProfile.length > 1) &&
            <>
              <SectionTitle title='Similer Cases' focus_text='Help' sub_title='There are many people who suffer'></SectionTitle>
              <FundRaiserSlider exclude={fundRaiserProfile.fund_id} profiles={matchedProfile} />
            </>
          }
        </div>

        <Footer />
      </div >
      <div className="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="" data-size=""><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">Share</a></div>

    </>
  )
}

export default ViewFundRaising