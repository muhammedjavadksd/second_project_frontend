"use client"
import React, { Fragment, useEffect, useState } from 'react';
import Header from '@/component/Header/Header';
import { findOrder } from '@/util/data/helper/APIHelper';
import { useParams, useRouter } from 'next/navigation';
import { PaymentOrderResponse } from '@/util/types/API Response/FundRaiser';
import LoadingComponent from '@/component/Util/LoadingComponent';
import DonationSuccess from '@/component/FundRaiser/DonationSuccess';
import DonationFailed from '@/component/FundRaiser/DonationFailed';
import { motion } from 'framer-motion';

const PaymentSuccessPage = () => {

    const [tokenDetails, setDonation] = useState<PaymentOrderResponse>(null);
    const [isLoading, setLoading] = useState<boolean>(true);

    const { donation_id } = useParams()

    function findProfile() {
        findOrder(donation_id.toString()).then((profile) => {
            console.log(profile);
            setDonation(profile)
            profile?.status && setLoading(false)
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        const maxRetry = 20;
        let retryAttempt = 0
        const intervel = setInterval(() => {
            if (retryAttempt == maxRetry) clearInterval(intervel)
            if (!tokenDetails) {
                findProfile()

                retryAttempt++
            } else {
                clearInterval(intervel)
            }
        }, 3000)


        setTimeout(() => {
            setLoading(false)
        }, 30000)
        return () => {
            clearInterval(intervel)
        }
    }, [tokenDetails]);


    if (isLoading) {
        return <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-pink-500">
            <motion.div
                animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-24 h-24 bg-white"
            />
        </div>
    }

    return (
        <Fragment>
            <Header />
            <LoadingComponent closeOnClick={false} isLoading={!(!!tokenDetails)} paddingNeed={false}>
                {
                    tokenDetails?.status ? (
                        <DonationSuccess tokenDetails={tokenDetails} />
                    ) : (
                        <DonationFailed tokenDetails={tokenDetails} />
                    )
                }
            </LoadingComponent>
        </Fragment>
    );
};

export default PaymentSuccessPage;