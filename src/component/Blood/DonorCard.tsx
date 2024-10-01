import { createChat } from "@/util/data/helper/APIHelper";
import { userDetailsFromUseSession } from "@/util/data/helper/authHelper";
import { CreateChatVia } from "@/util/types/Enums/BasicEnums";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaComments, FaMapMarkerAlt } from "react-icons/fa";
import { IoMdWater } from "react-icons/io";
import { toast } from "react-toastify";
import ModelItem from "../Util/ModelItem";
import ModelHeader from "../Util/Model/ModelHeader";
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { requestPersonalBlood } from "@/util/external/yup/yupValidations";
import { requestPersonalBloodInitialValues } from "@/util/external/yup/initialValues";
import { generateBloodRequest } from "@/util/data/helper/utilHelper";


function BloodDonorCard({ name, bloodGroup, distance, long, lati, email_id }) {

    const session = useSession()
    const router = useRouter();
    const [modelOpen, toggleModel] = useState(true);

    function sendMessage(values) {
        const user = userDetailsFromUseSession(session, "user");
        if (user && user.token) {

            createChat(email_id, generateBloodRequest(values.unit, values.hospital_name, values.deadLine), CreateChatVia.Email).then((data) => {
                if (data) {
                    toast.success("Message has been sent");
                } else {
                    toast.error("Something went wrong");
                }
            }).catch((err) => {
                console.log(err);
                toast.error("Something went wrong");
            })
        } else {
            router.push("/auth/sign_in");
        }
    }

    return (
        <div className="p-6 bg-gray-100 border shadow-inner">


            <ModelItem ZIndex={99} closeOnOutSideClock={true} isOpen={modelOpen} onClose={() => toggleModel(false)}>
                <ModelHeader title={'Request for blood'} />
                <div className="bg-white p-3 min-w-[400px]">
                    <Formik initialValues={requestPersonalBloodInitialValues} validationSchema={requestPersonalBlood} onSubmit={sendMessage}>
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="">Number of unit need</label>
                                <Field type="text" name="unit" id="unit" placeholder="Enter unit" className="mt-2 block shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full" />
                                <ErrorMessage className='errorMessage' component="div" name='unit' />
                            </div>
                            <div className="mb-3">unit deadline hospital
                                <label htmlFor="">Deadline</label>
                                <Field type="datetime-local" name="deadline" id="deadline" placeholder="Select the deadline" className="mt-2 block shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full" />
                                <ErrorMessage className='errorMessage' component="div" name='deadline' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="">Hospital</label>
                                <Field type="text" name="hospital" id="hospital" placeholder="Select hospital name" className="mt-2 block shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full" />
                                <ErrorMessage className='errorMessage' component="div" name='hospital' />
                            </div>
                            <button type="submit" className="mt-3 col-span-2 w-full bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300">
                                Save
                            </button>
                        </Form>
                    </Formik>
                </div>
            </ModelItem>

            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
                <div className="flex items-center bg-red-100 rounded-full px-3 py-1">
                    <IoMdWater className="text-red-500 mr-1" />
                    <span className="text-red-500 font-semibold">{bloodGroup}</span>
                </div>
            </div>
            <iframe width={"100%"} height={"300px"} src={`https://maps.google.com/maps?q=${long},${lati}&amp&output=embed`}></iframe>
            <br />
            <small>
                <a
                    href="https://maps.google.com/maps?q='+data.lat+','+data.lon+'&hl=es;z=14&amp;output=embed"
                    target="_blank"
                >
                    See map bigger
                </a>
            </small>
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{distance} km away</span>
                <button
                    onClick={sendMessage}
                    className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 flex items-center  hover:animate-pulse`}
                    aria-label={`Chat with ${name}`}
                >
                    <FaComments className="mr-2" />
                    Ask for Blood
                </button>
            </div>
        </div>
    )
}

export default BloodDonorCard