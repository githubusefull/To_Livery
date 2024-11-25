import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
} from "react-native";

const LoginPage = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login logic here
    console.log("Logging in with", email, password);
  };

  const handleCreateAccount = () => {
    // Navigate to the registration screen
    navigation.navigate("Register"); // Assuming you have a Register screen
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.contentStyle}>
        <Text style={styles.titleStyle}>Login</Text>

        <TextInput
          style={styles.textInputStyle}
          placeholder="Email"
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

        <Pressable style={styles.buttonStyle} onPress={handleLogin}>
          <Text style={styles.buttonTextStyle}>Login</Text>
        </Pressable>

        <View style={styles.footer}>
          <Text style={styles.descStyle}>
            Don't have an account?{" "}
            <Pressable onPress={handleCreateAccount}>
              <Text style={styles.linkStyle}>Register</Text>
            </Pressable>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;

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
  inputViewStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
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
    marginBottom: 20,
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
  footer: {
    marginTop: 20,
  },
});
