import { useEffect, useState } from 'react';
import Loading from './src/components/pages/Loading/Loading';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterPage from './src/components/pages/Forms/Register/Register';
import LoginPage from './src/components/pages/Forms/Register/Login';
import OrderCard from './src/components/pages/Cards/OrderCard';
import NewOrder from './src/components/pages/Cards/CreateOrderForm';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();

export default function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<string>("");
  const [userId, setUserId] = useState<string>("");





  useEffect(() => {
    const fetchRoleAndOrderId = async () => {
      try {
        // Retrieve user data from AsyncStorage
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const parsedData = JSON.parse(userData);

          // Assuming 'role' and 'orderId' are properties of userData
          setRole(parsedData.role || "");
          setUserId(parsedData._id || "");

        }
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoleAndOrderId();
  }, []);







console.log('userId to', userId )
console.log('role to ', role )


  if (isLoading) {
    // Render the loading screen while loading
    return <Loading />;
  }

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
      <Stack.Screen name="Register" component={RegisterPage} options={{ headerShown: false }}/> 
      <Stack.Screen name="OrderCard" component={OrderCard} options={{ headerShown: false }}/>
      <Stack.Screen name="CreateOrderForm" component={NewOrder}  options={{ headerShown: false }} />
   
      </Stack.Navigator>
    </NavigationContainer>
  );
}


