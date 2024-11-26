import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";


  const LoginForm = ({ navigation }: { navigation: any }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");

  const handleLoginSubmit = () => {
    console.log({ email, password, role });

    // Reset form after submission
    setEmail("");
    setPassword("");
    setRole("User");
  };

 


  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>

        {/* Email */}
        <TextInput
          label="Email"
          mode="outlined"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        {/* Password */}
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        {/* Role Selector */}
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Role</Text>
          <Picker
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="User" value="User" />
            <Picker.Item label="Admin" value="Admin" />
            <Picker.Item label="Driver" value="Driver" />

          </Picker>
        </View>

        {/* Submit Button */}

        

        <Button
          mode="contained"
          onPress={handleLoginSubmit}
          style={styles.submitButton}
        >
          Login
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default LoginForm;

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
});
