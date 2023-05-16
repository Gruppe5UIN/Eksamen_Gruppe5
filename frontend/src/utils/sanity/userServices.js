import { client } from "./client"

//Henter data fra Sanity for en bruker 

//Hente bruker
export const getUserByEmail = async (email) => { 
    try {
        const result = await client.fetch(`*[_type == "user" && email == $email][0]`, { email });
        return result;
    } catch (error) {
        console.error(error);
    }
}

//Henter brukerens spill
export const fetchGamesByUsername = async (username) => {
    try {
        const result = await client.fetch(`*[_type == "user" && username == $username][0]{"numGames": count(userGames),"games": userGames[]{playtime, game->{apiId, slug, title, "image": imageUrl[0], "genres": genres[]->{"id": apiId, title}}}}`,{ username })
        return result;
    } catch (error) {
        console.log(error)
    }
}

//Henter brukerens favoritter
export const fetchFavouritesByUsername = async (username) => {
    try {
        const result = await client.fetch(`*[_type == "user" && username == $username][0]{"numFavourites": count(favorites), "favourites": favorites[]->{"game":{apiId, slug, title,"image": imageUrl[0], "genres": genres[]->{title}}}}`,{username})
        return result;
    } catch (error) {
        console.log(error)
    }
}