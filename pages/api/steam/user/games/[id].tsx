const apikey = process.env.REACT_APP_API_KEY_1;

const fetchLibrary = async (userId: string) => {
  const response = await fetch(
    `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apikey}&include_appinfo=true&include_played_free_games=true&steamid=${userId}&format=json`
  );
  const data = await response.json();
  return data;
};

export default async function handler(req: any, res: any) {
  const { id, getgames } = req.query;
  const games = await fetchLibrary(id);
  res.status(200).json(games);
}
