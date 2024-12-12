import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Modal, FlatList, Alert, TouchableOpacity } from 'react-native';
import DriversCard from './DriversCard'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import useZustand from "../../../../Store/useZustand";
import Loading from '../Loading/Loading';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



interface DriverInfo {
  driverId: string;
  name: string;
  mobile: string;
  //location: string;
}
type RootStackParamList = {
  OrderCard: undefined;
};

interface Driver {
  _id: string;
  id: string;
  fullname: string;
  email: string;
  address: string;
  mobile: number;
  role: string;
  location: string;

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

interface ModalComponentProps {
  visible: boolean;
  onClose: () => void;
  selectedOrderId: string | null;
  order: Order;
  setSelectedOrderId: React.Dispatch<React.SetStateAction<string | null>>;

}




// Sample order data

const DriversModal: React.FC<ModalComponentProps> = ({ visible, selectedOrderId, onClose }) => {


  const {
    setSnackbarVisible,
    setSnackbarMessage,
    setIsModalAddriverOpen,
    fetchUpdatedOrder
  } = useZustand();

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();




  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://livery-b.vercel.app/auth/register');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Driver[] = await response.json();
        setDrivers(data);
      } catch (error: unknown) {
        console.error('Error during order:', error);
        if (error instanceof Error) {
          alert(error.message);

        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);



  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);





  const handleSelectDriver = (driver: Driver) => {
    setSelectedDriver(driver);
    setIsModalVisible(true); // Open the modal

  };






  const handleDriverUpdate = async () => {
    await fetchUpdatedOrder();
  };





  const handleSubmit = async () => {

    try {
      const response = await fetch(
        `https://livery-b.vercel.app/order/create/${selectedOrderId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            driverId: selectedDriver?._id,
            name: selectedDriver?.fullname,
            mobile: selectedDriver?.mobile,
            location: selectedDriver?.location
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update order. Status: ${response.status}`);
      }

      setIsModalVisible(false)
      navigation.navigate('OrderCard');

      setSnackbarMessage("Add driver successful!");
      setSnackbarVisible(true);
      setIsModalAddriverOpen(false);
      onClose();


    } catch (error: any) {
      console.error('Error:', error);
      setSnackbarMessage(error.message);
      setSnackbarVisible(true);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };







  if (loading) {
    return <Loading />;
  }
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    //onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>


          <View style={styles.flatList}>
            <Text style={styles.buttonText}>Assign Driver</Text>
            <Modal
              animationType="slide"
              transparent
              visible={isModalVisible}
              onRequestClose={() => setIsModalVisible(false)}
            >
              <View style={styles.modalOverlayCofirm}>
                <View style={styles.modalContentConfirm}>
                  <Text style={styles.modalTitle}>Confirm Driver Selection</Text>
                  <Text style={styles.modalMessage}>
                    Are you sure you want to select{' '}
                    <Text style={styles.highlight}>
                      {selectedDriver?.fullname}
                    </Text>
                    ?
                  </Text>
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={[styles.button, styles.cancelButton]}
                      onPress={() => setIsModalVisible(false)} // Cancel action
                    >
                      <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>


                    <Pressable style={[styles.button, styles.confirmButton]} onPress={handleSubmit}>
                      <Text style={styles.confirmText}>Yes</Text>

                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
            <FlatList
              data={drivers.filter(driver => driver.role === 'Driver')}
              //data={drivers}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.id || String(index)}

              renderItem={({ item }) => <DriversCard driver={item} onPress={handleSelectDriver} />}
            />

            <Text onPress={() => setIsModalAddriverOpen(false)} style={styles.buttonText}>

              <MaterialIcons name="close" size={28} color="#9c4fd4" /></Text>


          </View>





        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#007bff',
  },
  iconClose: {
    marginTop: 12
  },
  flatList: {
    height: 700
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2323',

  },
  modalContent: {
    padding: 10,
    borderRadius: 3,
    backgroundColor: '#fff',
    width: 360,
    alignItems: 'center',
  },



  closeButton: {

    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,




  },
  buttonADriver: {
    color: '#EE5348', // White text
    fontSize: 14,
    fontWeight: '500',
  },



  buttonText: {
    color: "#6B7280",
    fontSize: 17,
    fontWeight: "700",
    marginTop: 10,
    textAlign: 'center',
    padding: 12
  },


  modalOverlayCofirm: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3434',
    fontFamily: 'Robot-Regular',
  },
  modalContentConfirm: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
  },
  cancelText: {
    color: '#fff',
  },
  confirmButton: {
    backgroundColor: '#dc67545',
    marginRight: 10,
  },



  confirmText: {
    color: '#55555',

  },
});

export default DriversModal;
