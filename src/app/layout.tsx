import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import { TransferProvider } from "../../contexts/TransferContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "SafeBeam | Secure & Ephemeral File Transfer",
    template: `%s | SafeBeam`,
  },
  description:
    "Share files and text with end-to-end encryption and a one-time OTP that expires in 10 minutes. No sign-ups, no limits, just secure, ephemeral transfers. Created by Tanay Hingane.",
  keywords: [
    "secure file transfer",
    "private file sharing",
    "ephemeral file sharing",
    "end-to-end encryption",
    "OTP file sharing",
    "SafeBeam",
  ],
  authors: [{ name: "Tanay Hingane", url: "https://github.com/TanayHingane" }],
  openGraph: {
    title: "SafeBeam | Secure & Ephemeral File Transfer",
    description:
      "Share files and text with end-to-end encryption and a one-time OTP that expires in 10 minutes.",
    url: "https://safebeam03.vercel.app/",
    siteName: "SafeBeam",
    images: [
      {
        url: "https://safebeam03.vercel.app/og-image",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SafeBeam | Secure & Ephemeral File Transfer",
    description:
      "Share files and text with end-to-end encryption and a one-time OTP that expires in 10 minutes.",
    images: ["https://safebeam03.vercel.app/og-image"],
  },
  metadataBase: new URL("https://safebeam03.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TransferProvider>
            <Navbar />
            {children}
          </TransferProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
