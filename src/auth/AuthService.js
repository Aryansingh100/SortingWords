import {
    auth,
    provider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile,
    signOut,
    onAuthStateChanged
} from "./firebase-config.js";

export function observeUser(callback) {
    return onAuthStateChanged(auth, callback);
}

export function getCurrentUser() {
    return auth.currentUser;
}

export function getPlayerName(user) {
    if (!user) return "Guest";

    return (
        user.displayName ||
        user.email?.split("@")[0] ||
        "Player"
    );
}

export async function loginWithGoogle() {
    const result = await signInWithPopup(auth, provider);
    return result.user;
}

export async function loginWithEmail(email, password) {
    const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
    );

    return result.user;
}

export async function registerWithEmail(name, email, password) {
    const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    await updateProfile(result.user, {
        displayName: name.trim()
    });

    return result.user;
}

export async function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
}

export async function logout() {
    await signOut(auth);
}