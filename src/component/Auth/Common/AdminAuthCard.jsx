import React from 'react'

function AdminAuthCard({ children }) {
    return (
        <div>
            <div class="w-full  fixed top-0">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" class="flex  items-center mb-6 text-2xl font-semibold text-white dark:text-white">
                         Life Link
                    </a>
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminAuthCard