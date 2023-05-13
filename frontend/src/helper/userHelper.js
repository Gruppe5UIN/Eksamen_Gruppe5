export function getUserEmail() {
    const userEmail = localStorage.getItem("email_account");
    return userEmail;
}

export function removeUserEmail() {
    localStorage.removeItem("email_account");
    window.location.href = "/";
}