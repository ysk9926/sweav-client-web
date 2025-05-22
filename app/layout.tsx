import { Metadata } from "next";
import { CustomProvider } from "@/components/provider/CustomProvider";
import "./globals.css";
import { StagewiseToolbar } from "@stagewise/toolbar-next";

export const metadata: Metadata = {
  title: "sweav web",
  description: "sweav client web",
};

const stagewiseConfig = {
  plugins: [],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CustomProvider>{children}</CustomProvider>
        {process.env.NODE_ENV === "development" && <StagewiseToolbar config={stagewiseConfig} />}
      </body>
    </html>
  );
}
