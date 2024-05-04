import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig } from "./secrets";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();


provider.setCustomParameters({
    prompt: "select_account "
});


/* Auth-related functions/variables */

export const auth = getAuth();

export const signUp = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
    }
};

export const signIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log(auth.currentUser);
    } catch (err) {
        console.error(err);
        alert("Invalid credentials!");
    }
};

export const logOut = async () => {
    try {
        await signOut(auth);
    } catch (err) {
        console.error(err);
    }
};
export const signInWithGooglePopup = async () => {
    try { await signInWithPopup(auth, provider); }
    catch (err) {
        console.log(err);
        alert("An error occurred while signing in!");
    }
}

export let mail = {};
export const signOutGoogle = () => auth.signOut();
const db = getFirestore(firebaseApp)
export { db };