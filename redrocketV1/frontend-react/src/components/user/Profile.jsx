import React, { useEffect, useState } from "react";
import avatar from "../../assets/img/user.png";
import { getProfile } from "../../helpers/getProfile";
import { Link, useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";

export const Profile = () => {
  const { auth } = useAuth();
  const [user, setUser] = useState({});
  const [counters, setCounters] = useState({});
  const [publications, setPublications] = useState([]);
  const [iFollow, setIFollow] = useState(false);
  const params = useParams();

  useEffect(() => {
    getDataUser();
    getCounters();
    getPublications();
  }, []);

  useEffect(() => {
    getDataUser();
    getCounters();
    getPublications();
  }, [params]);

  const getDataUser = async () => {
    let dataUser = await getProfile(params.userId, setUser);
    console.log(dataUser);
    if (dataUser.following && dataUser.following.id) setIFollow(true);
  };

  const getCounters = async () => {
    const request = await fetch(Global.url + "user/counters/" + params.userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await request.json();
    console.log(data);
    if (data.counters) {
      setCounters(data.counters);
    }
  };

  const follow = async (userId) => {
    const request = await fetch(Global.url + `user/follow/${userId}`, {
      method: "POST",
      body: JSON.stringify({ followed: userId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await request.json();
    console.log(data);

    if (data.status == "success") {
      setIFollow(true);
    }
  };

  const unfollow = async (userId) => {
    const request = await fetch(Global.url + "user/unfollow/" + userId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await request.json();

    if (data.message === "success") {
      setIFollow(false);
    }
  };

  const getPublications = async (userId) => {
    const request = await fetch(
      Global.url + "user/publications/" + params.userId + "/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const data = await request.json();

    if (data.status == "success") {
      setPublications(data.publications);
    }
  };


  const deletePublications = async(publicationsId) => {
    const request = await fetch(Global.url + "user/publications/remove/" + publicationsId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });

    const data = await request.json();
      if (data.status == "success") 
    getPublications(true);
  };



  return (
    <>
      <header className="aside__profile-info">
        <div className="profile-info__general-info">
          <div className="general-info__container-avatar">
            <img
              src={user.image}
              className="container-avatar__img"
              alt="Foto de perfil"
            />
          </div>

          <div className="general-info__container-names">
            <div className="container-names__name">
              <h1>
                {user.name} {user.surname}
              </h1>

              {user.id != auth.id &&
                (iFollow ? (
                  <button className="content__button content__button--right post__button">
                    Dejar de seguir
                  </button>
                ) : (
                  <button className="content__button content__button--right">
                    Seguir
                  </button>
                ))}
            </div>
            <h2 className="container-names__nickname">{user.nick}</h2>
            <p>{user.conocimiento_extra}</p>
          </div>
        </div>

        <div className="profile-info__stats">
          <div className="stats__following">
            <Link
              to={"/social/siguiendo/" + user.id}
              className="following__link"
            >
              <span className="following__title">Siguiendo</span>
              <span className="following__number">{counters.following}</span>
            </Link>
          </div>
          <div className="stats__following">
            <Link
              to={"/social/siguidores/" + user.id}
              className="following__link"
            >
              <span className="following__title">Seguidores</span>
              <span className="following__number">{counters.followed}</span>
            </Link>
          </div>

          <div className="stats__following">
            <Link to={"/social/perfil/" + user.id} className="following__link">
              <span className="following__title">Publicaciones</span>
              <span className="following__number">{counters.publications}</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="content__posts">
        {publications.map((publications) => {
          return (
            <article className="posts__post">
              <div className="post__container">
                <div className="post__image-user">
                  <Link
                    to={"/social/perfil/publications/" + user.id}
                    className="post__image-link"
                  >
                    {user.image !== "defaul.png" ? (
                      <img
                        src={user.image}
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

                <div className="post__body">
                  <div className="post__user-info">
                    <a href="#" className="user-info__name">
                      {user.name + " " + user.surname}
                    </a>
                    <span className="user-info__divider"> | </span>
                    <a href="#" className="user-info__create-date">
                      {publications.created_at}
                    </a>
                  </div>

                  <h4 className="post__content">{publications.text}</h4>
                </div>
              </div>

              {auth.id == user.id && (
                <div className="post__buttons">

                  <button onClick={() => deletePublications(publications.id)} className="post__button">
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* <div className="content__container-btn">
        <button className="content__btn-more-post">
          Ver mas publicaciones
        </button>
      </div> */}
    </>
  );
};
