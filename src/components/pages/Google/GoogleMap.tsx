import React, { useEffect, useRef, useState } from "react";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
  View,
  TouchableOpacity,
  Image,
  
} from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import * as Location from "expo-location";
import MapView, {  Callout, Marker } from "react-native-maps";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { getDistance } from "geolib";

type RootStackParamList = {
  OrderDetails: { orderId: string };
  
};

const GoogleMap: React.FC<{ route: any }> = ({ route }) => {
  const { latitude, longitude, driverName } = route.params;




  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);




  const dropdownRef = useRef<View | null>(null);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
const [userLocation, setUserLocation] = useState({ latitude:latitude, longitude:longitude }); // Example user location
  const [distance, setDistance] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const handleOptionSelect = (option: any) => {
    setIsDropdownOpen(false);
    if (option === 'goBack') {
      navigation.goBack();
    } else {
      console.log('Other option selected');
    }
  };





  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission not granted");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    } catch (error) {
      console.error("Error fetching location:", error);
      Alert.alert("Error", "Unable to fetch location");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);


  useEffect(() => {
    if (location) {
      const dist = getDistance(location, userLocation) / 1000; // Convert meters to kilometers
      setDistance(dist);
    }
  }, [location, userLocation]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Fetching location...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView >
      <ScrollView>
      <View style={styles.container}>
 <View style={styles.navbar}>
    
    <TouchableOpacity

    style={styles.button}
  >
    <MaterialIcons name="menu" size={23} color="#9c4fd4" />
  </TouchableOpacity>

  {/* Dropdown menu */}
  {isDropdownOpen && (
    <View style={styles.dropdown} ref={(ref) => (dropdownRef.current = ref)}>
      <TouchableOpacity
        onPress={() => handleOptionSelect('goBack')}
        style={styles.option}
      >
    <MaterialIcons name="arrow-back" size={21} color="#9c4fd4" />
    </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
      >

    <Feather name="edit" size={21} color="#9c4fd4" />
    </TouchableOpacity>
    </View>
  )}






    <Text style={styles.navTitle}>User Location</Text>
    <TouchableOpacity
      
    >
    <MaterialIcons name="add" size={26} color="#9c4fd4" />

    </TouchableOpacity>
  </View>
 





        {location ? (

<View style={styles.mapContainer}>

          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Your Location">

              
             <Image
          source={require("../../../../assets/car.png")} // Replace with your custom icon path
          style={styles.markerIcon}
        />
  <View style={styles.bgDriver}>
      <Text style={styles.textDriver}>{driverName}</Text>
    </View>
       
                </Marker>
             
          </MapView>
          </View>
        ) : (
          <Text style={styles.text}>Location not available</Text>
        )}


</View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
        {distance !== null ? (
        <Text style={styles.distanceText}>
          Distance between You and Driver: {distance.toFixed(2)} km
        </Text>
      ) : (
        <Text style={styles.distanceText}>Calculating distance...</Text>
      )}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
  },

  markerIcon: {
    width: 40, // Customize the size
    height: 40,
    resizeMode:"contain"

   },
  footer: {
    height: 70,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  
  },
  footerText: {
    color: "#6B7280",
    fontSize: 16,
  },
 

  bgDriver: {
  

  },
  textDriver: {
    fontSize: 10,  // Ensure text is large enough to be seen
    color: "#007BFF",  // Text color (blue)
    fontWeight: "bold",  // Bold text for visibility
    textAlign: "center",
  },

  distanceText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  
  },
  navbar: {
    height: 60,
    backgroundColor: '#fff',
    marginTop: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,

    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,

  },
  navTitle: {
    color: "#6B7280",
    fontSize: 17,
    fontWeight: "700",
    flex: 1, // Ensure title is centered
    textAlign: "center",
  },

  button: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  dropdown: {
    position: 'absolute',
    top: 50, 
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 20, 
    marginLeft: 8.9,
    borderRadius: 5,
  },
  option: {
    padding: 9,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    margin:1

  },
 
  bubbleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  bubble: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5, // For Android shadow
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  calloutSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#fff",
    marginTop: -1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#232323",
  },
 

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },

  mapContainer: {
    flex: 1,
    borderRadius: 8, 
    overflow: "hidden", 
    
     
  },
  map: {
    height: 640,
      width: "100%",
      alignItems: "center",    
  },
  text: {
    fontSize: 16,
    marginTop: 20,
    color: "#232323",
  },
});

export default GoogleMap;
