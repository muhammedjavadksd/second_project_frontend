import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

function HomeHero() {

    let router = useRouter()


    // // Notification.requestPermission();
    // Notification.requestPermission().then((data) => {
    //     console.log(data);
    // })


    return (
        <div className='container mx-auto'>
            <div class="grid grid-cols-2 gap-4 items-center	">
                <div>
                    <h1 class="mb-4 mb-5 text-4xl leading-8		 font-extrabold   tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">We Need Your Powerful Hands To <span className='text-blue-600'>Change The World</span>.</h1>
                    <div className="mt-5">
                        <button type="button" onClick={() => router.push("/fund-raising/create")} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create fund raise</button>
                        <button type="button" onClick={() => router.push("/blood/request")} class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Request for blood</button>
                    </div>
                </div>
                <div className='flex justify-center items-center' >
                    <Image src="/images/promotion/hero-icon.png" width={500} alt="" />
                </div>
            </div>
        </div>
    )
}

export default HomeHero