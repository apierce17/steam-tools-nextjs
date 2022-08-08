import Link from "next/link";
import { useState } from "react";
import styles from "../styles/pages/Random.module.css";
import Image from "next/image";

export default function Home() {
  const [allGames, setAllGames] = useState<any[]>([]);
  const [game, setGame] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllGames = async () => {
    const response = await fetch(`/api/steam/game/all`);
    const data = await response.json();
    return data.games.applist.apps;
  };

  const fetchGame = async (game: number) => {
    const response = await fetch("/api/steam/game/" + game);
    const data = await response.json();
    if (data.game.success == true) {
      return data.game.data;
    } else {
      throw new Error('No data for this game');
    }
  };

  const getGame = () => {
    setIsLoading(true);
    if (allGames.length > 0) {
      fetchGame(allGames[Math.floor(Math.random() * allGames.length)].appid)
        .then((res) => {
          setGame(res);
          setIsLoading(false);
        })
        .catch((err) => {
          fetchGame(
            allGames[Math.floor(Math.random() * allGames.length)].appid
          );
          setIsLoading(false);
        });
      // setGame()
    } else {
      fetchAllGames()
        .then((res) => {
          setAllGames(res);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const myLoader = (src: any) => {
    return `${src.src}`;
  };

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.randomContainer}>
        <div className={styles.gameContainer}>
          {isLoading ? (
            ""
          ) : (
            <a
              className={`${styles.gameCard}`}
              href={"https://store.steampowered.com/app/" + game.steam_appid}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                loader={myLoader}
                src={
                  "https://steamcdn-a.akamaihd.net/steam/apps/" +
                  game.steam_appid +
                  "/library_600x900.jpg"
                }
                className={styles.gameCard}
                layout="fill"
                width={200}
                height={200}
                alt={"Game cover"}
                onError={(e) =>
                  (e.target as any).parentNode.classList.add("imgError")
                }
                unoptimized={true}
              />
              <p>{game.name}</p>
            </a>
          )}
        </div>
        <div className={styles.gameDetails}>
          <p>Name</p>
          <div className={styles.gameName}>
            {isLoading ? "" : game && game.name}
          </div>
          <p>Description</p>
          <div className={styles.gameDesc}>
            {isLoading ? "" : game && game.short_description}
          </div>
        </div>
        <button
          className="greenButton"
          onClick={() => getGame()}
          disabled={isLoading ? true : false}
        >
          Randomize
        </button>
      </div>
    </div>
  );
}
