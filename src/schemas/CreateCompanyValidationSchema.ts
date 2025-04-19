import * as Yup from 'yup';

export const CreateCompanyValidationSchema = Yup.object({
  address: Yup.string()
    .required('Adres zorunludur'),
  email: Yup.string()
    .email('Geçerli bir e-posta giriniz')
    .required('E-posta zorunludur'),
  name: Yup.string()
    .required('İsim zorunludur'),
  phone: Yup.string()
    .required('Telefon numarası zorunludur'),
  taxNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Vergi numarası 10 haneli olmalıdır')
    .required('Vergi numarası zorunludur')
});