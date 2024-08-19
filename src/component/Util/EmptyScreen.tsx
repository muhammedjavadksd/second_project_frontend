import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import CustomeConfirmUI from './ConfirmUI';


function EmptyScreen({ msg = "There is no expresss intrest from your side" }) {

    // <div className='bg-gray-100 min-h-96 flex items-center justify-center flex-col border border-gray-200 rounded-lg shadow-md p-6 text-center'>
    //     <img
    //         src="/images/icons/no-data-found.png"
    //         alt="No data found"
    //         className='w-24 h-24 mx-auto mb-4'
    //     />
    //     <h2 className='text-xl font-semibold text-gray-800 mb-2'>
    //         No Records Found
    //     </h2>
    //     <button onClick={() => {
    //         showConfirm("Are you sure about it").then((val) => {
    //             alert(val)
    //         }).catch((err) => {
    //             alert(err)
    //         })
    //     }}>Click me</button>
    //     <p className='text-gray-600'>{msg}</p>
    // </div>

    function handleShowConfirm() {
        confirmAlert({
            title: "Are you sure about it",
            message: "Are you sure about it?",
            customUI: ({ onClose, title, }) => {
                return <CustomeConfirmUI onConfirm={() => alert("Confirmed")} onClose={onClose} title={title} />
            }
        })
    }

    return (
        <div>
            <button onClick={() => handleShowConfirm()}>Show Confirm</button>
        </div>
    );
}

export default EmptyScreen;
