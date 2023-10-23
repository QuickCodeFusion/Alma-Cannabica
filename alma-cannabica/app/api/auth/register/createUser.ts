import { db } from "@/firebase/config";
import { doc, setDoc } from "firebase/firestore";

export const createUser = async (
    name: string,
    email: string,
    photoUrl: string,
    adresses: any, // TODO: Add type for adresses
    uid: string
): Promise<void> => {
    if (!name || !email || !uid) {
        throw new Error("Missing data");
    }

    const userRef = doc(db, "users", uid);

    await setDoc(userRef, {
        name,
        email,
        photoUrl: photoUrl || "",
        adresses: adresses || [],
    })
}
