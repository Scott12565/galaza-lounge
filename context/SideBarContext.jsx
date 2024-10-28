"use client";

import { createContext, useState } from "react";

export const useSideBar = createContext();

const SideBarProvider = ({children}) => {
    const [isOpen, setIsOPen] = useState(false);
    const handleIsOPen = () => {
        setIsOPen(prev => !prev);
    }
    
    return ( 
        <useSideBar.Provider value={{isOpen, handleIsOPen}} >
            {children}
        </useSideBar.Provider>

     );
}
 
export default SideBarProvider;