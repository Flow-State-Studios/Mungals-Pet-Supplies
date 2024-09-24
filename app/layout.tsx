import { Montserrat } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav/nav";
import { Viewport } from "next";
import ShoppingCart from "./contexts/shopping-cart";
import Footer from "@/components/footer/footer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";
  
export const viewport: Viewport = {
  // themeColor: `#a05137`
  // themeColor: `hsl(35, 35%, 81%)`
  themeColor: `hsl(40, 23%, 95%)`
}
export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Mungal's Pet Supplies",
  description: "Pet Life, But Elevated | Affordable Pet Supplies, Food, Toys, & More!",
};

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.className}>
      <body className={``}>
        <ShoppingCart>  
          {children}
        </ShoppingCart>
        <Footer />
      </body>
    </html>
  );
}
