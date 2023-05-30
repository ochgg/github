import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { UserList } from "./UserList";

export const People = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [followed, setFollowed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null); // Agrega estado para el usuario logueado

  useEffect(() => {
    getUsers(1);
    // Obtén el usuario logueado y guárdalo en el estado
    const user = localStorage.getItem("userId");
    setLoggedInUser(user);
  }, []);

  // console.log(users);

  const getUsers = async (nextPage = 1) => {
    setLoading(true);

    const request = await fetch(Global.url + "user/list/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await request.json();
    console.log(data);
    setUsers(data);

    // console.log(data);

    if (data.users && data.status === "success") {
      let newUsers = data.users;

      

      if (users.length >= 1) {
        newUsers = [...users, ...data.users];
      }

      

      setUsers(newUsers);
      setFollowed(data.user_followed);
      setLoading(false);

      if (users.length >= (data.total - data.users.length)) {
        setMore(false);
      }
    }
  };

  const filteredUsers = users.filter((user) => user.id !== loggedInUser); // Filtra al usuario logueado

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Gente</h1>
      </header>

      <UserList
        users={filteredUsers} // Pasa la lista filtrada al componente UserList
        // users={users}
        getUsers={getUsers}
        followed={followed}
        setFollowed={setFollowed}
        page={page}
        setPage={setPage}
        more={more}
        loading={loading}
      />

      <p></p>
    </>
  );
};