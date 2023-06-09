import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Global } from "../../helpers/Global";
import avatar from "../../assets/img/user.png";

export const ProfileUsers = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${Global.url}user/profiles/${userId}`, {
          headers: {
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener el perfil del usuario");
        }

        const data = await response.json();

        if (data.status === "success") {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (!user) {
    return <p>Cargando perfil del usuario...</p>;
  }

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Perfil de Usuario</h1>
      </header>

      <div className="content__posts">
        <div className="profile">
          <div className="profile__avatar">
            <img src={user.image || avatar} alt="Avatar" />
          </div>

          <div className="profile__details">
            <p>Nombre: {user.name}</p>
            <p>Apellidos: {user.surname}</p>
            <p>Nick: {user.nick}</p>
            <p>Email: {user.email}</p>
            <p>Ciudad: {user.city}</p>
            <p>País de Residencia: {user.country}</p>
            <p>Edad: {user.edad}</p>
            <p>Estudios y Certificaciones: {user.estudios}</p>
            <p>Idiomas: {user.idiomas}</p>
            <p>URL de LinkedIn: {user.linkedin}</p>
            <p>Hobbies: {user.hobbies}</p>
            <p>Conocimientos Extras: {user.conocimiento_extra}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileUsers;
