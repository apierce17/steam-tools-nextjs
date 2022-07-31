import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/components/profile.module.css";

import Image from "next/image";
import { Key, useState } from "react";

export default function Profile(props: {
  playerName: string;
  imageName: any;
  profileLink: string;
  games: any;
}) {

  const myLoader = (src: any) => {
    return `${src.src}`;
  };

  return (
    <div className={styles.profileWrapper}>
      {props.imageName && (
        <a
          title={"Go to" + props.playerName + ""}
          href={props.profileLink}
          target="_blank"
          rel="noreferrer"
        >
          <Image
            loader={myLoader}
            src={props.imageName}
            width={100}
            height={100}
            alt={props.playerName + " logo"}
            unoptimized={true}
          />
        </a>
      )}
      {props.playerName}
      <div className={styles.gamesContainer}>
        {props.games.games.map(
          (game: { name: any; appid: number }, idx: Key) => {
            return (
              <a
                className={styles.gameCard}
                key={idx}
                href={"https://steamcommunity.com/app/" + game.appid}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  loader={myLoader}
                  src={
                    "https://steamcdn-a.akamaihd.net/steam/apps/" +
                      game.appid +
                      "/library_600x900.jpg" ||
                    "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA="
                  }
                  className={styles.gameCard}
                  layout="fill"
                  alt={props.playerName + " logo"}
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
