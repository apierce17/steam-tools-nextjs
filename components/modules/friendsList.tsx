import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/components/friendsList.module.css";

import Image from "next/image";
import { Key, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function FriendsList(props: {
  friends: any;
  setUserTwoId: any;
}) {
  const [friends, setFriends] = useState<any>([]);
  const [userId, setUserId] = useState("");
  const [loadingFriends, setLoadingFriends] = useState(true);
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
    setLoadingFriends(true);
    const responseData = async () => {
      return Promise.all(
        props.friends.map((friend: { steamid: string }) => {
          return fetchUser(friend.steamid);
        })
      );
    };

    responseData()
      .then((res) => {
        setFriends(
          res.sort((a, b) => {
            return b.personastate - a.personastate;
          })
        );
        setLoadingFriends(false)
      })
      .catch((err) => {
        console.error("err", err);
      });
  }, [props.friends]);

  const formSubmit = async (e: any) => {
    e.preventDefault();
    const user = await fetchUser(userId);
    console.log(user);
    props.setUserTwoId(user.steamid);
  };

  return (
    <div className={styles.wrapper}>
      <h2>Second User</h2>
      <form
        onSubmit={(e) => {
          formSubmit(e);
        }}
      >
        <input
          type="text"
          name="userId"
          title="userId"
          onChange={(e) => setUserId(e.target.value)}
        />
        <button>dsa</button>
      </form>
      <div className={styles.friendsContainer}>
        {loadingFriends &&  <Skeleton
          baseColor="var(--dark-blue-glass)"
          highlightColor="var(--steam-blue)"
          count={6}
          height="60px"
          style={{ margin: "6px 0" }}
        />}
        <ul>
          {friends.length > 0 &&
            friends.map(
              (
                friend: {
                  steamid: string;
                  avatarfull: string;
                  personaname: string;
                  personastate: number;
                  profileurl: string;
                },
                idx: Key
              ) => {
                const userState =
                  friend.personastate !== 0 ? "online" : "offline";
                return (
                  <li key={idx} className={styles[userState]}>
                    <a
                      href={friend.profileurl}
                      target="_blank"
                      className={`${styles.pfpWrapper}`}
                      rel="noreferrer"
                    >
                      <Image
                        loader={myLoader}
                        src={friend.avatarfull}
                        layout="fixed"
                        width={60}
                        height={60}
                        alt={friend.personaname + " profile picture"}
                        unoptimized={true}
                      />
                    </a>
                    <span className={`${styles.statusBar}`} />
                    <p>{friend.personaname}</p>
                    <button
                      className="greenButton"
                      onClick={() => props.setUserTwoId(friend.steamid)}
                    >
                      Compare
                    </button>
                  </li>
                );
              }
            )}
        </ul>
      </div>
    </div>
  );
}
