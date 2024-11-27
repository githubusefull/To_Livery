import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import OrderTosee from './OrderTosee';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import type { NavigationProp } from "@react-navigation/native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Type for each order
interface Order {
  id: string;
  address: string;
  status: string;
  time: string;
}


type RootStackParamList = {
  CreateOrderForm: undefined;
};


// Sample order data
const orderData: Order[] = [
  { id: '1', address: '123 Main St', status: 'Pending', time: '12:00 PM' },
  { id: '2', address: '456 Oak Ave', status: 'In Transit', time: '12:30 PM' },
  { id: '3', address: '789 Pine Rd', status: 'Delivered', time: '1:00 PM' },
  { id: '4', address: '123 Main St', status: 'Pending', time: '12:00 PM' },
  { id: '5', address: '456 Oak Ave', status: 'In Transit', time: '12:30 PM' },
  { id: '6', address: '789 Pine Rd', status: 'Delivered', time: '1:00 PM' },
  { id: '7', address: '123 Main St', status: 'Pending', time: '12:00 PM' },
  { id: '8', address: '456 Oak Ave', status: 'In Transit', time: '12:30 PM' },
  { id: '9', address: '789 Pine Rd', status: 'Delivered', time: '1:00 PM' },
  { id: '10', address: '123 Main St', status: 'Pending', time: '12:00 PM' },
  { id: '11', address: '456 Oak Ave', status: 'In Transit', time: '12:30 PM' },
  { id: '12', address: '789 Pine Rd', status: 'Delivered', time: '1:00 PM' },
];


export default function OrderCard() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();


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



        <View>

          <FlatList
            data={orderData}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <OrderTosee order={item} />}
          />
        </View>
        



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: '#f8f8f8',
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
