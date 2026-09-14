import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Forum Messaging App",
  description: "Created by Tyler Hall",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full w-full antialiased`}
    >
      <body className="min-h-full w-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}