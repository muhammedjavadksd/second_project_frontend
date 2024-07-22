"use client"
// import HomeHero from "@/component/Hero/HomeHero";
// HomeHero
import FundRaiserSlider from "@/component/section/Home/FundRaiserSlider";
import './global.css'
import CouldHelp from "@/component/section/Home/CouldHelp";
import BloodReqSlider from "@/component/section/Home/BloodReqSlider";
import EventPromo from "@/component/section/Home/EventPromo";
import NewsSlider from "@/component/section/Home/NewsSlider";
// import Header from "@/component/Header/Header";
import Footer from "@/component/Util/Footer";
import { SessionProvider } from "next-auth/react"
import HomeHero from "@/component/Hero/HomeHero";
import Header from "@/component/Header/Header";



const Home: React.FC = () => {

    return (
        <SessionProvider>
            <main className="flex min-h-screen flex-col">
                <div>

                    <Header />
                    <HomeHero />
                    <FundRaiserSlider />
                    <section className="mt-10">
                        <div className='container mx-auto'>
                            <CouldHelp />
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
