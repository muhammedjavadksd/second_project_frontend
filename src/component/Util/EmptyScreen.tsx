import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import CustomeConfirmUI from './ConfirmUI';
import Image from 'next/image';


function EmptyScreen({ msg }) {



    return (<div className='bg-gray-100 min-h-96 flex items-center justify-center flex-col border border-gray-200 rounded-lg shadow-md p-6 text-center'>
        <Image
            width={64}
            height={64}
            src="/images/icons/no-data-found.png"
            alt="No data found"
            className='w-24 h-24 mx-auto mb-4'
        />
        <h2 className='text-xl font-semibold text-gray-800 mb-2'>
            No Records Found
        </h2>
        <p className='text-gray-600'>{msg}</p>
    </div>
    )

}

export default EmptyScreen;
