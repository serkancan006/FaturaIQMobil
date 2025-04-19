import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import TokenService from "../services/TokenService";

interface AuthContextType {
  isAuthenticated: boolean;
  loginAsync: (token: string) => Promise<void>;
  logoutAsync: () => Promise<void>;
  userRoles: string[] | null;
}

const defaultContext: AuthContextType = {
  isAuthenticated: false,
  loginAsync: async () => {},
  logoutAsync: async () => {},
  userRoles: null,
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRoles, setUserRoles] = useState<string[] | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = await TokenService.getTokenAsync();
      if (token) {
        setIsAuthenticated(true);
        const roles = await TokenService.getRolesAsync();
        setUserRoles(roles);
      }
    };
    initializeAuth();
  }, []);

  const loginAsync = async (token: string) => {
    await TokenService.setTokenAsync(token);
    setIsAuthenticated(true);
    const roles = await TokenService.getRolesAsync();
    setUserRoles(roles);
  };

  const logoutAsync = async () => {
    await TokenService.removeTokenAsync();
    setIsAuthenticated(false);
    setUserRoles(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginAsync, logoutAsync, userRoles }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
