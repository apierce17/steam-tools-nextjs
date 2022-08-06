const fetchGame = async (id: number) => {
    const response = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${id}&l=english`
    );
    const data = await response.json();
    return data[id];
};

export default async function handler(req: any, res: any) {
  const { id } = req.query;
  const game = await fetchGame(id);
  res.status(200).json({ game });
}
