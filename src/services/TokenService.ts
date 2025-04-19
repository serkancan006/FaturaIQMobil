import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "accessToken";

const TokenService = {
  // Token'ı kaydet
  setTokenAsync: async (token: string): Promise<void> => {
    try {
      console.log("Token kaydediliyor:", token);
      await AsyncStorage.setItem(TOKEN_KEY, token);
      console.log("Token kaydedildi:", token);
    } catch (error) {
      console.error("Token kaydedilemedi", error);
    }
  },

  // Token'ı al
  getTokenAsync: async (): Promise<string | null> => {
    try {
      const value = await AsyncStorage.getItem(TOKEN_KEY);
      return value;
    } catch (error) {
      console.error("Token alınamadı", error);
      return null;
    }
  },

  // Token'ı sil
  removeTokenAsync: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      console.log("Token silindi");
    } catch (error) {
      console.error("Token silinemedi", error);
    }
  },

  // Auth kontrolü
  isAuthenticatedAsync: async (): Promise<boolean> => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      return !!token;
    } catch (error) {
      console.error("isAuthenticated Token alınamadı", error);
      return false;
    }
  },

  // Rol bilgisi çıkar
  getRolesAsync: async (): Promise<string[] | null> => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (token) {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.roles || null;
      }
      return null;
    } catch (error) {
      console.error("getRoles Token alınamadı veya decode hatası", error);
      return null;
    }
  },
};

export default TokenService;
