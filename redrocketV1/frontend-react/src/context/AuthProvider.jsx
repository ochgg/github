import React, { useState, useEffect, createContext } from 'react'
import { Global } from '../helpers/Global';



const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [counters, setCounters] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        authUser();
    },[]);

    const authUser = async() => {
        //sacar datos del user identificados
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        //comprobar el token y el user
        if(!token || !user){
            setLoading(false);
            return false;
        }
        //transformar los datos a un objeto js
        const userObj = JSON.parse(user);
        const userId = userObj.id;

        //peticion al backend que compruebe el token y
        //que devuelva los datos del usuario para tenerlos disponibles
        const request = await fetch(Global.url + "user/profile/" + userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });


        const data = await request.json();

        //peticion para los contadores
        const requestCounters = await fetch(Global.url + "user/counters/" + userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
                }
        });

        const dataCounters = await requestCounters.json();

        //setear el estado de auth
        setAuth(data.user);
        setCounters(dataCounters.counters);
        setLoading(false);
    }


  return (<AuthContext.Provider
            value={{
                auth,
                setAuth,
                counters,
                setCounters,
                loading
            }}
        >
    {children}
  </AuthContext.Provider>  
  )
}

export default AuthContext