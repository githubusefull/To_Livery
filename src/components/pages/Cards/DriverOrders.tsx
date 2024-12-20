import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import OrderTosee from './OrderTosee';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Text, Snackbar } from 'react-native-paper';
import type { NavigationProp } from "@react-navigation/native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../Loading/Loading';
import useZustand from "../../../../Store/useZustand";
import DriverOrdersToSee from './DriverOrdersToSee';




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


type RootStackParamList = {
  CreateOrderForm: undefined;
  Register: undefined;

};





export default function OrderCard() {
  const {

    setSnackbarVisible,
    setSnackbarMessage,
    snackbarVisible,
    snackbarMessage,
    setOrders,
    orders,
    setLoading,
    loading,
    fetchRoleAndUserId,
    userId
  } = useZustand();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const dropdownRef = useRef<View | null>(null);


  useEffect(() => {
    // Simulate loading with a timeout (e.g., API initialization, token check)
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 1000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);



  const fetchOrders = useCallback(async () => {
    try {
      const response = await fetch('https://livery-b.vercel.app/order/create');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Order[] = await response.json();
      setOrders(data);
      
    } catch (error: unknown) {
      console.error('Error fetching orders:', error);
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    fetchOrders();
    fetchRoleAndUserId();
  }, [fetchOrders, fetchRoleAndUserId]);



  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [fetchOrders])
  );
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
      // Start loading (optional)
      setLoading(true);
  
      // Confirm logout
      Alert.alert(
        'Logout Confirmation',
        'Are you sure you want to log out?',
        [
          { text: 'Cancel', style: 'cancel', onPress: () => setLoading(false) },
          {
            text: 'Logout',
            style: 'destructive',
            onPress: async () => {
              await AsyncStorage.removeItem('userData');
  
              setIsDropdownOpen(false);
              setSnackbarMessage('Logged out successfully!');
              setSnackbarVisible(true);
  
              // Navigate to Register screen
              navigation.reset({
                index: 0,
                routes: [{ name: 'Register' }],
              });
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'An error occurred during logout');
    } finally {
      // Stop loading
      setLoading(false);
    }
  };
 


  
  
  if (loading) {
    return <Loading />;
  }

  return (

    <TouchableWithoutFeedback onPress={() => setIsDropdownOpen(false)}>
 
    <View style={styles.container}>
    <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={Snackbar.DURATION_SHORT}
        style={styles.snackbar}

      >
        <Text style={styles.snackText}>
          {snackbarMessage}
        </Text>


      </Snackbar>
      <View style={styles.navbar}>
    
        <TouchableOpacity
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
        style={styles.button}
      >
        <MaterialIcons name="menu" size={23} color="#9c4fd4" />
      </TouchableOpacity>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <View style={styles.dropdown} ref={(ref) => (dropdownRef.current = ref)}>
          <TouchableOpacity
            onPress={() => handleOptionSelect('goBack')}
            style={styles.option}
          >
        <MaterialIcons name="arrow-back" size={21} color="#9c4fd4" />
        </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleLogout()}
            style={styles.option}
          >
        <MaterialIcons name="logout" size={21} color="#9c4fd4" />
        </TouchableOpacity>
        </View>
      )}






        <Text style={styles.navTitle}>Driver Orders</Text>
      {/*
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateOrderForm")}
          
        >
        <MaterialIcons name="add" size={26} color="#9c4fd4" />

        </TouchableOpacity>
      
      */}
      </View>



        <View  style={styles.flatList}>

          <FlatList
            data={orders.filter(order => order.driverInfo.some(driver => driver.driverId === userId))}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item.id || String(index)}  
            renderItem={({ item }) => 
            <DriverOrdersToSee order={item} key={item.id}  />
          
          }
          />
        </View>

    </View>
    </TouchableWithoutFeedback>
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
    marginTop: 10,
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
    top: 50, 
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 20, 
    marginLeft: 8.9,
    borderRadius: 5,
  },
  option: {
    padding: 9,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    margin:1

  },
  optionText: {
    fontSize: 16,

  },
  snackbar: {
    borderRadius: 3,
    marginBottom: 20,
    zIndex: 50,
    backgroundColor:'#555555'

  },
  snackText: {
    color: '#fff',
    fontSize: 13
  }
});
