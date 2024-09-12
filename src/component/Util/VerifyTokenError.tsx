import { Fragment } from "react"


function VerifyTokenError() {
    return (
        <Fragment>
            <div className="w-full h-screen flex justify-center items-center">
                <div role="alert">
                    <div className="text-center bg-red-500 text-white font-bold rounded-t px-4 py-2">
                        Fund Raising Closed Failed
                    </div>
                    <div className="max-w-2xl border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                        <p className="text-center"><strong>Notice:</strong> <br /> The attempt to close the fundraising process has encountered an error. <br /> This may be due to expired tokens or unauthorized access. <br /> Please follow these steps to resolve the issue:</p> <br />
                        <p className=" text-center">
                            <strong> Review Fundraising Outcomes:</strong> <br /> Ensure that you can still assess the total amount raised and compare it with your goals.<br />
                            <br /><strong>Express Gratitude:</strong> <br />Confirm that you are able to send thank-you messages to all contributors and supporters.<br />
                            <br /><strong>Update Financial Records:</strong><br />Verify that you can accurately record and categorize all donations and expenses.<br />
                            <br /><strong>Communicate Results:</strong><br /> Verify that you can share the campaign's success and impact with donors and supporters.<br />
                            <br /><strong>Plan for Future Campaigns:</strong> <br />Ensure you can use the insights gained to plan future fundraising efforts.</p>
                        <p className="text-center">Please check your access credentials and token validity. If the issue persists, contact support for assistance.</p>



                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default VerifyTokenError