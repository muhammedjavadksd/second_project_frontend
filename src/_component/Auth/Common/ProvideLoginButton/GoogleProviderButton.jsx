import React from 'react'

function GoogleProviderButton() {
    return ( 
            <button
                aria-label="Sign in with Google"
                class="flex bg-white w-full justify-center items-center text-blue-600 border border-button-border-light rounded-md p-0.5 pr-3"
            >
                <div class="flex items-center justify-center bg-white w-9 h-9 rounded-l">
                <i class="fa-brands fa-google"></i>
                </div>
                <span class="text-sm text-google-text-gray tracking-wider">Sign in with Google</span>
            </button> 
    )
}

export default GoogleProviderButton