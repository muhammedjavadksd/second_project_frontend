import { BankAccountType } from "@/util/types/Enums/BasicEnums";
import React, { useState } from "react";
import { FaUniversity, FaUserAlt, FaRegCreditCard, FaRupeeSign, FaRegFileAlt } from "react-icons/fa";

const BankAccountCard = ({ holderName, accountNumber, ifsc, type }: { holderName: string, accountNumber: string, ifsc: string, type: BankAccountType }) => {


    return (
        <div className="bg-[#f7f7f7] border  bg-opacity-90 rounded-lg overflow-hidden">
            {/* <div className="p-5 font-semibold text-gray-700 text-lg">
                  <p>Transfer directly to the Bank account of this Fundraiser. Only INR transfers are allowed.            </p> 
            </div> */}
            <div className=" gap-5 flex flex-col justify-normal p-5  items-center ">
                <div className="flex    p-2 ">
                    <FaUniversity className="text-6xl text-gray-600" aria-label="Bank Icon" />
                </div>
                <div className="w-full p-2">


                    <div className="flex  gap-3 mb-3">
                        <div className="flex w-[24px] gap-2 items-center">
                            <FaUserAlt className="text-md text-gray-600" />
                        </div>
                        <div>
                            <h2 className="text-md font-semibold text-gray-800">Account Holder</h2>
                            <p className="text-gray-600"> {holderName}</p>
                        </div>
                    </div>

                    <div className="flex gap-3 mb-3">
                        <div className="flex gap-2 w-[24px] items-center">
                            <FaRegCreditCard className="text-xl text-gray-600" />
                        </div>
                        <div>
                            <h2 className="text-md font-semibold text-gray-800">Account Number</h2>
                            <p className="text-gray-600">{accountNumber}</p>
                        </div>
                    </div>

                    <div className="flex gap-3 mb-3">
                        <div className="flex gap-2 w-[24px]  items-center">
                            <FaRupeeSign className="text-xl text-gray-600" />
                        </div>
                        <div>
                            <h2 className="text-md font-semibold text-gray-800">IFSC Code</h2>
                            <p className="text-gray-600">{ifsc}</p>
                        </div>
                    </div>

                    <div className="flex gap-3 mb-3">
                        <div className="flex gap-2 w-[24px] items-center">
                            <FaRegFileAlt className="text-xl text-gray-600" />
                        </div>
                        <div>
                            <h2 className="text-md font-semibold text-gray-800">Account Type</h2>
                            <p className="text-gray-600">{type}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BankAccountCard;