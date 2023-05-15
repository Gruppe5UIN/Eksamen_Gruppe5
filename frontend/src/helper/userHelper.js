// Denne funksjonen sjekker om det finnes en mail i localstorage, og returnerer den.
export function getUserEmail() {
    const userEmail = localStorage.getItem("email_account");
    return userEmail;
}

// Denne funksjonen fjerner mailen fra localstorage, og sender brukeren tilbake til forsiden.
export function removeUserEmail() {
    localStorage.removeItem("email_account");
    window.location.href = "/";
}