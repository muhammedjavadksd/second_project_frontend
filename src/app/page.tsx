"use client"
import FundRaiserSlider from "@/component/section/Home/FundRaiserSlider";
import './global.css'
import CouldHelp from "@/component/section/Home/CouldHelp";
import BloodReqSlider from "@/component/section/Home/BloodReqSlider";
import EventPromo from "@/component/section/Home/EventPromo";
import NewsSlider from "@/component/section/Home/NewsSlider";
import Footer from "@/component/Util/Footer";
import { SessionProvider } from "next-auth/react"
import HomeHero from "@/component/Hero/HomeHero";
import BloodAvailabilitySection from "@/component/section/Home/BloodAvailabilityView";
import 'react-confirm-alert/src/react-confirm-alert.css';
import SectionTitle from "@/component/Util/SectionTitle";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FundRaiserResponse } from "@/util/types/API Response/FundRaiser";
import { getLimitedFundRaiserPost } from "@/util/data/helper/APIHelper";
import Header from "@/component/Header/Header";
// import 'react-confirm-alert/src/'


const Home: React.FC<{ name: string }> = ({ name }) => {


    const router = useRouter()
    const [allfundRaiser, setFundRaiser] = useState<FundRaiserResponse[]>([])
    useEffect(() => {
        getLimitedFundRaiserPost(1, 20, "all", "").then((response) => {
            if (response && response.paginated) {
                setFundRaiser(response.paginated);
            }
        }).catch((err) => { })
    }, [])



    return (


        <SessionProvider>
            {/* <title>Hellwo </title> */}
            <main className="flex min-h-screen flex-col bg-white">
                <div>

                    <Header />
                    <HomeHero />
                    <div>
                        <SectionTitle title={"People who "} focus_text={"Suffer"} sub_title={"Donate For Poor People. Causes of Gives"}></SectionTitle>
                        <FundRaiserSlider exclude="" profiles={allfundRaiser} />
                    </div>
                    <section className="mt-10">
                        <div className='container mx-auto'>
                            <CouldHelp />
                        </div>
                    </section>
                    <section className="mt-10">
                        <div className='container mx-auto'>
                            <BloodAvailabilitySection />
                        </div>
                    </section>

                    <BloodReqSlider />
                    <section className="mt-10 bg-gray-100">
                        <EventPromo />
                    </section>
                    <section className="mt-10">
                        <NewsSlider />
                    </section>
                    <div className="mt-10">
                        <Footer />
                    </div>
                </div>
            </main >

        </SessionProvider >
    );
}

export default Home
