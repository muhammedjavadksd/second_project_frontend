import React from "react"
import { BloodGroup } from "@/util/types/Enums/BasicEnums"
import OutGoingBloodCard from "../Blood/OutGoingBloodCard"


function OutGoingRequestView() {

    return (
        <div className=" donateMyBlood mt-5">
            <div className="grid gap-10 grid-cols-3">
                <OutGoingBloodCard deadLine={"12/02/0222"} group={BloodGroup.AB_NEGATIVE} location={"Kasaragod"} onDonateBlood={() => { }} unit={"1"} username={"Muhammed Javad"} />
                <OutGoingBloodCard deadLine={"12/02/0222"} group={BloodGroup.AB_NEGATIVE} location={"Kasaragod"} onDonateBlood={() => { }} unit={"1"} username={"Muhammed Javad"} />
                <OutGoingBloodCard deadLine={"12/02/0222"} group={BloodGroup.AB_NEGATIVE} location={"Kasaragod"} onDonateBlood={() => { }} unit={"1"} username={"Muhammed Javad"} />
            </div>
        </div>
    )


}

export default OutGoingRequestView