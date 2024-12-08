import React, {  useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { TextInput, Button, Text, Snackbar } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import useZustand from "../../../../Store/useZustand";


type RootStackParamList = {
  CreateOrderForm: undefined;
  OrderCard: undefined;
  Maps: undefined;

};
const OrderForm = () => {
  const {
    setSnackbarVisible,
    setSnackbarMessage,
    snackbarVisible,
    snackbarMessage
  } = useZustand();
  
  const [userId, setUserId] = useState<string>("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState("");
  const [boxType, setBoxType] = useState("Small");
  const [From, setFrom] = useState("");
  const [To, setTo] = useState("");
  const [status, setStatus] = useState("Unassigned");
  const [driverInfo, setDriverInfo] = useState([]);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

 



  
  const handleOrderSubmit = async (): Promise<void> => {
    try {
      // Send a POST request with form data to the backend
      const response = await fetch('https://livery-b.vercel.app/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          mobile,
          address,
          quantity,
          boxType,
          From,
          To,
          status,
          driverInfo
        }),
      });

      // Check if the registration was successful
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Order failed');
      }

      // Reset form fields
      setUserId('');
      setMobile('');
      setAddress('');
      setBoxType('');
      setQuantity('');
      setFrom('');
      setTo('');
      setStatus('');
      setDriverInfo([]);

      setSnackbarMessage("Order successful!");
      setSnackbarVisible(true);
      navigation.navigate('OrderCard');
    } catch (error: unknown) {
      console.error('Error during order:', error);
      if (error instanceof Error) {
        setSnackbarMessage(error.message);
        setSnackbarVisible(true);
      }
    }
  };


  useEffect(() => {
    (async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          const parsedData: { _id?: string } = JSON.parse(userData);
          setUserId(parsedData._id || "");
        }
      } catch (error) {
        console.error("Error retrieving data from AsyncStorage:", error);
      }
    })();
  }, []);





 
  return (
    <SafeAreaView style={styles.root}>
       
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

        

       <TouchableOpacity onPress={() => navigation.goBack()} >

<MaterialIcons name="arrow-back" size={23} color="#9c4fd4" />

</TouchableOpacity>



      












        <Text style={styles.navTitle}>New Order</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("CreateOrderForm")}
          
        >
        <MaterialIcons name="add" size={26} color="#9c4fd4" />

        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Maps")}
          
        >
        <MaterialIcons name="map" size={26} color="#9c4fd4" />

        </TouchableOpacity>

      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>


        {/* Phone Number */}
        <TextInput
          label="Phone Number"
          mode="outlined"
          keyboardType="phone-pad"
          value={mobile}
          onChangeText={setMobile}
          style={styles.input}
        />
        <TextInput
          label="Address"
          mode="outlined"
          keyboardType="default"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
        />

        {/* Quantity */}
        <TextInput
          label="Quantity"
          mode="outlined"
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
          style={styles.input}
        />

        {/* Box Type Selector */}
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Box Type</Text>
          <Picker
            selectedValue={boxType}
            onValueChange={(itemValue) => setBoxType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Small" value="Small" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="Large" value="Large" />
          </Picker>
        </View>

        {/* City Selector */}
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>From</Text>
          <Picker
            selectedValue={From}
            onValueChange={(itemValue) => setFrom(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="From :" value="" />
            <Picker.Item label="Agdal" value="Agdal" />
            <Picker.Item label="Akkari" value="Akkari" />
            <Picker.Item label="Ambassadeurs" value="Ambassadeurs" />
            <Picker.Item label="Aviation" value="Aviation" />
            <Picker.Item label="Fath" value="Fath" />
            <Picker.Item label="Hay Nahda" value="Hay Nahda" />
            <Picker.Item label="Hay Riad" value="Hay Riad" />
            <Picker.Item label="Océan" value="Océan" />
            <Picker.Item label="Mabella" value="Mabella" />
            <Picker.Item label="Massira" value="Massira" />
            <Picker.Item label="Médina" value="Médina" />
            <Picker.Item label="Orangers" value="Orangers" />
            <Picker.Item label="Oudaya" value="Oudaya" />
            <Picker.Item label="Souissi" value="Souissi" />
            <Picker.Item label="Takadoum" value="Takadoum" />
            <Picker.Item label="Témara" value="Témara" />
            <Picker.Item label="Yacoub El Mansour" value="Yacoub El Mansour" />
            <Picker.Item label="Youssoufia" value="Youssoufia" />
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>To</Text>
          <Picker
            selectedValue={To}
            onValueChange={(itemValue) => setTo(itemValue)}
            style={styles.picker}
          >
             <Picker.Item label="To :" value="" />
            <Picker.Item label="Agdal" value="Agdal" />
            <Picker.Item label="Akkari" value="Akkari" />
            <Picker.Item label="Ambassadeurs" value="Ambassadeurs" />
            <Picker.Item label="Aviation" value="Aviation" />
            <Picker.Item label="Fath" value="Fath" />
            <Picker.Item label="Hay Nahda" value="Hay Nahda" />
            <Picker.Item label="Hay Riad" value="Hay Riad" />
            <Picker.Item label="Océan" value="Océan" />
            <Picker.Item label="Mabella" value="Mabella" />
            <Picker.Item label="Massira" value="Massira" />
            <Picker.Item label="Médina" value="Médina" />
            <Picker.Item label="Orangers" value="Orangers" />
            <Picker.Item label="Oudaya" value="Oudaya" />
            <Picker.Item label="Souissi" value="Souissi" />
            <Picker.Item label="Takadoum" value="Takadoum" />
            <Picker.Item label="Témara" value="Témara" />
            <Picker.Item label="Yacoub El Mansour" value="Yacoub El Mansour" />
            <Picker.Item label="Youssoufia" value="Youssoufia" />
          </Picker>
        </View>
        {/* Submit Button */}
        <Button
          mode="contained"
          onPress={handleOrderSubmit}
          style={styles.submitButton}
        >
          Submit Order
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderForm;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,

  },
  content: {
    width: "100%",
    maxWidth: 400,
    height: "100%",
    paddingHorizontal: 16,
    marginTop: 8
    
    
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
  title: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10
  },
  input: {
    marginBottom: 12,
    marginTop: 12
  },
  pickerContainer: {
    marginBottom: 6,
  },
  label: {
    marginBottom: 2,

    fontSize: 12,
    fontWeight: "700",
  },
  picker: {
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    height: 60,
  },
  submitButton: {
    marginTop: 16,
    borderRadius: 4,

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
  },




});
