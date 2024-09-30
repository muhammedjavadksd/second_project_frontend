import Select from "react-select/creatable";


interface OptionValues {
    value: string,
    label: string
}


function FormikSelectField({ multiple, values = [], placeHolder, setFieldValue }) {
    return (
        <Select
            isMulti={multiple}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full"
            options={values.map((item) => ({ value: item, label: item }))}
            placeholder={placeHolder}
            onChange={(val: OptionValues[]) => {
                const data = val.map((item) => item.value)
                setFieldValue(data)
            }}
        />
    )
}


export default FormikSelectField;