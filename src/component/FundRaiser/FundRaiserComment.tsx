import { Field, Form, Formik } from "formik";
import { Fragment } from "react";


function FundRaiserComment({ isNested, date, user_id, user_name, comment }) {



    return (
        <Fragment>
            <div className="flex flex-col p-4 bg-gray-100  rounded-md mb-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                        <a href="/u/divyadhakecha1?ref_project_id=38496470" className="flex items-center">
                            <img
                                src="https://cdn2.f-cdn.com/ppic/224842181/logo/14133910/profile_logo_14133910.jpg?image-optimizer=force&format=webply&width=120"
                                alt="User Avatar"
                                className="w-12 h-12 rounded-full mr-3"
                            />
                            <div>
                                <span className="text-gray-800 font-semibold">{user_name}</span>
                                <span className="text-gray-600 text-sm block">{user_id}</span>
                            </div>
                        </a>
                    </div>
                    <span className="text-sm text-gray-500">{date}</span>
                </div>

                {/* Bid Details */}
                <div className="mb-2">
                    <p className="text-sm text-gray-600">
                        {comment}
                    </p>
                </div>

                <div className="nestedComments">
                    {isNested &&
                        (
                            <>
                                {/* <FundRaiserComment isNested={false} /> */}
                                <Formik initialValues={{}} onSubmit={() => { }}>
                                    <Form>
                                        <div className='w-full rounded-lg bg-gray-100 p-5 pt-0'>
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
                            </>
                        )

                    }
                </div>



            </div>
        </Fragment>
    )
}

export default FundRaiserComment