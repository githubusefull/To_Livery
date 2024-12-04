import React, { Children, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // For phone icon, ensure you install `@expo/vector-icons`
import DriversModal from '../Modals/DriversModal';

interface DriverInfo {
  driverId: string;
  name: string;
  mobile: string;
}

interface Order {
  _id: string;
  id: string;
  userId: string;
  mobile: number;
  address: string;
  quantity: string;
  boxType: string;
  From: string;
  To: string;
  status: string;
  driverInfo: DriverInfo[];
}

interface Driver {
  _id: string;
  id: string;
  fullname: string;
  email: string;
  address: string;
  mobile: number;
  role: string;
 
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
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);





  const handleOpenModal = (id: string) => {

   
    console.log('Opening modal for order ID:', id);
  
    setSelectedOrderId(id);
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
  };

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.header}>
        <Text style={[styles.status, { color: getStatusColor(order.status) }]}>
          {order.status} 
        </Text>

        {order.driverInfo && order.driverInfo.length > 0 ? (
          order.driverInfo.map((driver, index) => (
            <Text key={index} style={styles.driverName}>{driver.name}</Text>
          ))
        ) : (
          <View style={styles.container}>
            <Pressable style={styles.addDriver} onPress={() => handleOpenModal(order._id)}>
              <Text style={styles.buttonText}>Add driver</Text>
            </Pressable>


            {selectedOrderId === order._id && (
              <DriversModal visible={isModalOpen} onClose={handleCloseModal} order={order} selectedOrderId={selectedOrderId} />
      
            )}


          </View>
        )}
      </View>

      <Text style={styles.address}>Address: {order.address} </Text>

      <View style={styles.footer}>
        <Text style={styles.time}>Time: {order.mobile}</Text>
        <TouchableOpacity onPress={() => console.log(`Call driver for order ${order._id}`)} style={styles.phone}>
          <FontAwesome name="phone" size={22} color="#007BFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 5,
  },
  phone: {},
  status: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  addDriver: {
    padding: 4,
    backgroundColor: '#9c4fd4',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
    paddingRight: 8,
  },
  buttonText: {
    color: '#DAF7A6',
    fontSize: 12,
    fontWeight: '500',
  },
  driverName: {
    fontSize: 14,
    color: '#454545',
    fontWeight: '500',
    textAlign: 'center',
    textTransform: 'capitalize',
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
    paddingRight: 8,
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
    backgroundColor: '#f44336',
    borderRadius: 5,
  },
});

export default OrderCard;
