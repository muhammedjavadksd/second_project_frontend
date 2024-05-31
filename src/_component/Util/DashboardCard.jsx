import { tailWindColors } from '@/app/_util/_const/const'
import { useSession } from 'next-auth/react';
import React from 'react'

function DashboardCard({ title, data }) {




    return (
        <div>
            <div class="p-5 bg-white rounded shadow-sm">

                <div class="flex items-center space-x-4">
                    <div>
                        <div class={`flex items-center justify-center w-12 h-12 rounded-full bg-green-200 text-green-400`}>
                            <i class="fa-regular fa-user"></i>
                        </div>
                    </div>
                    <div>
                        <div class="text-gray-400">{title}</div>
                        <div class="text-2xl font-bold text-gray-900">{data}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardCard