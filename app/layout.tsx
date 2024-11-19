import { ThemeProvider } from "next-themes";
import "./globals.css";
import Footer from "@/components/common/Footer";
import Navbar11 from "@/components/common/Navbar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Jv - Nathanaël",
  description: "De website van Jeugdvereniging Nathanaël",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
  );
}
