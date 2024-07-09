import React from 'react'

interface TabItemInterFace {
    keyid: number | string,
    children: React.ReactElement,
    isShow: boolean
}

function TabItem({ keyid, children, isShow }: TabItemInterFace) {
    return (
        <div className={`${keyid} p-5 ${!isShow && "hidden"}`}>
            {children}
        </div>
    )
}

export default TabItem