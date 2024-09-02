import UpdateBloodGroup from "@/component/Blood/bloodAccountStart/UpdateBloodGroup"
import FileUpload from "@/component/FundRaiser/CreateSteps/FileUpload/FileUpload"
import FileSelectBox from "@/component/Util/FileSelectBox"
import ListImageFile from "@/component/Util/ListImageFile"
import { Fragment } from "react"


function ProductImages() {
    return (
        <Fragment>
            {/* <FileUpload state={() => { }} /> */}
            <div className="mb-5">
                <div className="flex gap-5">
                    <FileSelectBox id={"1"} onFileSelect={() => { }}>
                        <p className='text-sm text-center text-gray-600'>Upload Pictures</p>
                    </FileSelectBox>

                    <FileSelectBox id={"1"} onFileSelect={() => { }}>
                        <p className='text-sm text-center text-gray-600'>Upload Pictures</p>
                    </FileSelectBox>
                </div>
            </div>
        </Fragment>
    )
}

export default ProductImages