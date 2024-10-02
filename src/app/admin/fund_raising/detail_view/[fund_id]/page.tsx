"use client"
import AdminLayout from '@/component/Admin/AdminLayout'
import AdminBreadCrumb from '@/component/Util/AdminBreadCrumb'
import DashboardCard from '@/component/Util/DashboardCard'
import const_data from '@/util/data/const'
import CanvasJSReact from '@canvasjs/react-charts/canvasjs.react.js'
import React, { useEffect, useState } from 'react'
import { fundRaiserGraph } from './data'
import { useParams } from 'next/navigation'
import { getSingleFundRaisingProfile } from './logic'
import { FundRaiserResponse, AxiosResponse, IDonateHistoryTemplate, IDonationStatitics } from '@/util/types/API Response/FundRaiser'
import { useRouter } from 'next/navigation'
import { getSingleUser } from '../../logic/fund-raiser-logic'
import TableHead from '@/component/Util/Table/TableHead'
import TableBody from '@/component/Util/Table/TableBody'
import { FaCloudUploadAlt, FaTrash } from 'react-icons/fa'
import { adminEditFundRaiser, adminFundRaiserFileUpload, closeFundRaise, closeFundRaiseByAdmin, deleteFundRaiserImageAdmin, findDonationHistroyApi, getDonationStatitics, updateFundRaiserStatus } from '@/util/data/helper/APIHelper'
import { SetPicturs } from '@/util/external/redux/slicer/fundRaiserForm'
import { toast } from 'react-toastify'
import { FundRaiserFileType, FundRaiserStatus } from '@/util/types/Enums/BasicEnums'
import LoadingComponent from '@/component/Util/LoadingComponent'
import { confirmAlert } from 'react-confirm-alert'
import DangerUIConfirm from '@/component/Util/DangerUIConfirm'
import LoadingDataNotFoundComponent from '@/component/Util/LoadingDataNotFound'
import Image from 'next/image'
import LoadImage from '@/component/Util/ImageLoading'
import PaginationSection from '@/component/Util/PaginationSection'
import EmptyScreen from '@/component/Util/EmptyScreen'
import { closeFundRaiserText, formatDateToMonthNameAndDate } from '@/util/data/helper/utilHelper'
import CustomeConfirmUI from '@/component/Util/ConfirmUI'
import 'react-confirm-alert/src/react-confirm-alert.css';
import ModelItem from '@/component/Util/ModelItem'
import ModelHeader from '@/component/Util/Model/ModelHeader'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { boolean } from 'yup'
import EditInput from '@/component/Util/EditInput'

