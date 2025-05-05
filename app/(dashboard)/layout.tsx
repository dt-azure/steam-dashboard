import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SidebarProvider from "@/components/Sidebar/SidebarProvider";
import Sidebar from "@/components/Sidebar/Sidebar";
import SidebarNav from "@/components/Sidebar/SidebarNav";
import Header from "@/components/Header/Header";
import { revalidatePath } from "next/cache";
import { NextUIProvider } from "@nextui-org/react";
import { fetchAccountSummary } from "./_actions/fetchData";
import { profile } from "console";
import { ProfileProps } from "@/lib/definition";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personal Steam Dashboard",
  description: "Steam Account Statistics - Made By Trung Nguyen",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const steamId: string | undefined = process.env.STEAM_ACCOUNT_ID;
  const profile: ProfileProps | undefined = await fetchAccountSummary()

  // Revalidate data
  // revalidatePath('/', 'layout')

  return (
    <NextUIProvider>
      <SidebarProvider>
        <div className="flex">
          <Sidebar>
            <SidebarNav />
          </Sidebar>

          <div className="flex flex-col grow">
            <Header profile={profile} />
            <div className="main-body grow py-4">
              {children}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </NextUIProvider>
  );
}
