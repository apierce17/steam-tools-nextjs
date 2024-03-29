import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/components/friendsList.module.css";
import { TbMoodEmpty } from "react-icons/tb";
import Image from "next/image";
import { Key, SetStateAction, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SearchBar from "./searchInput";
import { useForm } from "react-hook-form";
export default function FriendsList(props: {
  friends: any;
  setUserTwoId: any;
  show: boolean;
}) {
  const [friends, setFriends] = useState<any>([]);
  const [loadingFriends, setLoadingFriends] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const myLoader = (src: any) => {
    return `${src.src}`;
  };
  const fetchUser = async (userId: string, idx: number) => {
    const response = await fetch(
      "/api/steam/user/" + userId + "?getfriends=false&getgames=false&delay=" + idx
    );
    const data = await response.json();
    return data.user;
  };

  useEffect(() => {
    setLoadingFriends(true);
    const responseData = async () => {
      return Promise.all(
        props.friends.map((friend: { steamid: string }, idx: number) => {
          return fetchUser(friend.steamid, idx * 15);
        })
      );
    };

    if(friends.length > 0) {
      setLoadingFriends(false);
    } else {
    responseData()
      .then((res) => {
        setFriends(
          res.sort((a, b) => {
            return b.personastate - a.personastate;
          })
        );
        console.log(res)
        console.log(friends)
        setLoadingFriends(false);
      })
      .catch((err) => {
        setLoadingFriends(false);
      });
    }
  }, [props.friends, friends]);

  const onSubmit = async (data: any) => {
    const user = await fetchUser(data.SearchValue, 0);
    props.setUserTwoId(user.steamid);
  };

  return (
    <div className={`${styles.wrapper} ${styles[props.show ? 'show' : 'hide']}`}>
      <form
        onSubmit={
          handleSubmit(onSubmit)
        }
      >
        <SearchBar register={{ ...register("SearchValue") }} />
      </form>
      <h2>Friends</h2>
      <div className={styles.friendsContainer}>
        {loadingFriends && (
          <Skeleton
            baseColor="var(--dark-blue-glass)"
            highlightColor="var(--steam-blue)"
            count={6}
            height="60px"
            style={{ margin: "6px 0" }}
          />
        )}
        <ul>
          {!loadingFriends && friends.length > 0
            ? friends.map(
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
                        title={"Go to " + friend.personaname + "'s profile"}
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
              )
            : !loadingFriends && (
                <li className={styles.noFriends}>
                  <TbMoodEmpty />
                  No friends found..
                  <br />
                  Try searching instead
                </li>
              )}
        </ul>
      </div>
    </div>
  );
}
