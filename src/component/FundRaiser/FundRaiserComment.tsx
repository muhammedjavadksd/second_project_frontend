import { ErrorMessage, Field, Form, Formik } from "formik";
import { Fragment, useEffect, useRef, useState } from "react";
import CustomeConfirmUI from "../Util/ConfirmUI";
import { confirmAlert } from "react-confirm-alert";
import { deleteComment, editComment } from "@/util/data/helper/APIHelper";
import { toast } from "react-toastify";
import { boolean } from "yup";
import EditInput from "../Util/EditInput";
import { userDetailsFromUseSession } from "@/util/data/helper/authHelper";
import { useSession } from "next-auth/react";
import { commentPostValidation } from "@/util/external/yup/yupValidations";
import { ISingleCommentsResponse } from "@/util/types/API Response/FundRaiser";
import { formatDateToMonthNameAndDate } from "@/util/data/helper/utilHelper";
import { addReplayComment } from "@/util/external/yup/formSubmission";
import { useRouter } from "next/navigation";


function FundRaiserComment({ nestedComments, date, user_id, user_name, comment, comment_id, onDelete, fund_id, isNested, mention }) {

    const [isMenuOpen, openMenu] = useState<boolean>(false);
    const menuRef = useRef<HTMLUListElement | null>(null);
    const [isRemove, setRemove] = useState<boolean>(false);
    const [isEdit, setEdit] = useState<boolean>(false)
    const session = useSession();
    const userDetails = userDetailsFromUseSession(session, "user")
    const editRef = useRef();
    const [uiComment, setUiComment] = useState<string>();
    const [isCommentsOpen, openComments] = useState<boolean>(false);
    const router = useRouter()
    const [replayComments, setReplayComments] = useState<ISingleCommentsResponse[]>(nestedComments)


    useEffect(() => {
        setUiComment(comment)
    }, [comment_id])


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                openMenu(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener("click", handleClickOutside, true);
        } else {
            document.removeEventListener("click", handleClickOutside, true);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [isMenuOpen]);


    async function updateComment(newComment) {
        try {
            const updateComment = await editComment(newComment, comment_id);
            if (updateComment) {
                setUiComment(newComment)

            }
            setEdit(false)
        } catch (e) {
            console.log("Update failed");
            setEdit(false)
        }
    }

    async function replayAdding(comment) {
        try {
            const addReplay = await addReplayComment(comment, fund_id, user_id, comment_id, () => {
                router.replace("/auth/sign_in")
            });
            if (addReplay) {
                setReplayComments((prev: ISingleCommentsResponse[]) => {



                    const newComment: ISingleCommentsResponse = {
                        comment,
                        comment_id: addReplay,
                        date: new Date(),
                        fund_id,
                        is_edited: false,
                        mention: user_name,
                        replay_id: comment_id,
                        replay: [],
                        user_id: userDetails.profile_id,
                        user_name: userDetails.first_name + userDetails.last_name
                    }
                    return [newComment, ...prev];
                }

                )

            } else {

            }
        } catch (e) {
            return
        }
    }




    if (isRemove) {
        return false;
    }


    return (
        <Fragment>
            <div className={`flex flex-col p-4 bg-gray-100 ${isNested && ' pl-2 ps-2 '} rounded-md mb-2 pb-0`}>
                <div className="flex items-center w-full">
                    <div className="w-full flex items-center">

                        <div className="w-full flex justify-between">
                            <div className="flex items-center">
                                <img
                                    src="https://cdn2.f-cdn.com/ppic/224842181/logo/14133910/profile_logo_14133910.jpg?image-optimizer=force&format=webply&width=120"
                                    alt="User Avatar"
                                    className="w-12 h-12 rounded-full mr-3"
                                />
                                <div >
                                    <span className="text-gray-800 font-semibold">{user_name}</span>
                                    <span className="text-gray-600 text-sm block">{user_id}</span>
                                    <span className="text-sm text-gray-500">{date}</span>
                                </div>
                            </div>
                            {
                                userDetails.profile_id == user_id && <button onClick={() => openMenu(true)} className="relative">
                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                    <ul ref={menuRef} role="menu" data-popover="menu" data-popover-placement="bottom"
                                        className={`${!isMenuOpen && "hidden"} right-0 absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none`}>
                                        <li onClick={() => onDelete(comment_id)} role="menuitem"
                                            className="block hover:bg-gray-200 w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                            Delete
                                        </li>
                                        <li
                                            onClick={() => {
                                                setEdit(true)

                                            }}
                                            role="menuitem"
                                            className={` block w-full hover:bg-gray-200 cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900`}>
                                            Edit
                                        </li>
                                    </ul>
                                </button>}
                        </div>

                    </div>
                </div>


                {/* Bid Details */}
                <div className="mb-2 mt-2">
                    <p className="text-sm text-gray-600">
                        {
                            isEdit ? (<Formik validationSchema={commentPostValidation} initialValues={{ comment }} onSubmit={(val, { resetForm }) => {
                                updateComment(val.comment)
                                resetForm()
                            }}>
                                <Form>
                                    <div className='w-full flex gap-3 border-l-0 border-t-0 border-r-0  border-b '>
                                        <Field innerRef={editRef} name="comment" id="comment" placeHolder="Add a comment" className={`${isEdit && "border border-b-blue-600"} w-full  bg-transparent outline-none`} />
                                        <button type="submit" className=' px-2 text-sm py-1  text-black rounded-lg'>Post</button>
                                    </div>
                                </Form>
                            </Formik>) :
                                (
                                    <>
                                        <span className="text-blue-700 underline cursor-pointer">{mention && `@${mention}  `}</span>
                                        {uiComment}

                                    </>
                                )
                        }
                    </p>
                    <div className="flex justify-between">
                        <ul className="flex gap-5 mt-2">
                            {/* <li>
                                <button>
                                    <i className="fa-solid fa-thumbs-up"></i> 3
                                </button>
                            </li>
                            <li>
                                <button>
                                    <i className="fa-solid fa-thumbs-down"></i> 5
                                </button>
                            </li> */}
                        </ul>
                        <button onClick={() => openComments(!isCommentsOpen)} className="flex items-center text-blackt font-semibold text-sm">
                            <i className={`fa-solid ${isCommentsOpen ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                            <span className="w-2"></span>

                            Replay ({replayComments && replayComments?.length})
                        </button>
                    </div>
                </div>
                <div className={`nestedComments mt-2`}>
                    {isCommentsOpen &&
                        (
                            <>
                                <Formik validationSchema={commentPostValidation} initialValues={{ comment: "" }} onSubmit={(val, { resetForm }) => {
                                    const { comment } = val;
                                    replayAdding(comment);
                                    resetForm()
                                }}>
                                    <Form>
                                        <div className='w-full rounded-lg bg-gray-100  p-5 pl-0  pb-2  pt-0 ps-0'>
                                            <div className='flex items-center gap-x-5'>
                                                <div className='w-full flex gap-3 border-l-0 border-t-0 border-r-0  border-b '>
                                                    <Field name="comment" id="comment" placeHolder="Add a comment" className="w-full  bg-transparent outline-none" />
                                                    <button className=' px-2 text-sm py-1  text-black rounded-lg'>Post</button>
                                                </div>
                                            </div>
                                        </div>
                                    </Form >
                                </Formik >
                                {
                                    (replayComments && replayComments.length) && replayComments.map((each: ISingleCommentsResponse) => {
                                        return (
                                            <>
                                                <FundRaiserComment mention={each.mention} isNested={true} fund_id={each.fund_id} onDelete={() => onDelete(each.comment_id)} user_id={each.user_id} user_name={each.user_name} date={formatDateToMonthNameAndDate(each.date)} nestedComments={each.replay || []} comment={each.comment} comment_id={each.comment_id} />
                                            </>
                                        )
                                    })
                                }
                            </>
                        )

                    }
                </div >
            </div>




        </Fragment >
    )
}

export default FundRaiserComment