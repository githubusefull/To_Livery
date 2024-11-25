import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

const OrderForm = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState("");
  const [boxType, setBoxType] = useState("Small");
  const [city, setCity] = useState("Select a city");

  const handleOrderSubmit = () => {
    console.log({ fullName, phoneNumber, address, quantity, boxType, city });

    setFullName("");
    setPhoneNumber("");
    setAddress("");
    setQuantity("");
    setBoxType("Small");
    setCity("Select a city");
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <Text style={styles.title}>Place Your Order</Text>

        {/* Full Name */}
        <TextInput
          label="Full Name"
          mode="outlined"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />

     

        {/* Phone Number */}
        <TextInput
          label="Phone Number"
          mode="outlined"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.input}
        />
        <TextInput
          label="Address"
          mode="outlined"
          keyboardType="phone-pad"
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
            selectedValue={city}
            onValueChange={(itemValue) => setCity(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a city" value="Select a city" />
            <Picker.Item label="New York" value="New York" />
            <Picker.Item label="Los Angeles" value="Los Angeles" />
            <Picker.Item label="Chicago" value="Chicago" />
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>To</Text>
          <Picker
            selectedValue={city}
            onValueChange={(itemValue) => setCity(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a city" value="Select a city" />
            <Picker.Item label="New York" value="New York" />
            <Picker.Item label="Los Angeles" value="Los Angeles" />
            <Picker.Item label="Chicago" value="Chicago" />
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
      </View>
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
    paddingHorizontal: 16,
    height:"100%",
    marginTop: 50
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
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
});
