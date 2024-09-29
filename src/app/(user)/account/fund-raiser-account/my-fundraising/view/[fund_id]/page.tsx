"use client"
import AccountTab from '@/component/Account/AccountTab/ProfileTab'
import Header from '@/component/Header/Header'
import BreadCrumb from '@/component/Util/BreadCrumb'
import EditInput from '@/component/Util/EditInput'
import Footer from '@/component/Util/Footer'
import ImageItem from '@/component/Util/ImageItem'
import ListImageFile from '@/component/Util/ListImageFile'
import ModelHeader from '@/component/Util/Model/ModelHeader'
import ModelHeaderWithTile from '@/component/Util/Model/ModelHeaderWithTile'
import ModelItem from '@/component/Util/ModelItem'
import SliderComponent from '@/component/Util/SliderComponent'
import StatisticCard from '@/component/Util/StatisticCard'
import TableBody from '@/component/Util/Table/TableBody'
import TableHead from '@/component/Util/Table/TableHead'
import const_data from '@/util/data/const'
import { addBankAccount } from '@/util/data/helper/APIHelper'
import { fundRaiserBankAccoutInitialValues } from '@/util/external/yup/initialValues'
import { editFundRaiseAboutValidation, editFundRaiseDescriptionValidation, fundRaiserBankAccoutValidation } from '@/util/external/yup/yupValidations'
import { IBankAccount } from '@/util/types/API Response/FundRaiser'
import { BankAccountType } from '@/util/types/Enums/BasicEnums'
import { CChart } from '@coreui/react-chartjs'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useParams } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { FaEdit, FaPlus, FaStar, FaTrash } from 'react-icons/fa'
import { IoMdAddCircle } from 'react-icons/io'
import { toast } from 'react-toastify'


