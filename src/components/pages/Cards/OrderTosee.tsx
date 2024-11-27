import React from 'react';
import {  Text, StyleSheet, TouchableOpacity } from 'react-native';

// Type for order prop
interface OrderCardProps {
  order: {
    id: string;
    address: string;
    status: string;
    time: string;
  };
}

export default function OrderTosee({ order }: OrderCardProps) {
  return (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.title}>Address: {order.address}</Text>
      <Text>Status: {order.status}</Text>
      <Text>Time: {order.time}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#9c4fd4',
    shadowOffset: { width: 13, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
