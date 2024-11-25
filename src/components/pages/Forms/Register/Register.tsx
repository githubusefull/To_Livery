import React, { useState } from "react";

import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
} from "react-native";

const RegisterPage = ({ navigation }: { navigation: any }) => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Handle register logic here (e.g., API call)
    console.log("Registering with", fullName, phoneNumber, email, password);
  };

  const handleLoginRedirect = () => {
    // Redirect to the login page if the user already has an account
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.contentStyle}>
        <Text style={styles.titleStyle}>Create Account</Text>

        <TextInput
          style={styles.textInputStyle}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Pressable style={styles.buttonStyle} onPress={handleRegister}>
          <Text style={styles.buttonTextStyle}>Register</Text>
        </Pressable>

        <Pressable style={styles.googleButtonStyle}>
  <View style={styles.buttonContent}>
    <Text style={styles.googleButtonText}>
      Register with Google
    </Text>
    <Image 
      source={require('../../../../../assets/google.png')} 
      style={{ width: 24, height: 24 }} // Adjust margin for spacing
    />
  </View>
</Pressable>


        <View style={styles.footer}>
          <Text style={styles.descStyle}>
            Already have an account?{" "}
            <Pressable onPress={handleLoginRedirect}>
              <Text style={styles.linkStyle}>Login</Text>
            </Pressable>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contentStyle: {
    paddingTop: 40,
    paddingHorizontal: 40,
    display: "flex",
    gap: 15,
    width: "80%",
  },
  textInputStyle: {
    height: 40,
    borderBottomWidth: 0.9,
    borderBottomColor: "#A092E3",
    paddingHorizontal: 10,
    letterSpacing: 1.2,
    marginBottom: 20,
  },
  buttonStyle: {
    height: 38,
    backgroundColor:"#A092E3",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    marginBottom: 8,
  },
  titleStyle: {
    color: "#000",
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Roboto-Bold",
    letterSpacing: 0.3,
    textAlign: "center",
    marginBottom: 30,
  },
  descStyle: {
    color: "#000",
    fontSize: 13,
    fontWeight: "400",
    textAlign: "center",
    paddingVertical: 18,
  },
  linkStyle: {
    color: "#0C42CC",
    fontSize: 13,
    fontWeight: "400",
  },
  
  buttonTextStyle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "400",
  },

  
  googleButtonTextStyle: {
    color: "#fff",
    fontWeight: "200",
    marginLeft: 4,
  },





  googleButtonStyle: {
    alignItems: 'center',
    backgroundColor:"#A092E3",
    borderRadius: 5,
    padding: 8,

    marginTop: 2,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12
  },
  googleButtonText: {
    fontSize: 14,
    
    color: '#ffffff', // White text
  },
 
  footer: {
    marginTop: 20,
  },
});
