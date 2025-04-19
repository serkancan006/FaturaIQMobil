import * as Yup from "yup";

export const SignInValidationSchema = Yup.object({
  username: Yup.string()
    //.email("Geçerli bir e-posta giriniz")
    .required("Kullanıcı adı zorunludur"),
  password: Yup.string()
    .min(3, "Şifre en az 3 karakter olmalıdır")
    .required("Şifre zorunludur")
});