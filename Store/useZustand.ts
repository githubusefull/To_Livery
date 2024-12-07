import { create } from "zustand";


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

  setSnackbarVisible: (visible: boolean) => void;
  setSnackbarMessage: (message: string) => void;
  setIsModalAddriverOpen: (open: boolean) => void; 
  setOrders: (orders: Order[]) => void;
 
  setCurrentOrder: (order: Order | null) => void; 

  setLoading: (loading: boolean) => void; 

}

const Zustand = create<SnackbarState>((set) => ({
  snackbarVisible: false,
  isModalAddriverOpen: false,
  snackbarMessage: "",
  setSnackbarVisible: (visible) => set({ snackbarVisible: visible }),
  setSnackbarMessage: (message) => set({ snackbarMessage: message }),
  setIsModalAddriverOpen: (open) => set({ isModalAddriverOpen: open }), 

  orders: [], 
  loading: false, 
  currentOrder: null, 
  setOrders: (orders) => set({ orders }), 
  setCurrentOrder: (order) => set({ currentOrder: order }), 
  setLoading: (loading) => set({ loading }), 

}));

export default Zustand;
