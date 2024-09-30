import Header from "@/component/Header/Header";
import Footer from "@/component/Util/Footer";
import { Fragment } from "react";


function AccountVerification() {

    return (
        <Fragment>
            <Header />
            <div className="container mx-auto h-full mt-5 mb-5 ">
                <div className="bgBox h-screen  w-full  p-3 flex justify-center items-center">
                    <div className="flex -mt-48  border p-10 shadow-inner pb-5 bg-white flex-col items-center gap-3">
                        <img src="/images/icons/verification.png" width={"130px"} alt="" />
                        <div className="text-center mt-3 flex flex-col gap-3">
                            <h4 className="font-bold text-2xl">Account need action</h4>
                            <p>We need more details for your account! Please check the mail for complete your account</p>
                        </div>
                        <a target="_blank" href="https://mail.google.com" className="bg-blue-600 mt-4  text-white px-10 py-3">Open email</a>
                        <div className="mt-5  text-center">
                            <p className="font-medium">If you are having any trouble with creating account please feel free to reach out us</p>
                            <span className="text-gray-500">contact@lifelink.com support@lifelink.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default AccountVerification;