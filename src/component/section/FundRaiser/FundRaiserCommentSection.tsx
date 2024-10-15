import FundRaiserComment from "@/component/FundRaiser/FundRaiserComment"
import CustomeConfirmUI from "@/component/Util/ConfirmUI"
import EmptyScreen from "@/component/Util/EmptyScreen"
import PaginationSection from "@/component/Util/PaginationSection"
import { deleteComment, getPaginatedComments } from "@/util/data/helper/APIHelper"
import { formatDateToMonthNameAndDate } from "@/util/data/helper/utilHelper"
import { onCommentPost } from "@/util/external/yup/formSubmission"
import { ISingleCommentsResponse } from "@/util/types/API Response/FundRaiser"
import { Field, Form, Formik } from "formik"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { confirmAlert } from "react-confirm-alert"
import { toast } from "react-toastify"



function FundRaiserCommentSection({ fund_id }) {

    const router = useRouter()
    const [reCallComments, callComments] = useState(false);

    async function deleteCommentHelper(comment_id) {
        try {
            await deleteComment(comment_id)
            callComments(!reCallComments)
        } catch (e) {
            console.log("Something went wrong");
            toast.error("Something went wrong")
        }
    }

    function onCommentDelete(comment_id) {
        confirmAlert({
            title: "Are you sure want to delete this comment?",
            message: "Delete this comment",
            customUI: ({ onClose, title }) => {
                return <CustomeConfirmUI onClose={onClose} onConfirm={() => {
                    deleteCommentHelper(comment_id)
                    onClose()
                }} title={title}></CustomeConfirmUI>
            }
        })
    }


    return (
        <>
            <div className='mb-3'>
                <Formik initialValues={{ comment: "" }} onSubmit={async (val, { resetForm }) => {
                    const save = await onCommentPost(val.comment, fund_id, () => {
                        router.push("/auth/sign_in")
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
                                            commends.map((cmd, index) => {
                                                console.log(cmd);

                                                return <FundRaiserComment key={index} mention={null} isNested={false} fund_id={cmd.fund_id} nestedComments={cmd.replay} onDelete={onCommentDelete} comment_id={cmd.comment_id} comment={cmd.comment} date={formatDateToMonthNameAndDate(cmd.date)} user_id={cmd.user_id} user_name={cmd.user_name} />
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