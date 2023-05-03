import { client } from "./client"

//fetch games/genres/favourites/myGames osv
export const fetchAllGenres = async () =>{

    const data = await client.fetch(`*[_type == "genre"]{apiId,title}`)
    return data;
}