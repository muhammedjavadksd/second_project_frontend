import React from 'react'

function FormInputWithBg({ children }) {
    return (
        <div class="mb-5 grid grid-cols-2 flex items-center bg-green-100 rounded-xl p-3 pt">
            {children}
        </div>
    )
}

export default FormInputWithBg