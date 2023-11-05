import { createContext } from "react";

const defaultContext = { 
    allMenuItems: [] 
} 

export const MenuItemsContext = createContext(defaultContext);

