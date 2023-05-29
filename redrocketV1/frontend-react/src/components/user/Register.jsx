import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";

export const Register = () => {
  const { form, handleChanged, resetForm } = useForm({
    name: "",
    surname: "",
    nick: "",
    email: "",
    password: "",
    city: "",
    country: "",
    edad: "",
    estudios: "",
    idiomas: "",
    linkedin: "",
    hobbies: "",
    conocimiento_extra: "",
    image: "",
  });

  const [saved, setSaved] = useState("not_sended");

  const saveUser = async (e) => {
    //Prevenir actualizacion de pantalla
    e.preventDefault();

    //recoger datos del formulario
    let newUser = form;

    // Verificar si la contraseña está presente
    if (!newUser.password) {
      console.error("La contraseña es requerida.");
      return;
    }

    //Guardar usuario en el backend
    try {
      const request = await fetch(Global.url + "user/register", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await request.json();

      if (request.ok) {
        setSaved("saved");
        resetForm();
      } else if (
        data.message ===
        "El nombre de usuario ya existe. Por favor, elige otro."
      ) {
        setSaved("username_exists");
      } else {
        setSaved("error");
      }

      console.log(data);
    } catch (error) {
      console.error("Error:", error);
      setSaved("error");
    }
  };

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Registro</h1>
      </header>

      <div className="content__posts">

        {saved === "saved" && (
          <strong className="alert alert-success">
            Usuario registrado correctamente
          </strong>
        )}

        {saved === "username_exists" && (
          <strong className="alert alert-danger">
            El nombre de usuario ya existe. Por favor, elige otro.
          </strong>
        )}

        {saved === "error" && (
          <strong className="alert alert-danger">
            Usuario no se ha registrado
          </strong>
        )}

        <form className="register-form" onSubmit={saveUser}>
          <div className="form-group">
            <label htmlFor="name">Nombres:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChanged}
            />
          </div>

          <div className="form-group">
            <label htmlFor="surname">Apellidos:</label>
            <input
              type="text"
              name="surname"
              value={form.surname}
              onChange={handleChanged}
            />
          </div>

          <div className="form-group">
            <label htmlFor="nick">Nick:</label>
            <input
              type="text"
              name="nick"
              value={form.nick}
              onChange={handleChanged}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChanged}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChanged}
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">Ciudad:</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChanged}
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Pais de Residencia:</label>
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChanged}
            />
          </div>

          <div className="form-group">
            <label htmlFor="edad">Edad:</label>
            <input
              type="text"
              name="edad"
              value={form.edad}
              onChange={handleChanged}
            />
          </div>

          <div className="form-group">
            <label htmlFor="estudios">Estudios y certificaciones:</label>
            <input
              type="text"
              name="estudios"
              value={form.estudios}
              onChange={handleChanged}
            />
          </div>

          <div className="form-group">
            <label htmlFor="idiomas">Idiomas:</label>
            <input
              type="text"
              name="idiomas"
              value={form.idiomas}
              onChange={handleChanged}
            />
          </div>

          <div className="form-group">
            <label htmlFor="linkedin">Url linkedin:</label>
            <input
              type="text"
              name="linkedin"
              value={form.linkedin}
              onChange={handleChanged}
            />
          </div>

          <div className="form-group">
            <label htmlFor="hobbies">Hobbies:</label>
            <input
              type="text"
              name="hobbies"
              value={form.hobbies}
              onChange={handleChanged}
            />
          </div>

          <div className="form-group">
            <label htmlFor="conocimiento_extra">conocimientos Extras:</label>
            <input
              type="text"
              name="conocimiento_extra"
              value={form.conocimiento_extra}
              onChange={handleChanged}
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Foto perfil:</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChanged}
            />
          </div>
          {/* <br /> */}
          <input type="submit" value="Registrate" className="btn btn-success" />
        </form>
      </div>
    </>
  );
};
