import { newTicketRaiseInitialValues } from "@/util/external/yup/initialValues"
import { newTicketRaiseValidation } from "@/util/external/yup/yupValidations"
import { TicketCategory, TicketPriority } from "@/util/types/Enums/BasicEnums"
import { ErrorMessage, Field, Form, Formik } from "formik"

function NewTicketForm(): React.ReactElement {
    return (
        <Formik initialValues={newTicketRaiseInitialValues} validationSchema={newTicketRaiseValidation} onSubmit={() => { }}>
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
                    <label htmlFor="priority" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Priority</label>
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
                    <Field type="file" name="attachment" id="attachment" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light px-5 py-1" />
                    <ErrorMessage className="errorMessage" component={"div"} name='attachment'></ErrorMessage>
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Raise New Ticket</button>
            </Form >
        </Formik>
    )
}

export default NewTicketForm