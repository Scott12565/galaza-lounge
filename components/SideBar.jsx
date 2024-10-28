"use client";

import { useSideBar } from "@/context/SideBarContext";
import Link from "next/link";
import { 
    MdClose,
    MdDashboard, 
    MdMenu, 
    MdOutlineReceiptLong, 
    MdPersonOutline, 
    MdRestaurant, 
    MdSettings 
} from 'react-icons/md';import { useContext } from "react";


const SideBar = () => {
    const {isOpen, handleIsOPen} = useContext(useSideBar);

    return ( 
        <>
        
        <main className={`side-bar fixed top-0 left-0 bg-white 
                transition-transform transform duration-500 ${isOpen ? `translate-x-0` : `-translate-x-full`} lg:translate-x-0 lg:static`}>    
                     
            <aside >

                <ul>
                    <li className="flex justify-between items-center w-full">
                    <h1 className="text-dark-gray text-[1.2rem] font-bold mb-4 ">
                    <Link href='/'>Galaza Lounge</Link></h1>
                    <button className="mb-4" 
                    onClick={handleIsOPen}>
                        {isOpen && <MdClose size={30}  /> }
                    </button>
                    </li>
                    <li className="mb-2">
                        <Link href='/'
                        className="block text-dark-gray text-lg font-semibold p-2 hover:bg-light-blue hover:rounded-md"
                        ><MdDashboard size={27} className="inline-block mr-1 mb-1" /> Dashboard</Link>
                    </li>
                    <li className="mb-2">
                        <Link href='/orders'
                        className="block text-dark-gray text-lg font-semibold p-2 hover:bg-light-blue hover:rounded-md"
                        ><MdOutlineReceiptLong size={27} className="inline-block mr-1 mb-1" /> Order</Link>
                    </li>
                    <li className="mb-2">
                        <Link href='/Menu'
                        className="block text-dark-gray text-lg font-semibold p-2 hover:bg-light-blue hover:rounded-md"
                        ><MdRestaurant size={27} className="inline-block mr-1 mb-1" /> Menu</Link>
                    </li>
                    <li className="mb-2">
                        <h3 className="font-bold text-md text-dark-gray py-2 px-2 border-b border-dark-gray">
                        <MdSettings size={20} className="inline-block mr-2" /> Settings</h3>
                        <Link href='/profile'
                        className="block text-dark-gray text-lg font-semibold p-2 my-3 hover:bg-light-blue hover:rounded-md"
                        ><MdPersonOutline size={27} className="inline-block mr-1 mb-1" /> Profile</Link>
                    </li>
                </ul>
            </aside>
        </main>
        </>
        
     );
}
 
export default SideBar;