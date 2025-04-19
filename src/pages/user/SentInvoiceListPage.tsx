import React, { useEffect, useState } from "react";
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
    accessor: "Tıkla",
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

const SentInvoiceListPage = () => {
  const [sentInvoices, setSentInvoices] = useState<ListInvoiceType[]>([]);

  const fetchData = async () => {
    try {
      const response = await InvoiceService.getSentInvoices();
      setSentInvoices(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //   useEffect(() => {
  //     fetchData();
  //   }, []);
  useFocusEffect(
    React.useCallback(() => {
      // Refetch data when the screen is focused
      fetchData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gönderilen Faturalar Sayfası</Text>
      <GenericTable data={sentInvoices} columns={invoiceColumns} />
    </View>
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

export default SentInvoiceListPage;
