"use client";

import {NextUIProvider} from "@nextui-org/react";

/* Core */
import { Provider } from "react-redux";

/* Instruments */
import { store } from "@/redux/store"; 

export function Providers({children}: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<NextUIProvider>
				{children}
			</NextUIProvider>
		</Provider>
	);
}