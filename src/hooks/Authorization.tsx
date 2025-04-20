import React from "react";
import { Text } from "react-native";
import { useAuth } from "./AuthContext"; // Mevcut AuthContext'inizi kullanın
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

interface AuthorizationProps {
  allowedRoles: string[];
  redirectTo?: string;
  children: any; // Çocuk bileşenleri
}

const Authorization: React.FC<AuthorizationProps> = ({
  allowedRoles,
  redirectTo = "Login", // Varsayılan olarak Login sayfasına yönlendirme
  children,
}) => {
  const { isAuthenticated, userRoles } = useAuth(); // AuthContext'ten alınan veriler
  const navigation = useNavigation<NavigationProp<any>>();

  // Eğer kullanıcı doğrulanmamışsa ya da roller tanımlanmışsa, yönlendirme yap
  if (!isAuthenticated || !userRoles) {
    navigation.navigate(redirectTo); // Login sayfasına yönlendir
    return <Text>Yönlendiriliyor...</Text>;
  }

  // Kullanıcının rollerinden en az bir tanesi uygun mu?
  const hasAccess = userRoles.some((role) => allowedRoles.includes(role));

  if (!hasAccess) {
    navigation.navigate("Unauthorized"); // Erişim reddedildiyse Unauthorized sayfasına yönlendir
    return <Text>Yetkisiz Erişim</Text>;
  }

  return <>{children}</>; // Eğer yetki varsa, çocuk bileşenleri render et
};

export default Authorization;
