import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Modal, FlatList } from 'react-native';
import DriversCard from './DriversCard'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



interface DriverInfo {
  driverId: string;
  name: string;
  mobile: string;
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

}




// Sample order data

const DriversModal: React.FC<ModalComponentProps> = ({ visible, onClose, selectedOrderId, order  }) => {


  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState<boolean>(true);





  useEffect(() => {
    const fetchOrders = async () => {
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

    fetchOrders();
  }, []);



  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

 

  const handleSelectDriver = (driver: Driver) => {
    setSelectedDriver(driver);
  };






  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>


          <View  style={styles.flatList}>
          <Text style={styles.buttonText}>Assign Driver</Text>
          <Text>OrderId:{order._id}</Text>
          <Text>DriverId: {selectedDriver?._id}
         
             </Text>


<FlatList          

  data={drivers}
  showsVerticalScrollIndicator={false}
  keyExtractor={(item, index) => item.id || String(index)} 

  renderItem={({ item }) => <DriversCard driver={item} onPress={handleSelectDriver}/>}
/>
</View>



        <Pressable style={styles.closeButton} onPress={onClose}>

            <MaterialIcons name="close" size={28} style={styles.iconClose} color="#9c4fd4" />

          </Pressable>
          
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    iconClose:{
  marginTop: 12
    },
    flatList: {
        height: 700
       },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2222',

  },
  modalContent: {
    padding: 10,
    borderRadius: 5,
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
    textAlign:'center',
    padding: 12
  },
});

export default DriversModal;
