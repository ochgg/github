import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import avatar from "../../assets/img/user.png";

const ProfileUsers = () => {
  const [user, setUser] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
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

  const enviarFeedback = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(Global.url + `user/feedback/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ feedback }),
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        // El feedback se envió correctamente

        // Agregar el feedback enviado a la lista de feedbacks
        const newFeedback = {
          id: feedbackList.length + 1,
          feedback: feedback,
          username: data.feedback.sender,
        };
        setFeedbackList([...feedbackList, newFeedback]);

        // Restablecer el estado del feedback después de enviarlo
        setFeedback("");

        console.log("Feedback enviado correctamente");
      } else {
        // Ocurrió un error al enviar el feedback
        console.error("Error al enviar el feedback:", data.message);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

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

      <div>
        <p></p>
        <p></p>
        <h3>Deja tu Feedback</h3>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Escribe tu feedback..."
        ></textarea>
        <button onClick={enviarFeedback}>Enviar</button>
      </div>

      <div>
        <h3>Feedbacks y Recomendaciones dejados</h3>
        {feedbackList.length > 0 ? (
          <ul>
            {feedbackList.map((feedbackItem) => (
              <li key={feedbackItem.id}>
                {feedbackItem.feedback} - {feedbackItem.username}
              </li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron feedback</p>
        )}
      </div>
    </>
  );
};

export default ProfileUsers;
