import { storage } from '@/firebase/config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

/**
 * Uploads a file to the storage and returns its URL.
 *
 * @param {File} file - The file to be uploaded.
 * @param {string} [filename] - The name of the file. If not provided, the original file name will be used.
 * @return {Promise<string>} - A promise that resolves to the URL of the uploaded file.
 */
export const uploadFile = async (file: File, filename?: string): Promise<string> => {
	const storageRoute = `images/${filename}` || `images/${file.name}` || `images/${uuidv4()}`

	const storageRef = ref(storage, storageRoute)
	await uploadBytes(storageRef, file)
	const url = await getDownloadURL(storageRef)
	return url
}
