import { showIntrestForDonateBlood } from '@/util/data/helper/APIHelper';
import { userDetailsFromUseSession } from '@/util/data/helper/authHelper';
import { error } from 'console';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';
import BloodCard from './IncomingBloodCard';

function BloodRequirementSingleItem({ req_id, group, unit, deadLine, location, username }) {

    const session = useSession();
    const router = useRouter();
    function onDonateBlood() {
        const userDetails = userDetailsFromUseSession(session);
        console.log(userDetails);
        alert("Check log")

        if (userDetails) {
            if (userDetails.blood_donor_id) {
                showIntrestForDonateBlood(req_id, () => {
                    router.push("/blood/intrest/success")
                }, (msg) => {
                    // alert("This works")
                    // console.log(msg);
                    // toast.error(msg)
                    router.push("/account/profile?open_donor_model=true")
                }).catch((err) => {
                    console.log(err);
                    toast.error("Something went wrong")
                })
                // router.push("/account/profile?open_donor_model=true")
            } else {
                //if logged but do not have donor profile
                router.push("/account/profile?open_donor_model=true")
            }
        } else {
            router.push("auth/sign_in?next=account/profile?open_donor_model=true")
            //if not logged
        }
    }



    return (
        <>
            <div className="mb-5 max-w-sm bg-white border border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img className="w-100" src="images/blood/APositive.png" alt="" />
                </a>
                <BloodCard location={location} group={group} onDonateBlood={onDonateBlood} unit={unit} username={username} deadLine={deadLine} />
            </div>

        </>
    )
}

export default BloodRequirementSingleItem