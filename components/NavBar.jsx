"use client";

import { useSideBar } from "@/context/SideBarContext";
import Link from "next/link";
import { useContext } from "react";
 import { MdMenu, MdOutlineNotifications } from "react-icons/md";

const NavBar = () => {
    const { isOpen, handleIsOPen } = useContext(useSideBar);

    return ( 
        <>
            <header className="flex justify-between items-center py-2">
                <button className="text-3xl" 
                onClick={handleIsOPen}>
                    {!isOpen && <MdMenu size={27} />}
                </button>
      
                {/* Notification Bell */}
                <nav>
                    <Link href="/notifications" className="relative">
                    <MdOutlineNotifications size={30} />
                    {/* Notification Badge */}
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                    </Link>
                </nav>
        </header>
        </>
     );
}
 
export default NavBar;