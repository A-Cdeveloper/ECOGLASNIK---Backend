import Logo from "../_components/layout/Logo";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex-col flex-wrap w-[300px] justify-center items-center space-y-2 ">
        <Logo className="mx-auto" />
        {children}
      </div>
    </div>
  );
}
