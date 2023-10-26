import { initializeApp, getApps, cert, getApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

const firebaseAdminConfig = {
	credential: cert({
		projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
		privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
	})
}

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseAdminConfig)

export const auth = getAuth(app)

export const InitApp = (): void => {
	if (getApps().length === 0) {
		initializeApp(firebaseAdminConfig)
	}
}
