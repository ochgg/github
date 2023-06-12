import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Global } from "../../helpers/Global";
import avatar from "../../assets/img/user.png";

export const Config = () => {
  const { auth, setAuth } = useAuth();

  const [saved, setSaved] = useState("not_saved");

  const updateUser = async (e) => {
    e.preventDefault();

    // Recoger datos del formulario
    const formData = new FormData(e.target);
    const newDataUser = Object.fromEntries(formData.entries());
    console.log(newDataUser);

    // Token de autenticacion
    const token = localStorage.getItem("token");

    // Actualizar user en la BD
    const request = await fetch(`${Global.url}user/update/${auth.id}`, {
      method: "PUT",
      body: JSON.stringify(newDataUser),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await request.json();

    if (data.message === "Perfil actualizado correctamente.") {
      setAuth({ ...auth, ...newDataUser });
      setSaved("saved");
    } else {
      setSaved("error");
    }
  };

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Ajustes</h1>
      </header>

      <div className="content__posts">
        {saved === "saved" && (
          <strong className="alert alert-success">
            Usuario actualizado correctamente
          </strong>
        )}

        {saved === "error" && (
          <strong className="alert alert-danger">
            Usuario no se ha actualizado
          </strong>
        )}

        <form className="config-form" onSubmit={updateUser}>
          <div className="form-group">
            <label htmlFor="name">Nombres:</label>
            <input
              type="text"
              name="name"
              defaultValue={auth.name}
            />
          </div>

          <div className="form-group">
            <label htmlFor="surname">Apellidos:</label>
            <input
              type="text"
              name="surname"
              defaultValue={auth.surname}
            />
          </div>

          <div className="form-group">
            <label htmlFor="nick">Nick:</label>
            <input
              type="text"
              name="nick"
              defaultValue={auth.nick}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              defaultValue={auth.email}
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">Ciudad:</label>
            <input
              type="text"
              name="city"
              defaultValue={auth.city}
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Pais de Residencia:</label>
            <input
              type="text"
              name="country"
              defaultValue={auth.country}
            />
          </div>

          <div className="form-group">
            <label htmlFor="edad">Edad:</label>
            <input
              type="text"
              name="edad"
              defaultValue={auth.edad}
            />
          </div>

          <div className="form-group">
            <label htmlFor="estudios">Estudios y certificaciones:</label>
            <input
              type="text"
              name="estudios"
              defaultValue={auth.estudios}
            />
          </div>

          <div className="form-group">
            <label htmlFor="idiomas">Idiomas:</label>
            <input
              type="text"
              name="idiomas"
              defaultValue={auth.idiomas}
            />
          </div>

          <div className="form-group">
            <label htmlFor="linkedin">Url linkedin:</label>
            <input
              type="text"
              name="linkedin"
              defaultValue={auth.linkedin}
            />
          </div>

          <div className="form-group">
            <label htmlFor="hobbies">Hobbies:</label>
            <input
              type="text"
              name="hobbies"
              defaultValue={auth.hobbies}
            />
          </div>

          <div className="form-group">
            <label htmlFor="conocimiento_extra">Conocimientos Extras:</label>
            <textarea
              name="conocimiento_extra"
              defaultValue={auth.conocimiento_extra}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="image">Foto perfil:</label>
            <input
              type="text"
              name="image"
              defaultValue={auth.image}
            />
          </div>
          <div className="container">
          <input type="submit" value="Actualizar" className="btn btn-success" />
          </div>
        </form>
        <p></p>
      </div>
    </>
  );
};
