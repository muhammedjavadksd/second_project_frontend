

function SecuredPayementModel() {
    return (
        <div className="w-96 overflow-auto bg-white text-black p-5" style={{ height: "600px" }}>
            <div className="">
                <b className="mb-2 block">Notice Regarding Payment and Item Delivery</b>
                <span className="mb-2 block">Dear Valued Customer</span>

                <div className="mb-2">Thank you for your purchase. We want to ensure that your transaction is secure and smooth.</div>
                <div className="mb-2 font-bold">Please review the following process:</div>

                <ol className="mb-5 list-decimal pl-4 gap-5 flex flex-col">
                    <li>Payment Security: When you make a payment for your item, the amount will be held securely by us. Upon payment, you will receive a unique token link which acts as a receipt for your transaction.</li>
                    <li>Item Delivery and Token Activation: Once you receive your item, you must activate the token link provided. This step is crucial for us to transfer the payment to the seller. Please make sure the token is enabled only when you have received the item.</li>
                    <li>Handling of Token: Ensure the token is activated in the presence of the item handover. This confirms that the item has been delivered successfully.</li>
                    <li>Refund Policy: If the item is not delivered by the specified due date, the amount held will be refunded to you. We are committed to resolving any issues promptly and ensuring your satisfaction.</li>
                </ol>

                If you have any questions or need assistance, please contact our support team.

                Thank you for your cooperation.

                Sincerely,
                [Your Company Name]
            </div>
        </div>
    )
}

export default SecuredPayementModel