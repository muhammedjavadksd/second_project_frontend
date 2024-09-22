import React, { useContext, useEffect, useRef, useState } from 'react'
import CreateFormBackground from '../../CreateFormBackground'
import FileSelectBox from '@/component/Util/FileSelectBox'
import ListImageFile from '@/component/Util/ListImageFile'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { onFileDelete, onFileUpload } from './Logic';
import { OnGoingApplicationContext } from '@/util/context/Context';
import const_data from '@/util/data/const';
import { useDispatch, useSelector } from 'react-redux';
import { updateFundRaiseData } from '@/util/external/redux/slicer/fundRaiserForm';
import { IReduxStore } from '@/util/types/InterFace/UtilInterface';
import { FileAcceptType, FundRaiserFileType } from '@/util/types/Enums/BasicEnums';
import LoadingComponent from '@/component/Util/LoadingComponent';

function FileUpload({ state }) {

  const imageRef = useRef(null);
  const documentRef = useRef(null);

  const [pictures, setPictures] = useState([]);
  const [Documents, setDocuments] = useState([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [checkValidation, setCheckValidation] = useState(false)
  const selectData = useSelector((store: IReduxStore) => store.fund_raiser);
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
    setLoading(false)

  }

  function onError(err) {
    toast.error(err)
    setLoading(false)
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


  const handleFileSelect = (event, type) => {
    event.stopPropagation()
    const files = event.target.files;
    if (files.length) {
      setLoading(true)
      onFileUpload([...files], onSuccess, onError, ifNotLogged, type, currentApplication);
      switch (type) {
        case FundRaiserFileType.Pictures:
          // imageRef.current.value = null
          break
        case FundRaiserFileType.Document:
          // documentRef.current.value = null
          break
        default:
          break;
      }
    }
  };

  return (
    <div className='mb-5'>
      <LoadingComponent closeOnClick={false} paddingNeed={false} isLoading={isLoading}>
        <CreateFormBackground>


          <div>
            <label htmlFor="">Select Picture's</label>
            <div className="flex mt-3">
              <div className='w-2/4'>
                <div>
                  <FileSelectBox accept={FileAcceptType.BasicImage} id={FundRaiserFileType.Pictures} onFileSelect={(e) => handleFileSelect(e, FundRaiserFileType.Pictures)} />
                </div>
              </div>
              <div className="w-2/4">
                <div className='overflow-auto'>
                  <ListImageFile onClose={(image_id) => onFileDelete(image_id, onFileDeleted, onError, "Pictures", currentApplication)} data={pictures} BASE_PATH={null} />
                </div>
              </div>
            </div>
            {checkValidation && (pictures.length < 3 && <span className='errorMessage'>Please select minimum 3 picture's</span>)}
          </div>

          <div className='mt-3'>
            <label htmlFor="">Select Document's</label>
            <div className="flex mt-3">
              <div className='w-2/4'>
                <div>
                  <FileSelectBox accept={FileAcceptType.BasicImage} id={FundRaiserFileType.Document} onFileSelect={(event) => handleFileSelect(event, FundRaiserFileType.Document)} />
                </div>
              </div>
              <div className='w-2/4'>
                <ListImageFile onClose={(image_id) => onFileDelete(image_id, onFileDeleted, onError, "Document", currentApplication)} data={Documents} BASE_PATH={null} />
              </div>
            </div>
            {checkValidation && (Documents.length < 3 && <span className='errorMessage'>Please select minimum 3 document's</span>)}

          </div>


          <div className='ml-auto mt-5 w-full overflow-hidden gap-3 flex justify-end'>
            <button type="button" className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => state((prev) => prev - 1)} ><i className="fa-solid fa-chevron-left"></i> Prev </button>
            <button type="button" className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={onNext}>Next <i className="fa-solid fa-chevron-right"></i></button>
          </div>


        </CreateFormBackground >
      </LoadingComponent>
    </div >
  )
}

export default FileUpload