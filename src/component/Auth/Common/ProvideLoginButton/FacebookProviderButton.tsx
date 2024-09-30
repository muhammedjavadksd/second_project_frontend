import { signIn } from 'next-auth/react'
import React from 'react'

function FacebookProviderButton({ onSign }: { onSign: Function }) {
    return (
        <button
            onClick={() => onSign()}
            aria-label="Sign in with Google"
            className="flex bg-white w-full justify-center items-center text-blue-600 border border-button-border-light rounded-md p-0.5 pr-3"
        >
            <div className="flex items-center justify-center bg-white w-9 h-9 rounded-l">
                <i className="fa-brands fa-facebook"></i>

            </div>
            <span className="text-sm text-google-text-gray tracking-wider">Sign in with Facebook</span>
        </button>
    )
}

export default FacebookProviderButton