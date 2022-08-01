import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { prependOnceListener } from "process";
import { Key, useEffect, useState } from "react";
import FriendsList from "../components/modules/friendsList";
import MutualGames from "../components/modules/mutualGames";
import Profile from "../components/modules/profile";
import styles from "../styles/pages/Home.module.css";

Compare.title = "Compare -";
export default function Compare() {
  const [userId, setUserId] = useState("");
  const [userOne, setUserOne] = useState<any>([]);
  const [userOneGameIds, setUserOneGameIds] = useState<any>([]);
  const [userTwo, setUserTwo] = useState<any>([]);
  const [userTwoId, setUserTwoId] = useState("");
  const [userTwoGameIds, setUserTwoGameIds] = useState<any>([]);
  const [matchedGames, setMatchedGames] = useState([]);

  const fetchUserOne = async () => {
    const response = await fetch(
      "/api/steam/user/" + userId + "?getfriends=true&getgames=true"
    );
    const data = await response.json();
    setUserOne(data);
    data.games.games && data.games.games.map((game: any) => userOneGameIds.push(game.appid))
    console.log(data);
  };

  useEffect(() => {
    const fetchUserTwo = async () => {
      const response = await fetch(
        "/api/steam/user/" + userTwoId + "?getfriends=true&getgames=true"
      );
      const data = await response.json();
      setUserTwo(data);
      data.games.games && data.games.games.map((game: any) => userTwoGameIds.push(game.appid))
      console.log(data);
    };
    fetchUserTwo();
  }, [userTwoId]);

  useEffect(() => {
    userTwo.games && setMatchedGames(userOneGameIds.filter((element: any) => userTwoGameIds.includes(element)));
  }, [userTwo.games])

  useEffect(() => {
    userId == '' && (setUserOne(''), setUserOneGameIds([]), setMatchedGames([]), setUserTwoId('') ,setUserTwo(''), setUserTwoGameIds([]), setMatchedGames([]))
  }, [userId])

  useEffect(() => {
    userTwoId == '' && (setUserTwo(''), setUserTwoGameIds([]), setMatchedGames([]))
  }, [userTwoId])

  console.log(matchedGames)
  return (
    <>
      {!userOne.user && (
        <>
          <input
            title="userId"
            type="text"
            name="userId"
            onChange={(e) => setUserId(e.target.value)}
          />
          <button onClick={() => fetchUserOne()}>dsa</button>
        </>
      )}
      {userOne.user && (
        <>
          <Profile
            playerName={userOne.user.personaname}
            imageName={userOne.user.avatarfull}
            profileLink={userOne.user.profileurl}
            games={userOne.games}
            isUserOne={true}
            setUserId={setUserId}
          />

          {!userTwoId && (
            <FriendsList
              friends={userOne.friends}
              setUserTwoId={setUserTwoId}
            />
          )}
          {userTwoId && userTwo.user && (
            <>
              <Profile
                playerName={userTwo.user.personaname}
                imageName={userTwo.user.avatarfull}
                profileLink={userTwo.user.profileurl}
                games={userTwo.games}
                isUserOne={false}
                setUserTwoId={setUserTwoId}
              />
              <MutualGames games={matchedGames} />
            </>
          )}
        </>
      )}
    </>
  );
}
