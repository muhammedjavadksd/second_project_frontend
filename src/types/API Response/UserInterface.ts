

interface UserResponse {
    _id: string
    user_id: string
    email: string
    first_name: string
    last_name: string
    location: Object
    phone_number: number
    profile_id: string
    creater_profile?: object
}

export default UserResponse