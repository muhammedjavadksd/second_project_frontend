import { newTicketRaiseInitialValues } from "@/util/external/yup/initialValues"
import { newTicketRaiseValidation } from "@/util/external/yup/yupValidations"
import { TicketCategory, TicketPriority } from "@/util/types/Enums/BasicEnums"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { onTicketSubmit } from "./logic"
import { toast } from "react-toastify"
import { useRef, useState } from "react"

function NewTicketForm({ state }): React.ReactElement {

    const formikRef = useRef(null);

    function successCb() {
        toast.success("Ticket raised success")
        formikRef.current.resetForm();
        state(false)
    }

    function errorCb(err) {
        toast.error(err)
    }

    const [attachment, setAttachment] = useState(null);
    // console.log(attachment);


    return (
        <Formik innerRef={formikRef} initialValues={newTicketRaiseInitialValues} validationSchema={newTicketRaiseValidation} onSubmit={(val) => {
            val.attachment = attachment
            onTicketSubmit(val, successCb, errorCb)
        }}>
            {({ setFieldValue }) => (
                <Form>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                        <Field id="tile" name="title" type="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter the title" />
                        <ErrorMessage className="errorMessage" component={"div"} name='title'></ErrorMessage>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <Field type="text" name="description" id="description" as="textarea" rows={5} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                        <ErrorMessage className="errorMessage" component={"div"} name='description'></ErrorMessage>
                    </div>
                    <div className="mb-5">

                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="priority" className="block  text-sm font-medium text-gray-900 dark:text-white">Priority</label>
                            <button onClick={() => {
                                toast.warning("Ensure that high-priority tickets can be raised only once per month.")
                            }} type="button" className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1 px-2 py-2 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
                                <svg className="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 19">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 12 5.419 3.871A1 1 0 0 0 16 15.057V2.943a1 1 0 0 0-1.581-.814L9 6m0 6V6m0 6H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h7m-5 6h3v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5Zm15-3a3 3 0 0 1-3 3V6a3 3 0 0 1 3 3Z" />
                                </svg>
                            </button>
                        </div>


                        <Field as="select" type="text" id="priority" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                            <option>Select the priority</option>
                            {
                                Object.values(TicketPriority).map((item) => {
                                    return <option value={item}>{item}</option>
                                })
                            }
                        </Field>

                        <ErrorMessage className="errorMessage" component={"div"} name='priority'></ErrorMessage>
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                        <Field as="select" type="text" id="category" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                            <option>Select the category</option>
                            {
                                Object.values(TicketCategory).map((item) => {
                                    return <option value={item}>{item}</option>
                                })
                            }
                        </Field>
                        <ErrorMessage className="errorMessage" component={"div"} name='category'></ErrorMessage>

                    </div>
                    <div className="mb-5">
                        <label htmlFor="attachment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Attachment</label>
                        <Field
                            value={undefined}
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    console.log("File:", file);
                                    console.log("File Name:", file.name);
                                    console.log("File Type:", file.type);
                                    console.log("File Size:", file.size);
                                    setFieldValue("attachment", file);
                                    setAttachment(file);
                                } else {
                                    console.error("No file selected or an issue with the file input.");
                                }
                            }}
                            name="attachment"
                            id="attachment"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light px-5 py-1"
                        />
                        <ErrorMessage className="errorMessage" component={"div"} name='attachment'></ErrorMessage>
                    </div>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Raise New Ticket</button>
                </Form >
            )
            }
        </Formik >
    )
}

export default NewTicketForm