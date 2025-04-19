import * as Yup from 'yup'

export const CreateUserValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('Ad zorunludur'),
  lastName: Yup.string().required('Soyad zorunludur'),
  email: Yup.string().email('Geçerli bir email giriniz').required('Email zorunludur'),
  password: Yup.string().min(6, 'Şifre en az 6 karakter olmalı').required('Şifre zorunludur'),
  username: Yup.string().required('Kullanıcı adı zorunludur'),
  companyId: Yup.number()
    .nullable()
    .transform((value, originalValue) => originalValue === '' ? null : value)
    .moreThan(0, 'Firma seçmelisiniz')
})