import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import OrderTosee from './OrderTosee';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import type { NavigationProp } from "@react-navigation/native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



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
  return (
    <View style={styles.container} >
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} >

        <MaterialIcons name="arrow-back" size={23} color="#9c4fd4" />

        </TouchableOpacity>
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
   height: 700
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
});
