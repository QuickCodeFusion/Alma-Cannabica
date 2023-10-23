import { db } from "@/firebase/config";
import { doc, setDoc } from "firebase/firestore";

/**
 * Creates a new user in the database.
 *
 * @param {string} name - The name of the user.
 * @param {string} email - The email of the user.
 * @param {string} photoUrl - The photo URL of the user.
 * @param {any} addresses - The addresses of the user. TODO: Add type for addresses.
 * @param {string} uid - The unique identifier of the user.
 * @return {Promise<void>} A promise that resolves when the user is created successfully.
 */
export const createUser = async (
  name: string,
  email: string,
  photoUrl: string,
  addresses: any, // TODO: Add type for addresses
  uid: string
): Promise<void> => {
  if (!name || !email || !uid) {
    throw new Error("Missing data");
  }

  const userRef = doc(db, "users", uid);

  const userData = {
    name,
    email,
    photoUrl: photoUrl || "",
    addresses: addresses || [],
  };

  await setDoc(userRef, userData);
};