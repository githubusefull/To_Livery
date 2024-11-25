import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import OrderTosee from './OrderTosee';

// Type for each order
interface Order {
  id: string;
  address: string;
  status: string;
  time: string;
}

// Sample order data
const orderData: Order[] = [
  { id: '1', address: '123 Main St', status: 'Pending', time: '12:00 PM' },
  { id: '2', address: '456 Oak Ave', status: 'In Transit', time: '12:30 PM' },
  { id: '3', address: '789 Pine Rd', status: 'Delivered', time: '1:00 PM' },
];

export default function OrderCard() {
  return (
    <View style={styles.container}>
      <FlatList
        data={orderData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderTosee order={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
});
