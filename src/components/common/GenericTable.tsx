import React from "react";
import { ScrollView, Text, View } from "react-native";
import { DataTable } from "react-native-paper";

export interface TableColumn {
  header: string;
  accessor: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface GenericDataTableProps {
  data: any[];
  columns: TableColumn[];
  page: number;
  itemsPerPage: number;
  setPage: (page: number) => void;
  numberOfPages: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  itemsPerPageList: number[];
}

const GenericDataTable: React.FC<GenericDataTableProps> = ({
  data,
  columns,
  page,
  itemsPerPage,
  setPage,
  numberOfPages,
  onItemsPerPageChange,
  itemsPerPageList,
}) => {
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data.length);

  return (
    <ScrollView horizontal>
      <DataTable>
        <DataTable.Header>
          {columns.map((col, index) => (
            <DataTable.Title key={index} style={{ flex: 1 }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ flexWrap: "wrap" }}
              >
                {col.header}
              </Text>
            </DataTable.Title>
          ))}
        </DataTable.Header>

        {data.slice(from, to).map((row, rowIndex) => (
          <DataTable.Row key={row.key || rowIndex}>
            {columns.map((col, colIndex) => (
              <DataTable.Cell
                key={colIndex}
                style={{
                  flex: 1,
                  flexDirection: "column", // Satırlara sarması için 'column' yönünü ayarlıyoruz
                  paddingRight: 10, // Hücreye biraz padding ekledim
                  flexWrap: "wrap", // FlexWrap'i doğru uyguluyoruz
                }}
              >
                <Text
                  style={{
                    flexWrap: "wrap", // Text içeriğinin sarılmasını sağlar
                    width: "100%", // Hücre genişliğini alır
                    flexShrink: 1, // Taşan metnin sıkışmasını engeller
                    overflow: "visible", // Taşan metnin görünmesini sağlar
                  }}
                >
                  {col.render
                    ? col.render(row[col.accessor], row)
                    : row[col.accessor]}
                </Text>
              </DataTable.Cell>
            ))}
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={numberOfPages}
          onPageChange={setPage}
          label={`${from + 1}-${to} of ${data.length}`}
          numberOfItemsPerPageList={itemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={"Rows per page"}
        />
      </DataTable>
    </ScrollView>
  );
};

export default GenericDataTable;
