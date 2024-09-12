import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Fragment, useRef, useState } from "react";

interface IEditInputInstance {
    key: string,
    value: string
}

function EditInput({ children, data, isEditAllowed }: { children: React.ReactNode, data: IEditInputInstance, isEditAllowed: Function }) {

    const [isEdit, setEdit] = useState<boolean>(false)
    const [uiText, setUiText] = useState<React.ReactNode>(children)
    const form = useRef(null)

    React.useEffect(() => {
        if (isEdit && form.current) {
            form.current.focus();
        }
    }, [isEdit]);


    function onSave(val) {
        const dataUi = val[data.key];
        setUiText(dataUi)
        setEdit(false)
    }

    const isAllowed = isEditAllowed();

    if (!isAllowed) {
        return uiText
    }

    return (
        <div className="flex items-center gap-3 underline">
            {
                isEdit ? <Formik initialValues={{ [data.key]: data.value }} onSubmit={onSave}>
                    <Form>
                        <div className="flex p-1 bg-white border border-gray-300 shadow-sm rounded-lg text-gray-900 text-sm  focus:ring-blue-500 fo ">
                            <Field innerRef={form} type="text" name={data.key} id={data.key} className="outline-none max-w-full w-96 border-none" />
                            <ErrorMessage name={data.key} />
                            <button type="submit"><i className="text-xl pe-3 fa-solid fa-floppy-disk"></i></button>
                        </div>
                    </Form>
                </Formik> : (
                    <>
                        {uiText}
                        <i onClick={() => {
                            setEdit(true)
                        }} className="cursor-pointer fa-solid text-lg fa-pencil"></i>
                    </>
                )
            }
        </div >
    )
}

export default EditInput