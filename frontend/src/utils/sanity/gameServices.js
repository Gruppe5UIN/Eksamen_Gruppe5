import { client } from "./client"

//Komponent med metoder som henter genrelle data fra Sanity
//Alle metodene er ikke lenger i bruk, men de kunne potensielt blitt brukt i systemet

//Henter alle sjangere
export const fetchAllGenres = async () => {
    try {
        const data = await client.fetch(`*[_type == "genre"]{apiId, title}`)
        return data; 
    } catch (error) {
        console.error(error)
    }
}

//Hente en sjanger basert på id 
export const fetchGenreById = async (id) => { 
    try {
        const data = await client.fetch(`*[_type == "genre" && apiId == $id]`, {id})
        return data;
    } catch (error) {
        console.error(error)
    }
}

//Henter alle spill 
export const fetchAllGames = async () => {
    try {
        const data = await client.fetch(`*[_type == 'game']{apiId,"slug": slug.current,title,playtime,"image": imageUrl[0], genres[]->{title}}`)
        return data;
    } catch (error) {
        console.error(error)
    }

}

//Henter et spill basert på id 
export const fetchGame = async (id) => {
    try {
        const data = await client.fetch(`*[_type == 'game' && apiId == $id]`,{id})
        return data;
    } catch (error) {
        console.error(error)
    }
}

//Hente et spill med slug
export const fetchGameBySlug = async (slug) => {
    try {
        const data = await client.fetch(`*[_type == 'game' && slug.current == $slug]{apiId, title, "slug": slug.current, "images": imageUrl,genres[]->{title}}`,{slug})
        return data;
    } catch (error) {
        console.error(error)
    }
}


//Henter spill som tilhører en sjanger 
export const fetchGamesByGenre = async (genre) => {
    try {
        const data = await client.fetch(`*[_type=="game" && references(*[_type == "genre" && title == $genre]._id)]`,{genre})
        return data;
    } catch (error) {
        console.error(error)
    }
}