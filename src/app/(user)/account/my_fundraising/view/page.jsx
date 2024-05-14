import AccountTab from '@/_component/Account/AccountTab'
import Header from '@/_component/Header/Header'
import BreadCrumb from '@/_component/Util/BreadCrumb'
import Footer from '@/_component/Util/Footer'
import StatisticCard from '@/_component/Util/StatisticCard'
import React from 'react'
 
function FundRaiserView() {

    // getChartOptions();

    return (
        <>
            <Header />
            <div className="container mx-auto mt-5 mb-5">
                <div className="mb-5">
                    <BreadCrumb path={['Home', 'Profile', 'My Fund Raising', 'Raising Name-ID']} />
                </div>
                <div className="flex">
                    <div className='w-1/4'>
                        <AccountTab />
                    </div>
                    <div className='w-4/5'>
                        <div className="grid gap-5 grid-cols-3">
                            <StatisticCard title={"Target"} statistic={"723₹"} icon={<i class="fa-solid fa-money-bill"></i>}></StatisticCard>
                            <StatisticCard title={"Collected"} statistic={"510₹"} icon={<i class="fa-solid fa-money-bill"></i>}></StatisticCard>
                            <StatisticCard title={"Dead Line"} statistic={"12-05-2022"} icon={<i class="fa-solid fa-calendar"></i>}></StatisticCard>
                        </div>

                        <div class="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">

                            <div class="flex justify-between mb-3">
                                <div class="flex justify-center items-center">
                                    <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">Website traffic</h5>
                                    <svg data-popover-target="chart-info" data-popover-placement="bottom" class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z" />
                                    </svg> 
                                </div> 
                            </div>

                             
                            <div class="py-6" id="donut-chart"></div>

                            
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default FundRaiserView