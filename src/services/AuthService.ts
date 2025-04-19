import HttpClient from "./HttpClient";


type SignInType = {
    username: string
    password: string
}

type TokenType = {
    token: string
    expirationDate: Date
}


const signIn = async (body: SignInType) => {
    const response = await HttpClient.post<TokenType, SignInType>(body, "auth/signin");
    return response;
}



const AuthService = { signIn }

export type { SignInType, TokenType }

export default AuthService;