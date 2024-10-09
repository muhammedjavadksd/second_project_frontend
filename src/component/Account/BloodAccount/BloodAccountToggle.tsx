import CustomeConfirmUI from "@/component/Util/ConfirmUI";
import DangerUIConfirm from "@/component/Util/DangerUIConfirm";
import { openBloodAccountStatus } from "@/util/data/helper/APIHelper";
import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";


function BloodAccountToggle({ isAccountOpen }) {


    const [isOpen, setOpen] = useState(isAccountOpen);

    useEffect(() => {
        setOpen(isAccountOpen)
    }, [isAccountOpen])



    async function updateBloodProfile() {

        async function onConfirm() {
            const updateProfile = await openBloodAccountStatus(!isOpen);
            if (updateProfile.status) {
                setOpen(!isOpen)
            } else {
                toast.error(updateProfile.msg)
            }
        }

        confirmAlert({
            title: "Are you sure want to update account?",
            message: "update account?",

            customUI: ({ onClose, title }) => {
                if (isOpen) {
                    return (
                        <DangerUIConfirm
                            onClose={onClose}
                            onConfirm={() => {
                                onConfirm()
                                onClose()
                            }}
                            title={"Are you sure want to hide account"}
                        />
                    )
                } else {
                    return (
                        <CustomeConfirmUI
                            onClose={onClose}
                            onConfirm={() => {
                                onConfirm()
                                onClose()
                            }}
                            title={"Are you sure want to open account"}
                        />
                    )
                }
            }
        })

    }

    return (
        <label className="inline-flex items-center cursor-pointer">
            <input onChange={updateBloodProfile} type="checkbox" checked={isOpen} className="sr-only peer" />
            <div className="relative w-14 h-7 bg-red-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
        </label>
    )
}

export default BloodAccountToggle