
function loginStepIndexUp(state: Function): void {
    state((prev) => prev + 1)
}

function loginStepDown(state: Function): void {
    state((prev) => prev - 1)
}

export { loginStepDown, loginStepIndexUp }