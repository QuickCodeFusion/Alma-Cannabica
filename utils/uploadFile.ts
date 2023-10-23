import { storage } from "@/firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export const uploadFile = async (file: File, filename?: string) => {

    const storageRoute = `images/${filename}` || `images/${file.name}` || `images/${uuidv4()}`;

	const storageRef = ref(storage, `images/${filename}` || `images/${file.name}` || ``);
	await uploadBytes(storageRef, file);
	const url = await getDownloadURL(storageRef);
	return url;
};