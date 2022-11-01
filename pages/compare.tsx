import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FriendsList from "../components/modules/friendsList";
import MutualGames from "../components/modules/mutualGames";
import Profile from "../components/modules/profile";
import SearchBar from "../components/modules/searchInput";
import styles from "../styles/Compare.module.css";
import {MdError} from 'react-icons/md'
import { NextSeo } from "next-seo";
import { event } from "nextjs-google-analytics";

export default function Compare() {
  const [userId, setUserId] = useState("");
  const [userOne, setUserOne] = useState<any>([]);
  const [userOneGameIds, setUserOneGameIds] = useState<any>([]);
  const [userTwo, setUserTwo] = useState<any>([]);
  const [userTwoId, setUserTwoId] = useState("");
  const [userTwoGameIds, setUserTwoGameIds] = useState<any>([]);
  const [matchedGames, setMatchedGames] = useState([]);
  const [isError, setIsError] = useState(false)

  const fetchUserOne = async (userId: string) => {
    const response = await fetch(
      "/api/steam/user/" + userId + "?getfriends=true&getgames=true"
    );
    const data = await response.json();
    return data;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchUserTwo = async () => {
      const response = await fetch(
        "/api/steam/user/" + userTwoId + "?getfriends=false&getgames=true"
      );
      const data = await response.json();
      setUserTwo(data);
      data.games.games &&
        data.games.games.map((game: any) => userTwoGameIds.push(game.appid));
    };
    userTwoId != '' && fetchUserTwo();
  }, [userTwoGameIds, userTwoId]);

  useEffect(() => {
    userTwo.games &&
      setMatchedGames(
        userOneGameIds.filter((element: any) =>
          userTwoGameIds.includes(element)
        )
      );
  }, [userOneGameIds, userTwo.games, userTwoGameIds]);

  useEffect(() => {
    userId == "" &&
      (setUserOne(""),
      setUserOneGameIds([]),
      setMatchedGames([]),
      setUserTwoId(""),
      setUserTwo(""),
      setUserTwoGameIds([]),
      setMatchedGames([]));
  }, [userId]);

  useEffect(() => {
    userTwoId == "" &&
      (setUserTwo(""), setUserTwoGameIds([]), setMatchedGames([]));
  }, [userTwoId]);
  
  const onSubmit = (data: any) => {
    event("P1_Search", {
      category: "Search",
      label: data.SearchValue,
    });
    fetchUserOne(data.SearchValue)
    .then(res => {
      setUserOne(res);
      res.games.games &&
      res.games.games.map((game: any) => userOneGameIds.push(game.appid));
      setUserId(res.user.steamid);
    })
    .catch(() => setIsError(true))
  };

  console.log(userTwoId)
  return (
    <>
      <NextSeo
        title="Compare"
        description="A place with cool features for Steam! Find mutual games with friends on Steam for starters!"
      />
      <div className={styles.compareWrapper}>
        {!userOne.user && (
          <div className={styles.searchBar}>
            <h1>Enter your Steam ID or Vanity URL to get started!</h1>
            <form onSubmit={handleSubmit(onSubmit)} onChange={() => setIsError(false)}>
              <SearchBar register={{ ...register("SearchValue", { required: true })}} />
              {errors.SearchValue && <span className="inputError"> <MdError/> This field is required</span>}
              {isError && <span className="inputError"> <MdError/> User not found!</span>}
            </form>
          </div>
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
              btnText="Clear Users"
              personastate={userOne.user.personastate}
            />

            {userOne && (
              <FriendsList
                friends={userOne.friends}
                setUserTwoId={setUserTwoId}
                show={userTwoId === '' ? true : false}
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
                  btnText="Friends List"
                  personastate={userTwo.user.personastate}
                />
                <MutualGames games={matchedGames} />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
