import { Fragment } from "react"


function VerifyTokenSuccess() {
    return (
        <Fragment>
            <div className="w-full h-screen flex justify-center items-center">
                <div role="alert">
                    <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
                        Fund Raising Closed
                    </div>
                    <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
                        <ul>
                            <li><strong>Review Fundraising Outcomes:</strong> <br />
                                Assess the total amount raised and compare it with your goals.</li>
                            <br /><li><strong>Express Gratitude:</strong> <br /> Send thank-you messages to all contributors and supporters.</li>
                            <br /><li><strong>Update Financial Records:</strong> <br />Record and categorize all donations and expenses accurately.</li>
                            <br /><li><strong>Distribute Rewards:</strong> <br />Ensure all promised rewards are delivered to the respective backers.</li>
                            <br /><li><strong>Prepare Impact Reports:</strong> <br />Create reports detailing how the funds will be used and the expected outcomes.</li>
                            <br /><li><strong>Communicate Results:</strong> <br />Share the success and impact of the campaign with donors and supporters through updates and social media.</li>
                            <br /><li><strong>Gather Feedback:</strong> <br />Collect feedback from donors and team members to evaluate what went well and what can be improved.</li>
                            <br /><li><strong>Plan for Future Campaigns:</strong><br /> Use insights gained to plan and strategize for future fundraising efforts.</li>
                        </ul>


                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default VerifyTokenSuccess