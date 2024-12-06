import { create } from "zustand";

interface SnackbarState {
  snackbarVisible: boolean;
  snackbarMessage: string;

  isModalAddriverOpen: boolean; 

  setSnackbarVisible: (visible: boolean) => void;
  setSnackbarMessage: (message: string) => void;
  setIsModalAddriverOpen: (open: boolean) => void; // setter for modal state

}

const Zustand = create<SnackbarState>((set) => ({
  snackbarVisible: false,
  isModalAddriverOpen: false,
  snackbarMessage: "",
  setSnackbarVisible: (visible) => set({ snackbarVisible: visible }),
  setSnackbarMessage: (message) => set({ snackbarMessage: message }),
  setIsModalAddriverOpen: (open) => set({ isModalAddriverOpen: open }), // set modal state

}));

export default Zustand;
