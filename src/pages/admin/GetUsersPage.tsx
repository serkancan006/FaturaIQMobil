import React, { useState } from "react";
import { Alert, View, Text, Button, FlatList } from "react-native";
import { DataTable } from "react-native-paper";
import UserService, { UserListType } from "../../services/UserService";
import { useFocusEffect } from "@react-navigation/native";

const GetUsersPage = () => {
  const [users, setUsers] = useState<UserListType[]>([]);

  // Verileri çekme
  const fetchData = async () => {
    const response = await UserService.getAllUsers();
    setUsers(response.data);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  // Durum render fonksiyonu
  const renderStatus = (isActive: boolean) => {
    return isActive ? (
      <Text style={{ color: "green" }}>Aktif</Text>
    ) : (
      <Text style={{ color: "red" }}>Pasif</Text>
    );
  };

  // İşlem butonları
  const renderActions = (id: string) => {
    return <Button title="=)" onPress={() => alert("id = " + id)} />;
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>GetUsersPage</Text>

      {/* DataTable */}
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>User_Id</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
          <DataTable.Title>Ad</DataTable.Title>
          <DataTable.Title>Soyad</DataTable.Title>
          <DataTable.Title>Durum</DataTable.Title>
          <DataTable.Title>İşlemler</DataTable.Title>
        </DataTable.Header>

        {/* Kullanıcıları listeleme */}
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <DataTable.Row>
              <DataTable.Cell>{item.id.toString()}</DataTable.Cell>
              <DataTable.Cell>{item.email}</DataTable.Cell>
              <DataTable.Cell>{item.firstName}</DataTable.Cell>
              <DataTable.Cell>{item.lastName}</DataTable.Cell>
              <DataTable.Cell>{renderStatus(item.isActive)}</DataTable.Cell>
              <DataTable.Cell>
                {renderActions(item.id.toString())}
              </DataTable.Cell>
            </DataTable.Row>
          )}
        />
      </DataTable>
    </View>
  );
};

export default GetUsersPage;
