import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Loading from './src/components/pages/Loading/Loading';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterPage from './src/components/pages/Forms/Register/Register';
import OrderCard from './src/components/pages/Cards/OrderCard';
import NewOrder from './src/components/pages/Cards/CreateOrderForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useZustand from './Store/useZustand'; 
import { Snackbar, Text } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context'; 

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const {
    snackbarVisible,
    snackbarMessage,
    setSnackbarVisible,
    setSnackbarMessage,
  } = useZustand(); // Zustand hook name adjusted for convention

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const fetchRoleAndUserId = async () => {
      try {
        // Retrieve user data from AsyncStorage
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const parsedData = JSON.parse(userData);

          // Assuming 'role' and '_id' are properties of userData
          setRole(parsedData.role || "");
          setUserId(parsedData._id || "");
        }
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
        setSnackbarMessage('Error retrieving user data');
        setSnackbarVisible(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoleAndUserId();
  }, [setSnackbarMessage, setSnackbarVisible]);

  console.log('userId:', userId);
  console.log('role:', role);

  if (isLoading) {
    // Render the loading screen while loading
    return <Loading />;
  }

  return (

    <SafeAreaProvider> 

    <NavigationContainer>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={1000}
        style={styles.snackbar}
      >
        <Text style={styles.snackText}>{snackbarMessage}</Text>
      </Snackbar>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen
          name="Register"
          component={RegisterPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderCard"
          component={OrderCard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateOrderForm"
          component={NewOrder}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  snackbar: {
    borderRadius: 3,
    marginBottom: 20,
    zIndex: 50,
    backgroundColor: '#555555',
  },
  snackText: {
    color: '#fff',
    fontSize: 13,
  },
});
