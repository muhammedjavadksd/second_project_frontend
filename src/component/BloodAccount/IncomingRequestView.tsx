import React from "react"
import IncomingBloodCard from "../Blood/IncomingBloodCard"
import { BloodGroup } from "@/util/types/Enums/BasicEnums"


function IncomingRequestView() {
    return (
        <div className=" donateMyBlood mt-5">
            <div className="grid gap-10 grid-cols-3">
                <IncomingBloodCard deadLine={"12/02/0222"} group={BloodGroup.AB_NEGATIVE} location={"Kasaragod"} onDonateBlood={() => { }} unit={"1"} username={"Muhammed Javad"} />
                <IncomingBloodCard deadLine={"12/02/0222"} group={BloodGroup.AB_NEGATIVE} location={"Kasaragod"} onDonateBlood={() => { }} unit={"1"} username={"Muhammed Javad"} />
                <IncomingBloodCard deadLine={"12/02/0222"} group={BloodGroup.AB_NEGATIVE} location={"Kasaragod"} onDonateBlood={() => { }} unit={"1"} username={"Muhammed Javad"} />
            </div>
        </div>
    )
}

export default IncomingRequestView