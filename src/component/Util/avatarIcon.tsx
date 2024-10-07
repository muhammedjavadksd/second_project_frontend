

function AvatarIcon({ name }) {

    let char = name.charAt(0)
    let charSplit = name.split(" ")
    if (charSplit.length > 1) {
        char += charSplit[1].charAt(0)
    }

    return (
        <div className="bg-white  rounded-full w-12 flex justify-center items-center text-black h-12">
            {char}
        </div>
    )
}

export default AvatarIcon