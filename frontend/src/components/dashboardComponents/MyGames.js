import GameCard from "../GameCard"
import UserContext from '../../context/UserContext';
import { useState, useEffect, useContext } from "react";
import { fetchGamesByUsername} from "../../utils/sanity/userServices";

//Komponent som henter 
export default function MyGames(){

  const [userGames, setUserGames] = useState([]);
  const { user } = useContext(UserContext);


   async function getUserGames(username) {
    const data = await fetchGamesByUsername(username);
    const userGames = data.games
    if(userGames.length > 4){
      return userGames.slice(0,4)
    }
    return userGames
  } 

   useEffect(() => {
    if (user) {
      getUserGames(user.username)
        .then((userGames) => {
         
          setUserGames(userGames);
        })
        .catch((error) => {
          console.error(error);
          window.location.href = "/login";
        })
    }
  }, [user]);


    return (
      <>
      {userGames !== undefined ? ( 
        <article className="gs-box">
      
          {userGames?.map((item, index) => (
            <GameCard
              key={index}
              title={item.game.title}
              genre={item.game.genres.map((genre, index) => (
                <li key={index}>{genre.title}</li>
            ))}
              image={item.game.image}
              slug={item.game.slug.current}
              playTime={item.playtime}
      
              text="Buy"
            />
          ))}
        </article>) : ('')}
    </>    
    )
}