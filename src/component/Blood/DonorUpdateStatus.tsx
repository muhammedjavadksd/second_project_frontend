import { adminUpdateDonorStatus } from "@/util/data/helper/APIHelper";
import { BloodDonorStatus } from "@/util/types/Enums/BasicEnums";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { Fragment } from "react";
import ModelHeader from "../Util/Model/ModelHeader";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { blockDonorAccountInitialValues } from "@/util/external/yup/initialValues";
import { blockDonroAccountValidation } from "@/util/external/yup/yupValidations";

export default function UpdateDonorStatus(donorId, bloodStatus, setStatus, setReason, setLoader) {
    const newStatus = bloodStatus === BloodDonorStatus.Open ? BloodDonorStatus.Blocked : BloodDonorStatus.Open;



    if (newStatus === BloodDonorStatus.Blocked) {
        confirmAlert({
            title: "Are you sure want to block this donor?",
            message: "update donor?",
            customUI: ({ onClose }) => (
                <Fragment>
                    <div className="modelScreen shadow-inner">
                        <ModelHeader title={"Block the donor"} />
                        <div className="p-3 w-[430px] bg-white">
                            <Formik initialValues={blockDonorAccountInitialValues} validationSchema={blockDonroAccountValidation} onSubmit={(val, { resetForm }) => {
                                setLoader(true)
                                adminUpdateDonorStatus(donorId, newStatus, val['reason']).then((data) => {
                                    if (data.status) {
                                        setStatus(newStatus);
                                        toast.success(data.msg);
                                        setReason(val['reason']);
                                        resetForm();
                                        onClose();
                                    } else {
                                        toast.error(data.msg);
                                    }
                                }).catch(() => toast.error("Something went wrong")).finally(() => setLoader(false))
                            }}>
                                <Form>
                                    <div>
                                        <label htmlFor="reason" className="block mb-2 text-sm font-medium">Why do you want to block this profile?</label>
                                        <Field as="textarea" rows={5} type="text" id="reason" name="reason" placeholder="Why blocking?" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                                        <ErrorMessage className="errorMessage" name="reason" component="div" />
                                    </div>
                                    <div className="flex justify-end">
                                        <button type="submit" className="mt-3 bg-blue-800 px-5 py-2 text-white rounded-md">Save</button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </Fragment>
            )
        });
    } else {
        setLoader(true)
        adminUpdateDonorStatus(donorId, newStatus).then((data) => {
            if (data.status) {
                setStatus(newStatus);
                toast.success(data.msg);
            } else {
                toast.error(data.msg);
            }
        }).catch(() => toast.error("Something went wrong")).finally(() => {
            setLoader(false)
        })
    }
}
