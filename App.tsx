import { useEffect, useState } from 'react';
import Loading from './src/components/pages/Loading/Loading';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterPage from './src/components/pages/Forms/Register/Register';
import OrderCard from './src/components/pages/Cards/OrderCard';
import NewOrder from './src/components/pages/Cards/CreateOrderForm';


const Stack = createNativeStackNavigator();

export default function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading with a timeout (e.g., API initialization, token check)
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  if (isLoading) {
    // Render the loading screen while loading
    return <Loading />;
  }

  return (

    <NavigationContainer>
      <Stack.Navigator>


      <Stack.Screen  name="Register" component={RegisterPage} options={{ headerShown: false }}/>

      <Stack.Screen name="OrderCard" component={OrderCard} options={{ headerShown: false }}/>

      <Stack.Screen name="CreateOrderForm" component={NewOrder}  options={{ headerShown: false }} />
   
      </Stack.Navigator>
    </NavigationContainer>
  );
}


