import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface DriverInfo {
  driverId: string;
  name: string;
  mobile: string;
}

interface Order {
  _id: string;
  id: string;
  userId: string;
  mobile: number;
  address: string;
  quantity: string;
  boxType: string;
  From: string;
  To: string;
  status: string;
  driverInfo: DriverInfo[];
}

interface SnackbarState {
  snackbarVisible: boolean;
  snackbarMessage: string;
  isModalAddriverOpen: boolean;
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  role: string;
  userId: string;

  setSnackbarVisible: (visible: boolean) => void;
  setSnackbarMessage: (message: string) => void;
  setIsModalAddriverOpen: (open: boolean) => void;
  setOrders: (orders: Order[]) => void;
  setCurrentOrder: (order: Order | null) => void;
  setLoading: (loading: boolean) => void;
  setRole: (role: string) => void;
  setUserId: (userId: string) => void;
  fetchRoleAndUserId: () => Promise<void>;
  fetchUpdatedOrder: () => Promise<void>;
}

const Zustand = create<SnackbarState>((set, get) => ({
  snackbarVisible: false,
  isModalAddriverOpen: false,
  snackbarMessage: "",
  orders: [],
  currentOrder: null,
  loading: false,
  role: "",
  userId: "",

  setSnackbarVisible: (visible) => set({ snackbarVisible: visible }),
  setSnackbarMessage: (message) => set({ snackbarMessage: message }),
  setIsModalAddriverOpen: (open) => set({ isModalAddriverOpen: open }),
  setOrders: (orders) => set({ orders }),
  setCurrentOrder: (order) => set({ currentOrder: order }),
  setLoading: (loading) => set({ loading }),
  setRole: (role) => set({ role }),
  setUserId: (userId) => set({ userId }),

  fetchRoleAndUserId: async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        set({
          role: parsedData.role || "",
          userId: parsedData._id || "",
        });
      }
    } catch (error) {
      console.error("Error retrieving data from AsyncStorage:", error);
      set({
        snackbarMessage: "Error retrieving user data",
        snackbarVisible: true,
      });
    } finally {
      set({ loading: false });
    }
  },

  fetchUpdatedOrder: async () => {
    const currentOrder = get().currentOrder;
    if (!currentOrder) {
      console.error("No current order to fetch.");
      return;
    }

    try {
      set({ loading: true });

      const response = await fetch(
        `https://livery-b.vercel.app/order/create/${currentOrder._id}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Non-OK Response:", errorText);
        throw new Error(
          `Error fetching order: ${response.status} ${response.statusText}`
        );
      }

      const contentType = response.headers.get("Content-Type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Unexpected content type:", contentType);
        throw new Error("Response is not JSON.");
      }

      const updatedOrder: Order = await response.json();
      console.log("Fetched Updated Order:", updatedOrder);

      set({ currentOrder: updatedOrder });
    } catch (error) {
      console.error("Error fetching updated order:", error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default Zustand;
