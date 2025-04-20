import HttpClient from "./HttpClient";

type UserListType = {
    id: Number
    username:string
    // password: string
    email: string
    firstName: string
    lastName: string
    isActive: boolean
}


type CreateUserType = {
    username: string
    password: string
    email: string
    firstName: string
    lastName: string
    companyId: Number | null
}

const getAllUsers = async () => {
    const response = await HttpClient.get<UserListType[]>("users/get-users")
    return response;
};


const createUser = async (body: CreateUserType) => {
    const response = await HttpClient.post<void, CreateUserType>(body, "users/create-user")
    return response
}



const UserService = {
    getAllUsers,
    createUser
}


export type { UserListType, CreateUserType }

export default UserService;