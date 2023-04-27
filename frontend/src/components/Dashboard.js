import React from "react";
import GameShop from "./GameShop";

export default function Dashboard({ games }) {
  return (
    <div>
      <GameShop games={games} />
    </div>
  );
}
