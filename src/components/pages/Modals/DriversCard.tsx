import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
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

const DriversCard: React.FC<OrderCardProps> = ({ order }) => {
  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'orange';
      case 'in transit':
        return '#28a745'; 
        case 'delivered':
          return '#007bff';
          case 'unassigned':
          return '#2323';
          default:
        return 'gray';
    }
  };



  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <TouchableOpacity style={styles.card}>
    <View style={styles.header}>
      <Text style={[styles.status, { color: getStatusColor(order.status) }]}>
        {order.status}
      </Text>
      <Text style={styles.driverName}>
        {order.driverName }
         
      </Text>
    </View>

    <Text style={styles.address}>Address: {order.address}</Text>

    <View style={styles.footer}>
      <Text style={styles.time}>Time: {order.time}</Text>
      <TouchableOpacity
        onPress={() => console.log(`Call driver for order ${order.id}`)}
        style={styles.phone}
      >
        <FontAwesome name="phone" size={22} color="#007BFF" />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assignDriver: {
    backgroundColor: "#007BFF",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  assignDriverText: {
    color: "#fff",
    fontSize: 14,
  },
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

  buttonText: {
    color: '#DAF7A6', // White text
    fontSize: 12,
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 5

  },
  phone: {

  },
  status: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  unassignedStatus:{
    fontWeight: '600',
    fontSize: 14,
    
    color:'#3434'
  },

 
  addDriver: {
    padding: 2,
    backgroundColor: '#9c4fd4', // Green background for the button
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5
  },
 
  driverName: {
    fontSize: 14,
    color:'#454545',
    fontWeight: '500',
    textAlign: 'center',
    textTransform:'capitalize'

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

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    width: 300,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f44336', // Red background for the close button
    borderRadius: 5,
  },
});

export default DriversCard;
