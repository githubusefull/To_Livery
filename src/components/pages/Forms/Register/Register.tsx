import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, } from "react-native";
import { TextInput, Button, Text, Snackbar } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import Loading from "../../Loading/Loading";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode'; // Import the jwt-decode library


type RootStackParamList = {
  OrderCard: undefined;
};


interface DecodedToken {
  id: string;
  fullname: string;
  email: string;
  role: string;
}
const AuthForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading with a timeout (e.g., API initialization, token check)
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds
    }, 1000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);



  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();



  const handleRegisterSubmit = async (): Promise<void> => {
    try {
      // Send a POST request with form data to the backend
      const response = await fetch('https://livery-b.vercel.app/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname,
          email,
          password,
          address,
          mobile,
          role,
        }),
      });


      // Check if the registration was successful
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Registration failed');
      }

      //const data = await response.json();

      const user = {
        
        fullname,
        email,
        role,
      };
  
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      

      setFullname('');
      setEmail('');
      setPassword('');
      setAddress('');
      setMobile('');
      setRole('');

      setSnackbarMessage("Registration successful!");
      setSnackbarVisible(true);
      setIsLoading(true)
      navigation.navigate('OrderCard');
    } catch (error: unknown) {
      console.error('Error during registration:', error);
      if (error instanceof Error) {
        setSnackbarMessage(error.message);
        setSnackbarVisible(true);
      }
    }
  };


  const handleLoginSubmit = async (): Promise<void> => {
    try {
      // Send a POST request to authenticate the user
      const response = await fetch('https://livery-b.vercel.app/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Login failed');
      }
  
     
      const data = await response.json();
  
      const { token } = data;
    
      const decodedToken = jwtDecode<DecodedToken>(token);
  
      const user = {
        _id: decodedToken?.id,
        fullname: decodedToken?.fullname,
        email: decodedToken?.email,
        role: decodedToken?.role,
      };
  
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      setEmail('');
      setPassword('');
      setSnackbarMessage("Login successful!"); 
      setIsLoading(true)
      setSnackbarVisible(true);
      navigation.navigate('OrderCard');
    } catch (error: unknown) {
      console.error('Error during login:', error);
      if (error instanceof Error) {
        setSnackbarMessage(error.message);
        setSnackbarVisible(true);
      }
    }
  };
  
  const handleGoogleRegister = (): void => {
    console.log("Register with Google");
    // You would integrate Google authentication SDK here (e.g., Firebase, OAuth)
  };

  


  if (isLoading) {
    // Render the loading screen while loading
    return <Loading />;
  }


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
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{isRegistering ? "Register" : "Login"}</Text>

        {isRegistering && (
          <TextInput
            label="Full Name"
            mode="outlined"
            autoCapitalize="none" 
            value={fullname}
            onChangeText={setFullname}
            style={styles.input}
          />
        )}

        <TextInput
          label="Email"
          mode="outlined"
          autoCapitalize="none" 
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          label="Password"
          mode="outlined"
          autoCapitalize="none" 
          secureTextEntry={true}  // Ensures the password is hidden
          value={password}
          onChangeText={setPassword}
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


{isRegistering && (

        <TextInput
          label="Phone Number"
          mode="outlined"
          keyboardType="phone-pad"
          value={mobile}
          onChangeText={setMobile}
          style={styles.input}
        />
      )}

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
      </ScrollView >


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
    paddingTop: 50

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

  snackbar: {
    borderRadius: 3,
    marginBottom: 20,
    zIndex: 50,
    backgroundColor:'#555555'

  },
  snackText: {
    color: '#fff',
    fontSize: 13
  }
 
});
