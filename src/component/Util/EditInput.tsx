import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Fragment, useEffect, useRef, useState } from "react";

interface IEditInputInstance {
    key: string,
    value: string
}

function EditInput({ children, data, isEditAllowed, onSubmit, ...props }: { children: React.ReactNode, data: IEditInputInstance, isEditAllowed: Function, onSubmit: Function, [key: string]: any }) {

    const [isEdit, setEdit] = useState<boolean>(false)
    const [uiText, setUiText] = useState<React.ReactNode>(children)
    const form = useRef(null)
    const formRef = useRef(null)
    const addRef = useRef(null)

    React.useEffect(() => {
        if (isEdit && form.current) {
            form.current.focus();
        }
    }, [isEdit]);


    useEffect(() => {
        document.addEventListener("click", (e) => {
            if (isEdit) {
                console.log(e.target);
                console.log(addRef.current);

                if (formRef.current && !formRef.current.contains(e.target) && e.target != addRef.current) {
                    setEdit(false)
                }
            }
        })
    }, [isEdit])

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
        <div className="block items-center gap-3 underline">
            <div ref={formRef}>
                {
                    isEdit ? <Formik initialValues={{ [data.key]: data.value }} onSubmit={onSave}>
                        <Form>
                            <div className="flex p-1 bg-white border border-gray-300 shadow-sm rounded-lg text-gray-900 text-sm  focus:ring-blue-500 fo ">
                                <Field  {...props} innerRef={form} type="text" name={data.key} id={data.key} className="outline-none max-w-full w-96 border-none" />
                                <ErrorMessage name={data.key} />
                            </div>
                            <button type="submit" onClick={() => alert("Submit work")}><i className="text-xl pe-3 fa-solid fa-floppy-disk"></i></button>
                        </Form>
                    </Formik> : (
                        <div ref={addRef}>
                            {uiText}
                            <i onClick={() => { setEdit(true) }} className="cursor-pointer fa-solid text-lg fa-pencil"></i>
                        </div>
                    )
                }
            </div>
        </div >
    )
}

export default EditInput