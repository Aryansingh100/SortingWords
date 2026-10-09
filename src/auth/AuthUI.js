import {
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    resetPassword
} from "./AuthService.js";

const modal = document.getElementById("authModal");
const form = document.getElementById("authForm");
const nameInput = document.getElementById("authName");
const emailInput = document.getElementById("authEmail");
const passwordInput = document.getElementById("authPassword");
const submitButton = document.getElementById("authSubmit");
const switchButton = document.getElementById("switchAuthMode");
const message = document.getElementById("authMessage");

let registering = false;
let busy = false;

export function openAuthModal() {
    message.textContent = "";
    modal.hidden = false;
}

export function closeAuthModal() {
    modal.hidden = true;
    message.textContent = "";
}

function setMode(isRegistering) {
    registering = isRegistering;

    nameInput.hidden = !registering;
    nameInput.required = registering;

    submitButton.textContent = registering
        ? "Create Account"
        : "Sign In";

    switchButton.textContent = registering
        ? "Already have an account? Sign In"
        : "Create an account";
}

async function runAuth(action) {
    if (busy) return;

    busy = true;
    message.textContent = "";

    try {
        await action();
        closeAuthModal();
    } catch (error) {
        console.error("Authentication error:", error);

        const errors = {
            "auth/invalid-credential": "Incorrect email or password.",
            "auth/email-already-in-use": "An account already uses this email.",
            "auth/weak-password": "Please use a stronger password.",
            "auth/popup-closed-by-user": "Google sign-in was cancelled.",
            "auth/unauthorized-domain": "This domain is not authorized in Firebase.",
            "auth/too-many-requests": "Too many attempts. Try again later."
        };

        message.textContent =
            errors[error.code] ||
            error.message ||
            "Authentication failed.";
    } finally {
        busy = false;
    }
}

document.getElementById("closeAuth").onclick = closeAuthModal;
document.getElementById("continueGuest").onclick = closeAuthModal;

document.getElementById("googleLogin").onclick = () => {
    runAuth(loginWithGoogle);
};

switchButton.onclick = () => {
    setMode(!registering);
    message.textContent = "";
};

form.addEventListener("submit", event => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (registering) {
        const name = nameInput.value.trim();

        if (name.length < 2) {
            message.textContent = "Username must be at least 2 characters.";
            return;
        }

        if (password.length < 6) {
            message.textContent = "Password must be at least 6 characters.";
            return;
        }

        runAuth(() => registerWithEmail(name, email, password));
    } else {
        runAuth(() => loginWithEmail(email, password));
    }
});

document.getElementById("forgotPassword").onclick = async () => {
    const email = emailInput.value.trim();

    if (!email) {
        message.textContent = "Enter your email address first.";
        return;
    }

    if (busy) return;
    busy = true;

    try {
        await resetPassword(email);
        message.textContent = "Password reset email sent.";
    } catch (error) {
        console.error(error);
        message.textContent = "Could not send password reset email.";
    } finally {
        busy = false;
    }
};

setMode(false);