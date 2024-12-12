import React, {  useEffect, useState } from "react";
import {  SafeAreaView, ScrollView, StyleSheet, View, } from "react-native";
import { TextInput, Button, Text,  ActivityIndicator } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import Loading from "../../Loading/Loading";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode'; // Import the jwt-decode library
import useZustand from "../../../../../Store/useZustand";
import * as Location from 'expo-location';
import Zustand from "../../../../../Store/useZustand";

type RootStackParamList = {
  OrderCard: undefined;
  DriverOrders: undefined;
  Register: undefined;
};


interface DecodedToken {
  id: string;
  fullname: string;
  email: string;
  role: string;
}
const Register: React.FC = ( ) => {
 
  const {setSnackbarVisible, setSnackbarMessage} = useZustand();
  const [isLoading, setIsLoading] = useState(true);


  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Location permission not granted');
      }
      const location = await Location.getCurrentPositionAsync({});
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      console.error('Error fetching location:', error);
      throw error;
    }
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 1000);

    return () => clearTimeout(timer); 
  }, []);



  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [role, setRole] = useState<string>("");


  const [isRegistering, setIsRegistering] = useState<boolean>(false);
 

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();



  const handleRegisterSubmit = async (): Promise<void> => {
    try {
      const location = await getLocation(); // Fetch location

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
          location
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Registration failed');
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
      setFullname('');
      setEmail('');
      setPassword('');
      setAddress('');
      setMobile('');
      setRole('');

      setSnackbarMessage("Registration successful!");
      setSnackbarVisible(true);
      setIsLoading(true)
      if (decodedToken?.role === 'Driver') {
        navigation.navigate('DriverOrders');  // Redirect to DriverOrders if role is Driver
      } else {
        navigation.navigate('OrderCard');    // Redirect to OrderCard for other roles
      }    } catch (error: unknown) {
      console.error('Error during registration:', error);
      if (error instanceof Error) {
        setSnackbarMessage(error.message);
        setSnackbarVisible(true);
      
      }
    }
  };


  const handleLoginSubmit = async (): Promise<void> => {
    setIsLoading(true); 
    try {
      const response = await fetch('https://livery-b.vercel.app/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
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
    try {
      const location = await getLocation();

      await fetch('https://livery-b.vercel.app/auth/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: decodedToken?.id,
          location,
        }),

        
        
      });
    } catch (locationError) {
      console.warn('Failed to fetch or send location:', locationError);
    }
      setEmail('');
      setPassword('');
      if (decodedToken?.role === 'Driver') {
        navigation.navigate('DriverOrders');  // Redirect to DriverOrders if role is Driver
      } else {
        navigation.navigate('OrderCard');    // Redirect to OrderCard for other roles
      }
      setSnackbarMessage('Login successful!');
      setSnackbarVisible(true);
    } catch (error: unknown) {
      console.error('Error during login:', error);
      if (error instanceof Error) {
        setSnackbarMessage(error.message); 
        setSnackbarVisible(true);
      }
    } finally {
      setIsLoading(false); 
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
    <SafeAreaView style={styles.root} >
     
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


{isLoading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (

        <><Button
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
              </Button></> 
      
      )}

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

export default Register;

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