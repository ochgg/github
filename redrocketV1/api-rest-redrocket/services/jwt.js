// Importar dependencias
const jwt = require("jsonwebtoken");

// Clave secreta
const secret = "CLAVE_SECRETA_123456789";

// Crear una función para generar tokens
const createToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
    surname: user.surname,
    nick: user.nick,
    email: user.email,
    city: user.city,
    country: user.country,
    edad: user.edad,
    estudios: user.estudios,
    idiomas: user.idiomas,
    linkedin: user.linkedin,
    hobbies: user.hobbies,
    conocimiento_extra: user.conocimiento_extra,
  };

  // Generar el token de autenticación JWT
  const token = jwt.sign(payload, secret, { expiresIn: '24h' });

  return token;
};

module.exports = {
  secret,
  createToken
};
