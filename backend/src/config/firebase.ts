import * as admin from 'firebase-admin';

let isFirebaseEnabled = false;

try {
  const serviceAccountVar = process.env.FIREBASE_SERVICE_ACCOUNT;
  const projectId = process.env.FIREBASE_PROJECT_ID;

  if (serviceAccountVar) {
    // Service account passed as stringified JSON in env variable
    const serviceAccount = JSON.parse(serviceAccountVar);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    isFirebaseEnabled = true;
    console.log('[Firebase SDK] Admin SDK successfully initialized via service account credentials.');
  } else if (projectId) {
    // Running in server environment with default credentials
    admin.initializeApp({
      projectId,
    });
    isFirebaseEnabled = true;
    console.log(`[Firebase SDK] Admin SDK initialized for project: ${projectId}`);
  } else {
    console.warn('\n==================================================');
    console.warn('⚠️ [FIREBASE SDK WARNING] FIREBASE_SERVICE_ACCOUNT keys are omitted.');
    console.warn('Backend is running in [DEVELOPER EMULATION MODE] for Phone Auth.');
    console.warn('==================================================\n');
  }
} catch (error: any) {
  console.error('[Firebase SDK Init Error] Initialization failed, running in fallback emulator mode:', error.message);
}

export { admin, isFirebaseEnabled };
