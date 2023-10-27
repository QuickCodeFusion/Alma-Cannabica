import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "./providers";
import NavBar from "@/components/navBar/NavBar";
import Footer from "@/components/footer/Footer";
import Cart from "@/components/cart/Cart";

export const metadata: Metadata = {
	title: "Alma Cannabica",
};

export default function RootLayout({
	children,
}: {
  children: React.ReactNode
}) {
	return (
		<html lang="en" className='dark'>
			<body>
				<Providers>
					<Toaster richColors position="top-center" />
					<NavBar/>
					<Cart/>
					{children}
					<Footer/>
				</Providers>
			</body>
		</html>
	);
}
