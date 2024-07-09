"use client"
import HomeHero from "@/_component/Hero/HomeHero";
import FundRaiserSlider from "@/_section/Home/FundRaiserSlider";
import './global.css'
import CouldHelp from "@/_section/Home/CouldHelp";
import BloodReqSlider from "@/_section/Home/BloodReqSlider";
import EventPromo from "@/_section/Home/EventPromo";
import NewsSlider from "@/_section/Home/NewsSlider";
import Header from "@/_component/Header/Header";
import Footer from "@/_component/Util/Footer";
import { SessionProvider } from "next-auth/react"



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
