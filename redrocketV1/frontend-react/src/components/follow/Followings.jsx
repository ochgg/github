import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { UserList } from "../user/UserList";
import { useParams } from "react-router-dom";
import { getProfile } from "../../helpers/getProfile";


export const Following = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [following, setFollowing] = useState([]);
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
      const request = await fetch(Global.url + 'user/follow/following/' + userId, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const data = await request.json();
      console.log(data);

    

      if (data.status === "success" && data.following) {
        let newUsers = data.followers;

        if (users.length >= 1) {
          newUsers = [...users, ...data.followers];
        }

        

        setUsers(newUsers);
        setFollowing(data.user_following);
        setLoading(false);

        if (users.length >= data.total - data.followers.length) {
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
        <h1 className="content__title">Usuarios que sigue {userProfile.name} {userProfile.surname}</h1>
      </header>

      <UserList
        users={users}
        getUsers={getUsers}
        following={following}
        setFollowing={setFollowing}
        page={page}
        setPage={setPage}
        more={more}
        loading={loading}
      />

      <p></p>
    </>
  );
};
