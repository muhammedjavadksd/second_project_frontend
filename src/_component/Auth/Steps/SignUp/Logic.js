function signUpIndexUp(state)
{
    state((prev)=> prev+1)
}

function signUpIndexDown(state)
{
    state((prev)=> prev-1)
}

module.exports={
    signUpIndexUp,
    signUpIndexDown
}