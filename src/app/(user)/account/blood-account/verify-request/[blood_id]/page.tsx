"use client";
import BloodAccountTab from '@/component/Account/AccountTab/BloodAccountTab';
import VerifyBloodRequestItem from '@/component/Blood/VerifyRequestItem';
import Header from '@/component/Header/Header'
import UserPrivateRouter from '@/component/LoginComponent/UserPrivateRouter';
import BreadCrumb from '@/component/Util/BreadCrumb'
import EmptyScreen from '@/component/Util/EmptyScreen';
import Footer from '@/component/Util/Footer'
import PaginationSection from '@/component/Util/PaginationSection';
import { getBloodIntrest } from '@/util/data/helper/APIHelper';
import { formatDateToMonthNameAndDate, messageFromBloodConcernce } from '@/util/data/helper/utilHelper';
import { BloodDonationStatus } from '@/util/types/Enums/BasicEnums';
import { IBloodDonate } from '@/util/types/InterFace/UtilInterface';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function BloodAccount(): React.ReactElement {

    const { blood_id } = useParams();
    const [status, setStatus] = useState<BloodDonationStatus>(null);
    const [refresh, setRefresh] = useState<boolean>(false);

    useEffect(() => {
        setRefresh(!refresh)
    }, [status])

    return (
        <UserPrivateRouter>
            <Header />
            <div className="container mx-auto mt-5 mb-5">
                <div className="mb-5">
                    <BreadCrumb path={['Profile', 'View Profile']} />
                </div>
                <BloodAccountTab />
                <div className="mb-4 mt-4 bg-white shadow-inner border  p-3 flex justify-between items-center">
                    <div>
                        <h4 className="text-2xl font-bold">All your blood request</h4>
                        <p>Listing all your blood requirement's</p>
                    </div>
                    <div className="gap-5 flex">
                        <button onClick={() => { setStatus(null) }} className="bg-blue-800 px-5 py-2 text-white rounded-md">Show all</button>
                        <button onClick={() => { setStatus(BloodDonationStatus.Approved) }} className="bg-green-800 px-5 py-2 text-white rounded-md" > Donated Only</button>
                        <button onClick={() => { setStatus(BloodDonationStatus.NotResponded) }} className="bg-yellow-700 px-5 py-2 text-white rounded-md">Not responded</button>
                        <button onClick={() => { setStatus(BloodDonationStatus.Rejected) }} className="bg-yellow-700 px-5 py-2 text-white rounded-md">Declined Only</button>
                        <button onClick={() => { setStatus(BloodDonationStatus.Pending) }} className="bg-red-800 px-5 py-2 text-white rounded-md">Pending</button>
                    </div>
                </div >
                <div className='w-full'>
                    <PaginationSection
                        api={{
                            renderType: (page: number, limit: number) => {
                                return getBloodIntrest(blood_id.toString(), page, limit, status);
                            }
                        }}
                        itemsRender={(data: IBloodDonate[]) => {
                            return (
                                data.length ? (
                                    <div className="grid gap-y-2 gap-x-4 mt-5 grid-cols-3">
                                        {
                                            data.map((item) => {
                                                return <VerifyBloodRequestItem currentStatus={item.status} setUpdate={setRefresh} donation_id={item._id} date={item.date} fullName={item.donor_profile?.full_name} message={messageFromBloodConcernce(item.requirement.patientName, item.concerns, formatDateToMonthNameAndDate(item.meet_expect), item.requirement.locatedAt.hospital_name)} profile_id={item.donor_profile.donor_id} />
                                            })
                                        }
                                    </div>
                                ) : <EmptyScreen msg='No response found' />
                            )
                        }}
                        paginationProps={{ current_page: 1, currentLimit: 10 }}
                        refresh={refresh}
                    />
                </div>
            </div >
            <Footer />
        </UserPrivateRouter >
    )
}


export default BloodAccount