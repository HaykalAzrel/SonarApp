import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';

import { firebaseAuth, isFirebaseConfigured } from '@/firebase/config';

export const authService = {
  async login(email: string, password: string) {
    if (!firebaseAuth || !isFirebaseConfigured) return null;
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  },
  async register(fullName: string, email: string, password: string) {
    if (!firebaseAuth || !isFirebaseConfigured) return null;
    const credential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    await updateProfile(credential.user, { displayName: fullName });
    return credential;
  },
  async logout() {
    if (!firebaseAuth || !isFirebaseConfigured) return;
    await signOut(firebaseAuth);
  },
};
