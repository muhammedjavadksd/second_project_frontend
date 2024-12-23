import React from 'react'

function Footer() {
    return (


        <footer className="bg-gray-900 ">
            <div className="mx-auto w-full max-w-screen-xl">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 px-4 py-6 lg:py-8">

                    <div>
                        <h2 className="mb-6 text-sm font-semibold   text-white">Company</h2>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            <li className="mb-4">
                                <a href="#" className=" hover:underline">About</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Careers</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Brand Center</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Blog</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-white uppercase  ">Help center</h2>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Discord Server</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Twitter</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Facebook</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold  uppercase text-white">Legal</h2>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Privacy Policy</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Licensing</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold  uppercase text-white">Gallery</h2>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            <li className="mb-4">
                                <a href="#" className="hover:underline">iOS</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Android</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Windows</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">MacOS</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
            <div className="px-4 py-6  dark:bg-gray-700 ">
                <div className="mx-auto w-full max-w-screen-xl md:flex md:items-center md:justify-between ">
                    <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">© 2023 <a href="https://flowbite.com/"> Muhammed Javad</a>. All Rights Reserved.
                    </span>

                </div>
            </div>
        </footer>

    )
}

export default Footer