import { client } from "./client"

export const getUserByEmail = async (email) => { 
    try {
        const result = await client.fetch(`*[_type == "user" && email == $email][0]`, { email });
        return result;
    } catch (error) {
        console.error(error);
    }
}

export const getFavoritesByUsername = async (username) => {
    try {
        const result = await client.fetch(`*[_type == "user" && username == $username][0].favorites[]->{..., game->{..., "username": $username}}`, { username });
        return result;
    } catch (error) {
        console.error(error);
    }
};

export const getGamesByUsername = async (username) => {
    try {
        const result = await client.fetch(`*[_type == "user" && username == $username][0].games[]->{..., game->{..., "username": $username}}`, { username });
        return result;
    } catch (error) {
        console.error(error);
    }
};

//Metode som henter spill fra bruker med utvidet projections
export const fetchGamesByUsername = async (username) => {
    try {
        const result = await client.fetch(`*[_type == "user" && username == $username][0]{"numGames": count(userGames),"games": userGames[]{playtime, game->{apiId, slug, title, "image": imageUrl[0], "genres": genres[]->{"id": apiId, title}}}}`,{ username })
        return result;
    } catch (error) {
        console.log(error)
    }
}

//henter bruker sine favoritter
export const fetchFavouritesByUsername = async (username) => {
    try {
        const result = await client.fetch(`*[_type == "user" && username == $username][0]{"numFavourites": count(favorites), "favourites": favorites[]->{"game":{apiId, slug, title,"image": imageUrl[0], "genres": genres[]->{title}}}}`,{username})
        return result;
    } catch (error) {
        console.log(error)
    }
}