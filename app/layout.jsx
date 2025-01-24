import "./globals.css";
import SideBar from "@/components/SideBar";
import NavBar from "@/components/NavBar";
import SideBarProvider from "@/context/SideBarContext";
import SearchContextProvider from "@/context/SearchContext";

export const metadata = {
  title: "Galaza Lounge",
  description: "Order your deliciouse meal at out our website fast!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` antialiased flex h-[100vh]`} >
          <SideBarProvider>
            <SearchContextProvider>
              <SideBar />
              <main className="flex-grow p-1 md:p-3">
                <NavBar />
                {children}
              </main>
            </SearchContextProvider>
            
          </SideBarProvider>
        
      </body>
    </html>
  );
}
