import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { BugsContextProvider } from "./context/BugsContext";
import { TabContextProvider } from "./context/TabContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Frog Incremental",
  description: "Frogs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BugsContextProvider>
          <TabContextProvider>{children}</TabContextProvider>
        </BugsContextProvider>
      </body>
    </html>
  );
}
