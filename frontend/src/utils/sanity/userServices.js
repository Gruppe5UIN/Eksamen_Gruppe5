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

//Midlertidig forsøk på å hente ut filmer fra bruker med sjangere
export const fetchGamesWithGenresByUsername = async (username) => {
    try{
        const result = await client.fetch(`*[_type == 'user' && username == $username]{games[]->{..., "genres": genres[]->{title}}}`, { username});
        return result;
    }
    catch (error) {
        console.error(error);
    }
}

export const fetchGamesFilter = async (username) => {
    try{
        const result = await client.fetch(`*[_type == 'user' && username == $username][0] {games[]->{"sjanger": *[_type == "genre" && references(^._id)].title}}`, { username});
        return result;
    }
    catch (error) {
        console.error(error);
    }
}