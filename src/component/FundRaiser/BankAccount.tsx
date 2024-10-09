import { IBankAccount } from "@/util/types/API Response/FundRaiser"
import { confirmAlert } from "react-confirm-alert"
import DangerUIConfirm from "../Util/DangerUIConfirm"
import { activeAccount, activeAccountByAdmin, deleteBankAccountByUser } from "@/util/data/helper/APIHelper"
import { toast } from "react-toastify"
import { FaTrash } from "react-icons/fa"
import { useEffect, useState } from "react"



function SingleBackAccount({ account, acAccount, fund_id, onComplete, role }: { account: IBankAccount, acAccount: string, fund_id: string, onComplete: Function, role: "admin" | "user" }) {


    const [activeBankAccount, setAccount] = useState(acAccount);


    useEffect(() => {
        setAccount(activeBankAccount)
    }, [acAccount])


    async function setAsPrimaryAccount(benfId: string) {

        confirmAlert({
            title: "Are you sure want to make this account as primary?",
            message: "set as primary?",
            customUI: ({ onClose, title }) => {
                return (
                    <DangerUIConfirm
                        onClose={onClose}
                        onConfirm={async () => {
                            try {
                                const data = role == "user" ? await activeAccount(fund_id.toString(), benfId) : await activeAccountByAdmin(fund_id.toString(), benfId)
                                if (data.status) {
                                    onComplete();
                                    setAccount(benfId);
                                    toast.success(data.msg)
                                } else {
                                    toast.error(data.msg)
                                }
                            } catch (e) {
                                toast.error("Something went wrong")
                            } finally {
                                onClose()
                            }
                        }}
                        title={title}
                    />
                )
            }
        })
    }

    return (
        <div
            key={account.befId}
            className={`bg-white rounded-lg shadow-md p-6 transition-all duration-300 ${account.is_active ? "ring-2 ring-blue-500" : ""
                }`}
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{account.holder_name}</h2>
                <div className="flex space-x-2">

                    <button
                        onClick={() => {
                            confirmAlert({
                                title: "Are you sure want to delete the account?",
                                message: "delete the account?",

                                customUI: ({ onClose, title }) => {
                                    return (
                                        <DangerUIConfirm
                                            onClose={onClose}
                                            onConfirm={() => {
                                                deleteBankAccountByUser(fund_id.toString(), account.befId).then((data) => {
                                                    if (data.status) {
                                                        toast.success("Bank account deleted")
                                                        onClose()
                                                        onComplete()
                                                    } else {
                                                        toast.error(data.msg)
                                                    }
                                                }).catch((err) => {
                                                    console.log(err);
                                                })
                                            }}
                                            title={title}
                                        />
                                    )
                                }
                            })

                        }}
                        className="text-red-500 hover:text-red-600 transition-colors duration-200"
                        aria-label="Delete account"
                    >
                        <FaTrash />
                    </button>

                </div>
            </div>
            <div className="space-y-2">
                <p>
                    <span className="font-semibold">Account Number:</span>{" "}
                    {account.account_number}
                </p>
                <p>
                    <span className="font-semibold">Account Holder:</span>{" "}
                    {account.holder_name}
                </p>
                <p>
                    <span className="font-semibold">IFSC Code:</span>
                    {account.ifsc_code}
                </p>
            </div>
            {
                activeBankAccount == account.befId ? (
                    <>
                        <button className='bg-green-600 mt-3 text-white w-full p-3 rounded-md'>Primary Account</button>
                    </>
                ) : <>
                    <button onClick={() => setAsPrimaryAccount(account.befId)} className='bg-blue-600 mt-3 text-white w-full p-3 rounded-md'>Switch to Primary</button>
                </>
            }
        </div>
    )
}

export default SingleBackAccount