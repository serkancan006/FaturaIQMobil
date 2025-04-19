import { AxiosInstance } from "axios";
import TokenService from "./TokenService";
import { Alert } from "react-native";

interface ErrorType {
  timestamp: Date;
  status: number;
  path: string;
  errors: Record<string, string>;
}

export function httpClientErrorInterceptor(httpClient: AxiosInstance): void {
  // ✅ Request interceptor - async token alma
  httpClient.interceptors.request.use(
    async (config) => {
      try {
        const token = await TokenService.getTokenAsync();

        if (token) {
          config.headers.set("Authorization", `Bearer ${token}`);
          // veya üstteki yerine alttakinie kullan
          // config.headers = {
          //   ...config.headers,
          //   Authorization: `Bearer ${token}`,
          // };
        }
      } catch (error) {
        console.error("Token alınırken hata oluştu:", error);
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // ✅ Response interceptor
  httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const status = error.response.status;
        switch (status) {
          case 400:
            const errorResponse: ErrorType = error.response.data;
            Alert.alert("Bad Request", `${errorResponse.errors["error"]}`);
            break;
          case 401:
            Alert.alert("Lütfen Giriş Yapın", "Yetkisiz işlem!");
            break;
          case 403:
            Alert.alert("Yetkisiz İşlem", "Yetkisiz işlem!");
            break;
          case 404:
            Alert.alert("Kaynak Bulunamadı", "İstediğiniz kaynak bulunamadı!");
            break;
          case 500:
            Alert.alert("Server Error", "Sunucu hatası!");
            break;
          default:
            Alert.alert("Beklenmeyen Hata", "Beklenmeyen bir hata oluştu!");
            break;
        }
      } else if (error.request) {
        Alert.alert(
          "İstek Yapıldı",
          "Yanıt alınamadı! API çalışmıyor olabilir!"
        );
      } else {
        Alert.alert("İstek Hatası", "İstek hazırlanırken hata oluştu!");
      }

      return Promise.reject(error);
    }
  );
}
