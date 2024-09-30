"use client"
import AdminLayout from "@/component/Admin/AdminLayout";
import MatchedDonors from "@/component/Blood/MatchedDonors";
import AdminPrivateRouter from "@/component/LoginComponent/AdminPrivateRouter";
import AdminBreadCrumb from "@/component/Util/AdminBreadCrumb";
import DropDownItem from "@/component/Util/DropdownItem";
import { Fragment } from "react";


function BloodBank() {

    return (
        <Fragment>
            <AdminPrivateRouter>
                <AdminLayout>
                    <div>
                        <div className="flex justify-between">
                            <div>
                                <AdminBreadCrumb title={"Blood Bank"} root={{ title: "Dashboard", href: "/" }} paths={[{ title: "Blood Bank", href: "/blood/blood-bank" }]} />
                            </div>
                            <DropDownItem callBack={(val) => { }} isOpen={false} options={['Malayakan', 'English']} title="Select blood group" />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-5">
                        <MatchedDonors />
                        <MatchedDonors />
                        <MatchedDonors />
                        <MatchedDonors />
                        <MatchedDonors />
                        <MatchedDonors />
                        <MatchedDonors />
                        <MatchedDonors />
                        <MatchedDonors />
                    </div>
                </AdminLayout>
            </AdminPrivateRouter>
        </Fragment>
    )
}

export default BloodBank