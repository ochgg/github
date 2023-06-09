import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { UserList } from "../user/UserList";
import { useParams } from "react-router-dom";
import { getProfile } from "../../helpers/getProfile";

export const Followers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [followed, setFollowed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({});

  const params = useParams();

  useEffect(() => {
    getUsers(1);
    getProfile(params.userId, setUserProfile);
  }, []);

  const getUsers = async () => {
    setLoading(true);
    const userId = params.userId;

    try {
      const request = await fetch(Global.url + 'user/follow/followers/' + userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      const data = await request.json();
      console.log(data);

      if (data.status === "success" && data.followingUsers) {
        setUsers(prevUsers => {
          let newUsers = data.followingUsers;

          if (prevUsers.length >= 1) {
            newUsers = [...prevUsers, ...data.followingUsers];
          }

          return newUsers;
        });
        setFollowed(data.user_followed);
        setLoading(false);

        if (users.length >= data.total - data.followingUsers.length) {
          setMore(false);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      // Manejar el error adecuadamente
    }
  };

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Seguidores de {userProfile.name} {userProfile.surname}</h1>
      </header>

      <UserList
        users={users}
        getUsers={getUsers}
        followed={followed}
        setFollowed={setFollowed}
        page={page}
        setPage={setPage}
        more={more}
        loading={loading}
        showFollowButton={true}
      />

      <p></p>
    </>
  );
};
