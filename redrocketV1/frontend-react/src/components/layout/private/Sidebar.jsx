import React, { useState } from "react";
import avatar from "../../../assets/img/user.png";
import useAuth from "../../../hooks/useAuth";
import { Global } from "../../../helpers/Global";
import { useForm } from "../../../hooks/useForm";
import { Link } from "react-router-dom";
import { UserList } from "../../user/UserList";

export const Sidebar = () => {

  const { auth, counters } = useAuth();
  const {form, handleChanged} = useForm({});
  const [stored, setStored] = useState("not_stored");

  const savePublication = async(e) => {
    e.preventDefault();

    //Recoger datos del formulario
    let newPublication = form;
    // newPublication.user = auth.id;
    

    //Hacer la request para guardar en bd
    const request = await fetch(Global.url + "publication/save/:id", {
      method: "POST",
      body: JSON.stringify(newPublication),
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });
    
    const data = await request.json();

    //Mostrar mensaje de exito o error
    if(data.status === "success") {
    setStored("stored");
    }else{
      setStored("error");
    }
    //subir imagen

  }


  return (
    <aside className="layout__aside">
      <header className="aside__header">
        <h1 className="aside__title">Hola, {auth.name}</h1>
      </header>

      <div className="aside__container">
        <div className="aside__profile-info">
          <div className="profile-info__general-info">
            <div className="general-info__container-avatar">
              {auth.image != "defaul.png" && (
                <img
                  src={auth.image}
                  className="container-avatar__img"
                  alt="Foto de perfil"
                />
              )}
              {auth.image == "defaul.png" && (
                <img
                  src={avatar}
                  className="container-avatar__img"
                  alt="Foto de perfil"
                />
              )}
            </div>

            <div className="general-info__container-names">
            <Link to={"/social/perfil/"+auth.id} className="container-names__name">
                {auth.name} {auth.surname}
              </Link>
              <p className="container-names__nickname">{auth.nick}</p>

            </div>
            
          </div>

          <div className="profile-info__stats">
            <div className="stats__following">
              <Link to={"/social/siguiendo/"+auth.id} className="following__link">
                <span className="following__title">Siguiendo</span>
                <span className="following__number">{counters.following}</span>
              </Link>
            </div>


            <div className="stats__following">
              <Link to={"/social/siguidores/"+auth.id} className="following__link">
                <span className="following__title">Seguidores</span>
                <span className="following__number">{counters.followed}</span>
              </Link>
            </div>

            <div className="stats__following">
            <Link to={"/social/perfil/"+auth.id} className="following__link">
                <span className="following__title">Publicaciones</span>
                <span className="following__number">{counters.publications}</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="aside__container-form">
        {stored == "stored" && (
          <strong className="alert alert-success">
            Post publicado correctamente
          </strong>
        )}

        {stored == "error" && (
          <strong className="alert alert-danger">
            Post no se ha publicado
          </strong>
        )}   
          <form className="container-form__form-post" onSubmit={savePublication}>
          
            <div className="form-post__inputs">
              <label htmlFor="text" className="form-post__label">
                ¿Que estas pesando hoy?
              </label>
              <textarea name="text" className="form-post__textarea" onChange={handleChanged} />
            </div>

            {/* <div className="form-post__inputs">
              <label htmlFor="file" className="form-post__label">
                Sube tu foto
              </label>
              <input type="text" name="file0" id="file" className="form-post__image" />
            </div> */}

            <input
              type="submit"
              value="Enviar"
              className="form-post__btn-submit"
            />
          </form>
        </div>
      </div>
    </aside>
  );
};
