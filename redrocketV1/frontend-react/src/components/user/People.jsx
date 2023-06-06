import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { UserList } from "./UserList";

export const People = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState();
  const [more, setMore] = useState(true);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null); // Agrega estado para el usuario logueado

  useEffect(() => {
    getUsers();
    // Obtén el usuario logueado y guárdalo en el estado
    const user = localStorage.getItem("userId");
    const savedFollowing = localStorage.getItem("following");
    setLoggedInUser(user);

    // Si hay un estado guardado en el localStorage, cargarlo en el estado inicial
    if (savedFollowing) {
      setFollowing(JSON.parse(savedFollowing));
    }
  }, []);

  const getUsers = async () => {
    setLoading(true);

    const request = await fetch(Global.url + "user/list/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await request.json();
    setUsers(data);
    console.log(data);
    

    if (data.users && data.status === "success") {
      let newUsers = data.users;

      if (users.length >= 1) {
        newUsers = [...users, ...data.users];
      }

      setUsers(newUsers);
      setFollowing(data.user_following);
      setLoading(false);

      if (users.length >= data.total - data.users.length) {
        setMore(false);
      }
    }
  };

  const filteredUsers = users.filter((user) => user.id !== loggedInUser); // Filtra al usuario logueado
  console.log(following)
  
  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Gente</h1>
      </header>

      <UserList
        users={filteredUsers}
        getUsers={getUsers}
        following={following}
        setFollowing={setFollowing}
      />

      <p></p>
    </>
  );
  
};
