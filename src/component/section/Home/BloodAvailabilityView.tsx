import SectionTitle from '@/component/Util/SectionTitle'
import const_data from '@/util/data/const';
import API_axiosInstance from '@/util/external/axios/api_axios_instance';
import { BloodGroup } from '@/util/types/Enums/BasicEnums'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';

function BloodAvailabilitySection() {


    let [bloodStatics, setBloodStatics] = useState(null);
    useEffect(() => {

        API_axiosInstance.get("blood/blood_availability", {}).then((data) => {
            let response = data.data;
            if (response.status) {
                let profile = response.data
                // {A+: 0, A-: 0, B+: 0, B-: 0, AB+: 0, …}
                console.log(profile);

                setBloodStatics(profile)
            }

        }).catch((err) => {
            console.log(err);
        })

    }, [])




    return (
        <div className=''>

            <SectionTitle
                title={"Blood Availability"}
                focus_text={"Blood"}
                sub_title={"Current availability by blood group"}
            />

            <div className="">
                {bloodStatics ? <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {
                        Object.keys(bloodStatics).map((each, index) => {
                            return (
                                <div key={index} className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-xs mx-auto transform hover:scale-105 transition-transform duration-300">
                                    <div className="flex items-center justify-center py-5 space-x-4">
                                        <div className="relative flex items-center justify-center w-24 h-24 bg-gradient-to-t from-red-600 to-red-600 rounded-full shadow-md">
                                            <span className="text-white text-4xl font-extrabold">{each}</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="text-gray-900 dark:text-gray-200 text-5xl font-bold mb-2">{bloodStatics[each]}</div>
                                            <div className="text-gray-600 dark:text-gray-400 text-base font-medium">Donors</div>
                                        </div>
                                    </div>
                                    <div className="w-full py-2 bg-red-600 text-center text-white text-xs rounded-b-lg">
                                        <span>Last Updated</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div> : <Skeleton height={250} />
                }
            </div>


        </div>
    )
}

export default BloodAvailabilitySection