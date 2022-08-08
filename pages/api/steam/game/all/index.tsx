const apikey = process.env.REACT_APP_STEAM_KEY;

const fetchGames = async () => {
    const response = await fetch(
      `https://api.steampowered.com/ISteamApps/GetAppList/v2/?key=${apikey}&format=json`
    );
    const data = await response.json();
    return data;
};

export default async function handler(req: any, res: any) {
  const games = await fetchGames();
  res.status(200).json({ games });
}
