import PublicImage from "../Util/PublicImage";


function FundRaiserAboutContent({ description, fundRaiserPictures }: { description: string, fundRaiserPictures: string[] }) {

    const words = description ? description.split('.') : [];

    let imageIndex = 0

    const content = words.map((each, index) => {
        return (
            <div key={index} >
                <p>{each} </p>
                {
                    imageIndex < fundRaiserPictures.length && <div className='mt-3 mb-3' >
                        <PublicImage className='w-full' imageurl={fundRaiserPictures[imageIndex++]} />
                    </div>
                }
            </div>
        )
    })

    return <>
        {content}
    </>
}

export default FundRaiserAboutContent