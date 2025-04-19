import HttpClient from "./HttpClient";

export enum scenarioTypeEnum {
    Temel = "Temel",
    Ticari = "Ticari"
}

export enum invoiceTypeEnum {
    ALIS = "ALIS",
    SATIS = "SATIS",
    IADE = "IADE"
}

type InvoiceItemsCreateType = {
    name: string
    description: string
    quantity: Number | null
    unitPrice: Number | null
}

type CreateInvoiceType = {
    kdvRate: Number | null
    withholdingRate: Number | null
    discountRate: Number | null
    receiverTaxNumber: string
    scenarioType: scenarioTypeEnum | null
    invoiceType: invoiceTypeEnum | null
    items: Partial<InvoiceItemsCreateType>[]
}

type InvoiceItemsList = {
    id: Number // listelemde var create de yok
    name: string
    description: string
    quantity: Number
    unitPrice: Number
    totalPrice: Number // Listelemede var createde yok
}

type ListInvoiceType = {
    id: Number
    invoiceNumber: string
    invoiceDate: Date
    invoiceStatus: String
    totalAmount: Number
    kdvAmount: Number
    kdvRate: Number
    netAmount: Number
    withholdingRate: Number
    discountRate: Number
    // senderId: Number
    // receiverId: Number
    scenarioType: scenarioTypeEnum
    invoiceType: invoiceTypeEnum
    items: InvoiceItemsList[]
}


const createInvoice = async (body: CreateInvoiceType) => {
    var response = await HttpClient.post<void, CreateInvoiceType>(body, "Invoices/create-invoice")
    return response;
}

const getSentInvoices = async () => {
    var response = await HttpClient.get<ListInvoiceType[]>(`Invoices/get-sent-invoices`);
    return response;
}

const getReceiverInvoices = async () => {
    var response = await HttpClient.get<ListInvoiceType[]>(`Invoices/get-receiver-invoices`);
    return response;
}

const getAllInvoices = async () => {
    var response = await HttpClient.get<ListInvoiceType[]>("Invoices/get-invoices");
    return response;
}

const InvoiceService = {
    createInvoice,
    getSentInvoices,
    getReceiverInvoices,
    getAllInvoices
}

export type { CreateInvoiceType, ListInvoiceType,  InvoiceItemsCreateType, InvoiceItemsList }

export default InvoiceService