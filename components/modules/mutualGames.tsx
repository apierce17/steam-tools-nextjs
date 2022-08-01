import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/components/profile.module.css";

import Image from "next/image";
import { Key, useState } from "react";

export default function MutualGames(props: {
  games: any;
}) {

  const myLoader = (src: any) => {
    return `${src.src}`;
  };

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.gamesContainer}>
        {props.games.map(
          (game: string, idx: Key) => {
            return (
              <a
                className={styles.gameCard}
                key={idx}
                href={"https://steamcommunity.com/app/" + game}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  loader={myLoader}
                  src={
                    "https://steamcdn-a.akamaihd.net/steam/apps/" +
                      game +
                      "/library_600x900.jpg" ||
                    "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA="
                  }
                  className={styles.gameCard}
                  layout="fill"
                  alt={"logo"}
                  onError={(e) =>
                    ((e.target as HTMLImageElement).style.display = "none")
                  }
                  unoptimized={true}
                />
              </a>
            );
          }
        )}
      </div>
    </div>
  );
}
