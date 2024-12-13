import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // For phone icon, ensure you install `@expo/vector-icons`
import DriversModal from '../Modals/DriversModal';
import useZustand from "../../../../Store/useZustand";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Loading from '../Loading/Loading';


interface DriverInfo {
  driverId: string;
  name: string;
  mobile: string;
  //location: string;
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


type RootStackParamList = {
  OrderDetails: { orderId: string };
};

const OrderToSee: React.FC<OrderCardProps> = ({ order }) => {

  const {
    isModalAddriverOpen,
    setIsModalAddriverOpen,
    loading,
    setLoading,
    setSnackbarMessage,
    setSnackbarVisible
  } = useZustand();


  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleViewDetails = () => {
    navigation.navigate('OrderDetails', { orderId: order._id });
  };

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'orange';
      case 'processing':
        return '#007bff';
      case 'refused':
        return '#f96565';
      case 'delivered':
        return '#16a34a';
      default:
        return 'gray';
    }
  };


  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [currentOrder, setCurrentOrder] = useState<Order>(order)


  const handleOpenModal = (id: string) => {
    setSelectedOrderId(id);
    setIsModalAddriverOpen(true);
  };




  const fetchUpdatedOrder = async (): Promise<void> => {
    try {
      const response = await fetch(
        `https://livery-b.vercel.app/order/create/${order._id}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Non-OK Response:", errorText);
        throw new Error(
          `Error fetching order: ${response.status} ${response.statusText}`
        );
      }

      const contentType = response.headers.get("Content-Type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Unexpected content type:", contentType);
        throw new Error("Response is not JSON.");
      }

      const updatedOrder: Order = await response.json();
      console.log("Fetched Updated Order:", updatedOrder);
      setCurrentOrder(updatedOrder);
    } catch (error) {
      console.error("Error fetching updated order:", error);
    }
  };



  const handleDriverUpdate = async () => {
    await fetchUpdatedOrder();
  };

  useEffect(() => {
    console.log(currentOrder.driverInfo, 'driver info..')

  }, [currentOrder.driverInfo]);





  const handleCallPress = () => {
    if (currentOrder.driverInfo && currentOrder.driverInfo.length > 0) {
      const driverMobile = currentOrder.driverInfo[0].mobile; // Assuming you want the first driver's number
      const phoneNumber = `tel:${driverMobile}`;
      Linking.openURL(phoneNumber).catch(err =>
        console.error('Failed to open dialer:', err)
      );
    } else {
      console.error('No driver information available');
    }
  };


  const handleStatusDelivered = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://livery-b.vercel.app/order/status/${currentOrder._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'Processing' }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to update status:', errorText);
        setSnackbarMessage(errorText);
        setSnackbarVisible(true);
        throw new Error('Error updating order status');
      }

      const data = await response.json();
      setCurrentOrder((prevOrder) => ({
        ...prevOrder,
        status: data.data.status, // Assuming the backend returns the updated status
      }));

      setSnackbarMessage('Order status updated to Accepted');
      setSnackbarVisible(true);
    } catch (error) {
      console.error('Error:', error);
      setSnackbarMessage('Eroor');
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Poll for updates every 5 seconds
    const intervalId = setInterval(() => {
      fetchUpdatedOrder();
    }, 5000);

    // Cleanup the interval when component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <TouchableOpacity style={styles.card} onPress={handleViewDetails}>
      <View style={styles.header}>
        <Text style={[styles.status, { color: getStatusColor(currentOrder.status) }]}>
          {currentOrder.status}
        </Text>

        {currentOrder.driverInfo && currentOrder.driverInfo.length > 0 ? (
          currentOrder.driverInfo.map((driver, index) => (
            <View style={styles.edit} key={index}>
              <Text style={styles.driverName}>
                  <Text style={styles.driver}>Driver : </Text>
                  {driver.name}
                  </Text>
            </View>

          ))
        ) : (
          <View style={styles.container}>
            <Pressable style={styles.addDriver} onPress={() => handleOpenModal(currentOrder._id)}>
              <Text style={styles.buttonText}>Add driver</Text>
            </Pressable>


            {selectedOrderId === currentOrder._id && (
              <DriversModal visible={isModalAddriverOpen}
                onClose={handleDriverUpdate}
                order={order}
                selectedOrderId={selectedOrderId} setSelectedOrderId={setSelectedOrderId} />

            )}


          </View>
        )}




      </View>

      <Text style={styles.address}>Address: {currentOrder.address} </Text>

      <View style={styles.footer}>
        <Text style={styles.time}>Time: {order.mobile}</Text>
        <TouchableOpacity onPress={handleCallPress} style={styles.phone}>
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
    fontWeight: '600',
    backgroundColor:'#E0E0E0',
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 4,
    padding: 3,
    fontSize: 12,
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
  driver: {
    fontSize: 14,
    color: '#2323',
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
  edit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4
  },
  driverUpdate: {
    marginLeft: 20
  }
});

export default OrderToSee;