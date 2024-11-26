import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

const OrderForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState("");
  const [boxType, setBoxType] = useState("Small");
  const [From, setFrom] = useState("from..");
  const [To, setTo] = useState("to..");

  const handleOrderSubmit = () => {
    console.log({ phoneNumber, address, quantity, boxType });
    setPhoneNumber("");
    setAddress("");
    setQuantity("");
    setBoxType("Small");
    setFrom("");
    setTo("");
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <Text style={styles.title}>Place Your Order</Text>





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
    height: "100%",
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
