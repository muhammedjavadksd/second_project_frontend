'use client'
import React, { useRef, useState } from 'react'
import AdminLayout from '@/component/Admin/AdminLayout'
import AdminPrivateRouter from '@/component/LoginComponent/AdminPrivateRouter'
import AdminBreadCrumb from '@/component/Util/AdminBreadCrumb'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import FileUpload from '@/component/FundRaiser/CreateSteps/FileUpload/FileUpload'
import FileSelectBox from '@/component/Util/FileSelectBox'
import { FundRaiserFileType } from '@/util/types/Enums/BasicEnums'
import ListImageFile from '@/component/Util/ListImageFile'
import const_data from '@/util/data/const'

function AdminFundRaiseAdd(): React.ReactElement {


    let [selectedPicturesAsBlob, setPictures] = useState([])
    let [selectedDocumentsAsBlob, setDocuments] = useState([])

    let [selectedPicturesAsNames, setSelectedPicturesAsNames] = useState([])
    let [selectedDocumentsAsName, setSelectedDocumentsAsName] = useState([])


    function onFileDelete(type: FundRaiserFileType, image) {
        if (type == FundRaiserFileType.Document) {
            let tempDocuments = [...selectedDocumentsAsBlob];
            let newImages = tempDocuments.filter((each) => each != image);
            setDocuments(newImages)
        } else {
            let tempPictures = [...selectedPicturesAsBlob];
            let newImages = tempPictures.filter((each) => each != image);
            console.log(tempPictures, image);
            console.log(image);


            setPictures(newImages)
        }
    }

    function onFileUpload(files, type: FundRaiserFileType) {

        if (type == FundRaiserFileType.Document) {

            let allowedImage = [...selectedDocumentsAsBlob]
            let images: File[] = Array.from(files)
            for (let index = 0; index < images.length; index++) {
                console.log(selectedDocumentsAsName)
                console.log(images[index].name);


                if (!selectedDocumentsAsName.includes(images[index].name)) {
                    // selectedDocumentsAsName.push(images[index].name)
                    setSelectedDocumentsAsName((prev) => [...prev, images[index].name])
                    allowedImage.push(URL.createObjectURL(images[index]))
                }
            }
            setDocuments(allowedImage)
        } else {
            let allowedImage = [...selectedPicturesAsBlob];
            let images: File[] = Array.from(files)
            for (let index = 0; index < images.length; index++) {
                if (!selectedPicturesAsNames.includes(images[index].name)) {
                    setSelectedPicturesAsNames((prev) => [...prev, images[index].name])
                    // selectedPicturesAsNames.push(images[index].name)
                    allowedImage.push(URL.createObjectURL(images[index]))
                }
            }
            setPictures(allowedImage)
        }
    }

    return (
        <AdminPrivateRouter>
            <AdminLayout>
                <AdminBreadCrumb title={"Add Fund Raiser"} root={{ title: "Dashboard", href: "/" }} paths={[{ title: "Fund Raiser's", href: "/fund_raising" }, { title: "Add", href: "/admin/fund_raising/add" }]} />

                <div className='mt-5'>
                    <div className="flex gap-10">
                        <div className="w-4/5">
                            <Formik onSubmit={() => { }} initialValues={{}} >
                                <Form>
                                    <div className="grid flex gap-10 grid-cols-2 mb-5">
                                        <div>
                                            <label htmlFor="" className='text-sm  mb-2 block'>Enter amount</label>
                                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>
                                        <div>
                                            <label htmlFor="" className='text-sm mb-2 block'>Category</label>
                                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>
                                    </div>
                                    <div className="grid flex gap-10 grid-cols-2 mb-5">
                                        <div>
                                            <label htmlFor="" className='text-sm mb-2 block'>Sub category</label>
                                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>
                                        <div>
                                            <label htmlFor="" className='text-sm mb-2 block'>Phone number</label>
                                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>
                                    </div>
                                    <div className="grid flex gap-10 grid-cols-2 mb-5">
                                        <div>
                                            <label htmlFor="" className='text-sm mb-2 block'>Email ID</label>
                                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>
                                        <div>
                                            <label htmlFor="" className='text-sm mb-2 block'>Age</label>
                                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>
                                    </div>
                                    <div className="grid flex gap-10 grid-cols-2 mb-5">
                                        <div>
                                            <label htmlFor="" className='text-sm mb-2 block'>About</label>
                                            <textarea rows={5} name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>
                                        <div>
                                            <label htmlFor="" className='text-sm mb-2 block'>AI Description</label>
                                            <textarea rows={5} name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>
                                    </div>
                                    <div className="grid flex gap-10 grid-cols-2 mb-5">
                                        <div>
                                            <label htmlFor="" className='text-sm mb-2 block'>Dead line</label>
                                            <input type="date" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>
                                        <div>
                                            <label htmlFor="" className='text-sm mb-2 block'>Full name</label>
                                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>
                                    </div>
                                    <div className="grid flex gap-10 grid-cols-2 mb-5">
                                        <div>
                                            <label htmlFor="" className='text-sm mb-2 block'>City</label>
                                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>
                                        <div>
                                            <label htmlFor="" className='text-sm mb-2 block'>District</label>
                                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>
                                    </div>
                                    <div className="grid flex gap-10 grid-cols-2 mb-5">
                                        <div>
                                            <label htmlFor="" className='text-sm mb-2 block'>Full address</label>
                                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>
                                        <div>
                                            <label htmlFor="" className='text-sm mb-2 block'>Pin code</label>
                                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>
                                    </div>
                                    <div className="grid flex gap-10 grid-cols-2 mb-5">
                                        <div>
                                            <label htmlFor="" className='text-sm mb-2 block'>State</label>
                                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>

                                    </div>

                                    <div className='w-100 ml-auto'>
                                        <button type='submit' className='bg-blue-600 text-white py-3 rounded-lg px-8'>Save</button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                        <div className="w-1/5">
                            <div className='mt-5'>

                                <div className='mb-5'>
                                    <FileSelectBox id={FundRaiserFileType.Pictures} onFileSelect={(e) => onFileUpload(e.target.files, FundRaiserFileType.Pictures)}>
                                        <p className='text-sm text-center text-gray-600'>Upload Pictures</p>
                                    </FileSelectBox>
                                    <div className='mt-3'>
                                        <ListImageFile BASE_PATH={null} data={selectedPicturesAsBlob} onClose={(image) => onFileDelete(FundRaiserFileType.Pictures, image)}></ListImageFile>
                                    </div>
                                </div>

                                <div className='mb-5'>
                                    <FileSelectBox id={FundRaiserFileType.Document} onFileSelect={(e) => onFileUpload(e.target.files, FundRaiserFileType.Document)}>
                                        <p className='text-sm text-center text-gray-600'>Upload Documents</p>
                                    </FileSelectBox>
                                    <div className='mt-3'>
                                        <ListImageFile BASE_PATH={null} data={selectedDocumentsAsBlob} onClose={(image) => { onFileDelete(FundRaiserFileType.Document, image) }}></ListImageFile>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

            </AdminLayout>
        </AdminPrivateRouter >
    )
}

export default AdminFundRaiseAdd
