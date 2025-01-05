import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_WEB_CLIENT_ID } from '../../secret';

// Initialize Google Sign-In
GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID, // From Firebase Console
});

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const signInResult = await GoogleSignin.signIn();
    let idToken = signInResult.data?.idToken;
    if (!idToken) {
        idToken = signInResult?.idToken;
      }
      if (!idToken) {
        throw new Error('No ID token found');
      }
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign in with Firebase using the credential
    const userCredential = await auth().signInWithCredential(googleCredential);

    return userCredential.user;
  } catch (error) {
    console.log(error);
    await GoogleSignin.signOut();
    // Handle error appropriately
  }
};

export const signOutWithGoogle = async () => {
  await GoogleSignin.signOut();
  await auth().signOut();
};