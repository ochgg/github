import React, { useEffect } from "react";
import avatar from "../../assets/img/user.png";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

export const UserList = ({ users, getUsers, page, setPage, more, loading, }) => {
  const { auth } = useAuth();
  const [following, setFollowing] = useState([]);

  const nextPage = () => {
    let next = page + 1;
    setPage(next);
    getUsers(next);
  };

  useEffect(() => {
    // Cargar el estado de seguimiento desde el localStorage al montar el componente
    const savedFollowing = localStorage.getItem("following");
    if (savedFollowing) {
      setFollowing(JSON.parse(savedFollowing));
    }
  }, []);

  useEffect(() => {
    // Guardar el estado de seguimiento en el localStorage cuando cambie
    localStorage.setItem("following", JSON.stringify(following));
  }, [following]);  


  const follow = async (userId, followingId) => {
    if (!userId || !followingId) {
      console.error('Los valores de userId y followedId no pueden ser nulos');
      return;
    }
  
    try {
      const request = await fetch(Global.url + `user/follow/${userId}`, {
        method: 'POST',
        body: JSON.stringify({ following: followingId }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem("token"),
        },
      });
  
      const data = await request.json();
      console.log (data)
  
       if (data.status == "success") {
      //   // Actualizar estado de followed, agregando un nuevo follow
         setFollowing([...following, userId]);
       }
    } catch (error) {
      console.error('Error:', error);
      // Manejar el error adecuadamente
    }
  };
  
  
  const unfollow = async (userId) => {
    try {
      const request = await fetch(Global.url + `user/unfollow/${userId}`, {
        method: 'DELETE',
        body: JSON.stringify({ followerId: auth.id }), // Cambiar 'following' a 'followerId'
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem("token"),
        },
      });
  
      const data = await request.json();
  
      if (data.message === 'Has dejado de seguir al usuario correctamente.') {
        const filterFollowing = following.filter((followingId) => userId !== followingId);
        setFollowing(filterFollowing);
      }
    } catch (error) {
      console.error('Error:', error);
      // Manejar el error adecuadamente
    }
  };
  
  

  return (
    <>
      <div className="content__posts">
        {users.map((user) => (
          <article className="posts__post" key={user.id}>
            <div className="post__container">
              <div className="post__image-user">
                <a href="#" className="post__image-link">
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

                <h4 className="post__content">{user.conocimiento_extra}</h4>
              </div>
            </div>

            {/* {user.id !== auth.id && (
              <div className="post__buttons">
                {!followed.includes(user._id)? (
                  <a
                    className="post__button post__button--green"
                    onClick={() => follow(user.id)}
                  >
                    Seguir
                  </a>
                ) : (
                  <a
                    className="post__button"
                    onClick={() => unfollow(user.id)}
                  >
                    Dejar de seguir
                  </a>
                )}
              </div>
            )} */}

            {/* <div className="post_buttons">
              {!following.includes(user.id) &&
              <a href="#" className="post__button post__button--green"
                onClick={() => follow(user.id)}>
                Seguir
              </a>
              }

              {following.includes(user.id) &&
                <a href="#" className="post__button"
                  onClick={() => unfollow(user.id)}>
                  Dejar de Seguir

                </a>
              }

            </div> */}

            {user.id !== auth.id && (
              <div className="post_buttons">
                {!following.includes(user.id) ? (
                  <button
                    className="post__button post__button--green"
                    onClick={() => follow(user.id, auth.id)}
                  >
                    Seguir
                  </button>
                ) : (
                  <button
                    //href="#"
                    className="post__button"
                    onClick={() => unfollow(user.id)}
                  >
                    Dejar de Seguir
                  </button>
                )}
              </div>
            )}
          </article>
        ))}
      </div>

      {/* {loading ? <div>Cargando...</div> : ""} */}

      {/* {more && (
        <div className="content__container-btn">
          <button className="content__btn-more-post" onClick={nextPage}>
            Ver más personas
          </button>
        </div>
      )} */}
    </>
  );
};