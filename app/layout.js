import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mandrill Technologies | Denzel Kariuki Ndegwa",
  description: "Fullstack developer specializing in web, mobile, and desktop development. Transforming ideas into digital experiences.",
  keywords: ["fullstack developer", "web development", "mobile development", "desktop development", "UI/UX design", "database management", "SEO"],
  authors: [{ name: "Denzel Kariuki Ndegwa" }],
  creator: "Denzel Kariuki Ndegwa",
  openGraph: {
    title: "Mandrill Technologies | Denzel Kariuki Ndegwa",
    description: "Fullstack developer specializing in web, mobile, and desktop development. Transforming ideas into digital experiences.",
    url: "https://mandrilltech.com",
    siteName: "Mandrill Technologies",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="min-h-screen flex flex-col">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
