import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import avatar from "../../assets/img/user.png";

const ProfileUsers = () => {
  const [user, setUser] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const [feedbackRegistered, setFeedbackRegistered] = useState(false);
  const [duplicateFeedback, setDuplicateFeedback] = useState(false);
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
    cargarFeedbackList(userId);
  }, [userId]);

  const cargarFeedbackList = (userId) => {
    fetch(`${Global.url}user/feedbacks/${userId}`, {
      
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("No se pudo obtener la lista de feedback");
      })
      .then((feedbackList) => {
        setFeedbackList(feedbackList);
      })
      .catch((error) => {
        console.error("Ha ocurrido un error:", error.message);
      });
  };

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
        // Verificar si el feedback ya está registrado
        const isDuplicate = feedbackList.some(
          (feedbackItem) =>
            feedbackItem.feedback === feedback &&
            feedbackItem.username === data.feedback.sender
        );

        if (isDuplicate) {
          // Mostrar la alerta de feedback duplicado
          setDuplicateFeedback(true);
        } else {
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

          // Mostrar la alerta de feedback registrado
          setFeedbackRegistered(true);

          console.log("Feedback enviado correctamente");
        }
      } else if (data.message === "Ya has dejado un feedback para este usuario") {
        // Mostrar la alerta de feedback duplicado
        setDuplicateFeedback(true);
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
        {feedbackRegistered && <p>Feedback registrado correctamente</p>}
        {duplicateFeedback && (
          <p>Error al enviar el feedback: Ya has dejado un feedback para este usuario</p>
        )}
      </div>

      <div className="container">
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