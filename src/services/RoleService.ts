import HttpClient from "./HttpClient";



type CreateRoleType = {
    name: String
}

const createRole = async (body: CreateRoleType) => {
    const response = await HttpClient.post<void, CreateRoleType>(body, "roles/create-role")
    return response
}


const RoleService = {
    createRole
}

export type { CreateRoleType }

export default RoleService