import HttpClient from "./HttpClient";

type CompanyListType = {
    id: Number
    name: string
    taxNumber: string
    email: string
    address: string
    phone: string
}

type CreateCompanyType = {
    name: string
    taxNumber: string
    email: string
    address: string
    phone: string
}

const getAllCompanies = async () => {
    const response = await HttpClient.get<CompanyListType[]>("companies/get-companies")
    return response;
};


const createCompany = async (body: CreateCompanyType) => {
    const response = await HttpClient.post<void, CreateCompanyType>(body, "companies/create-company")
    return response
}


const CompanyService = {
    getAllCompanies,
    createCompany
}


export type { CompanyListType, CreateCompanyType }

export default CompanyService;