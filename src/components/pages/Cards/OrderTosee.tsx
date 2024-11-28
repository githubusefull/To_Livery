import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // For phone icon, ensure you install `@expo/vector-icons`

interface Order {
  id: string;
  address: string;
  status: string;
  time: string;
  driverName: string;
}

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'orange';
      case 'in transit':
        return '#28a745'; // Green color code
        case 'delivered':
          return '#007bff'; // Blue color code
          default:
        return 'gray';
    }
  };

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.header}>
        <Text style={[styles.status, { color: getStatusColor(order.status) }]}>
          {order.status}
        </Text>
        <Text style={styles.driverName}>{order.driverName ?  order.driverName : <Text style={styles.unassigned}>Unassigned</Text>}</Text>
      </View>

      <Text style={styles.address}>Address: {order.address}</Text>

      <View style={styles.footer}>
        <Text style={styles.time}>Time: {order.time}</Text>
        <TouchableOpacity onPress={() => console.log(`Call driver for order ${order.id}`)} style={styles.phone}>
          <FontAwesome name="phone" size={22} color="#007BFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#9c4fd4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  phone: {

  },
  status: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  unassigned: {
    fontWeight: '600',
    fontSize: 12,
    color:'#3434'
  },
  driverName: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  address: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 8
  },
  time: {
    fontSize: 14,
    color: '#555',
  },
});

export default OrderCard;
