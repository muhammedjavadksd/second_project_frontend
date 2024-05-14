import React from 'react'

function SectionTitle({ title, focus_text, sub_title }) {
    return (
        <div className='text-center  mt-10 mb-10 '>
            <h4 className='text-center text-3xl mb-2 font-extrabold text-gray-900 dark:text-white text-5xl'><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{title} </span> {focus_text}.</h4>
            <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"> {sub_title}</p>
        </div>
    )
}

export default SectionTitle