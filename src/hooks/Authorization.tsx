import React from "react";
import { View, Text } from "react-native";
import { useAuth } from "../hooks/AuthContext"; // Path to your AuthContext
import { useNavigation } from "@react-navigation/native";

interface AuthorizationProps {
  allowedRoles: string[];
  redirectTo?: string;
}

const Authorization: React.FC<AuthorizationProps> = ({
  allowedRoles,
  redirectTo = "Login",
}) => {
  const { isAuthenticated, userRoles } = useAuth();
  const navigation = useNavigation();

  // If not authenticated or no roles
  if (!isAuthenticated || !userRoles) {
    navigation.navigate(redirectTo);
    return null;
  }

  // Check if user has any of the allowed roles
  const hasAccess = userRoles.some((role) => allowedRoles.includes(role));

  return hasAccess ? (
    <View>
      <Text>Authorized Content</Text>
    </View>
  ) : (
    <View>
      <Text>Unauthorized Access</Text>
    </View>
  );
};

export default Authorization;
