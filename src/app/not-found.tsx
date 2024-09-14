"use client"
import Header from "@/component/Header/Header";
import Footer from "@/component/Util/Footer";
import { Fragment } from "react";


function NotFound() {
    return (
        <Fragment>
            <Header />
            <div className="h-screen -mt-32 flex justify-center items-center">
                <div className="text-center">
                    <h1 className="text-7xl font-bold">PAGE NOT FOUND</h1>
                    <p className="text-xl mt-2">The page your looking might be removed or not in our list</p>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export default NotFound