import { Metadata } from "next";
import { CustomProvider } from "@/components/provider/CustomProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "sweav web",
  description: "sweav client web",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CustomProvider>{children}</CustomProvider>
      </body>
    </html>
  );
}
