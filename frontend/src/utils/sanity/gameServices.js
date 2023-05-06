import { client } from "./client"

//Komponent med metoder som henter data fra Sanity
//Bør det legges inn errorhåndtering?

//Henter alle sjangere - returnerer apiId og sjangernavn
export const fetchAllGenres = async () =>{
    const data = await client.fetch(`*[_type == "genre"]{apiId, title}`)
    return data; 
}

//Hente en sjanger basert på id - usikker om vi trenger denne
export const fetchGenreById = async (id) => { 
    const data = await client.fetch(`*[_type == "genre" && apiId == $id]`, {id})
    return data;
}

//Henter alle spill - returnerer et fullt objekt
export const fetchAllGames = async () => {
    const data = await client.fetch(`*[_type == 'game']`)
    return data;

}

//Henter spill som tilhører en sjanger 
export const fetchGamesByGenre = async (genre) => {
    const data = await client.fetch(`*[_type=="game" && references(*[_type == "genre" && title == $genre]._id)]`,{genre})
    return data;

}

//Teller antall spill 
export const countGames = async () => {
    const data = await client.fetch(`count(*[_type == 'game'])`)
    return data;
}