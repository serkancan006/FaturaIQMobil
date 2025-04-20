import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SentInvoiceListPage from "./pages/user/SentInvoiceListPage";
import ReceivedInvoiceListPage from "./pages/user/ReciveInvoiceListPage";
import InvoiceCreatePage from "./pages/user/InvoiceCreatePage";
import GetUsersPage from "./pages/admin/GetUsersPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import GetCompaniesPage from "./pages/admin/GetCompaniesPage";
import CreateUserPage from "./pages/admin/CreateUserPage";
import CreateCompanyPage from "./pages/admin/CreateCompanyPage";
import UserDashboardPage from "./pages/user/UserDashboardPage";
import Page404 from "./pages/Page404";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import { useAuth } from "./hooks/AuthContext";
import Authorization from "./hooks/Authorization";

// Tab ve Drawer navigatörleri için gerekli objeler
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// AdminDrawer bileşeni
function AdminDrawer() {
  return (
    <Drawer.Navigator initialRouteName="AdminDashboard">
      <Drawer.Screen
        name="AdminDashboard"
        component={AdminDashboardPage}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="AdminCompanies"
        component={GetCompaniesPage}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="business" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="AdminUsers"
        component={GetUsersPage}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="business" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="CreateUser"
        component={CreateUserPage}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-add" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="CreateCompany"
        component={CreateCompanyPage}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="business" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

// UserTab bileşeni
function UserTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="UserDashboard"
        component={UserDashboardPage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="apps" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SentInvoices"
        component={SentInvoiceListPage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ReciveInvoices"
        component={ReceivedInvoiceListPage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="InvoiceCreate"
        component={InvoiceCreatePage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Router bileşeni
function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabsScreen} // TabsScreen bileşenini kullanıyoruz
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Unauthorized"
        component={UnauthorizedPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="404"
        component={Page404}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

// TabsScreen bileşenini buraya ekliyoruz, tüm tabları burada tanımlıyoruz
function TabsScreen() {
  const { isAuthenticated, userRoles } = useAuth();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Login"
        component={LoginPage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="log-in" color={color} size={size} />
          ),
        }}
      />

      {/* Admin ve User rollerini kontrol et */}
      {isAuthenticated && userRoles?.includes("ROLE_ADMIN") && (
        <Tab.Screen
          name="AdminDrawer"
          //component={AdminDrawer}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        >
          {() => (
            <Authorization allowedRoles={["ROLE_ADMIN"]}>
              <AdminDrawer />
            </Authorization>
          )}
        </Tab.Screen>
      )}

      {isAuthenticated && userRoles?.includes("ROLE_USER") && (
        <Tab.Screen
          name="UserTab"
          //component={UserTab}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        >
          {() => (
            <Authorization allowedRoles={["ROLE_USER"]}>
              <UserTab />
            </Authorization>
          )}
        </Tab.Screen>
      )}




      {/* Admin ve User rollerini kontrol et */}
      {/* {isAuthenticated && userRoles?.includes("ROLE_ADMIN") && (
        <Tab.Screen
          name="AdminDrawer"
          //component={AdminDrawer}
          component={() => (
            <Authorization allowedRoles={["ROLE_ADMIN"]}>
              <AdminDrawer />
            </Authorization>
          )}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
      )}

      {isAuthenticated && userRoles?.includes("ROLE_USER") && (
        <Tab.Screen
          name="UserTab"
          //component={UserTab}
          component={() => (
            <Authorization allowedRoles={["ROLE_USER"]}>
              <UserTab />
            </Authorization>
          )}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
      )} */}


      {/* <Tab.Screen
        name="AdminDrawer"
        component={AdminDrawer}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="UserTab"
        component={UserTab}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      /> */}


    </Tab.Navigator>
  );
}

export default Router;
