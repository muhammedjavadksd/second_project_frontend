import Link from "next/link"
import Countdown from "react-countdown"

const CountDownRender = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        return "Time is over to donate the blood"
    } else {
        return <div>
            Meet the patient with in
            <span className="ms-2 font-bold">{hours}H :{minutes}M :{seconds}S</span>
        </div>
    }
};


function ExpressIntrestItem({ blood_group, unit, deadLine, meetTime, cords }) {

    return (
        <>
            <div className={`p-6 g mb-5 bg-gray-50 shadow-lg rounded-lg`}>




                <div className="bg-white p-5 rounded-lg shadow-md mb-6">
                    <div className="flex items-center space-x-6">
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-red-600 text-3xl font-bold">A+</span>
                        </div>
                        <div>
                            <div className="text-gray-700 font-semibold text-lg">A+ Blood Request</div>
                            <p className="text-gray-500 text-sm">Units Needed: <span className="font-medium text-blue-600">{unit}</span></p>
                            <p className="text-gray-500 text-sm">Deadline: <span className="font-medium text-blue-600">{deadLine}</span></p>

                        </div>
                    </div>
                </div>

                <div className="bg-white w-full p-2 mb-3 shadow-md border">
                    <Countdown
                        renderer={CountDownRender} date={meetTime} />
                </div>

                <div className="bg-yellow-100 p-4 rounded-md mb-4">
                    <h5 className="text-lg font-bold text-yellow-800">
                        {blood_group} Blood Request Details
                    </h5>
                    <p className="text-gray-700 mt-2">
                        {unit} unit(s) of {blood_group} blood is requested. The deadline for this request is {deadLine}. Please ensure to fulfill the request by the given deadline.
                    </p>
                </div>

                <div className="flex gap-5 justify-end">
                    <a target="_blank" href={`https://maps.google.com/?q=${cords[1]},${cords[0]}`} type="button" className="mt-5 text-white bg-green-600 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none">
                        View Location
                    </a>
                </div>
            </div>
            {/* <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                            {blood_group}
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-bold text-gray-800">Blood Group</h3>
                            <p className="text-gray-600 text-sm">{unit} Units Required</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <h3 className="text-lg font-bold text-gray-800">Deadline</h3>
                        <p className="text-gray-600 text-sm">{deadLine}</p>
                    </div>
                </div>

               
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="text-md font-bold text-gray-700">City Hospital</h4>
                    <p className="text-gray-600 text-sm mt-1">
                        {location}
                    </p>
                </div>

                
                <div className="flex justify-between items-center">
                    <div className="flex items-end">
                        <button
                            type="button"
                            className=" bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600"
                        >
                            <Link href={"chat-with-donors"} className="w-full flex items-center gap-2">
                                Open chat
                                <span className="bg-transparent text-black text-sm font-medium   py-0.5 rounded ">
                                    <i className="fa-regular text-white fa-message"></i>
                                </span>
                            </Link>
                        </button>
 
                    </div>

                </div>
            </div> */}
        </>
    )
}

export default ExpressIntrestItem