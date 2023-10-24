import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const registerAndLogin = async (
	form: any,
	setForm: any,
): Promise<void> => {
	const { name, email, photoUrl, password } = form;
	try {

		const { user } = await createUserWithEmailAndPassword(auth, email, password);

		const normalizedUser = {
			uid: user.uid,
			email: user.email,
			name: user.displayName || name,
			photoUrl: user.photoURL || photoUrl,
		};

		await fetch("/api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(normalizedUser),
		});

		setForm({
			name: "",
			email: "",
			photoUrl: "",
			password: "",
		});


		await fetch("/api/auth/login", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${user.accessToken}`,
				"Content-Type": "application/json",
			},
		});
		await signInWithEmailAndPassword(auth, email, password);
    
	} catch (error: any) {
		alert(error.message);
	}
};

/**
 * Logs in a user with the provided form data.
 *
 * @param {any} form - The form data containing email and password.
 * @param {any} setForm - The function to update the form data.
 * @return {Promise<void>} A Promise that resolves when the login is complete.
 */
export const login = async (form: any, setForm: any): Promise<void> => {
	const { email, password } = form;

	try {
		const { user } = await signInWithEmailAndPassword(auth, email, password);
		const normalizedUser = {
			uid: user.uid,
			email: user.email,
			name: user.displayName,
			photoUrl: user.photoURL,
		};

		await fetch("/api/auth/login", {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${user.accessToken}`,
				"Content-Type": "application/json",
			},
		});

		setForm({
			name: "",
			email: "",
			photoUrl: "",
			password: "",
		});
	} catch (error) {
		// Handle any errors that occur during login
		console.error(error);
	}
};
