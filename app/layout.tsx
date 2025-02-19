import { Noto_Sans } from "next/font/google";
import "./globals.css";

const notosans = Noto_Sans({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata = {
  title: "ECOGLASNIK - Admin panel",
  description: "Login to the admin panel",
  other: {
    "google-site-verification": "mh-CXyRSXkr01wcG0gmBCokyrSSj9Dcyr6cCFqr7dS0",
  },
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
