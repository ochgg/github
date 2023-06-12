import React, { useEffect, useState } from "react";
import avatar from "../../assets/img/user.png";
import { Link, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ReactTimeAgo from "react-time-ago";
import { Global } from "../../helpers/Global";
import { UserList } from "../user/UserList";
import { Profile } from "../user/Profile";

export const Feed = () => {
  const { auth } = useAuth();
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [publications, setPublications] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetchUsers();
    getPublications(auth.id);
  }, [user.id]);

  const fetchUsers = async (userId) => {
    try {
      const response = await fetch(Global.url + "user/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.status === "success") {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getPublications = async (userId) => {
    const url = Global.url + `user/publications/feed/${userId}`;
    console.log("URL:", url);

    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      const request = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await request.json();
      console.log(data);
      if (data.status === "success") {
        console.log("Data:", data);

        setPublications(data.publications);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <header className="content__header">
        <h2 className="content__title">Publicaciones de mis seguidores</h2>
      </header>

      <div className="content__posts">
        {publications.map((publications) => (
          <div className="posts__post" key={publications.id}>
            <div className="post__container">
              <div>
                <div className="post__image-user">
                <Link
                      to={"/social/perfil/" + publications.user_id} className="post__image-link">
                    <img
                      src={publications.image}
                      className="post__user-image"
                      alt="Foto de perfil"
                    />
                  </Link>
                </div>
              </div>
              <div className="post__body">
                <div className="post__user-info">
                <Link
                      to={"/social/perfil/" + publications.user_id} className="user-info__name">
                    {publications.name + " " + publications.surname}
                  </Link>
                  <span className="user-info__divider"> | </span>
                  <ReactTimeAgo date={publications.created_at} />
                </div>

                <h4 className="post__content">{publications.text}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
