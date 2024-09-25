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
import SliderComponent from '@/component/Util/SliderComponent'
import StatisticCard from '@/component/Util/StatisticCard'
import TableBody from '@/component/Util/Table/TableBody'
import TableHead from '@/component/Util/Table/TableHead'
import const_data from '@/util/data/const'
import { CChart } from '@coreui/react-chartjs'
import React from 'react'
import { IoMdAddCircle } from 'react-icons/io'


function FundRaiserView(): React.ReactElement {


    return (
        <div className='bg-gray-100'>
            <Header />
            <div className="container mx-auto mt-5 mb-5">
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
                                    <div className="mb-3 text-xs">About this fund raiser</div>
                                    <EditInput rows={6} onSubmit={() => { }} as='textarea' data={{ key: "about", value: "Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator. Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator." }} isEditAllowed={() => true}  >
                                        <div className="-mt-1 font-sans text-sm font-semibold">
                                            Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.
                                            Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.
                                        </div>
                                    </EditInput>
                                </div>
                            </div>
                        </div>

                        <a href="#" className="gap-5 flex mt-5 w-full   bg-white   focus:ring-4 focus:outline-none focus:ring-gray-300 text-black rounded-lg  items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                            <div className='text-ellipsis'>
                                <div className="text-left mt-2 rtl:text-right w-fit">
                                    <div className="mb-3 text-xs">Description</div>
                                    <div className="-mt-1 font-sans text-sm font-semibold">
                                        Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.
                                        Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.
                                    </div>
                                </div>
                            </div>
                        </a>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default FundRaiserView