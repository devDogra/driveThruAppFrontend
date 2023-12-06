import { createContext } from "react";


const defaultContext = { 
    allMenuItems: [],
    setAllMenuItems: () => {}
} 

export const MenuItemsContext = createContext(defaultContext);

