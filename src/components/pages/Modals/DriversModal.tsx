import React from 'react';
import { StyleSheet, Text, View, Pressable, Modal, FlatList } from 'react-native';
import DriversCard from './DriversCard'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



interface Order {
    id: string;
    address: string;
    status: string;
    time: string;
    driverName: string;
  
  }
interface ModalComponentProps {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}




// Sample order data
const orderData: Order[] = [
    { id: '1', address: '123 hay riad number 123 ', status: 'Unassigned', time: '12:00 PM', driverName: ''  },
    { id: '2', address: '456 Oak Ave ', status: 'In Transit', time: '12:30 PM', driverName: 'moha oali'  },
    { id: '3', address: '789 Pine Rd', status: 'Delivered', time: '1:00 PM' , driverName: 'swed' },
    { id: '4', address: '123 Main St', status: 'Pending', time: '12:00 PM', driverName: 'moad'  },
    { id: '5', address: '456 Oak Ave', status: 'In Transit', time: '12:30 PM', driverName: 'hader'  },
    { id: '6', address: '789 Pine Rd', status: 'Delivered', time: '1:00 PM', driverName: 'walid'  },
    { id: '7', address: '123 Main St', status: 'Pending', time: '12:00 PM', driverName: 'mohamed'  },
    { id: '8', address: '123 Main St', status: 'Pending', time: '12:00 PM', driverName: 'mohamed'  },
    { id: '9', address: '123 Main St', status: 'Pending', time: '12:00 PM', driverName: 'mohamed'  },
    { id: '10', address: '123 Main St', status: 'Pending', time: '12:00 PM', driverName: 'mohamed'  },
    { id: '11', address: '123 Main St', status: 'Pending', time: '12:00 PM', driverName: 'ghali'  },
  
  ];
const DriversModal: React.FC<ModalComponentProps> = ({ visible, onClose, children }) => {
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

<FlatList
  data={orderData}
  showsVerticalScrollIndicator={false}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <DriversCard order={item} />}
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
    backgroundColor: '#5555',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    width: 350,
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
