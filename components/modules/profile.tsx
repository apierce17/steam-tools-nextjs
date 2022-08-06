import styles from "../../styles/components/profile.module.css";

import Image from "next/image";
import { Key, useState } from "react";
import { BiChevronsLeft } from "react-icons/bi";
import {GiOpenChest} from 'react-icons/gi'
export default function Profile(props: {
  playerName: string;
  imageName: any;
  profileLink: string;
  games: any;
  setUserId?: any;
  setUserTwoId?: any;
  isUserOne: boolean;
  btnText: string;
  personastate: number;
}) {
  const myLoader = (src: any) => {
    return `${src.src}`;
  };

  return (
    <div className={styles.profileWrapper}>
      {props.isUserOne ? (
        <button
          className={styles.backButton}
          onClick={() => {
            props.setUserId("");
          }}
        >
          <BiChevronsLeft />
          {props.btnText}
        </button>
      ) : (
        <button
          className={styles.backButton}
          onClick={() => {
            props.setUserTwoId("");
          }}
        >
          <BiChevronsLeft />
          {props.btnText}
        </button>
      )}
      <div className={styles.user}>
        {props.imageName && (
          <a
            title={"Go to" + props.playerName + ""}
            href={props.profileLink}
            target="_blank"
            rel="noreferrer"
            className={`${styles.profilePicture} ${
              styles[props.personastate !== 0 ? "online" : "offline"]
            }`}
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
      </div>
      <div className={styles.gamesContainer}>
        {props.games.games
          ? props.games.games.map(
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
            )
          : (
            <div className={styles.noGames}>
              <GiOpenChest/>
              Looks like there is nothing here..
            </div>
          )}
      </div>
    </div>
  );
}
