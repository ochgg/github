import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Global } from '../../helpers/Global';
// import useAuth from '../../hooks/useAuth';



export const Login = () => {
  
  const { form, handleChanged } = useForm({});
  const [saved, setSaved] = useState("not_sended");

  // const {setAuth} = useAuth();

  

  const loginUser = async(e) => {
    e.preventDefault();

    //datos del formulario
    const userToLogin = form;


    //peticion al backend
    const request = await fetch(Global.url + "user/login",{
      method: 'POST',
      body: JSON.stringify(userToLogin),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await request.json();

    console.log(data);

    if(data.status === "success"){

      //Guardar los datos en localstorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSaved("login");

      //setear datos del usuario en el auth
      // setAuth(data.user);

      //redireccion
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } else 
    setSaved("error");
  }

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Login</h1>
      </header>

      <div className="content__posts">

      {saved == "login" ?
        <strong className="alert alert-success"> Usuario logeado correctamente !! </strong>
        : ''}
      {saved == "error" ?
        <strong className="alert alert-danger"> Usuario o contraseña incorrectas !! </strong>
        : ''}

        <form className='form-login' onSubmit={loginUser}>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" onChange={handleChanged} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" onChange={handleChanged} />
          </div>

          <input type="submit" value="Identificate" className="btn btn-success" />


        </form>
      </div>
    </>
  )
}

export default Login;
