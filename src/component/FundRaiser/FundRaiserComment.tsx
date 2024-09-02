import { Fragment } from "react";


function FundRaiserComment() {

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
                                <span className="text-gray-800 font-semibold">Dayaben D.</span>
                                <span className="text-gray-600 text-sm block">@divyadhakecha1</span>
                            </div>
                        </a>
                    </div>
                    <span className="text-sm text-gray-500">2 days ago</span>
                </div>

                {/* Bid Details */}
                <div className="mb-2">
                    <p className="text-sm text-gray-600">
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type ...

                    </p>
                </div>



            </div>
        </Fragment>
    )
}

export default FundRaiserComment