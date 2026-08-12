import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app;
let auth: Auth | null = null;
let isFirebaseClientEnabled = false;

// Check if minimum configuration values are available
const hasMinConfig = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId
);

if (hasMinConfig && typeof window !== 'undefined') {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    isFirebaseClientEnabled = true;
    console.log('[Firebase Info] Client initialized successfully for Google/Facebook Authentication.');
  } catch (error) {
    console.warn('[Firebase Web SDK] Initialization error:', error);
  }
} else if (typeof window !== 'undefined') {
  console.log('[Firebase Info] Firebase client credentials omitted. Using mock social login fallbacks.');
}

export { auth, isFirebaseClientEnabled };
