import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/components/mutualGames.module.css";

import Image from "next/image";
import { Key, useEffect, useState } from "react";
import { GiOpenChest } from "react-icons/gi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { TbFaceIdError } from "react-icons/tb";
import {CgSpinnerTwo} from 'react-icons/cg'
export default function MutualGames(props: { games: any }) {
  const [games, setGames] = useState<any>([]);
  const [loadingGames, setLoadingGames] = useState(true);
  const [isError, setIsError] = useState(false);
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
        console.log("error");
        setLoadingGames(false);
        setIsError(true)
      });
  }, [props.games]);

  return (
    <div className={styles.mutualWrapper}>
      <h2>Mutual Games: {loadingGames ? <CgSpinnerTwo /> : games.length }</h2>
      <div className={styles.gamesContainer}>
        {!loadingGames ? (
          games.length > 0 ? (
            games.map((game: any, idx: Key) => {
              if (game !== undefined) {
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
                );
              }
            })
          ) : isError ? 
           (
            <div className={styles.noGames}>
              <TbFaceIdError />
              Oops! We ran into an issue, please try again later.
            </div>
           )
          :(
            <div className={styles.noGames}>
              <GiOpenChest />
              Looks like there is nothing here..
            </div>
          )
        ) : (
          <Skeleton
            baseColor="var(--dark-blue-glass)"
            highlightColor="var(--steam-blue)"
            count={6}
            height="225px"
            width="150px"
            style={{borderRadius: '15px'}}
          />
        )}
      </div>
    </div>
  );
}
