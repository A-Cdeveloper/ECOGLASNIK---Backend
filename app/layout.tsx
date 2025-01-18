import { Noto_Sans } from "next/font/google";
import "./globals.css";

const notosans = Noto_Sans({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata = {
  title: "ECOGLASNIK - Login",
  description: "Login to the admin panel",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="rs" className={notosans.className}>
      <body>{children}</body>
    </html>
  );
}
