import * as Yup from 'yup';
import { invoiceTypeEnum, scenarioTypeEnum } from '../services/InvoiceService';

export const CreateInvoiceValidationSchema = Yup.object({
  receiverTaxNumber: Yup.string()
    .required('Vergi numarası zorunludur')
    .min(10, 'Vergi numarası en az 10 karakter olmalıdır')
    .max(11, 'Vergi numarası en fazla 11 karakter olabilir'),

  kdvRate: Yup.number()
    .typeError('KDV oranı sayısal olmalıdır')
    .required('KDV oranı zorunludur'),

  withholdingRate: Yup.number()
    .typeError('Tevkifat oranı sayısal olmalıdır')
    .required('Tevkifat oranı zorunludur'),

  discountRate: Yup.number()
    .typeError('İskonto oranı sayısal olmalıdır')
    .required('İskonto oranı zorunludur'),

  scenarioType: Yup.mixed<scenarioTypeEnum>()
    .oneOf(Object.values(scenarioTypeEnum), 'Geçerli bir senaryo tipi seçin')
    .required('Senaryo tipi zorunludur'),

  invoiceType: Yup.mixed<invoiceTypeEnum>()
    .oneOf(Object.values(invoiceTypeEnum), 'Geçerli bir fatura tipi seçin')
    .required('Fatura tipi zorunludur'),

  items: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required('Ürün adı zorunludur'),
        description: Yup.string().required('Açıklama zorunludur'),
        quantity: Yup.number()
          .typeError('Miktar sayısal olmalıdır')
          .required('Miktar zorunludur'),
        unitPrice: Yup.number()
          .typeError('Birim fiyatı sayısal olmalıdır')
          .required('Birim fiyatı zorunludur'),
      })
    )
    .min(1, 'En az bir ürün girmelisiniz')
});