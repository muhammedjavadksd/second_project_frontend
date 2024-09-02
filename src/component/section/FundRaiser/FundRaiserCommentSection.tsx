import CommentItemRender from "@/component/FundRaiser/CommenItemRender"
import EmptyScreen from "@/component/Util/EmptyScreen"
import PaginationSection from "@/component/Util/PaginationSection"
import { getPaginatedComments } from "@/util/data/helper/APIHelper"
import { onCommentPost } from "@/util/external/yup/formSubmission"
import { ISingleCommentsResponse } from "@/util/types/API Response/FundRaiser"
import { Field, Form, Formik } from "formik"
import { useRouter } from "next/navigation"
import { useState } from "react"



function FundRaiserCommentSection({ fund_id }) {

    const router = useRouter()
    const [reCallComments, callComments] = useState(false);

    return (
        <>
            <div className='mb-3'>
                <Formik initialValues={{ comment: "" }} onSubmit={async (val, { resetForm }) => {
                    const save = await onCommentPost(val.comment, fund_id, () => {
                        router.replace("/auth/sign_in")
                    })
                    if (save) {
                        callComments(!reCallComments)
                    }
                    resetForm()
                }}>
                    <Form>
                        <div className='w-full rounded-lg bg-gray-100 p-5'>
                            <div className='flex items-center gap-x-5'>
                                {/* <AvatarIcon name={"Muhammed Javad"} /> */}
                                <div className='w-full flex gap-3 border-l-0 border-t-0 border-r-0  border-b '>
                                    <Field name="comment" id="comment" placeHolder="Add a comment" className="w-full  bg-transparent outline-none" />
                                    <button className=' px-2 text-sm py-1  text-black rounded-lg'>Post</button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>

            <PaginationSection
                refresh={reCallComments}
                api={{
                    renderType: (page, limit) => {
                        console.log(page, limit)
                        return getPaginatedComments(limit, page, fund_id.toString())
                    }
                }}
                paginationProps={{
                    current_page: 1,
                    currentLimit: 2
                }}
                itemsRender={(commends: ISingleCommentsResponse[]) => {
                    return (
                        <>
                            {
                                commends.length ? (
                                    <>
                                        {
                                            commends.map((cmd) => {
                                                return <CommentItemRender cmd={cmd}></CommentItemRender>
                                            })
                                        }
                                    </>
                                ) : (
                                    <>
                                        <EmptyScreen msg='No comments found' />
                                    </>
                                )
                            }
                        </>
                    )
                }} />

        </>
    )
}

export default FundRaiserCommentSection