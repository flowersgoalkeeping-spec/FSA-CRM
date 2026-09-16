import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App singleton safely
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Configure Google Provider with Gmail Send scope
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/gmail.send');
// Also request profile and email for display
provider.addScope('email');
provider.addScope('profile');
provider.setCustomParameters({
  prompt: 'select_account',
});

// Flag to indicate if we are in the middle of a sign-in flow
let isSigningIn = false;
// Cache the access token in memory with sessionStorage fallback for tab lifetime
const SESSION_TOKEN_KEY = 'fsa_gmail_access_token';
let cachedAccessToken: string | null = (typeof window !== 'undefined' ? sessionStorage.getItem(SESSION_TOKEN_KEY) : null);
let currentUser: User | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    currentUser = user;
    if (user) {
      if (!cachedAccessToken && typeof window !== 'undefined') {
        cachedAccessToken = sessionStorage.getItem(SESSION_TOKEN_KEY);
      }
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem(SESSION_TOKEN_KEY);
      }
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string }> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to obtain Google access token for Gmail.');
    }

    cachedAccessToken = credential.accessToken;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(SESSION_TOKEN_KEY, cachedAccessToken);
    }
    currentUser = result.user;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Sign In error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  if (!cachedAccessToken && typeof window !== 'undefined') {
    cachedAccessToken = sessionStorage.getItem(SESSION_TOKEN_KEY);
  }
  return cachedAccessToken;
};

export const getCurrentUser = (): User | null => {
  return currentUser || auth.currentUser;
};

export const isGmailConnected = (): boolean => {
  if (!cachedAccessToken && typeof window !== 'undefined') {
    cachedAccessToken = sessionStorage.getItem(SESSION_TOKEN_KEY);
  }
  return !!cachedAccessToken && !!auth.currentUser;
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
  currentUser = null;
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
  }
};
