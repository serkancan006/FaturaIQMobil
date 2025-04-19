import React from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useFormik } from "formik";
import { SignInValidationSchema } from "../schemas/SignInValidationSchema";
import AuthService, { SignInType } from "../services/AuthService";
import { useAuth } from "../hooks/AuthContext";

const SignIn = () => {
  const { loginAsync, logoutAsync } = useAuth();

  const onSubmit = async (values: SignInType) => {
    const response = await AuthService.signIn(values);
    if (response.status === 200) {
      await loginAsync(response.data.token);
      Alert.alert("Giriş Başarılı","Kullanıcılar sayfasına yönlendiriliyorsunuz");
    }
  };

  const handleLogout = async () => {
    await logoutAsync();
  };

  const formik = useFormik<SignInType>({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit,
    validationSchema: SignInValidationSchema,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LoginPage</Text>

      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Gönder</Text>
      </TouchableOpacity>
      <Button title="Çıkış Yap" onPress={handleLogout} />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
