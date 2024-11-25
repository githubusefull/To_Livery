import React, { useState } from 'react';
import { View, Text, TextInput, Button,  StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const OrderForm = () => {
  // State to manage form data
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [boxType, setBoxType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Handle form submission
  const handleSubmit = () => {
    const orderData = {
      customerName,
      phoneNumber,
      boxType,
      quantity,
      address,
      deliveryDate,
      specialInstructions,
    };
    
    // Replace this with your order submission logic, e.g., API call
    console.log('New order submitted:', orderData);
    
    // Clear form
    setCustomerName('');
    setPhoneNumber('');
    setBoxType('');
    setQuantity(1);
    setAddress('');
    setDeliveryDate('');
    setSpecialInstructions('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Order</Text>

      <Text>Customer Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        value={customerName}
        onChangeText={setCustomerName}
      />

      <Text>Phone Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      <Text>Box Type:</Text>
      <Picker
        selectedValue={boxType}
        style={styles.picker}
        onValueChange={setBoxType}
      >
        <Picker.Item label="Small Box" value="small" />
        <Picker.Item label="Medium Box" value="medium" />
        <Picker.Item label="Large Box" value="large" />
      </Picker>

      <Text>Quantity:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter quantity"
        value={String(quantity)}
        onChangeText={(text) => setQuantity(Number(text))}
        keyboardType="numeric"
      />

      <Text>Delivery Address:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter delivery address"
        value={address}
        onChangeText={setAddress}
      />

      <Text>Delivery Date:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter delivery date (YYYY-MM-DD)"
        value={deliveryDate}
        onChangeText={setDeliveryDate}
      />

      <Text>Special Instructions:</Text>
      <TextInput
        style={styles.input}
        placeholder="Any special instructions?"
        value={specialInstructions}
        onChangeText={setSpecialInstructions}
        multiline
      />



      <Pressable style={styles.buttonStyle} onPress={handleSubmit}>
          <Text style={styles.buttonTextStyle}>Submit Order</Text>
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    height: 38,
    backgroundColor:"#A092E3",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "400",
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop:30,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderColor: '#A092E3',

    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
  },
});

export default OrderForm;
