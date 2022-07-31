import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import FriendsList from "../components/modules/friendsList";
import Profile from "../components/modules/profile";
import styles from "../styles/pages/Home.module.css";

Compare.title = "Compare -";
export default function Compare() {
  const [userId, setUserId] = useState("");
  const [userOne, setUserOne] = useState<any>([]);
  const [userTwo, setUserTwo] = useState<any>([]);
  const [userTwoId, setUserTwoId] = useState("");

  const fetchUserOne = async () => {
    const response = await fetch(
      "/api/steam/user/" + userId + "?getfriends=true&getgames=true"
    );
    const data = await response.json();
    setUserOne(data);
    console.log(data);
  };

  useEffect(() => {
    const fetchUserTwo = async () => {
      const response = await fetch(
        "/api/steam/user/" + userTwoId + "?getfriends=true&getgames=true"
      );
      const data = await response.json();
      setUserTwo(data);
      console.log(data);
    };
    fetchUserTwo();
  }, [userTwoId]);

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
          />

          {!userTwo.user && (
            <FriendsList
              friends={userOne.friends}
              setUserTwoId={setUserTwoId}
            />
          )}
          {userTwo.user && (
            <Profile
              playerName={userTwo.user.personaname}
              imageName={userTwo.user.avatarfull}
              profileLink={userTwo.user.profileurl}
              games={userTwo.games}
            />
          )}
        </>
      )}
    </>
  );
}
