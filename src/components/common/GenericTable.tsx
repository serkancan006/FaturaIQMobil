import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

interface TableColumn {
  header: string;  // Column header
  accessor: string; // Key to access data from the row
  render?: (value: any, row: any) => React.ReactNode; // Optional render function for custom rendering
}

interface GenericTableProps {
  data: any[]; // Table data
  columns: TableColumn[]; // Table columns info
}

const GenericTable: React.FC<GenericTableProps> = ({ data, columns }) => {
  if (!data || !columns) {
    return <Text>No data or columns provided.</Text>;
  }

  // Render header row
  const renderHeader = () => {
    return (
      <View style={styles.row}>
        {columns.map((column, index) => (
          <View key={index} style={styles.cell}>
            <Text style={styles.headerText}>{column.header}</Text>
          </View>
        ))}
      </View>
    );
  };

  // Render data rows
  const renderRow = ({ item }: { item: any }) => (
    <View style={styles.row}>
      {columns.map((column, index) => (
        <View key={index} style={styles.cell}>
          {column.render ? (
            column.render(item[column.accessor], item)
          ) : (
            <Text>{item[column.accessor]}</Text>
          )}
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={data}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text>No data available</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  cell: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
  },
});

export type { TableColumn };

export default GenericTable;
