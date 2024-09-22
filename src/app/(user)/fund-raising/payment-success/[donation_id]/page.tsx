"use client"
import React, { Fragment, useEffect, useState } from 'react';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import Header from '@/component/Header/Header';
import { findOrder } from '@/util/data/helper/APIHelper';
import { useParams, useRouter } from 'next/navigation';
import { date } from 'yup';
import { PaymentOrderResponse } from '@/util/types/API Response/FundRaiser';
import { formatDateToMonthNameAndDate } from '@/util/data/helper/utilHelper';
import LoadingComponent from '@/component/Util/LoadingComponent';
import const_data from '@/util/data/const';
import DonationSuccess from '@/component/FundRaiser/DonationSuccess';
import DonationFailed from '@/component/FundRaiser/DonationFailed';
import SpalshScreen from '@/component/Util/SplashScreen';

const PaymentSuccessPage = () => {

    const [tokenDetails, setDonation] = useState<PaymentOrderResponse>(null);

    const { donation_id } = useParams()

    function findProfile() {
        findOrder(donation_id.toString()).then((profile) => {
            console.log(profile);
            setDonation(profile)
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
        return () => {
            clearInterval(intervel)
        }
    }, [tokenDetails]);


    if (!tokenDetails) {
        return <SpalshScreen />
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