function FundRaiserView(): React.ReactElement {

    const [isEditDescriptionOpen, toggleDescription] = useState(false)
    const [isEditAboutOpen, toggleAbout] = useState(false)
    const [isAddBankAccountOpen, toggleBankAccount] = useState(false)
    const { fund_id } = useParams()
    const addBankAccountForm = useRef(null);


    const [accounts, setAccounts] = useState<IBankAccount[]>([])

    function onAddBankAccount(val) {
        addBankAccount(fund_id, val).then((data) => {
            if (data.status) {
                val.account_id = data.data
                setAccounts((prev) => [...prev, val])
                toast.success("Bank account created success")
                addBankAccountForm.current.resetForm()
                toggleBankAccount(false)
            } else {
                toast.error(data.msg)
            }
        }).catch((err) => {
            toast.error("Something went wrong")
        })
    }

    return (
        <div className='bg-gray-100'>
            <Header />

            <ModelItem ZIndex={99} closeOnOutSideClock={true} isOpen={isEditAboutOpen} onClose={() => toggleAbout(false)}>
                <ModelHeader title="Edit about content"></ModelHeader>
                <div className='bg-white p-5 w-96'>
                    <Formik initialValues={{}} validationSchema={editFundRaiseAboutValidation} onSubmit={() => { }}>
                        <Form>
                            <div className='w-full rounded-lg  block'>
                                <label htmlFor="about" className='text-sm mb-2 block'>About content</label>
                                <Field type="text" rows='5' as="textarea" name="about" id="about" placeholder="Enter about content" className="block shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full" />
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
                <ModelHeader title="Edit description content"></ModelHeader>
                <div className='bg-white p-5 w-96'>
                    <Formik initialValues={{}} validationSchema={editFundRaiseDescriptionValidation} onSubmit={() => { }}>
                        <Form>
                            <div className='w-full rounded-lg  block'>
                                <label htmlFor="description" className='text-sm mb-2 block'>Description</label>
                                <Field type="text" rows='5' as="textarea" name="description" id="description" placeholder="Enter description content" className="block shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full" />
                                <ErrorMessage className='errorMessage' component="div" name='description' />
                            </div>
                            <button type="submit" className="mt-3 col-span-2 w-full bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300">
                                Save
                            </button>
                        </Form>
                    </Formik>
                </div>
            </ModelItem>

            <ModelItem ZIndex={99} closeOnOutSideClock={true} isOpen={isAddBankAccountOpen} onClose={() => toggleBankAccount(false)}>
                <ModelHeader title="Add bank account"></ModelHeader>
                <div className='bg-white p-5 w-96'>
                    <Formik innerRef={addBankAccountForm} initialValues={fundRaiserBankAccoutInitialValues} validationSchema={fundRaiserBankAccoutValidation} onSubmit={(val) => { onAddBankAccount(val) }}>
                        <Form>
                            <div className='w-full rounded-lg  block mb-2.5'>
                                <label htmlFor="holder_name" className='text-sm mb-1 block'>Account holder name</label>
                                <Field type="text" name="holder_name" id="holder_name" placeholder="Enter account holder name" className="block shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full" />
                                <ErrorMessage className='errorMessage' component="div" name='holder_name' />
                            </div>
                            <div className='w-full rounded-lg  block mb-2.5'>
                                <label htmlFor="account_number" className='text-sm mb-2 block'>Account number</label>
                                <Field type="text" name="account_number" id="account_number" placeholder="Enter account number" className="block shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full" />
                                <ErrorMessage className='errorMessage' component="div" name='account_number' />
                            </div>
                            <div className='w-full rounded-lg  block mb-2.5'>
                                <label htmlFor="re_account_number" className='text-sm mb-2 block'>Re enter account number</label>
                                <Field type="text" name="re_account_number" id="re_account_number" placeholder="Re enter account number" className="block shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full" />
                                <ErrorMessage className='errorMessage' component="div" name='re_account_number' />
                            </div>
                            <div className='w-full rounded-lg  block mb-2.5'>
                                <label htmlFor="ifsc_code" className='text-sm mb-1 block'>IFSC Code</label>
                                <Field type="text" name="ifsc_code" id="ifsc_code" placeholder="Enter IFSC Code" className="block shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full" />
                                <ErrorMessage className='errorMessage' component="div" name='ifsc_code' />
                            </div>
                            <div className='w-full rounded-lg  block mb-2.5'>
                                <label htmlFor="account_type" className='text-sm mb-1 block'>Account Type</label>
                                <Field as="select" type="text" name="account_type" id="account_type" placeholder="Enter account type" className="block shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full">
                                    <option>Select bank account</option>
                                    {
                                        Object.values(BankAccountType).map((each) => {
                                            return <option value={each}>{each}</option>
                                        })
                                    }
                                </Field>
                                <ErrorMessage className='errorMessage' component="div" name='account_type' />
                            </div>
                            <button type="submit" className="mt-3 col-span-2 w-full bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300">
                                Save
                            </button>
                        </Form>
                    </Formik>
                </div>
            </ModelItem>

            <div className="container mx-auto mt-5 pb-5">
                <div className="mb-5">
                    <BreadCrumb path={['Home', 'Profile', 'My Fund Raising', 'Raising Name-ID']} />
                </div>
                <div className="flex gap-5">
                    <div className='w-full'>
                        <div className="mb-4 bg-white shadow-inner border  p-3 flex justify-between items-center">
                            <div>
                                <h4 className="text-2xl font-bold">Muhammed Javad Education Support Post</h4>
                                <p>Here is complete report for Muhammed Javad</p>
                            </div>
                            <div className="gap-5 flex">
                                <button onClick={() => { }} className="bg-green-800 px-5 py-2 text-white rounded-md">Download report</button>
                                <button onClick={() => { }} className="bg-red-800 px-5 py-2 text-white rounded-md">Close post</button>
                            </div>
                        </div>
                        <div className="grid gap-5 grid-cols-4">
                            <div className='bg-white rounded-lg items-center p-4 gap-3 flex shadow-inner border'>
                                <div>
                                    <div> Amount collected </div>
                                    <span className='font-bold text-2xl'>{const_data.MONEY_ICON}2500</span>
                                    <div className='flex mt-3 gap-2'>
                                        <span className=' text-green-800 font-bold px-3 text-sm bg-green-300  rounded-lg'>4% </span>
                                        <span>June 31 2023</span>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white rounded-lg items-center p-4 gap-3 flex shadow-inner border'>
                                <div>
                                    <div> Total Amount  </div>
                                    <span className='font-bold text-2xl'>{const_data.MONEY_ICON}2500</span>
                                    <div className='flex mt-3 gap-2'>
                                        <span className=' text-green-800 font-bold px-3 text-sm bg-green-300  rounded-lg'>4% </span>
                                        <span>June 31 2023</span>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white rounded-lg items-center p-4 gap-3 flex shadow-inner border'>
                                <div>
                                    <div> Amount collected </div>
                                    <span className='font-bold text-2xl'>{const_data.MONEY_ICON}2500</span>
                                    <div className='flex mt-3 gap-2'>
                                        <span className=' text-green-800 font-bold px-3 text-sm bg-green-300  rounded-lg'>4% </span>
                                        <span>June 31 2023</span>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white rounded-lg items-center p-4 gap-3 flex shadow-inner border'>
                                <div>
                                    <div> Amount collected </div>
                                    <span className='font-bold text-2xl'>{const_data.MONEY_ICON}2500</span>
                                    <div className='flex mt-3 gap-2'>
                                        <span className=' text-green-800 font-bold px-3 text-sm bg-green-300  rounded-lg'>4% </span>
                                        <span>June 31 2023</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-5 flex gap-5'>
                    <div className="w-3/4">
                        <div className='bg-white p-3 rounded-md'>
                            <CChart
                                type="line"
                                data={{
                                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                                    datasets: [
                                        {
                                            label: "My First dataset",
                                            backgroundColor: "rgba(220, 220, 220, 0.2)",
                                            borderColor: "rgba(220, 220, 220, 1)",
                                            pointBackgroundColor: "rgba(220, 220, 220, 1)",
                                            pointBorderColor: "#fff",
                                            data: [40, 20, 12, 39, 10, 40, 39, 80, 40]
                                        },
                                        {
                                            label: "My Second dataset",
                                            backgroundColor: "rgba(151, 187, 205, 0.2)",
                                            borderColor: "rgba(151, 187, 205, 1)",
                                            pointBackgroundColor: "rgba(151, 187, 205, 1)",
                                            pointBorderColor: "#fff",
                                            data: [50, 12, 28, 29, 7, 25, 12, 70, 60]
                                        },
                                    ],
                                }}
                                options={{
                                    plugins: {
                                        legend: {
                                            labels: {

                                            }
                                        }
                                    },
                                    scales: {
                                        x: {
                                            grid: {

                                            },
                                            ticks: {

                                            },
                                        },
                                        y: {
                                            grid: {

                                            },
                                            ticks: {

                                            },
                                        },
                                    },
                                }}
                            />
                        </div>



                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <>
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mt-4">
                                    <TableHead head={['ID', 'Donation ID', 'Name', 'Amount', 'Date']} />
                                    <TableBody data={['123', 'rnjwej', 'Muhammed Javad', `100${const_data.MONEY_ICON}`, '12th may']} />
                                    <TableBody data={['123', 'rnjwej', 'Muhammed Javad', `100${const_data.MONEY_ICON}`, '12th may']} />
                                    <TableBody data={['123', 'rnjwej', 'Muhammed Javad', `100${const_data.MONEY_ICON}`, '12th may']} />
                                    <TableBody data={['123', 'rnjwej', 'Muhammed Javad', `100${const_data.MONEY_ICON}`, '12th may']} />
                                </table>
                            </>
                        </div>


                        <div className='mt-3 mb-3'>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <h4 className='text-2xl font-bold '>Bank account's</h4>
                                    <p>Manage your bank account's from here</p>
                                </div>
                                <button onClick={() => toggleBankAccount(true)} className='flex bg-green-500 p-2 text-white border shadow-inner items-center gap-x-3 rounded-lg'>
                                    <FaPlus />
                                    Add bank account
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {accounts.map((account) => (
                                <div
                                    key={account.account_id}
                                    className={`bg-white rounded-lg shadow-md p-6 transition-all duration-300 ${account.is_active ? "ring-2 ring-blue-500" : ""
                                        }`}
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-semibold">{account.holder_name}</h2>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => { }}
                                                className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                                                aria-label="Edit account"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => { }}
                                                className="text-red-500 hover:text-red-600 transition-colors duration-200"
                                                aria-label="Delete account"
                                            >
                                                <FaTrash />
                                            </button>
                                            <button
                                                onClick={() => { }}
                                                className={`${account.is_active ? "text-yellow-500" : "text-gray-400"} hover:text-yellow-600 transition-colors duration-200`}
                                                aria-label={`${account.is_active ? "Active account" : "Make account active"}`}
                                            >
                                                <FaStar />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p>
                                            <span className="font-semibold">Account Number:</span>{" "}
                                            {account.account_number}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Account Holder:</span>{" "}
                                            {account.holder_name}
                                        </p>
                                        <p>
                                            <span className="font-semibold">IFSC Code:</span>
                                            {account.ifsc_code}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                    <div className="w-1/4">
                        <div className="mb-5 picturesList shadow-inner border  overflow-auto">
                            <ModelHeaderWithTile title='Manage pictures'>
                                <button className='text-white'><IoMdAddCircle /></button>
                            </ModelHeaderWithTile>
                            <ImageItem onClose={(e) => { }} imageName={"Image one.jpeg"} imageURL={'https://kettocdn.gumlet.io/media/campaigns/944000/944330/image/kMVdRrxJy0hBG4OyI9MWGazxTbpJsTpb71CQbDN2.jpg?w=768&dpr=2.0'}></ImageItem>
                            <ImageItem onClose={(e) => { }} imageName={"Image two.jpeg"} imageURL={'https://kettocdn.gumlet.io/media/campaigns/944000/944330/image/kMVdRrxJy0hBG4OyI9MWGazxTbpJsTpb71CQbDN2.jpg?w=768&dpr=2.0'}></ImageItem>
                            <ImageItem onClose={(e) => { }} imageName={"Image three.jpeg"} imageURL={'https://kettocdn.gumlet.io/media/campaigns/944000/944330/image/kMVdRrxJy0hBG4OyI9MWGazxTbpJsTpb71CQbDN2.jpg?w=768&dpr=2.0'}></ImageItem>
                        </div>
                        <div className="mb-5 picturesList shadow-inner border  overflow-auto">
                            <ModelHeaderWithTile title='Manage Documents'>
                                <button className='text-white'><IoMdAddCircle /></button>
                            </ModelHeaderWithTile>
                            <ImageItem onClose={(e) => { }} imageName={"Image one.jpeg"} imageURL={'https://kettocdn.gumlet.io/media/campaigns/944000/944330/image/kMVdRrxJy0hBG4OyI9MWGazxTbpJsTpb71CQbDN2.jpg?w=768&dpr=2.0'}></ImageItem>
                            <ImageItem onClose={(e) => { }} imageName={"Image two.jpeg"} imageURL={'https://kettocdn.gumlet.io/media/campaigns/944000/944330/image/kMVdRrxJy0hBG4OyI9MWGazxTbpJsTpb71CQbDN2.jpg?w=768&dpr=2.0'}></ImageItem>
                            <ImageItem onClose={(e) => { }} imageName={"Image three.jpeg"} imageURL={'https://kettocdn.gumlet.io/media/campaigns/944000/944330/image/kMVdRrxJy0hBG4OyI9MWGazxTbpJsTpb71CQbDN2.jpg?w=768&dpr=2.0'}></ImageItem>
                        </div>

                        <div className="gap-5 flex mt-5 w-full   bg-white   focus:ring-4 focus:outline-none focus:ring-gray-300 text-black rounded-lg  items-center justify-center px-4 py-2.5">
                            <div className='text-ellipsis w-full'>
                                <div className="text-left mt-2 w-full rtl:text-right">
                                    <div className='flex justify-between mb-2'>
                                        <div className="mb-3 text-xs">About this fund raiser</div>
                                        <i onClick={() => toggleAbout(true)} className="cursor-pointer  fa-solid text-sm fa-pencil" title='Edit about content'></i>
                                    </div>

                                    {/* <EditInput rows={6} onSubmit={() => { }} as='textarea' data={{ key: "about", value: "Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator. Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator." }} isEditAllowed={() => true}  > */}
                                    <div className="-mt-1 font-sans text-sm font-semibold">
                                        Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.
                                        Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.
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
                                        Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.
                                        Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default FundRaiserView