import { useRouter } from "next/router";

const apikey = process.env.REACT_APP_API_KEY_1;

const resolveVanityURL = async (id: string) => {
  const response = await fetch(
    `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${apikey}&vanityurl=${id}`
  );
  const data = await response.json();
  if (data.response.steamid === undefined) {
    return id;
  } else {
    return data.response.steamid;
  }
};

const fetchUser = async (userId: string) => {
  const response = await fetch(
    `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apikey}&steamids=${userId}`
  );
  const data = await response.json();
  return data.response.players[0];
};

const fetchLibrary = async (userId: string, getgames: string) => {
  if (getgames === 'true') {
    const response = await fetch(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apikey}&include_appinfo=true&include_played_free_games=true&steamid=${userId}&format=json`
    );
    const data = await response.json();
    if (data.response === undefined) {
      return null;
    } else {
      return data.response;
    }
  } else {
    return;
  }
};

const fetchFriends = async (userId: string, getfriends: string) => {
  if (getfriends === 'true') {
    const response = await fetch(
      `https://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${apikey}&steamid=${userId}&relationship=friend`
    );
    const data = await response.json();
    if (data.friendslist === undefined) {
      return null;
    } else {
      return data.friendslist.friends;
    }
  } else {
    return;
  }
};

export default async function handler(req: any, res: any) {
  const { id, getfriends, getgames } = req.query;
  const userId = await resolveVanityURL(id);
  const user = await fetchUser(userId);
  const games = await fetchLibrary(userId, getgames);
  const friends = await fetchFriends(userId, getfriends);
  res.status(200).json({ user, games, friends });
}
