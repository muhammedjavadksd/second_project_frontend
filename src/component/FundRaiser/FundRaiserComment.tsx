import { Field, Form, Formik } from "formik";
import { Fragment, useEffect, useRef, useState } from "react";
import CustomeConfirmUI from "../Util/ConfirmUI";
import { confirmAlert } from "react-confirm-alert";
import { deleteComment } from "@/util/data/helper/APIHelper";
import { toast } from "react-toastify";
import { boolean } from "yup";


function FundRaiserComment({ isNested, date, user_id, user_name, comment, comment_id, onDelete }) {

    const [isMenuOpen, openMenu] = useState<boolean>(false);
    const menuRef = useRef<HTMLUListElement | null>(null);
    const [isRemove, setRemove] = useState<boolean>(false);




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



    if (isRemove) {
        return false;
    }

    return (
        <Fragment>
            <div className="flex flex-col p-4 bg-gray-100  rounded-md mb-4">
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
                            <button onClick={() => openMenu(true)} className="relative">
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                                <ul ref={menuRef} role="menu" data-popover="menu" data-popover-placement="bottom"
                                    className={`${!isMenuOpen && "hidden"} right-0 absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none`}>
                                    <li onClick={() => onDelete(comment_id)} role="menuitem"
                                        className="block hover:bg-gray-200 w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                        Delete
                                    </li>
                                    <li role="menuitem"
                                        className="block w-full hover:bg-gray-200 cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                        Edit
                                    </li>
                                </ul>
                            </button>
                        </div>

                    </div>
                </div>


                {/* Bid Details */}
                <div className="mb-2 mt-2">
                    <p className="text-sm text-gray-600">
                        {comment}
                    </p>
                    <div className="flex justify-between">
                        <ul className="flex gap-5 mt-2">
                            <li>
                                <button>
                                    <i className="fa-solid fa-thumbs-up"></i> 3
                                </button>
                            </li>
                            <li>
                                <button>
                                    <i className="fa-solid fa-thumbs-down"></i> 5
                                </button>
                            </li>
                        </ul>
                        <button className="text-blackt font-semibold text-sm">  <i className="fa-solid fa-arrow-down"></i> 5 Replay (8)</button>
                    </div>
                </div>
            </div>

            {/* <div className="nestedComments">
                    {isNested &&
                        (
                            <>
                                 <Formik initialValues={{}} onSubmit={() => { }}>
                                    <Form>
                                        <div className='w-full rounded-lg bg-gray-100 p-5 pt-0'>
                                            <div className='flex items-center gap-x-5'>
                 <div className='w-full flex gap-3 border-l-0 border-t-0 border-r-0  border-b '>
                    <Field name="comment" id="comment" placeHolder="Add a comment" className="w-full  bg-transparent outline-none" />
                    <button className=' px-2 text-sm py-1  text-black rounded-lg'>Post</button>
                </div>
            </div>
        </div>
                                    </Form >
                                </Formik >
                            </>
                        )

}
                </div > */}



        </Fragment >
    )
}

export default FundRaiserComment