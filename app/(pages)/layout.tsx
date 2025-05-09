import Header from "../_components/layout/Header";
import Navigation from "../_components/layout/Navigation";
import SideBar from "../_components/layout/SideBar";
import { UserContextProvider } from "../context/authContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <UserContextProvider>
        <Header />
        <div className="flex h-screen pt-[65px] overflow-hidden print:h-auto print:pt-0">
          <SideBar>
            <Navigation />
          </SideBar>
          <main className="h-full overflow-auto px-[20px] lg:px-8 py-6 flex-1 ms-[50px] xl:ms-[270px] print:ms-0 print:p-0">
            {children}
          </main>
        </div>
      </UserContextProvider>
    </>
  );
}
