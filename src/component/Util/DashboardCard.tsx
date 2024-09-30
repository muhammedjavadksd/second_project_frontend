import React from 'react'

function DashboardCard({ title, data, icon, classNames }) {




    return (
        <div>
            <div className={`p-5  rounded ${classNames}`}>

                <div className="flex items-center space-x-4">
                    <div>
                        <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-green-200 text-green-400`}>
                            {icon ? icon : <i className="fa-regular fa-user"></i>}
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-400">{title}</div>
                        <div className="text-2xl font-bold text-gray-900">{data}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardCard