import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  OrderCard: undefined; 
};

const AuthForm: React.FC = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [role, setRole] = useState<"User" | "Admin" | "Driver">("User");
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLoginSubmit = (): void => {
    console.log("Login", { email, phoneNumber });
    setEmail("");
    setPhoneNumber("");
  };

  const handleRegisterSubmit = (): void => {
    console.log("Register", { fullName, email, address, phoneNumber, role });
    setFullName("");
    setEmail("");
    setAddress("");
    setPhoneNumber("");
    setRole("User");
    navigation.navigate("OrderCard");
  };

  const handleGoogleRegister = (): void => {
    console.log("Register with Google");
    // You would integrate Google authentication SDK here (e.g., Firebase, OAuth)
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <Text style={styles.title}>{isRegistering ? "Register" : "Login"}</Text>

        {isRegistering && (
          <TextInput
            label="Full Name"
            mode="outlined"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
          />
        )}

        <TextInput
          label="Email"
          mode="outlined"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        {isRegistering && (
          <TextInput
            label="Address"
            mode="outlined"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />
        )}

        <TextInput
          label="Phone Number"
          mode="outlined"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.input}
        />

        {isRegistering && (
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Role</Text>
            <Picker
              selectedValue={role}
              onValueChange={(itemValue) => setRole(itemValue as "User" | "Admin" | "Driver")}
              style={styles.picker}
            >
              <Picker.Item label="User" value="User" />
              <Picker.Item label="Admin" value="Admin" />
              <Picker.Item label="Driver" value="Driver" />
            </Picker>
          </View>
        )}

        <Button
          mode="contained"
          onPress={isRegistering ? handleRegisterSubmit : handleLoginSubmit}
          style={styles.submitButton}
        >
          {isRegistering ? "Register" : "Login"}
        </Button>

        <Button
          mode="text"
          onPress={() => setIsRegistering(!isRegistering)}
          style={styles.toggleButton}
        >
          {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
        </Button>

        {isRegistering && (
          <Button
            mode="outlined"
            onPress={handleGoogleRegister}
            style={styles.googleButton}
          >
            Register with Google
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AuthForm;

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
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
  },
  pickerContainer: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
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
  toggleButton: {
    marginTop: 12,
  },
  googleButton: {
    marginTop: 12,
    borderRadius: 4,
  },
});
