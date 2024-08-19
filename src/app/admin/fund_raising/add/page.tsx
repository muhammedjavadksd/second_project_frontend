'use client'
import React, { useRef, useState } from 'react'
import AdminLayout from '@/component/Admin/AdminLayout'
import AdminPrivateRouter from '@/component/LoginComponent/AdminPrivateRouter'
import AdminBreadCrumb from '@/component/Util/AdminBreadCrumb'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import FileUpload from '@/component/FundRaiser/CreateSteps/FileUpload/FileUpload'
import FileSelectBox from '@/component/Util/FileSelectBox'
import { AdminCreateFundRaiserStatus, FundRaiserFileType, FundRaiserStatus } from '@/util/types/Enums/BasicEnums'
import ListImageFile from '@/component/Util/ListImageFile'
import const_data from '@/util/data/const'
import { addFundRaiserValidation, addFundRasierInitialValue } from './data'
import { toast } from 'react-toastify'
import { onFundRaiserSubmit } from './logic'

function AdminFundRaiseAdd(): React.ReactElement {


    let [selectedPicturesAsBlob, setPictures] = useState([])
    let [selectedDocumentsAsBlob, setDocuments] = useState([])

    let [selectedPicturesAsNames, setSelectedPicturesAsNames] = useState([])
    let [selectedDocumentsAsName, setSelectedDocumentsAsName] = useState([])


    let [subCategory, setSubCategory] = useState([])


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
                {/* <button onClick={() => onFundRaiserSubmit({}, () => { }, () => { })}>Click</button> */}
                <div className='mt-5'>
                    <div className="flex gap-10">
                        <div className="w-4/5">
                            <Formik
                                onSubmit={(val, { resetForm }) => {
                                    if (selectedDocumentsAsBlob.length < 2) {
                                        toast.error("Please upload minimum 3 documents")
                                    } else if (selectedDocumentsAsBlob.length < 2) {
                                        toast.error("Please upload minimum 3 pictures")
                                    } else {
                                        onFundRaiserSubmit(val, () => {
                                            resetForm();
                                            toast.success("Fund raiser created success")
                                            setSelectedDocumentsAsName([]);
                                            setSelectedPicturesAsNames([])
                                            setPictures([])
                                            setDocuments([])
                                        }, (msg) => {
                                            toast.error(msg)
                                        }, selectedPicturesAsBlob, selectedDocumentsAsBlob)
                                    }
                                }}
                                validationSchema={addFundRaiserValidation}
                                initialValues={addFundRasierInitialValue}
                            >
                                {({ values, setFieldValue, setFieldTouched, handleSubmit }) => (
                                    <Form>
                                        <div className="grid flex gap-10 grid-cols-2 mb-5">
                                            <div>
                                                <label htmlFor="" className='text-sm  mb-2 block'>Enter amount</label>
                                                <Field type="number" name="amount" id="amount" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter amount for the fund raise" />
                                                <ErrorMessage className='errorMessage' component={"div"} name='amount'></ErrorMessage>
                                            </div>
                                            <div>
                                                <label htmlFor="" className='text-sm mb-2 block'>Category</label>
                                                <Field onChange={(e) => {
                                                    setSubCategory(const_data.FUNDRAISER_CATEGORY[e.target.value])
                                                    setFieldValue("category", e.target.value)
                                                }
                                                } as="select" name="category" id="category" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" >
                                                    <option>Select the category</option>
                                                    {
                                                        Object.keys(const_data.FUNDRAISER_CATEGORY).map((item) => {
                                                            return <option value={item}>{item}</option>
                                                        })
                                                    }
                                                </Field>
                                                <ErrorMessage className='errorMessage' component={"div"} name='category'></ErrorMessage>

                                            </div>
                                        </div>
                                        <div className="grid flex gap-10 grid-cols-2 mb-5">
                                            <div>
                                                <label htmlFor="" className='text-sm mb-2 block'>Sub category</label>
                                                <Field as="select" name="sub_category" id="sub_category" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" >
                                                    <option>Select the sub category</option>
                                                    {
                                                        subCategory.map((item) => {
                                                            return <option value={item}>{item}</option>
                                                        })
                                                    }
                                                </Field>
                                                <ErrorMessage className='errorMessage' component={"div"} name='sub_category'></ErrorMessage>

                                            </div>
                                            <div>
                                                <label htmlFor="" className='text-sm mb-2 block'>Phone number</label>
                                                <Field type="number" name="phone_number" id="phone_number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your phone number" />
                                                <ErrorMessage className='errorMessage' component={"div"} name='phone_number'></ErrorMessage>

                                            </div>
                                        </div>
                                        <div className="grid gap-10 grid-cols-2 mb-5">
                                            <div>
                                                <label htmlFor="" className='text-sm mb-2 block'>Email ID</label>
                                                <Field type="text" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" />
                                                <ErrorMessage className='errorMessage' component={"div"} name='email'></ErrorMessage>
                                            </div>
                                            <div>
                                                <label htmlFor="" className='text-sm mb-2 block'>Age</label>
                                                <Field type="number" name="age" id="age" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter the age" />
                                                <ErrorMessage className='errorMessage' component={"div"} name='age'></ErrorMessage>
                                            </div>
                                        </div>
                                        <div className="grid gap-10 grid-cols-2 mb-5">
                                            <div>
                                                <label htmlFor="" className='text-sm mb-2 block'>About</label>
                                                <Field rows={5} name="about" id="about" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="About the fund raiser" />
                                                <ErrorMessage className='errorMessage' component={"div"} name='about'></ErrorMessage>
                                            </div>
                                            <div>
                                                <label htmlFor="" className='text-sm mb-2 block'>Description</label>
                                                <Field rows={5} name="description" id="description" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Write a description about the fund raiser" />
                                                <ErrorMessage className='errorMessage' component={"div"} name='description'></ErrorMessage>

                                            </div>
                                        </div>
                                        <div className="grid  gap-10 grid-cols-2 mb-5">
                                            <div>
                                                <label htmlFor="" className='text-sm mb-2 block'>Dead line</label>
                                                <Field type="date" name="deadline" id="deadline" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Select the deadline" />
                                                <ErrorMessage className='errorMessage' component={"div"} name='deadline'></ErrorMessage>
                                            </div>
                                            <div>
                                                <label htmlFor="" className='text-sm mb-2 block'>Full name</label>
                                                <Field type="text" name="full_name" id="full_name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter full name" />
                                                <ErrorMessage className='errorMessage' component={"div"} name='full_name'></ErrorMessage>

                                            </div>
                                        </div>
                                        <div className="grid   gap-10 grid-cols-2 mb-5">
                                            <div>
                                                <label htmlFor="" className='text-sm mb-2 block'>City</label>
                                                <Field type="text" name="city" id="city" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter the fund raiser city" />
                                                <ErrorMessage className='errorMessage' component={"div"} name='city'></ErrorMessage>
                                            </div>
                                            <div>
                                                <label htmlFor="" className='text-sm mb-2 block'>District</label>
                                                <Field type="text" name="district" id="district" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter fund raiser district" />
                                                <ErrorMessage className='errorMessage' component={"div"} name='district'></ErrorMessage>
                                            </div>
                                        </div>
                                        <div className="grid   gap-10 grid-cols-2 mb-5">
                                            <div>
                                                <label htmlFor="" className='text-sm mb-2 block'>Full address</label>
                                                <Field type="text" name="address" id="address" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter fund raiser address" />
                                                <ErrorMessage className='errorMessage' component={"div"} name='address'></ErrorMessage>
                                            </div>
                                            <div>
                                                <label htmlFor="" className='text-sm mb-2 block'>Pin code</label>
                                                <Field type="number" name="pin_code" id="pincode" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter fund raiser pincode" />
                                                <ErrorMessage className='errorMessage' component={"div"} name='pin_code'></ErrorMessage>

                                            </div>
                                        </div>
                                        <div className="grid   gap-10 grid-cols-2 mb-5">
                                            <div>
                                                <label htmlFor="" className='text-sm mb-2 block'>State</label>
                                                <Field type="text" name="state" id="state" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter fund raiser state" />
                                                <ErrorMessage className='errorMessage' component={"div"} name='state'></ErrorMessage>

                                            </div>

                                            <div>
                                                <label htmlFor="" className='text-sm mb-2 block'>Status</label>
                                                <Field as="select" name="status" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                                                    <option >Select the status</option>
                                                    {
                                                        Object.values(AdminCreateFundRaiserStatus).map((each) => {
                                                            return (
                                                                <option value={each}>{each}</option>
                                                            )
                                                        })
                                                    }
                                                </Field>
                                                <ErrorMessage className='errorMessage' component={"div"} name='status'></ErrorMessage>

                                                {/* <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address"  /> */}
                                            </div>

                                        </div>

                                        <div className='w-100 ml-auto'>
                                            <button type='submit' className='bg-blue-600 text-white py-3 rounded-lg px-8'>Save</button>
                                        </div>

                                    </Form>
                                )}
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
