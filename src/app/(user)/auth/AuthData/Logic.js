
function loginStepIndexUp(state)
{
    state((prev)=> prev+1)
}

function loginStepDown(state)
{
    state((prev)=> prev-1)
}

module.exports = {
    loginStepDown,
    loginStepIndexUp
}