import React from 'react'

function TabItem({keyid,children,isShow}) {
    return (
        <div className={`${keyid} p-5 ${!isShow && "hidden" }`}>
            {children}
        </div>
    )
}

export default TabItem