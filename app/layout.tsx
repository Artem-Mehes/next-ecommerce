import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Roboto, Lobster_Two } from "next/font/google";
import { getServerSession } from "next-auth";

import Nav from "@/app/components/nav";
import { authOptions } from "@/config";
import Hydrate from "@/app/components/hydrate";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});
const lobster = Lobster_Two({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-lobster",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${lobster.variable} font-roboto mx-4 xl:mx-48`}
      >
        <Hydrate>
          <Nav user={session?.user} />
          {children}
        </Hydrate>
      </body>
    </html>
  );
}