function FundRaiserDetailView(): React.ReactElement {
    var CanvasJSChart: CanvasJSReact = CanvasJSReact.CanvasJSChart;
    let [fundRaiserProfile, setFundRaiserProfile] = useState<FundRaiserResponse>(null)

    let { fund_id } = useParams();

    const [images, setImages] = useState<string[]>([]);
    const [documents, setDocuments] = useState<string[]>([]);
    const [isDocsLoading, setDocLoad] = useState<boolean>(false);
    const [isPicsLoading, setPicsLoad] = useState<boolean>(false);
    const [graphDonation, setFundRaiserGraph] = useState(null);
    const date = new Date();
    date.setDate(date.getDate() - 30);
    const [dateRange, setDateRange] = useState([date, new Date()]);
    const [status, setStatus] = useState<FundRaiserStatus>(null);
    const [closeModel, toggleModel] = useState<boolean>(false);
    const [verificationText, setVerificationText] = useState<string>(null);
    const [isClosed, toggleClose] = useState<boolean>(false);


    function onUpdateStatus(status: FundRaiserStatus) {
        confirmAlert({
            title: "Are you sure want to update this profile?",
            message: "Update profile",
            customUI: ({ onClose, title }) => {
                return (
                    <CustomeConfirmUI
                        onClose={onClose}
                        onConfirm={() => {
                            updateFundRaiserStatus(status, fund_id.toString()).then((data) => {
                                setStatus(status)
                                toast.success("Status updated")
                                onClose()
                                toggleClose(true)
                            }).catch((err) => {
                                toast.error("Fund raiser status not allowed!")
                                onClose()
                            })
                        }}
                        title={title}
                    />
                )
            }
        })

    }

    function onFileUpload(files: FileList, type: FundRaiserFileType) {
        if (type == FundRaiserFileType.Document) {
            setDocLoad(true)
        } else {
            setPicsLoad(true)
        }
        adminFundRaiserFileUpload(files, ({ documents, pictures }) => {
            setImages(pictures)
            setDocuments(documents)
            setDocLoad(false)
            setPicsLoad(false)
        }, (err) => {
            toast.error(err), setDocLoad(false)
            setPicsLoad(false)
        }, () => { }, type, fund_id)
    }

    async function fetchProfile(): Promise<void> {
        try {
            const profile: AxiosResponse | null = await getSingleFundRaisingProfile(fund_id.toString())
            console.log(profile);

            if (profile && profile.status) {
                const fund_raiser_profile: FundRaiserResponse = profile.data
                const findSingleProfile = await getSingleUser(fund_raiser_profile.created_by);
                setFundRaiserProfile(fund_raiser_profile)
                setImages(fund_raiser_profile.picture)
                setDocuments(fund_raiser_profile.documents)
                setStatus(fund_raiser_profile.status)
                setVerificationText(closeFundRaiserText(fund_raiser_profile.full_name))
                toggleClose(fund_raiser_profile.closed)
            } else {
                // router.back()
            }
        } catch (e) {
            console.log(e);
        }
    }

    function onClosePost(text) {

        if (verificationText == text) {
            confirmAlert({
                title: "Closing fund raiser post?",
                message: "Close",
                customUI: ({ onClose, title }) => {
                    return (
                        <DangerUIConfirm title={title} onClose={onClose} onConfirm={() => {
                            closeFundRaiseByAdmin(fund_id.toString()).then((data) => {
                                data.status ? toast.success(data.msg) : toast.error(data.msg);
                            }).catch((err) => {
                                toast.error("Something went wrong")
                            }).finally(() => {
                                onClose();
                                toggleModel(false)
                            })
                        }} />
                    )
                }
            })
        } else {
            toast.error("Incorrect verification text")
        }
    }

    function onDelete(imageUrl: string, type: FundRaiserFileType) {

        confirmAlert({
            title: "Are you sure want to delete this file?",
            message: "Delete file",
            customUI: ({ onClose, title }) => {
                return (
                    <DangerUIConfirm title={title} onClose={onClose} onConfirm={() => {
                        deleteFundRaiserImageAdmin(imageUrl, type, fund_id.toString()).then((response) => {
                            if (response.status) {
                                if (type == FundRaiserFileType.Document) {
                                    const newImages = documents.filter((each) => each != imageUrl);
                                    setDocuments(newImages)
                                } else {
                                    const newImages = images.filter((each) => each != imageUrl);
                                    setImages(newImages)
                                }
                                toast.success(response.msg)
                            } else {
                                toast.error(response.msg)
                            }
                        }).catch((err) => {
                            toast.error("Something went wrong")
                        }).finally(() => {
                            onClose()
                        })
                    }} />
                )
            }
        })
    }

    function onFundRaiserUpdate(newData) {
        adminEditFundRaiser(fund_id.toString(), newData).then((data) => {
            if (data) {
                toast.success("Campign updated success")
            } else {
                toast.error("Campign updated failed")
            }
        })
    }


    useEffect(() => {
        fetchProfile()
        getDonationStatitics(fund_id.toString(), dateRange[1], dateRange[0]).then((data) => {
            if (data) {
                const fundRaiserGrowth = data.map((each) => {
                    return {
                        x: each.date,
                        y: each.amount
                    }
                })
                setFundRaiserGraph(fundRaiserGrowth)
            }
        }).catch((err) => { })
    }, [])

    const dateLeft = new Date(fundRaiserProfile?.deadline).getDate() - new Date().getDate()


    return (
        < AdminLayout onSearch={() => { }} >
            <div className='grid grid-cols-2'>
                <div>
                    <AdminBreadCrumb root={{ title: "Dashboard", href: "/" }} title={`Detail view for ${fundRaiserProfile?.full_name ?? ""}`} paths={[{ title: "Manage Fund Raiser's", href: "/" }, { title: "View Fund Raiser", href: "/" }]} />
                </div>

                <div className='buttonGroups flex items-center justify-end gap-3'>
                    {
                        !isClosed && (
                            <button onClick={() => toggleModel(true)} className='bg-red-700 text-sm text-white p-2 rounded-lg pl-5 pr-5'> Close the case </button>
                        )
                    }
                    {
                        !isClosed && (
                            <div className='flex gap-2'>
                                {
                                    status != FundRaiserStatus.APPROVED && <button className='bg-green-700 text-sm text-white p-2 rounded-lg pl-5 pr-5' onClick={() => onUpdateStatus(FundRaiserStatus.APPROVED)}> Approve case </button>
                                }
                                {status != FundRaiserStatus.HOLD && <button className='bg-yellow-700 text-sm text-white p-2 rounded-lg pl-5 pr-5' onClick={() => onUpdateStatus(FundRaiserStatus.HOLD)}> Hold case </button>}
                                {status != FundRaiserStatus.REJECTED && <button className='bg-red-700 text-sm text-white p-2 rounded-lg pl-5 pr-5' onClick={() => onUpdateStatus(FundRaiserStatus.REJECTED)}> Reject case </button>}

                            </div>
                        )
                    }
                </div>
            </div>

            {
                isClosed && (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 mt-2 dark:text-red-400" role="alert">
                        <span className="font-medium">Closed!</span> This fund raiser campign already closed!
                    </div>
                )
            }



            <ModelItem ZIndex={99} closeOnOutSideClock={true} isOpen={closeModel} onClose={() => toggleModel(false)} >
                <ModelHeader title={"Close the fund raiser"} />
                <div className='bg-white  p-5'>
                    <Formik onSubmit={(val) => onClosePost(val.validation_text)} initialValues={{ validation_text: "" }}>
                        {({ values }) => {
                            return <Form>
                                <div className="mb-5" >
                                    <div className='mb-2'>
                                        <label htmlFor="validation_text" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white" >
                                            To verify, type : <span className='text-sm font-light'>{verificationText}</span>
                                        </label >
                                    </div>
                                    <Field type="text" name="validation_text" id="validation_text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required placeholder="" />
                                    <ErrorMessage component={"div"} className='errorMessage' name="validation_text"></ErrorMessage>
                                </div >
                                {
                                    values['validation_text'] == verificationText && <div className='mt-5 ml-auto flex gap-3 justify-end w-full overflow-hidden'>
                                        <button type="submit" className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>Conform</button>
                                    </div >
                                }
                            </Form>
                        }}
                    </Formik>
                </div>
            </ModelItem>

            <LoadingDataNotFoundComponent isFound={!!fundRaiserProfile} isLoading={!((!!fundRaiserProfile))}>
                <div className='flex mt-5 gap-5'>
                    <div className='w-1/4'>
                        <div className="bg-white shadow-xl rounded-lg py-3">
                            <div className="photo-wrapper items-center flex justify-center w-full p-2">
                                {/* <LoadImage width={70} height={110} className="block rounded-full" imageurl={fundRaiserProfile?.picture?.length && fundRaiserProfile?.picture[0]} /> */}
                                <LoadImage className="w-36 h-36 rounded-full" imageurl={fundRaiserProfile?.picture?.length && fundRaiserProfile?.picture[0]} alt="Extra large avatar" />
                                {/* <img class="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Rounded avatar"> */}

                                {/* <Image width={32} height={32} className="w-32 h-32 rounded-full mx-auto" src={`${fundRaiserProfile?.picture?.length && fundRaiserProfile?.picture[0]}`} alt="John Doe" /> */}
                            </div>
                            <div className="p-2">
                                <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{fundRaiserProfile?.full_name}</h3>
                                <div className="text-center text-gray-400 text-xs font-semibold">
                                    <p>{fundRaiserProfile?.category}</p>
                                    <span>{fundRaiserProfile?.sub_category}</span>
                                </div>
                                <table className="text-xs my-3">
                                    <tbody><tr>
                                        <td className="px-2 py-2 text-gray-500 font-semibold">Address</td>
                                        <td className="px-2 py-2">
                                            <EditInput data={{ key: "address", value: fundRaiserProfile?.full_address }} isEditAllowed={() => true} label='Enter new address' onSubmit={onFundRaiserUpdate} uiCallback={(newAddress) => newAddress} >
                                                {fundRaiserProfile?.full_address}
                                            </EditInput>
                                        </td>
                                    </tr>
                                        <tr>
                                            <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                                            <td className="px-2 py-2">
                                                <EditInput data={{ key: "phone_number", value: fundRaiserProfile?.phone_number }} isEditAllowed={() => true} label='Enter phone number' onSubmit={onFundRaiserUpdate} uiCallback={(phones) => phones} >
                                                    {fundRaiserProfile?.phone_number}
                                                </EditInput>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                            <td className="px-2 py-2  break-all">
                                                <EditInput data={{ key: "email_id", value: fundRaiserProfile?.email_id }} isEditAllowed={() => true} label='Enter phone number' onSubmit={onFundRaiserUpdate} uiCallback={(email_id) => email_id} >
                                                    {fundRaiserProfile?.email_id}
                                                </EditInput>
                                            </td>
                                        </tr>
                                    </tbody></table>

                            </div>
                        </div>

                        <a href="#" className="gap-5 mt-5 w-full   bg-white   focus:ring-4 focus:outline-none focus:ring-gray-300 text-black rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                            <i className="fa-solid fa-pencil"></i>
                            <div className="text-left rtl:text-right w-full">
                                <div className="mb-1 text-xs">Created By</div>
                                <div className="-mt-1 font-sans text-sm font-semibold">{fundRaiserProfile?.created_by}</div>
                                <div className="-mt-1 font-sans text-sm font-semibold">
                                    {/* {console.log(fundRaiserProfile?.created_by)} */}
                                    {fundRaiserProfile?.created_by}
                                </div>
                            </div>
                        </a>
                        <a href="#" className="gap-5 flex mt-5 w-full   bg-white   focus:ring-4 focus:outline-none focus:ring-gray-300 text-black rounded-lg  items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                            <div className='w-1/6'>
                                <i className="fa-solid fa-phone"></i>
                            </div>
                            <div className='w-5/6'>
                                <div className='text-ellipsis'>
                                    <div className="text-left rtl:text-right w-fit">
                                        <div className="mb-1 text-xs">Contact Details</div>
                                        <div className="-mt-1 font-sans text-sm font-semibold">{fundRaiserProfile?.phone_number ?? ""}</div>
                                        <div className="-mt-1 font-sans text-sm font-semibold text-ellipsis break-all ">{fundRaiserProfile?.email_id ?? ""}</div>
                                    </div>
                                </div>
                            </div>
                        </a>

                        <a href="#" className="gap-5 flex mt-5 w-full   bg-white   focus:ring-4 focus:outline-none focus:ring-gray-300 text-black rounded-lg  items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                            <div className='text-ellipsis'>
                                <div className="text-left mt-2 rtl:text-right w-fit">
                                    <div className="mb-3 text-xs">About this fund raiser</div>
                                    <div className="-mt-1 font-sans text-sm font-semibold">
                                        {/* {fundRaiserProfile?.about ?? ""} */}
                                        <EditInput as="textarea" rows={10} data={{ key: "about", value: fundRaiserProfile?.about }} isEditAllowed={() => true} label='About' onSubmit={onFundRaiserUpdate} uiCallback={(about) => about} >
                                            {fundRaiserProfile?.about}
                                        </EditInput>
                                    </div>
                                </div>
                            </div>
                        </a>

                        <a href="#" className="gap-5 flex mt-5 w-full   bg-white   focus:ring-4 focus:outline-none focus:ring-gray-300 text-black rounded-lg  items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                            <div className='text-ellipsis'>
                                <div className="text-left mt-2 rtl:text-right w-fit">
                                    <div className="mb-3 text-xs">Description</div>
                                    <div className="-mt-1 font-sans text-sm font-semibold">
                                        {/* {fundRaiserProfile?.description ?? ""} */}
                                        <EditInput as="textarea" rows={10} data={{ key: "description", value: fundRaiserProfile?.description }} isEditAllowed={() => true} label='Description' onSubmit={onFundRaiserUpdate} uiCallback={(description) => description} >
                                            {fundRaiserProfile?.description}
                                        </EditInput>
                                    </div>
                                </div>
                            </div>
                        </a>


                    </div>
                    <div className='w-3/4'>
                        <div className='grid grid-cols-3 flex gap-5 '>
                            <DashboardCard icon={null} classNames="bg-white shadow-inner border" title={"Target"} data={<EditInput data={{ key: "amount", value: fundRaiserProfile?.amount ?? "" }} isEditAllowed={() => true} label='Enter amount' onSubmit={onFundRaiserUpdate} uiCallback={(text) => { return `${text}${const_data.MONEY_ICON}` }}>{fundRaiserProfile?.amount}</EditInput>} />
                            <DashboardCard icon={null} classNames="bg-white shadow-inner border" title={"Collected"} data={`${fundRaiserProfile?.collected}${const_data.MONEY_ICON}`} />
                            <DashboardCard icon={null} classNames="bg-white shadow-inner border" title={"Deadline"} data={<EditInput type="date" data={{ key: "deadline", value: new Date(fundRaiserProfile?.deadline) }} isEditAllowed={() => true} label='New deadline' uiCallback={(newDate) => { return `${newDate}` }} onSubmit={onFundRaiserUpdate}>{new Date(fundRaiserProfile?.deadline).toLocaleDateString('en-GB')}</EditInput>} />
                            <DashboardCard icon={null} classNames="bg-white shadow-inner border" title={"Day's left"} data={dateLeft} />
                            <DashboardCard icon={null} classNames="bg-white shadow-inner border" title={"To go"} data={`${((fundRaiserProfile?.amount - fundRaiserProfile?.collected) < 0 ? `+${fundRaiserProfile?.amount - fundRaiserProfile?.collected}` : fundRaiserProfile?.amount - fundRaiserProfile?.collected)} ${const_data.MONEY_ICON}`} />
                            <DashboardCard icon={null} classNames="bg-white shadow-inner border" title={"Status"} data={status} />
                        </div>
                        <div className="mt-5 w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
                            <div className="flex justify-between">
                                <div>
                                    <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">{fundRaiserProfile?.collected} {const_data.MONEY_ICON}</h5>
                                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">has been collected</p>
                                </div>
                                <div
                                    className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                                    12%
                                    <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                                    </svg>
                                </div>
                            </div>

                            <div className='mt-5'>
                                <CanvasJSChart options={{
                                    ...fundRaiserGraph,
                                    data: [
                                        {
                                            ...fundRaiserGraph.data[0],
                                            dataPoints: graphDonation
                                        }
                                    ]
                                }}
                                />
                            </div>
                        </div>


                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
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
                                                                return <TableBody key={index} data={[index + 1, item.donation_id, item.name, `${item.name}${const_data.MONEY_ICON}`, formatDateToMonthNameAndDate(item.date)]} />
                                                            })
                                                        }
                                                    </table>
                                                </>
                                            ) : (
                                                <div className="mt-3 inline-table w-full">
                                                    <EmptyScreen msg="NO donation histrory on this profile" />
                                                </div>
                                            )
                                        }
                                    </>
                                }}
                                paginationProps={{ current_page: 1, currentLimit: 10 }}
                                refresh={null}
                            />
                        </div>

                        <LoadingComponent closeOnClick={false} isLoading={isPicsLoading} paddingNeed={false}>
                            <div className='bg-white shadow-inner border mt-5'>
                                <div className="container mx-auto px-4 py-2">
                                    <h2 className="text-2xl font-bold mb-6 mt-3">Image Gallery</h2>
                                    <div className="flex overflow-x-auto space-x-4 pb-4">
                                        <div className="flex-shrink-0 w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out">
                                            <label htmlFor="upload-input-pics" className="cursor-pointer">
                                                <FaCloudUploadAlt className="text-4xl text-gray-400" />
                                                <input id="upload-input-pics" type="file" accept="image/*" className="hidden" onChange={(e) => onFileUpload(e.target.files, FundRaiserFileType.Pictures)} />
                                            </label>
                                        </div>
                                        {images.map((image) => (
                                            <div
                                                key={Math.random()}
                                                className="flex-shrink-0 w-40 h-40 relative group"
                                            >
                                                <Image
                                                    width={32}
                                                    height={32}
                                                    alt=''
                                                    src={image}
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out rounded-lg flex items-center justify-center">
                                                    <button
                                                        onClick={() => onDelete(image, FundRaiserFileType.Pictures)}
                                                        className="text-white p-2 rounded-full bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                                        aria-label="Delete image"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </LoadingComponent>

                        <LoadingComponent closeOnClick={false} isLoading={isDocsLoading} paddingNeed={false}>
                            < div className='bg-white shadow-inner border mt-5'>
                                <div className="container mx-auto px-4 py-2">
                                    <h2 className="text-2xl font-bold mb-6 mt-3">Document&apos;s</h2>
                                    <div className="flex overflow-x-auto space-x-4 pb-4">
                                        <div className="flex-shrink-0 w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out">
                                            <label htmlFor="upload-input-docs" className="cursor-pointer">
                                                <FaCloudUploadAlt className="text-4xl text-gray-400" />
                                                <input id={`upload-input-docs`} type="file" accept="image/*" className="hidden" onChange={(e) => onFileUpload(e.target.files, FundRaiserFileType.Document)} />
                                            </label>
                                        </div>
                                        {documents.map((image) => (
                                            <div
                                                key={Math.random()}
                                                className="flex-shrink-0 w-40 h-40 relative group"
                                            >
                                                <Image
                                                    width={32}
                                                    height={32}
                                                    alt=''
                                                    src={image}
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out rounded-lg flex items-center justify-center">
                                                    <button
                                                        onClick={() => onDelete(image, FundRaiserFileType.Document)}
                                                        className="text-white p-2 rounded-full bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                                        aria-label="Delete image"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </LoadingComponent>

                    </div>
                </div>
            </LoadingDataNotFoundComponent>
        </AdminLayout >
    )
}

export default FundRaiserDetailView