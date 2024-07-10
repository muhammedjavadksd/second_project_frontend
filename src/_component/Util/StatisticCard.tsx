import { IStaticCard } from '@/types/InterFace/PropInterFace'
import React from 'react'

function StatisticCard({ title, statistic, icon }: IStaticCard) {
    return (
        <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-orange-100 dark:bg-gray-800">
            <div className="p-4 items-center">
                <div className="p-3 rounded-full text-black w-12 flex justify-center h-12  items-center  bg-white dark:bg-orange-500 mr-4">
                    {icon}
                </div>
                <div className='mt-3'>
                    <p className="mb-2  text-sm font-medium text-blue-600 dark:text-gray-400">
                        {title}
                    </p>
                    <p className="text-3xl font-semibold text-gray-700 dark:text-gray-200">
                        {statistic}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default StatisticCard