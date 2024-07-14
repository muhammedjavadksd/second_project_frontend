import React, { useContext, useEffect, useRef, useState } from 'react'
import CreateFormBackground from '../../CreateFormBackground'
import FileSelectBox from '@/_component/Util/FileSelectBox'
import ListImageFile from '@/_component/Util/ListImageFile'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { onFileDelete, onFileUpload } from './Logic';
import { OnGoingApplicationContext } from '@/app/_util/context/Context';
import const_data from '@/app/_util/_const/const';
import { useDispatch, useSelector } from 'react-redux';
import { updateFundRaiseData } from '@/external/redux/slicer/fundRaiserForm';

function FileUpload({ state }) {

  const imageRef = useRef(null);
  const documentRef = useRef(null);

  const [pictures, setPictures] = useState([]);
  const [Documents, setDocuments] = useState([]);
  const [checkValidation, setCheckValidation] = useState(false)
  const selectData = useSelector((store) => store.fund_raiser);
  const dispatch = useDispatch()


  useEffect(() => {
    console.log("Extra ");
    console.log(selectData);
  }, [selectData])

  useEffect(() => {
    if (selectData.pictures?.length) {
      setPictures(selectData.pictures)
    }
    if (selectData.documents?.length) {
      setDocuments(selectData.documents)
    }
  }, [selectData])


  const { currentApplication, setApplication } = useContext(OnGoingApplicationContext)
  const router = useRouter();

  function onSuccess(data) {
    console.log(selectData.documents);
    setPictures(data.pictures);
    setDocuments(data.documents)
  }

  function onError(err) {
    toast.error(err)
  }

  function ifNotLogged() {
    router.replace("/auth/sign_in")
  }

  function onFileDeleted(image_id, type) {
    const newImagesData = type == "Pictures" ? pictures : Documents
    const filterData = newImagesData.filter((each) => each != image_id);
    type == "Pictures" ? setPictures(filterData) : setDocuments(filterData);
    toast.success("Image deleted success")
  }


  function onNext() {
    setCheckValidation(true);
    if (Documents.length >= 3 && pictures.length >= 3) {
      dispatch(updateFundRaiseData({ documents: Documents }))
      dispatch(updateFundRaiseData({ pictures: pictures }))
      state((prev) => prev + 1)
    }
  }

  return (
    <div className='mb-5'>
      <CreateFormBackground>


        <div>
          <label htmlFor="">Select Picture's</label>
          <div className="flex mt-3">

            <div className='w-2/4'>
              <div
                onClick={() => imageRef.current.click()}>
                <FileSelectBox>
                  <input multiple ref={imageRef} accept='image/png, image/jpeg, image/jpg' type="file" onChange={(e) => {
                    // console.log(e.target.files);
                    onFileUpload([...e.target.files], onSuccess, onError, ifNotLogged, "Pictures", currentApplication)
                    imageRef.current.value = null
                  }} className='hidden' />
                </FileSelectBox>
              </div>
            </div>
            <div className="w-2/4">
              <div className='overflow-auto'>
                <ListImageFile onClose={(image_id) => onFileDelete(image_id, onFileDeleted, onError, "Pictures", currentApplication)} data={pictures} BASE_PATH={const_data.FUND_RAISE_IMAGE_URL} onDelete={() => { }} />
              </div>
            </div>

          </div>
          {checkValidation && (pictures.length < 3 && <span className='errorMessage'>Please select minimum 3 picture's</span>)}
        </div>

        <div className='mt-3'>
          <label htmlFor="">Select Document's</label>
          <div className="flex mt-3">
            <div className='w-2/4'>
              <div
                onClick={() => documentRef.current.click()}>
                <FileSelectBox>
                  <input multiple ref={documentRef} accept='image/png, image/jpeg, image/jpg' type="file" onChange={(e) => {
                    onFileUpload([...e.target.files], onSuccess, onError, ifNotLogged, "Document", currentApplication)
                    documentRef.current.value = null
                  }} className='hidden' />
                </FileSelectBox>
              </div>
            </div>
            <div className='w-2/4'>
              <ListImageFile onClose={(image_id) => onFileDelete(image_id, onFileDeleted, onError, "Document", currentApplication)} data={Documents} BASE_PATH={const_data.FUND_RAISE_DOCUMENT_URL} onDelete={() => { }} />
              {/* <UploadFilePlusButton /> */}
            </div>
          </div>
          {checkValidation && (Documents.length < 3 && <span className='errorMessage'>Please select minimum 3 document's</span>)}

        </div>


        <div className='ml-auto mt-5 w-full overflow-hidden gap-3 flex justify-end'>
          <button type="button" class="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => state((prev) => prev - 1)} ><i class="fa-solid fa-chevron-left"></i> Prev </button>
          <button type="button" class="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={onNext}>Next <i class="fa-solid fa-chevron-right"></i></button>
        </div>


      </CreateFormBackground >
    </div >
  )
}

export default FileUpload