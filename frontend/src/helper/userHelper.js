export function getUserEmail() {
    const userEmail = localStorage.getItem("email_account");
    return userEmail;
}