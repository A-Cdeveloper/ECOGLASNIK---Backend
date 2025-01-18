import Header from "../_components/layout/Header";
import Navigation from "../_components/layout/Navigation";
import SideBar from "../_components/layout/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <div className="flex h-screen pt-[65px] overflow-hidden">
        <SideBar>
          <Navigation />
        </SideBar>
        <main className="h-full overflow-auto px-[20px] lg:px-8 py-6 flex-1 ms-[50px] xl:ms-[270px]">
          {children}
        </main>
      </div>
    </div>
  );
}
