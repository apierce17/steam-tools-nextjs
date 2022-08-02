import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/components/profile.module.css";

import Image from "next/image";
import { Key, useEffect, useState } from "react";

export default function FriendsList(props: { friends: any, setUserTwoId: any }) {
  const [friends, setFriends] = useState<any>([]);
  const [userId, setUserId] = useState('')
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

  const formSubmit = async (e: any) => {
    e.preventDefault(); 
    const user = await fetchUser(userId);
    console.log(user)
    props.setUserTwoId(user.steamid)
  }

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.gamesContainer}>
        <form onSubmit={(e) => { formSubmit(e) }}>
          <input type='text' name="userId" title="userId" onChange={e => setUserId(e.target.value)} /><button>dsa</button>
        </form>
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
