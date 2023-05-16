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

export function addFavouriteSlugToLocalStorage(slug) {
    const favouriteSlugs = JSON.parse(localStorage.getItem("favourite")) || [];
    favouriteSlugs.push(slug);
    localStorage.setItem("favourite", JSON.stringify(favouriteSlugs));
}

export function removeFavouriteSlugFromLocalStorage(slug) {
    const favouriteSlugs = JSON.parse(localStorage.getItem("favourite")) || [];
    const newFavouriteSlugs = favouriteSlugs.filter((favouriteSlug) => favouriteSlug !== slug);
    localStorage.setItem("favourite", JSON.stringify(newFavouriteSlugs));
}

export function getFavouriteSlugsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("favourite")) || [];
}