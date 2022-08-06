import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/components/mutualGames.module.css";

import Image from "next/image";
import { Key, useEffect, useState } from "react";
import { GiOpenChest } from "react-icons/gi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function MutualGames(props: { games: any }) {
  const [games, setGames] = useState<any>([]);
  const [loadingGames, setLoadingGames] = useState(true);
  const myLoader = (src: any) => {
    return `${src.src}`;
  };

  useEffect(() => {
    const fetchGame = async (game: number) => {
      const response = await fetch("/api/steam/game/" + game);
      const data = await response.json();
      if (data.game.success == true) {
        return data.game.data;
        // console.log(data.game.success)
      }
    };
    setLoadingGames(true);
    const responseData = async () => {
      return Promise.all(
        props.games.map((game: number) => {
          return fetchGame(game);
        })
      );
    };

    responseData()
      .then((res) => {
        setGames(res);
        setLoadingGames(false);
      })
      .catch((err) => {
        setLoadingGames(false);
      });
  }, [props.games]);

  return (
    <div className={styles.mutualWrapper}>
      <h2>Mutual Games: {games.length}</h2>
      <div className={styles.gamesContainer}>
        {!loadingGames ? (
          games.length == props.games.length ? (
            games.map((game: any, idx: Key) => {
              if(game !== undefined)  {
              let isMulti = game.categories
                ? game.categories.find(
                    (element: any) => element.description == "Multi-player"
                  )
                  ? true
                  : false
                : false;
              return (
                <a
                  className={`${styles.gameCard} ${
                    styles[isMulti ? "multi" : "single"]
                  }`}
                  key={idx}
                  href={
                    "https://store.steampowered.com/app/" + game.steam_appid
                  }
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
                    alt={"Game cover"}
                    onError={(e) =>
                      (e.target as any).parentNode.classList.add("imgError")
                    }
                    unoptimized={true}
                  />
                  <p>{game.name}</p>
                </a>
              )
              }
            })
          ) : (
            ""
          )
        ) : (
          <Skeleton
            baseColor="var(--dark-blue-glass)"
            highlightColor="var(--steam-blue)"
            count={6}
            height="60px"
            style={{ margin: "6px 0" }}
          />
        )}
      </div>
    </div>
  );
}
