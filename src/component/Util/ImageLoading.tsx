import NextImage from "next/image";
import { useEffect, useState } from "react"


function LoadImage({ imageurl, ...props }: { imageurl: string, [key: string]: any }) {


    const [src, setsrc] = useState('/skelton.gif');
    useEffect(() => {
        const image = new Image()
        image.src = imageurl

        image.onload = () => setsrc(imageurl);
    }, [imageurl, props])

    return (
        <div>
            <NextImage width={64} height={64} alt="" src={src}   {...props} />
        </div>
    )
}

export default LoadImage