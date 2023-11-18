import { createContext } from "react";

const defaultContext = { 
    yourOrder: [],
    yourOrderTableModalOpen: false,
} 

export const YourOrderContext = createContext(defaultContext);

