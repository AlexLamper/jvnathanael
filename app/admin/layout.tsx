import type { Metadata } from "next";
// import { getServerSession } from "next-auth";
// import SessionProvider from "@/components/SessionProvider";
// import { Header } from "@/components/header";
// import { AppSidebar } from "@/components/app-sidebar";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export const metadata: Metadata = {
    title: "Jv Nathanael",
    description: "Jv Nathanael - HHK.",
  };

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getServerSession();

  return (
      <div className="antialiased bg-gray-100 p-8">
        {/* <SessionProvider session={session}> */}
          {/* <SidebarProvider> */}
            {/* <AppSidebar /> */}
            <div className="min-h-screen mx-auto w-full">
              {/* <SidebarTrigger /> */}
              {/* <Header /> */}
              {children}
            </div>
          {/* </SidebarProvider> */}
        {/* </SessionProvider> */}
      </div>
  );
}
