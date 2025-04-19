import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { Ionicons } from "@expo/vector-icons";
import SentInvoiceListPage from "./pages/user/SentInvoiceListPage";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function AdminDrawer() {
  return (
    <Drawer.Navigator initialRouteName="AdminDashboard">
      <Drawer.Screen
        name="AdminDashboard"
        component={() => (
          <View>
            <Text>Admin Dashboard - Sayfa Henüz Oluşturulmadı</Text>
          </View>
        )}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="AdminCompanies"
        component={() => (
          <View>
            <Text>Admin Companies - Sayfa Henüz Oluşturulmadı</Text>
          </View>
        )}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="business" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="CreateUser"
        component={() => (
          <View>
            <Text>Create User - Sayfa Henüz Oluşturulmadı</Text>
          </View>
        )}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-add" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="CreateCompany"
        component={() => (
          <View>
            <Text>Create Company - Sayfa Henüz Oluşturulmadı</Text>
          </View>
        )}
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

function UserTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="UserDashboard"
        component={() => (
          <View>
            <Text>User Dashboard - Sayfa Henüz Oluşturulmadı</Text>
          </View>
        )}
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
        name="InvoiceCreate"
        component={() => (
          <View>
            <Text>Invoice Create - Sayfa Henüz Oluşturulmadı</Text>
          </View>
        )}
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

function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={() => (
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
            <Tab.Screen
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
            />
          </Tab.Navigator>
        )}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Unauthorized"
        component={() => (
          <View>
            <Text>Bu sayfaya erişim yetkiniz yok.</Text>
          </View>
        )}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="404"
        component={() => (
          <View>
            <Text>404 Sayfa Bulunamadı</Text>
          </View>
        )}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default Router;
