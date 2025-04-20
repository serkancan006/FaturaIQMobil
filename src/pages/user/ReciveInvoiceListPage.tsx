import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import InvoiceService, { ListInvoiceType } from "../../services/InvoiceService";
import GenericTable, {
  TableColumn,
} from "@/src/components/common/GenericTable";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const invoiceColumns: TableColumn[] = [
  { header: "Fatura No", accessor: "invoiceNumber" },
  {
    header: "Fatura Tarihi",
    accessor: "invoiceDate",
    render: (value: string) => new Date(value).toLocaleDateString("tr-TR"),
  },
  { header: "Durum", accessor: "invoiceStatus" },
  { header: "Toplam Tutar", accessor: "totalAmount" },
  { header: "KDV Tutarı", accessor: "kdvAmount" },
  { header: "KDV Oranı", accessor: "kdvRate" },
  { header: "Net Tutar", accessor: "netAmount" },
  { header: "Tevkifat Oranı", accessor: "withholdingRate" },
  { header: "İskonto Oranı", accessor: "discountRate" },
  { header: "Senaryo Tipi", accessor: "scenarioType" },
  { header: "Fatura Tipi", accessor: "invoiceType" },
  {
    header: "Ürünler",
    accessor: "items",
    render: (_: any, row: ListInvoiceType) =>
      row.items && row.items.length > 0 ? (
        <FlatList
          data={row.items}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>{item.unitPrice.toString()}</Text>
              <Text>{item.quantity.toString()}</Text>
              <Text>{item.totalPrice.toString()}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noItemsText}>Ürün yok</Text>
      ),
  },
  {
    header: "İşlem",
    accessor: "",
    render: (_: any, row: ListInvoiceType) => (
      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert("Fatura No", row.invoiceNumber)}
      >
        <Text style={styles.buttonText}>Tıkla</Text>
      </TouchableOpacity>
    ),
  },
];

const ReceivedInvoiceListPage = () => {
  const [receivedInvoices, setReceivedInvoices] = useState<ListInvoiceType[]>(
    []
  );
  const [page, setPage] = useState<number>(0);
  const [itemsPerPage, onItemsPerPageChange] = useState<number>(3);
  const numberOfItemsPerPageList = [2, 3, 4, 10, 20, 50];

  const fetchData = async () => {
    const response = await InvoiceService.getReceiverInvoices(); // ← burası değişti
    setReceivedInvoices(response.data);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Alınan Faturalar Sayfası</Text>
      <GenericTable
        data={receivedInvoices}
        columns={invoiceColumns}
        itemsPerPage={itemsPerPage}
        setPage={setPage}
        numberOfPages={Math.ceil(receivedInvoices.length / itemsPerPage)}
        onItemsPerPageChange={onItemsPerPageChange}
        itemsPerPageList={numberOfItemsPerPageList}
        page={page}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  noItemsText: {
    color: "#999",
    fontStyle: "italic",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default ReceivedInvoiceListPage;
