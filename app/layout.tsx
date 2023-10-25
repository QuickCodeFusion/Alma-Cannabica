import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "./providers";
import NavBar from "@/components/navBar/NavBar";

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
					{children}
				</Providers>
			</body>
		</html>
	);
}
