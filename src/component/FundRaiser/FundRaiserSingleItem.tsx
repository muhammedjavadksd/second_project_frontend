import const_data from '@/util/data/const';
import { FundRaiserResponse } from '@/util/types/API Response/FundRaiser';
import Link from 'next/link';
import React from 'react';
import PublicImage from '../Util/PublicImage';

function FundRaiserSingleItem({ profile }: { profile: FundRaiserResponse }) {

    console.log(profile);

    return (
        <div className="mb-5 max-w-sm bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            <Link href={`/fund-raising/view/${profile.fund_id}`}>
                <PublicImage
                    className="w-full h-48 object-cover"
                    imageurl='http://localhost:3000/images/fundRaisers/fundRaiser1.png'
                />
                {/* <img
                    className="w-full h-48 object-cover"
                    src={`${process.env.NEXT_PUBLIC_PUBLIC_IMAGE_URL}/fundRaisers/fundRaiser1.png`}
                    alt="Fundraiser Image"
                /> */}
            </Link>
            <div className="p-5">
                <div className="grid grid-cols-3 gap-3 mb-3 text-gray-700 dark:text-gray-300">
                    <div className="text-left">
                        <span className="text-sm text-red-600">Goal</span>
                        <h6 className="text-blue-500">{const_data.MONEY_ICON}{profile.amount}</h6>
                    </div>
                    <div className="text-center">
                        <span className="text-sm">Raised</span>
                        <h6 className="text-blue-500">{const_data.MONEY_ICON}{profile.collected}</h6>
                    </div>
                    <div className="text-right">
                        <span className="text-sm">To go</span>
                        <h6 className="text-blue-500">{const_data.MONEY_ICON}{Math.floor(profile.amount - profile.collected)}</h6>
                    </div>
                </div>
                <Link href={`/fund-raising/view/${profile.fund_id}`}>
                    <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white hover:underline">
                        {profile.full_name}'s Fund Raiser for {profile.category} in {profile.district}
                    </h5>
                </Link>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    {profile.about}
                </p>
                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium bg-transparent">
                        <svg
                            className="w-6 h-6 mr-1"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                fillRule="evenodd"
                                d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                                clipRule="evenodd" />
                        </svg>
                        {profile.full_name}
                    </button>
                    <button
                        type="button"
                        className="text-blue-600 bg-white border border-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5">
                        Donate Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FundRaiserSingleItem;
