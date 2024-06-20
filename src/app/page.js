"use client"
// import Header from "@/_component/Header/Header";
import HomeHero from "@/_component/Hero/HomeHero";
import FundRaiserSlider from "@/_section/Home/FundRaiserSlider";
// import '../../public/css/style.css'
import './global.css'
import CouldHelp from "@/_section/Home/CouldHelp";
import CountDisplay from "@/_section/Home/CountDisplay";
import BloodReqSlider from "@/_section/Home/BloodReqSlider";
import EventPromo from "@/_section/Home/EventPromo";
import NewsSlider from "@/_section/Home/NewsSlider";
import DataComponent from "@/_component/DataComponent";
import Header from "@/_component/Header/Header";
import Footer from "@/_component/Util/Footer";
// import Footer from "@/_component/Util/Footer";
// import '../external/style.css'
import { SessionProvider } from "next-auth/react"
import { getServerSession } from "next-auth";
// import { Provider } from "react-redux";
// import { combineReducers } from "@reduxjs/toolkit";



export default function Home() {

  let session = getServerSession()

  return (
    <SessionProvider session={session}>
      <main className="flex min-h-screen flex-col">
        <div>

          {/* <Footer */}
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
      {/* </Provider> */}
    </SessionProvider >
  );
}
