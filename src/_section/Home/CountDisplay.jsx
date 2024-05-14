import React from 'react'

function CountDisplay() {
    return (
        <div class="grid grid-cols-3 gap-4 items-center	">
            <div className="countItems">
                <h2>250+</h2>
                <span>Donator's</span>
            </div>
            <div className="countItems">
                <h2>842M+</h2>
                <span>FundRaise</span>
            </div>
            <div className="countItems">
                <h2>12+</h2>
                <span>Success Story</span>
            </div>
        </div>
    )
}

export default CountDisplay