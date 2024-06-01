import React, { useState } from 'react'

function Demo() {


    let [data, setData] = useState(0)
    console.log("Hello world");
    setData(10);


    return (
        <div>Data is : {data}</div>
    )
}

export default Demo