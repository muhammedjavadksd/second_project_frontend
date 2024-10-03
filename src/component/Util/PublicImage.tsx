import Image from "next/image";
import { useState } from "react";

function PublicImage({ imageurl, ...props }: { imageurl: string, [key: string]: any }) {

    const [src, setSrc] = useState(imageurl);

    const handleError = () => {
        setSrc(process.env.NEXT_PUBLIC_FRONTEND_URL + '/images/no-image.png');
    };

    return (
        <Image onError={handleError} layout="responsive" width={1} height={1} src={src} {...props} alt="Public image" />
    )
}

export default PublicImage