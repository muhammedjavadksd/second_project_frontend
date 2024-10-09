"use client"
import getAIDescription from '@/component/FundRaiser/CreateSteps/AIDescription/Logic'
import { onFileDelete, onFileUpload } from '@/component/FundRaiser/CreateSteps/FileUpload/Logic'
import Header from '@/component/Header/Header'
import BreadCrumb from '@/component/Util/BreadCrumb'
import DangerUIConfirm from '@/component/Util/DangerUIConfirm'
import EditInput from '@/component/Util/EditInput'
import EmptyScreen from '@/component/Util/EmptyScreen'
import ImageItem from '@/component/Util/ImageItem'
import ImageModel from '@/component/Util/ImageModel'
import LoadingComponent from '@/component/Util/LoadingComponent'
import LoadingDataNotFoundComponent from '@/component/Util/LoadingDataNotFound'
import ModelHeader from '@/component/Util/Model/ModelHeader'
import ModelHeaderWithTile from '@/component/Util/Model/ModelHeaderWithTile'
import ModelItem from '@/component/Util/ModelItem'
import PaginationSection from '@/component/Util/PaginationSection'
import TableBody from '@/component/Util/Table/TableBody'
import TableHead from '@/component/Util/Table/TableHead'
import const_data from '@/util/data/const'
import { activeAccount, addBankAccount, closeFundRaise, deleteBankAccountByUser, deleteFundRaiserImageAdmin, findDonationHistroyApi, getAllBankAccount, getDonationStatitics, getSingleActiveFundRaiser, userFundRaiserEdit } from '@/util/data/helper/APIHelper'
import { formatDateToMonthNameAndDate } from '@/util/data/helper/utilHelper'
import { fundRaiserBankAccoutInitialValues } from '@/util/external/yup/initialValues'
import { editFundRaiseAboutValidation, editFundRaiseDescriptionValidation, fundRaiserBankAccoutValidation } from '@/util/external/yup/yupValidations'
import { FundRaiserResponse, IBankAccount, IDonateHistoryTemplate, IDonationStatitics } from '@/util/types/API Response/FundRaiser'
import { BankAccountType, FundRaiserFileType, FundRaiserStatus } from '@/util/types/Enums/BasicEnums'
import { FormActionResponse } from '@/util/types/InterFace/UtilInterface'
import { CChart } from '@coreui/react-chartjs'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { title } from 'process'
import React, { useEffect, useRef, useState } from 'react'
import 'rsuite/DateRangePicker/styles/index.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert'
import { FaEdit, FaMagic, FaPlus, FaStar, FaTrash } from 'react-icons/fa'
import { IoMdAddCircle } from 'react-icons/io'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import { toast } from 'react-toastify'
import { DateRangePicker } from 'rsuite';
import AIDescriptionModel from '@/component/FundRaiser/AIDescriptionModel'
import AddBankAccount from '@/component/FundRaiser/AddBankAccount'
import SingleBackAccount from '@/component/FundRaiser/BankAccount'



