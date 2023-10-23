import { auth } from "@/firebase/config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

export const registerAndLogin = async (
    form: any,
    setForm: any,
): Promise<void> => {
    const { name, email, photoUrl, password } = form
    let normalizedUser: any // TODO: Add type for normalized user
    createUserWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
            normalizedUser = {
                uid: user.uid,
                email: user.email,
                name: user.displayName || name,
                photoUrl: user.photoURL || photoUrl,
            }
            fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`,
                    'Content-Type': 'application/json',
                },
            })
            fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(normalizedUser),
            }).then(() => {
                setForm({
                    name: '',
                    email: '',
                    photoUrl: '',
                    password: '',
                })
            })
        })
        .then(() => {
            signInWithEmailAndPassword(auth, email, password)
        })
        .catch((error: any) => {
            alert(error.message)
        })
}