//Dynamic queryParams to use in other components
export const getGames = async (params) => {
  const queryParams = new URLSearchParams(params).toString();
  const response = await fetch(
    `https://api.rawg.io/api/games?key=6ccebb406ca942cd8ddc8584b1da9a4f&${queryParams}&dates=2023-01-01,2023-05-01`
  );
  const data = await response.json();
  return data.results;
};
