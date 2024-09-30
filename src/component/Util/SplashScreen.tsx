import Image from "next/image"


function SpalshScreen() {
    return (
        <div className="fixed right-0 left-0 top-0 bottom-0">
            <div className="w-full h-full flex items-center justify-center">
                <Image alt="" src="/images/spalsh/loading.gif" width={80} />
            </div>
        </div>
    )
}

export default SpalshScreen