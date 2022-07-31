import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/components/profile.module.css";

import Image from "next/image";
import { Key, useEffect, useState } from "react";

export default function FriendsList(props: { friends: any, setUserTwoId: any }) {
  const [friends, setFriends] = useState<any>([]);
  const myLoader = (src: any) => {
    return `${src.src}`;
  };

  const fetchUser = async (userId: string) => {
    const response = await fetch(
      "/api/steam/user/" + userId + "?getfriends=false&getgames=false"
    );
    const data = await response.json();
    return data.user;
  };

  useEffect(() => {
    const responseData = async () => {
      return Promise.all(
        props.friends.map((friend: { steamid: string }) => {
          return fetchUser(friend.steamid);
        })
      );
    };

    responseData()
      .then((res) => {
        return setFriends(res);
      })
      .catch((err) => {
        console.error("err", err);
      });
  }, [props.friends]);

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.gamesContainer}>
        <ul>
          {friends.length > 0 && friends.map(
            (
              friend: { steamid: string; avatar: string; personaname: string },
              idx: Key
            ) => {
              return (
                <li key={idx}>
                  <div className={styles.pfpWrapper}>
                    <Image
                      loader={myLoader}
                      src={friend.avatar}
                      width={100}
                      height={100}
                      alt={friend.personaname + " profile picture"}
                      unoptimized={true}
                    />
                  </div>
                  <p>{friend.personaname}</p>
                  <button onClick={() => props.setUserTwoId(friend.steamid)}>Compare</button>
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
}
