import React from "react";
import avatar from "../../assets/img/user.png";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";

export const UserList = ({ users, getUsers, following, setFollowing, page, setPage, more, loading }) => {
  const { auth } = useAuth();

  const nextPage = () => {
    let next = page + 1;
    setPage(next);
    getUsers(next);
  };
  

  const follow = async (userId) => {
    //Peticion al backend para guardar seguidor
    const request = await fetch(Global.url + "follow/save", {
      method: "POST",
      body: JSON.stringify({ followed: userId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await request.json();

    //cuando todo este correcto
    if (data.status == "success") {
    }
    //Actualizar estado de following, agregar seguidor
    setFollowing([...following, userId]);
  };

  const unfollow = async (userId) => {
    //Peticion al backend para dejar de seguir
    const request = await fetch(Global.url + "follow/unfollow/", +userId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await request.json();

    //cuando todo este correcto
    if (data.status == "success") {
      //Actualizar estado de following, dejar de seguir
      let filterFollowing = following.filter(
        (followingUserId) => userId !== followingUserId
      );
      setFollowing(filterFollowing);
    }
  };

  return (
    <>
      <div className="content__posts">
        {users.map((user) => {
          return (
            <article className="posts__post" key={user._id}>
              <div className="post__container">
                <div className="post__image-user">
                  <a href="#" className="post__image-link">
                    {user.image != "defaul.png" && (
                      <img
                        src={Global.url + "user/avatar/" + user.image}
                        className="post__user-image"
                        alt="Foto de perfil"
                      />
                    )}
                    {user.image == "defaul.png" && (
                      <img
                        src={avatar}
                        className="post__user-image"
                        alt="Foto de perfil"
                      />
                    )}
                  </a>
                </div>

                <div className="post__body">
                  <div className="post__user-info">
                    <a href="#" className="user-info__name">
                      {user.name} {user.surname}
                    </a>
                    <span className="user-info__divider"> | </span>
                    <a href="#" className="user-info__create-date">
                      {user.created_at}
                    </a>
                  </div>

                  <h4 className="post__content">{user.conocimiento_extra} </h4>
                </div>
              </div>

              {user.id != auth.id && (
                <div className="post__buttons">
                  {!following.includes(user.id) && (
                    <button
                      className="post__button post_button--gren"
                      onClick={() => follow(user.id)}
                    >
                      Seguir
                    </button>
                  )}

                  {following.includes(user.id) && (
                    <button
                      className="post__button"
                      onClick={() => unfollow(user.id)}
                    >
                      Dejar de seguir
                    </button>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>

      {loading ? <div>Cargando...</div> : ""}

      {more && (
        <div className="content__container-btn">
          <button className="content__btn-more-post" onClick={nextPage}>
            Ver mas personas
          </button>
        </div>
      )}
    </>
  );
};
