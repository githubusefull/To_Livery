import { NavigationProp, RouteProp } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';


type RootStackParamList = {
    OrderDetails: { orderId: string };
    Maps: { latitude: number; longitude: number };

  };
type OrderDetailsProps = {
    route: RouteProp<RootStackParamList, 'OrderDetails'>;
    navigation: NavigationProp<RootStackParamList>;
  };



const OrderDetails: React.FC<OrderDetailsProps> = ({ route, navigation }) => {

    const dropdownRef = useRef<View | null>(null);


  const { orderId } = route.params; // Extract orderId from the route params
  const [orderDetails, setOrderDetails] = useState<any | null>(null);


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOptionSelect = (option: any) => {
    setIsDropdownOpen(false);
    if (option === 'goBack') {
      navigation.goBack();
    } else {
      console.log('Other option selected');
    }
  };
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`https://livery-b.vercel.app/order/create/${orderId}`);
        if (!response.ok) throw new Error('Failed to fetch order details');
        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);




  if (!orderDetails) {
    return <Text>Loading order details...</Text>;
  }

  return (
    <View style={styles.container}>
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
        style={styles.option}
      >

    <Feather name="edit" size={21} color="#9c4fd4" />
    </TouchableOpacity>
    </View>
  )}






    <Text style={styles.navTitle}>Order Derails</Text>
    <TouchableOpacity
      
    >
    <MaterialIcons name="add" size={26} color="#9c4fd4" />

    </TouchableOpacity>
  </View>




<View style={styles.content}>


      <Text style={styles.title}>Order ID: {orderDetails._id}</Text>

      <Text style={styles.driverInfo}>
        Order Info:
      </Text>
      <Text>Status: {orderDetails.status}</Text>
      <Text>Address: {orderDetails.address}</Text>
      <Text>Box Type: {orderDetails.boxType}</Text>
      <Text>Form: {orderDetails.From}</Text>
      <Text>To: {orderDetails.To}</Text>

      <Text style={styles.driverInfo}>
        Driver Info:
      </Text>
      <Text>
        Driver ID: {orderDetails.driverInfo?.map((driver: any) => driver.driverId).join(', ') || 'No drivers assigned'}
      </Text>
      <Text>
        Name: {orderDetails.driverInfo?.map((driver: any) => driver.name).join(', ') || 'No drivers assigned'}
      </Text>
      <Text>
        Mobile: {orderDetails.driverInfo?.map((driver: any) => driver.mobile).join(', ') || 'No drivers assigned'}
      </Text>
      <Text style={styles.driverInfo}>
        Driver Location: 
       

      </Text>
      <TouchableOpacity
  onPress={() => {
    const driverLocation = orderDetails.driverInfo?.[0]?.location;
    if (driverLocation?.latitude && driverLocation?.longitude) {
      navigation.navigate('Maps', { 
        latitude: driverLocation.latitude, 
        longitude: driverLocation.longitude 
      });

    } else {
      console.log('Driver location not available');
    }
  }}
>
  <View style={styles.map}>
    <Entypo name="location" size={24} color="#9c4fd4" />
  </View>
</TouchableOpacity>


        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
  },
  content: {
  padding: 20,
  backgroundColor:'#fff',
  zIndex: -20,
  marginTop: 5,

  borderRadius: 8,
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


  driverInfo: {
    fontSize: 17,
    color: '#2323',
    fontWeight: '500',
    marginTop: 7,
    marginBottom: 7
  },
  title: {
    fontSize: 15,
    
    fontWeight: 'bold',
    marginBottom: 10,
  },
  map: {
    


    width: 50, // Adjust width as needed
    height: 50, // Adjust height as needed
    backgroundColor: '#f0f0f0',
    justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
    borderRadius: 5, // Optional, to make it circular
    
  }

});

export default OrderDetails;
