import React, { useEffect, useState } from "react";
import avatar from "../../assets/img/user.png";
import { Link, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ReactTimeAgo from "react-time-ago";
import { Global } from "../../helpers/Global";
import { UserList } from "../user/UserList";

export const Feed = () => {
  const { auth } = useAuth();
  const [publications, setPublications] = useState([]);
  const params = useParams();

  useEffect(() => {
    getPublications();
  }, []);

  const getPublications = async (userId) => {
    try {
      const request = await fetch(Global.url + `user/publications/feed/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await request.json();
      console.log(data);
      if (data.status === "success") {
        setPublications(data.publications);
      }
    } catch (error) {
      console.error("Error:", error);
      // Manejar el error adecuadamente
    }
  };

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Timeline</h1>
        <button className="content__button">Mostrar nuevas</button>
      </header>

      <div className="content__posts">
        {publications.map((publication) => (
          <div className="posts__post" key={publication.id}>
            <div className="post__container">
              <div className="post__image-user">
                <a href="#" className="post__image-link">
                  <img
                    src={avatar}
                    className="post__user-image"
                    alt="Foto de perfil"
                  />
                </a>
              </div>

              <div className="post__body">
                <div className="post__user-info">
                  <a href="#" className="user-info__name">
                    {publication.username}
                  </a>
                  <span className="user-info__divider"> | </span>
                  <ReactTimeAgo date={publication.createdAt} />
                </div>

                <h4 className="post__content">{publication.content}</h4>
              </div>
            </div>

            <div className="post__buttons">
              <a href="#" className="post__button">
                <i className="fa-solid fa-trash-can"></i>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="content__container-btn">
        <button className="content__btn-more-post">
          Ver más publicaciones
        </button>
      </div>
    </>
  );
};
