import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import TokenService from "../services/TokenService";
import { useAuth } from "../hooks/AuthContext";

const HomePage = ({ navigation }: any) => {
  const { isAuthenticated, userRoles } = useAuth();
  const [token, setToken] = useState<string>("Yükleniyor...");

  useFocusEffect(
    React.useCallback(() => {
      const fetchToken = async () => {
        try {
          const tokenValue = await TokenService.getTokenAsync();
          setToken(tokenValue ?? "Token yok");
        } catch (error) {
          setToken("Token alınamadı");
        }
      };

      fetchToken();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text>🏡 Home Page</Text>
      <Text>{token}</Text>
      <Text>Authenticated: {isAuthenticated ? "Evet" : "Hayır"}</Text>

      <Text style={styles.roleTitle}>Kullanıcı Rolleri:</Text>
      {userRoles && userRoles.length > 0 ? (
        <ScrollView>
          {userRoles.map((role, index) => (
            <Text key={index}>{role}</Text>
          ))}
        </ScrollView>
      ) : (
        <Text>Roller bulunamadı.</Text>
      )}
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  roleTitle: {
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
});
