import React, { useEffect, useState } from "react";
import { Global } from '../../helpers/Global';
import avatar from "../../assets/img/user.png";
import { Link } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import ReactTimeAgo from "react-time-ago";
import { Profile } from "../user/Profile";

export const PublicationsList = ({ publications, getPublications }) => {
  const { auth } = useAuth();
  const [user, setUser] = useState({});

  const deletePublications = async (publicationsId) => {
    const request = await fetch(
      Global.url + "user/publications/remove/" + publicationsId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const data = await request.json();
    if (data.status === "success") getPublications(true);
  };

  return (
    <>
      <div className="content__posts">
        {publications.map((publication) => {
          return (
            <article className="posts__post" key={publications.id}>
              <div className="post__container">
                <div>
                  <div className="post__image-user">
                    <Link
                      to={"/social/perfil/publications/" + publication.user.id}
                      className="post__image-link"
                    >
                      {publication.user.image !== "default.png" ? (
                        <img
                          src={publication.user.image}
                          className="post__user-image"
                          alt="Foto de perfil"
                        />
                      ) : (
                        <img
                          src={avatar}
                          className="post__user-image"
                          alt="Foto de perfil"
                        />
                      )}
                    </Link>
                  </div>
                </div>
                <div className="post__body">
                  <div className="post__user-info">
                    <a href="#" className="user-info__name">
                      {publication.user.name + " " + publication.user.surname}
                    </a>
                    <span className="user-info__divider"> | </span>
                    <a href="#" className="user-info__create-date">
                      <ReactTimeAgo
                        date={publication.created_at}
                        locale="es-Es"
                      />
                    </a>
                  </div>
                  <h4 className="post__content">{publication.text}</h4>
                </div>
              </div>
              {auth.id === publication.user.id && (
                <div className="post__buttons">
                  <button
                    onClick={() => deletePublications(publication.id)}
                    className="post__button"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </>
  );
};
