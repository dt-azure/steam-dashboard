import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SidebarProvider from "@/components/Sidebar/SidebarProvider";
import Sidebar from "@/components/Sidebar/Sidebar";
import SidebarNav from "@/components/Sidebar/SidebarNav";
import Header from "@/components/Header/Header";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personal Steam Dashboard",
  description: "Steam Account Statistics - Made By Trung Nguyen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex">
        <Sidebar>
          <SidebarNav />
        </Sidebar>

        <div className="main-body grow">
          <Header />
          <div className="py-4 px-6">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>

  );
}
