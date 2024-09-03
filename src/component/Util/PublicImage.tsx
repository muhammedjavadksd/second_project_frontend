import Image from "next/image";
import { useState } from "react";


function PublicImage({ imageurl, className }: { imageurl: string, className: string }) {

    const [src, setSrc] = useState(imageurl);

    const handleError = () => {
        setSrc(process.env.NEXT_PUBLIC_FRONTEND_URL + '/images/no-image.png');
    };

    return (
        <Image onError={handleError} className={className} layout="responsive" width={1} height={1} style={{ height: "100%", width: "100%" }} src={src} alt="Public image" />
    )
}

export default PublicImage