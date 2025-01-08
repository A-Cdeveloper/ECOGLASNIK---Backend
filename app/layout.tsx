import { Noto_Sans } from "next/font/google";
import "./globals.css";
import SideBar from "./_components/layout/SideBar";
import Header from "./_components/layout/Header";
import Navigation from "./_components/layout/Navigation";
// import Navigation from "./_components/layout/Navigation";

const notosans = Noto_Sans({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata = {
  title: "Clean me - Admin panel",
  description: "",
  favicon: "/clean-me.fw.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={notosans.className}>
      <body>
        <Header />
        <div className="flex h-screen pt-[65px] overflow-hidden">
          <SideBar>{/* <Navigation /> */}test</SideBar>
          <main className="h-full overflow-auto px-8 py-6 flex-1 ms-[50px] xl:ms-[270px]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
