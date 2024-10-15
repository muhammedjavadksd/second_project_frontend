import NextImage from "next/image";
import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton";


function LoadImage({ imageurl, skeltonHeight, ...props }: { imageurl: string, skeltonHeight: number, [key: string]: any }) {


    const [src, setsrc] = useState(null);
    useEffect(() => {
        const image = new Image()
        image.src = imageurl

        image.onload = () => setsrc(imageurl);
    }, [imageurl, props])

    if (!src) {
        return (
            <div style={{ height: '100%', width: '100%' }}>
                <Skeleton height={skeltonHeight} />
            </div>
        )
    }
    return (
        <NextImage width={64} height={64} alt="" src={src}   {...props} />
    )
}

export default LoadImage