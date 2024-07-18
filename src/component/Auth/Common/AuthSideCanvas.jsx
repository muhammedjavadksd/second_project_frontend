

import React from 'react'

function AuthSideCanvas({bannerTitle}) {
    return (
        <div style={{ padding: "54px" }}>
            <h1 class="flex items-center text-4xl leading-3 font-bold text-white"> {bannerTitle}</h1>
            <div className='flex mt-10 gap-8 '>
                <div>
                    <div className='iconCard mb-3 flex items-center justify-center text-1xl'>
                        <i class="fa-solid text-white fa-droplet"></i>
                    </div>
                    <h1 class="mb-1 text-1xl  leading-none tracking-tight  text-blue-400 font-bold">250+</h1>
                    <p class="mb-3 font-normal text-white ">Total blood  donated</p>
                </div>
                <div>
                    <div className='iconCard mb-3 flex items-center justify-center text-1xl'>
                        <i class="fa-solid text-white fa-money-bill"></i>
                    </div>
                    <h1 class="mb-1 text-1xl  leading-none tracking-tight  text-blue-400 font-bold">25L</h1>
                    <p class="mb-3 font-normal text-white ">Total fund raised</p>
                </div>
                <div>
                    <div className='iconCard mb-3 flex items-center justify-center text-1xl'>
                        <i class="fa-solid text-white fa-bowl-food"></i>

                    </div>
                    <h1 class="mb-1 text-1xl  leading-none tracking-tight  text-blue-400 font-bold">250+</h1>
                    <p class="mb-3 font-normal text-white ">Total fundraisers</p>
                </div>
            </div>
        </div>
    )
}

export default AuthSideCanvas