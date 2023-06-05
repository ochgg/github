import React, { useState } from "react";
import avatar from "../../assets/img/user.png";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export const UserList = ({
  users,
  getUsers,
  following,
  setFollowing,
  page,
  setPage,
  more,
  loading,
}) => {
  const { auth } = useAuth();
  const [loadingFollow, setLoadingFollow] = useState(false);

  const nextPage = () => {
    let next = page + 1;
    setPage(next);
    getUsers(next);
  };
  
  // const follow = async (userId) => {
  //   const request = await fetch(Global.url + "user/follow/", {
  //     method: "POST",
  //     body: JSON.stringify({ followed: userId }),
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: localStorage.getItem("token"),
  //     },
  //   });

  //   const data = await request.json();

  //   //Cuando todo este corectocto
  //   if (data.status === "success") {

  //   //Actualizar estado de follored, agregando un nuevo follwd
  //     setFollowed([...followed, userId]);
  //   }
  // };

  const follow = async (userId) => {
      const request = await fetch(Global.url + `user/follow/${userId}`, {
        method: 'POST',
        body: JSON.stringify({ followed: userId }),
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

        let filterFollowings = following.filter((followingUserId) => userId !== followingUserId);
         setFollowing(filterFollowings);
  
        // Actualizar el almacenamiento local
        // localStorage.setItem('following', JSON.stringify(filterFollowings));
      }
    } 
  

  return (

    <>
      <div className="content__posts">
        {users.map((user) => (
          <article className="posts__post" key={user.id}>

            <div className="post__container">
              
              <div className="post__image-user">
              <Link to={"/social/perfil/"+user.id} className="post__image-link">
                  {user.image !== "defaul.png" ? (
                    <img src={user.image} className="post__user-image" alt="Foto de perfil" />
                  ) : (
                    <img src={avatar} className="post__user-image" alt="Foto de perfil" />
                  )}
              </Link>
              </div>

              <div className="post__body">
                <div className="post__user-info">
                <Link to={"/social/perfil/"+user.id} className="user-info__name">
                    {user.name} {user.surname}
                </Link>
                  <span className="user-info__divider"> | </span>
                  <Link to={"/social/perfil/"+user.id} className="user-info__create-date">
                    {user.created_at}
                  </Link>
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
                    onClick={() => follow(user.id)}
                  >
                    Seguir
                  </button>
                ) : (
                  <button
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

  )};
