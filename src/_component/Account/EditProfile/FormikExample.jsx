import { ErrorMessage, Form, Formik } from 'formik'
import React from 'react'

function FormikExample() {
    return (
        <div>
            <Formik initialValues={{ name: "", email: "" }} onSubmit={() => alert("Form submitted success")}>
                <Form>
                    <Field name="name" id="name"></Field>
                    <ErrorMessage name='name'></ErrorMessage>
                    <Field name="email" id="email"></Field>
                    <ErrorMessage name='email'></ErrorMessage>
                </Form>
            </Formik>
        </div>
    )
}

export default FormikExample