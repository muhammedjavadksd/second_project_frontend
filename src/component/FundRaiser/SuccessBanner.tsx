import React from 'react'
import { toast } from 'react-toastify';

function SuccessBanner({ title, shareURL }) {
    return (
        <div className='bg-green-200 flex items-center justify-center flex-col pt-5 pb-5 bg-opacity-5'>
            <h4 className='text-2xl font-bold mb-3'>{title}</h4>
            <p className='text-center'>
                <h4>Share this URL with your family, friends and well-wishers.</h4>
                <a className='font-bold text-blue-600 underline' href={shareURL}>{shareURL}</a>
            </p>
            <button
                onClick={() => {
                    navigator.clipboard.writeText(shareURL)
                        .then(() => {
                            toast.success('URL copied to clipboard!');
                        })
                        .catch(err => {
                            console.error('Failed to copy: ', err);
                        });
                }}
                type="button" className="mt-5 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-blue-700 focus:outline-none bg-transparent rounded-lg border border-blue-700 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Copy URl</button>

        </div>
    )
}

export default SuccessBanner