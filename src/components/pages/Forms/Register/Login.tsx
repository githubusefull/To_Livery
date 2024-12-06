import React, { useCallback,  useEffect,  useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, } from "react-native";
import { TextInput, Button, Text, Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Loading from "../../Loading/Loading";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode'; // Import the jwt-decode library


type RootStackParamList = {
  OrderCard: undefined;
  Register: undefined;
};


interface DecodedToken {
  id: string;
  fullname: string;
  email: string;
  role: string;
}
const AuthForm: React.FC = ( ) => {


  const [fontsLoaded] = useFonts({
    "Roboto-Black": require("../../../../../assets/Roboto/Roboto-Black.ttf"),
    "Roboto-Bold": require("../../../../../assets/Roboto/Roboto-Bold.ttf"),
    "Roboto-Regular": require("../../../../../assets/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../../../../../assets/Roboto/Roboto-Medium.ttf"),
    "Roboto-Thin": require("../../../../../assets/Roboto/Roboto-Thin.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      navigation.navigate("Register");
    }
  }, [fontsLoaded]);


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading with a timeout (e.g., API initialization, token check)
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds
    }, 1000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");  
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();




  const handleLoginSubmit = async (): Promise<void> => {
    try {
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
  
 

  


  if (isLoading) {
    return <Loading />;
  }


  return (
    <SafeAreaView style={styles.root} onLayout={onLayoutRootView}>
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
        <Text style={styles.title}>Login</Text>

       

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
          secureTextEntry={true}  
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

       
        <Button
          mode="contained"
          onPress={handleLoginSubmit}


          style={styles.submitButton}
        >
          Login
        </Button>

        <Button
          mode="text"
          onPress={() => navigation.navigate('Register')} 
          style={styles.toggleButton}
        >
          Don't have an account? Register
        </Button>

        
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