function FundRaiserView(): React.ReactElement {

    const [isEditDescriptionOpen, toggleDescription] = useState(false)
    const [isEditAboutOpen, toggleAbout] = useState(false)
    const [isAddBankAccountOpen, toggleBankAccount] = useState(false)
    const { fund_id } = useParams()
    const [refresh, setRefresh] = useState(false);
    const [pageRefresh, callPageRefresh] = useState(false);
    const [imageFocus, setImageFocus] = useState(null);
    const [picturesLoading, togglePictureLoading] = useState(false);
    const [documentsLoading, toggleDocumentsLoading] = useState(false);
    const [donationStatics, setDonationStatics] = useState<IDonationStatitics[]>(null);
    const [fundRaiserProfile, setFundRaiserProfile] = useState<FundRaiserResponse>(null)
    const [notFound, setProfileNotFound] = useState<boolean>(false)
    const [activeBankAccount, setActiveAccount] = useState<string>(null)
    const imageUploadRef = useRef(null)
    const documentUploadRef = useRef(null)
    const toDate = new Date();
    toDate.setDate(toDate.getDate() - 30);
    const [dateRange, setDateRange] = useState([new Date(), toDate]);


    async function findProfile() {
        const findProfile: FormActionResponse = await getSingleActiveFundRaiser(fund_id.toString(), true);
        if (findProfile.status) {
            setFundRaiserProfile(findProfile.data)
        } else {
            setProfileNotFound(true)
        }
    }

    // useEffect(() => {
    //     setActiveAccount(fundRaiserProfile?.withdraw_docs?.benf_id)
    // }, [fundRaiserProfile])


    function close() {
        confirmAlert({
            title: "Are you sure want to close the post?",
            message: "close the post?",

            customUI: ({ onClose, title }) => {
                return (
                    <DangerUIConfirm
                        onClose={onClose}
                        onConfirm={() => {
                            closeFundRaise(fund_id.toString()).then((closed) => {
                                if (closed) {
                                    toast.success("An verification email has to be sent to your email address")
                                } else {
                                    toast.error("Something went wrong")
                                }
                            }).catch((err) => {
                                toast.error("Something went wrong")
                            })
                            onClose()
                        }}
                        title={title}
                    />
                )
            }
        })
    }

    useEffect(() => {
        getDonationStatitics(fund_id.toString(), dateRange[1], dateRange[0]).then((data) => {
            data && setDonationStatics(data)
        }).catch((err) => { })

    }, [dateRange])

    useEffect(() => {
        findProfile()
    }, [pageRefresh])





    const dateLeft = new Date(fundRaiserProfile?.deadline).getDate() - new Date().getDate()


    return (
        <div className='bg-gray-100'>
            <Header />
            <ImageModel ZIndex='99' imageURL={imageFocus} isOpen={!!imageFocus} onImageClose={() => setImageFocus(null)} />


            <ModelItem ZIndex={99} closeOnOutSideClock={true} isOpen={isEditAboutOpen} onClose={() => toggleAbout(false)}>
                <ModelHeader title="Edit about content"></ModelHeader>
                <div className='bg-white p-5 min-w-[600px] max-w-full'>
                    <Formik enableReinitialize initialValues={{ about: fundRaiserProfile?.about }} validationSchema={editFundRaiseAboutValidation} onSubmit={(val) => {
                        userFundRaiserEdit(val, fund_id.toString()).then((data) => {
                            if (data) {
                                toast.success("About content updated")
                                setFundRaiserProfile({ ...fundRaiserProfile, about: val.about })
                                toggleAbout(false)
                            } else {
                                toast.error("Something went wrong")
                            }
                        })
                    }}>
                        <Form>
                            <div className='w-full rounded-lg  block'>
                                <label htmlFor="about" className='text-sm mb-2 block'>About content</label>
                                <Field type="text" rows='7' as="textarea" name="about" id="about" placeholder="Enter about content" className="block shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full" />
                                <ErrorMessage className='errorMessage' component="div" name='about' />
                            </div>
                            <button type="submit" className="mt-3 col-span-2 w-full bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300">
                                Save
                            </button>
                        </Form>
                    </Formik>
                </div>
            </ModelItem>

            <ModelItem ZIndex={99} closeOnOutSideClock={true} isOpen={isEditDescriptionOpen} onClose={() => toggleDescription(false)}>
                <AIDescriptionModel role='user' finallyCallback={() => toggleDescription(false)} profile={fundRaiserProfile} successCallBack={(val) => {
                    setFundRaiserProfile({ ...fundRaiserProfile, description: val })
                }} />
            </ModelItem>

            <ModelItem ZIndex={99} closeOnOutSideClock={true} isOpen={isAddBankAccountOpen} onClose={() => toggleBankAccount(false)}>
                <AddBankAccount role='user' onFinish={() => { toggleBankAccount(false), setRefresh(!refresh) }} fund_id={fund_id.toString()} />
            </ModelItem>

            <div className='min-h-screen grid'>
                <LoadingDataNotFoundComponent isFound={!notFound} isLoading={!(!!fundRaiserProfile)}>
                    <div className="container mx-auto mt-5 pb-5">
                        <div className="mb-5">
                            <BreadCrumb path={['Home', 'Profile', 'My Fund Raising', fund_id.toString()]} />
                        </div>
                        <div className="flex gap-5">
                            <div className='w-full'>
                                <div className="mb-4 bg-white shadow-inner border  p-3 flex justify-between items-center">
                                    <div>
                                        <h4 className="text-2xl font-bold">{fundRaiserProfile?.full_name} {fundRaiserProfile?.category} Support Post</h4>
                                        <p>Here is complete report for {fundRaiserProfile?.full_name}</p>
                                    </div>
                                    <div className="gap-5 flex">
                                        {/* <button onClick={() => { }} className="bg-green-800 px-5 py-2 text-white rounded-md">Download report</button> */}
                                        <button onClick={close} className="bg-red-800 px-5 py-2 text-white rounded-md">Close post</button>
                                        <Link href={`/fund-raising/view/${fund_id}?isForce=true`} className="bg-blue-600 px-5 py-2 text-white rounded-md">View live</Link>
                                    </div>
                                </div>
                                <div className="grid gap-5 grid-cols-4">
                                    <div className='bg-white rounded-lg items-center p-4 gap-3 flex shadow-inner border'>
                                        <div>
                                            <div> Amount collected </div>
                                            <span className='font-bold text-2xl'>{const_data.MONEY_ICON}{fundRaiserProfile?.collected}</span>

                                        </div>
                                    </div>
                                    <div className='bg-white rounded-lg items-center p-4 gap-3 flex shadow-inner border'>
                                        <div>
                                            <div> Target amount </div>
                                            <span className='font-bold text-2xl'>{const_data.MONEY_ICON}{fundRaiserProfile?.amount}</span>
                                            <div className='flex mt-3 gap-2'>
                                                <span className=' text-green-800 font-bold px-3 text-sm bg-green-300  rounded-lg'>{fundRaiserProfile?.amount - fundRaiserProfile?.collected}{const_data.MONEY_ICON}</span>
                                                <span>
                                                    Need
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bg-white rounded-lg items-center p-4 gap-3 flex shadow-inner border'>
                                        <div>
                                            <div> Deadline </div>

                                            <span className='font-bold text-2xl'>
                                                <EditInput uiCallback={(ui) => new Date(fundRaiserProfile?.deadline || null).toDateString()} label='Enter the deadline' type="date" data={{ key: "deadline", value: new Date(fundRaiserProfile?.deadline || new Date()).toISOString().slice(0, 10) }} isEditAllowed={() => true} onSubmit={(val) => { userFundRaiserEdit({ deadline: val['deadline'] }, fund_id.toString()) && toast.success("Deadline updated") }} >
                                                    {new Date(fundRaiserProfile?.deadline || null).toDateString()}
                                                </EditInput>
                                            </span>

                                            <div className='flex mt-3 gap-2'>
                                                <span>
                                                    {dateLeft < 1 ? `Deadline  passed by ${Math.abs(dateLeft)} days` : `${dateLeft} more day's to go`}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bg-white rounded-lg items-center p-4 gap-3 flex shadow-inner border'>
                                        <div>
                                            <div> Status </div>
                                            <span className='font-bold text-2xl'>{fundRaiserProfile?.status}</span>
                                            <div className='flex mt-3 gap-2'>
                                                {<span className='text-red-600'>{fundRaiserProfile?.status != FundRaiserStatus.APPROVED && "Profile not live at this moment"}</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-5 flex gap-5'>
                            <div className="w-3/4">
                                <div className='bg-white p-3 rounded-md'>
                                    <div className='flex gap-2 items-center mb-3'>
                                        <label htmlFor="">Filter by date</label>
                                        <DateRangePicker
                                            format="yyyy-MM-dd"
                                            character=" – "
                                            onChange={(date) => setDateRange([date[1], date[0]])}
                                        // value={dateRange.map(date => date.toISOString().split('T')[0])} // Format dates
                                        />
                                    </div>

                                    <CChart
                                        type="line"
                                        data={{
                                            labels: donationStatics ? donationStatics.map((each) => each.date) : [],
                                            datasets: [
                                                {
                                                    label: "Donation History by date",
                                                    backgroundColor: "rgba(151, 187, 205, 0.2)",
                                                    borderColor: "rgba(151, 187, 205, 1)",
                                                    pointBackgroundColor: "rgba(151, 187, 205, 1)",
                                                    pointBorderColor: "#fff",
                                                    data: donationStatics ? donationStatics.map((each) => each.amount) : []
                                                },
                                            ],
                                        }}
                                    />
                                </div>



                                <div className="mt-5 overflow-hidden  md:rounded-lg">


                                    <div >
                                        <h4 className='text-2xl font-bold '>Donation history</h4>
                                        <p className='text-sm text-red-500'>If you notice any missing donation history, it may be because some donors have chosen to hide their profiles from the public.</p>
                                    </div>
                                    <div >
                                        <PaginationSection
                                            api={{
                                                renderType: async (page, limit) => {
                                                    const history = await findDonationHistroyApi(limit, page, fund_id.toString())
                                                    console.log(history);
                                                    return history
                                                },
                                            }}
                                            itemsRender={(tableBody: IDonateHistoryTemplate[]) => {
                                                return <>
                                                    {
                                                        tableBody.length ? (
                                                            <>
                                                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mt-4">
                                                                    <TableHead head={['#', 'Donation ID', 'Name', 'Amount', 'Date']} />
                                                                    {
                                                                        tableBody.map((item, index) => {
                                                                            return <TableBody key={index} data={[index + 1, item.donation_id, item.name, `${item.amount}${const_data.MONEY_ICON}`, formatDateToMonthNameAndDate(item.date)]} />
                                                                        })
                                                                    }
                                                                </table>
                                                            </>
                                                        ) : (
                                                            <div className="mt-3 inline-table w-full">
                                                                <EmptyScreen msg="Wait for your first donation" />
                                                            </div>
                                                        )
                                                    }
                                                </>
                                            }}
                                            paginationProps={{ current_page: 1, currentLimit: 10 }}
                                            refresh={null}
                                        >

                                        </PaginationSection >
                                    </div>
                                </div>


                                <div className='mt-3 mb-3'>
                                    <div className='flex justify-between items-center'>
                                        <div>
                                            <h4 className='text-2xl font-bold '>Bank account&apos;s</h4>
                                            <p>Manage your bank account&apos;s from here</p>
                                        </div>
                                        <button onClick={() => toggleBankAccount(true)} className='flex bg-green-500 p-2 text-white border shadow-inner items-center gap-x-3 rounded-lg'>
                                            <FaPlus />
                                            Add bank account
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                                    <span className="font-medium">Notification alert!</span> The primary account will receive all donation payments.
                                </div>
                                <PaginationSection
                                    api={{
                                        renderType: (page: number, limit: number) => {
                                            return getAllBankAccount(fund_id.toString(), limit, page);
                                        }
                                    }}
                                    itemsRender={(bankAccounts: IBankAccount[]) => {
                                        return (
                                            bankAccounts.length ? (
                                                <div className="grid gap-4 grid-cols-3" >
                                                    {
                                                        bankAccounts.map((account, index: number) => {
                                                            return (
                                                                <SingleBackAccount key={index} role='user' acAccount={fundRaiserProfile?.withdraw_docs?.benf_id} account={account} fund_id={fund_id.toString()} onComplete={() => setRefresh(!refresh)} />
                                                                // <div
                                                                //     key={account.befId}
                                                                //     className={`bg-white rounded-lg shadow-md p-6 transition-all duration-300 ${account.is_active ? "ring-2 ring-blue-500" : ""
                                                                //         }`}
                                                                // >
                                                                //     <div className="flex justify-between items-center mb-4">
                                                                //         <h2 className="text-xl font-semibold">{account.holder_name}</h2>
                                                                //         <div className="flex space-x-2">

                                                                //             <button
                                                                //                 onClick={() => {
                                                                //                     confirmAlert({
                                                                //                         title: "Are you sure want to delete the account?",
                                                                //                         message: "delete the account?",

                                                                //                         customUI: ({ onClose, title }) => {
                                                                //                             return (
                                                                //                                 <DangerUIConfirm
                                                                //                                     onClose={onClose}
                                                                //                                     onConfirm={() => {
                                                                //                                         deleteBankAccountByUser(fund_id.toString(), account.befId).then((data) => {
                                                                //                                             if (data.status) {
                                                                //                                                 toast.success("Bank account deleted")
                                                                //                                                 setRefresh(!refresh)
                                                                //                                                 onClose()
                                                                //                                             } else {
                                                                //                                                 toast.error(data.msg)
                                                                //                                             }
                                                                //                                         }).catch((err) => {
                                                                //                                             console.log(err);
                                                                //                                         })
                                                                //                                     }}
                                                                //                                     title={title}
                                                                //                                 />
                                                                //                             )
                                                                //                         }
                                                                //                     })

                                                                //                 }}
                                                                //                 className="text-red-500 hover:text-red-600 transition-colors duration-200"
                                                                //                 aria-label="Delete account"
                                                                //             >
                                                                //                 <FaTrash />
                                                                //             </button>

                                                                //         </div>
                                                                //     </div>
                                                                //     <div className="space-y-2">
                                                                //         <p>
                                                                //             <span className="font-semibold">Account Number:</span>{" "}
                                                                //             {account.account_number}
                                                                //         </p>
                                                                //         <p>
                                                                //             <span className="font-semibold">Account Holder:</span>{" "}
                                                                //             {account.holder_name}
                                                                //         </p>
                                                                //         <p>
                                                                //             <span className="font-semibold">IFSC Code:</span>
                                                                //             {account.ifsc_code}
                                                                //         </p>
                                                                //     </div>
                                                                //     {
                                                                //         activeBankAccount == account.befId ? (
                                                                //             <>
                                                                //                 <button className='bg-green-600 mt-3 text-white w-full p-3 rounded-md'>Primary Account</button>
                                                                //             </>
                                                                //         ) : <>
                                                                //             <button onClick={() => setAsPrimaryAccount(account.befId)} className='bg-blue-600 mt-3 text-white w-full p-3 rounded-md'>Switch to Primary</button>
                                                                //         </>
                                                                //     }
                                                                // </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            ) : <EmptyScreen msg='No bank account found' />
                                        )
                                    }}

                                    paginationProps={{
                                        current_page: 1,
                                        currentLimit: 10
                                    }}
                                    refresh={refresh}
                                >
                                </PaginationSection>

                            </div>
                            <div className="w-1/4">
                                <LoadingComponent closeOnClick={false} isLoading={picturesLoading} paddingNeed={false}>
                                    <div className="mb-5 bg-white picturesList shadow-inner border  overflow-auto">
                                        <input type="file" multiple className='hidden' onChange={(e) => {
                                            togglePictureLoading(true),
                                                onFileUpload(e.target.files, () => {
                                                    callPageRefresh(!pageRefresh)
                                                    togglePictureLoading(false)
                                                },
                                                    (msg) => {
                                                        toast.error(msg)
                                                        togglePictureLoading(false)
                                                    },
                                                    () => { }
                                                    ,
                                                    FundRaiserFileType.Pictures,
                                                    fund_id
                                                )
                                        }
                                        } ref={imageUploadRef} name="" id="" />
                                        <ModelHeaderWithTile title='Manage pictures'>
                                            <button className='text-white'><IoMdAddCircle onClick={() => imageUploadRef.current.click()} /></button>
                                        </ModelHeaderWithTile>
                                        {
                                            fundRaiserProfile?.picture.map((each, index) => {
                                                return (
                                                    <div key={index} >
                                                        <ImageItem

                                                            onClose={(e) => {
                                                                confirmAlert({
                                                                    title: "Are you sure want to delete this picture",
                                                                    message: "Delete picture",
                                                                    customUI: ({ title, onClose }) => {
                                                                        return <DangerUIConfirm title={title} onClose={onClose} onConfirm={() => {
                                                                            onFileDelete(each, () => {
                                                                                callPageRefresh(!pageRefresh)
                                                                                toast.success("Document delete success")
                                                                                onClose()
                                                                            }, (err) => {
                                                                                toast.error(err)
                                                                            }, FundRaiserFileType.Pictures, fund_id)
                                                                        }
                                                                        } />
                                                                    }
                                                                })
                                                            }}
                                                            imageName={<span onClick={() => setImageFocus(each)}>Picture - ${index + 1}</span>} imageURL={each} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </LoadingComponent>
                                <LoadingComponent closeOnClick={false} isLoading={documentsLoading} paddingNeed={false} >
                                    <div className="mb-5 bg-white picturesList shadow-inner border  overflow-auto">
                                        <input type="file" multiple className='hidden' onChange={(e) => {
                                            toggleDocumentsLoading(true),
                                                onFileUpload(e.target.files, () => {
                                                    callPageRefresh(!pageRefresh)
                                                    toggleDocumentsLoading(false)
                                                },
                                                    (msg) => {
                                                        toast.error(msg)
                                                        toggleDocumentsLoading(false)
                                                    },
                                                    () => { }
                                                    ,
                                                    FundRaiserFileType.Document,
                                                    fund_id
                                                )
                                        }
                                        } ref={documentUploadRef} name="" id="" />
                                        <ModelHeaderWithTile title='Manage Documents'>
                                            <button className='text-white'><IoMdAddCircle onClick={() => documentUploadRef.current.click()} /></button>
                                        </ModelHeaderWithTile>
                                        {
                                            fundRaiserProfile?.documents.map((each, index) => {
                                                return (
                                                    <div key={index} >
                                                        <ImageItem
                                                            onClose={(e) => {
                                                                confirmAlert({
                                                                    title: "Are you sure want to delete this document",
                                                                    message: "Delete docs",
                                                                    customUI: ({ title, onClose }) => {
                                                                        return <DangerUIConfirm title={title} onClose={onClose} onConfirm={() => {
                                                                            onFileDelete(each, () => {
                                                                                callPageRefresh(!pageRefresh)
                                                                                toast.success("Document delete success")
                                                                                onClose()
                                                                            }, (err) => {
                                                                                toast.error(err)
                                                                            }, FundRaiserFileType.Document, fund_id)
                                                                        }
                                                                        } />
                                                                    }
                                                                })
                                                            }}
                                                            imageName={<span onClick={() => setImageFocus(each)}>Document - ${index + 1}</span>} imageURL={each} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </LoadingComponent>

                                <div className="gap-5 flex mt-5 w-full   bg-white   focus:ring-4 focus:outline-none focus:ring-gray-300 text-black rounded-lg  items-center justify-center px-4 py-2.5">
                                    <div className='text-ellipsis w-full'>
                                        <div className="text-left mt-2 w-full rtl:text-right">
                                            <div className='flex justify-between mb-2'>
                                                <div className="mb-3 text-xs">About this fund raiser</div>
                                                <i onClick={() => toggleAbout(true)} className="cursor-pointer  fa-solid text-sm fa-pencil" title='Edit about content'></i>
                                            </div>

                                            {/* <EditInput rows={6} onSubmit={() => { }} as='textarea' data={{ key: "about", value: "Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator. Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator." }} isEditAllowed={() => true}  > */}
                                            <div className="-mt-1 font-sans text-sm font-semibold">
                                                {fundRaiserProfile?.about}
                                            </div>
                                            {/* </EditInput> */}
                                        </div>
                                    </div>
                                </div>

                                <div className="gap-5 flex mt-5 w-full   bg-white   focus:ring-4 focus:outline-none focus:ring-gray-300 text-black rounded-lg  items-center justify-center px-4 py-2.5">
                                    <div className='text-ellipsis'>
                                        <div className="text-left mt-2 rtl:text-right w-fit">
                                            <div className='flex justify-between mb-2'>
                                                <div className="mb-3 text-xs">Description this fund raiser</div>
                                                <i onClick={() => toggleDescription(true)} className="cursor-pointer  fa-solid text-sm fa-pencil" title='Edit description content'></i>
                                            </div>
                                            <div className="-mt-1 font-sans text-sm font-semibold">
                                                {fundRaiserProfile?.description}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div >
                </LoadingDataNotFoundComponent >
            </div>
        </div >
    )
}

export default FundRaiserView