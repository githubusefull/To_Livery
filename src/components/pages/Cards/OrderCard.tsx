import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import OrderTosee from './OrderTosee';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import type { NavigationProp } from "@react-navigation/native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';



interface DriverInfo {
  driverId: string;
  name: string;
  mobile: string;
}

interface Order {
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


type RootStackParamList = {
  CreateOrderForm: undefined;
};





export default function OrderCard() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);






  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://livery-b.vercel.app/order/create');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Order[] = await response.json();
        setOrders(data);
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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOptionSelect = (option: any) => {
    setIsDropdownOpen(false);
    if (option === 'goBack') {
      navigation.goBack();
    } else {
      console.log('Other option selected');
    }
  };

  
  

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');

      
      alert('Logged out successfully!');
      setIsDropdownOpen(false)
    } catch (error) {
      console.error('Error during logout:', error);
      alert('An error occurred during logout');
    }
  };


  return (
    <View style={styles.container} >
      <View style={styles.navbar}>
        {/*
        <TouchableOpacity onPress={() => navigation.goBack()} >

        <MaterialIcons name="arrow-back" size={23} color="#9c4fd4" />

        </TouchableOpacity>*/}




        <TouchableOpacity
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
        style={styles.button}
      >
        <MaterialIcons name="menu" size={23} color="#9c4fd4" />
      </TouchableOpacity>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            onPress={() => handleOptionSelect('goBack')}
            style={styles.option}
          >
        <MaterialIcons name="arrow-back" size={23} color="#DAF7A6" />
        </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleLogout()}
            style={styles.option}
          >
        <MaterialIcons name="logout" size={23} color="#DAF7A6" />
        </TouchableOpacity>
        </View>
      )}






        <Text style={styles.navTitle}>Orders</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateOrderForm")}
          
        >
        <MaterialIcons name="add" size={26} color="#9c4fd4" />

        </TouchableOpacity>
      </View>



        <View  style={styles.flatList}>

          <FlatList
            data={orders}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item.id || String(index)}  // Fallback to index if no unique 'id'
            renderItem={({ item }) => <OrderTosee order={item}  key={item.id}/>}
          />
        </View>
        



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
  },
 
  flatList: {
   height: 700,
   zIndex: -10
  },
  navbar: {
    height: 60,
    backgroundColor: '#fff',
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,

    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,

  },
  navTitle: {
    color: "#6B7280",
    fontSize: 17,
    fontWeight: "700",
    flex: 1, // Ensure title is centered
    textAlign: "center",
  },
  navButton: {
    padding: 10,
  },
  navButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  addButton: {
    padding: 10,
    backgroundColor: "#03DAC6",
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },




  
  button: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  dropdown: {
    position: 'absolute',
    top: 50, // Adjust this value to position the dropdown
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 20, // Ensure the dropdown is above other elements
marginLeft: 3,
    padding: 4,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  option: {
    padding: 9,
    backgroundColor: '#9c4fd4',
    borderRadius: 3,
    margin:1

  },
  optionText: {
    fontSize: 16,

  },
});
