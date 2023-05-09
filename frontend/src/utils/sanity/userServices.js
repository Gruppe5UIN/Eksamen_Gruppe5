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