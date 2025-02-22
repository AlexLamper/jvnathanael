import { ThemeProvider } from "next-themes";
import "./globals.css";
import Footer from "@/components/common/Footer";
import Navbar11 from "@/components/common/Navbar";
import {
  ClerkProvider,
} from '@clerk/nextjs'

export const Metadata = {
  title: "Jv - Nathanaël",
  description: "De website van Jeugdvereniging Nathanaël",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&family=Roboto:wght@400;500&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="antialiased bg-gray-50">
          {/* Theme Provider */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* Navbar */}
            <Navbar11 />

            {/* Main layout container */}
            <main className="flex-grow">{children}</main>

            {/* Footer */}
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
