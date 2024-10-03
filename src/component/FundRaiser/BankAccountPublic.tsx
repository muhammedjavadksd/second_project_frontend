import { BankAccountType } from "@/util/types/Enums/BasicEnums";
import React, { useState } from "react";
import { FaUniversity, FaUserAlt, FaRegCreditCard, FaRupeeSign, FaRegFileAlt } from "react-icons/fa";

const BankAccountCard = ({ holderName, accountNumber, ifsc, type }: { holderName: string, accountNumber: string, ifsc: string, type: BankAccountType }) => {


    return (
        <div className="bg-gray-200  bg-opacity-90 rounded-lg overflow-hidden">
            <div className="p-5 font-bold text-xl">
                <p>Transfer directly to the Bank account of this Fundraiser. Only INR transfers are allowed.            </p>
            </div>
            <div className="flex md:flex-row items-center ">
                <div className="flex items-center justify-center w-full  p-2 ">
                    <FaUniversity className="text-6xl text-blue-600" aria-label="Bank Icon" />
                </div>
                <div className="w-full p-6 space-y-4">

                    <div className="flex items-center space-x-4">
                        <FaUserAlt className="text-xl text-gray-600" />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">Account Holder</h2>
                            <p className="text-gray-600">{holderName}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaRegCreditCard className="text-xl text-gray-600" />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">Account Number</h2>
                            <p className="text-gray-600">{accountNumber}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaRupeeSign className="text-xl text-gray-600" />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">IFSC Code</h2>
                            <p className="text-gray-600">{ifsc}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaRegFileAlt className="text-xl text-gray-600" />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">Account Type</h2>
                            <p className="text-gray-600">{type}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BankAccountCard;