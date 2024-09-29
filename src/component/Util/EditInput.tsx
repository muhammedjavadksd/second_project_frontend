import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Fragment, useEffect, useRef, useState } from "react";
import ModelItem from "./ModelItem";
import ModelHeader from "./Model/ModelHeader";

interface IEditInputInstance {
    key: string,
    value: any
}

function EditInput({ children, data, isEditAllowed, onSubmit, label, editValidation, ...props }: { children: React.ReactNode, data: IEditInputInstance, isEditAllowed: Function, onSubmit: Function, label: string, [key: string]: any }) {

    const [isEdit, setEdit] = useState<boolean>(false)
    const [uiText, setUiText] = useState<React.ReactNode>(children)


    function onSave(val) {
        const dataUi = val[data.key];
        setUiText(dataUi)
        setEdit(false)
        onSubmit(val)
    }

    const isAllowed = isEditAllowed();

    if (!isAllowed) {
        return uiText
    }

    return (
        <div className="block items-center gap-3">

            <div>
                <ModelItem ZIndex={99} closeOnOutSideClock={true} isOpen={isEdit} onClose={() => setEdit(false)}>
                    <ModelHeader title={"Edit"} />
                    <div className="p-5 bg-white">
                        <Formik enableReinitialize validationSchema={editValidation} initialValues={{ [data.key]: data.value }} onSubmit={onSave}>
                            <Form>
                                <label htmlFor="">{label}</label>
                                <div className="mt-3 flex p-1 bg-white border border-gray-300 shadow-sm rounded-lg text-gray-900 text-sm  focus:ring-blue-500 fo ">
                                    <Field type="text" name={data.key} id={data.key} className="outline-none max-w-full w-96 border-none" {...props} />
                                    <ErrorMessage name={data.key} />
                                </div>
                                <div className="w-full flex justify-end">
                                    <button className="bg-blue-600 py-3 mt-3 text-white ml-auto rounded-md px-12" type="submit" onClick={() => { }}>
                                        Save
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </ModelItem>
            </div>

            <div className="flex ui-text-bar gap-5">
                {uiText}
                <i onClick={() => { setEdit(true) }} className="cursor-pointer fa-solid text-lg fa-pencil"></i>
            </div>
        </div >
    )
}

export default EditInput