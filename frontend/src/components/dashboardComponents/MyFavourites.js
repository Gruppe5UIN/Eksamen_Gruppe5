import { useState, useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";

import GameCard from "../GameCard";

import { fetchFavouritesByUsername } from "../../utils/sanity/userServices";

export default function MyFavourites(){

    const [userFavourites, setUserFavourites] = useState([]);
    const { user } = useContext(UserContext);
   

    async function getUserFavourites(username) {
        const data = await fetchFavouritesByUsername(username);
        const userFavourites = data.favourites
        if(userFavourites.length > 4){
            return userFavourites.slice(0,4)
        }
        return userFavourites
  } 

  useEffect(() => {
    if (user) {
      getUserFavourites(user.username)
        .then((userFavourites) => {
         
          setUserFavourites(userFavourites);
        })
        .catch((error) => {
          console.error(error);
          window.location.href = "/login";
        })
    }
  }, [user]);

    return (
        <>
        {userFavourites !== undefined ? ( 
          <article className="gs-box">
        
            {userFavourites?.map((item, index) => (
              <GameCard
                key={index}
                title={item.game.title}
                genre={item.game.genres.map((genre, index) => (
                  <li key={index}>{genre.title}</li>
              ))}
                image={item.game.image}
                slug={item.game.slug.current}
                playTime={0}
        
                text="Buy"
              />
            ))}
                </article>) : ('')}
      </>    
      
    )
}