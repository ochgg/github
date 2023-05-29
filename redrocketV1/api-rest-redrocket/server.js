const express = require("express");
const mysql = require("mysql2/promise");
const connection = require("./database/connection");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


require("dotenv").config();

//Mensaje de bienvenida
console.log("Bienvenido a la API para REDROKECT");

//Conexion a la nbase de datos
connection();

//Crear servidor node
const app = express();
const port = process.env.PORT;

//Configurar cors
app.use(cors());

//Convertir los datos del body o objetos json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Ruta de prueba
app.get("/ruta-prueba", (req, res) => {
  return res.status(200).json({
    id: 1,
    nombre: "Omar",
    apellido: "Gannem",
  });
});

//////////Ruta registro//////////////
app.post("/user/register", async (req, res) => {
  const {
    name,
    surname,
    nick,
    email,
    password,
    city,
    country,
    edad,
    estudios,
    idiomas,
    linkedin,
    hobbies,
    conocimiento_extra,
    image,
  } = req.body;

  if (!password) {
    return res.status(400).json({ message: "La contraseña es requerida." });
  }

  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      console.error("Error al hashear la contraseña:", err);
      return res
        .status(500)
        .json({
          message:
            "Ha ocurrido un error al registrar el usuario. Por favor, intenta más tarde.",
        });
    }

    try {
      const dbConnection = await connection();
      const checkUserSql = "SELECT * FROM user WHERE nick = ? OR email = ?";
      const [checkUserResult] = await dbConnection.query(checkUserSql, [
        nick,
        email,
      ]);

      if (checkUserResult.length > 0) {
        const usernameExists = checkUserResult.some(
          (user) => user.nick === nick
        );
        const emailExists = checkUserResult.some(
          (user) => user.email === email
        );

        if (usernameExists) {
          return res
            .status(400)
            .json({
              message: "El nombre de usuario ya existe. Por favor, elige otro.",
            });
        }
        if (emailExists) {
          return res
            .status(400)
            .json({
              message:
                "El correo electrónico ya está registrado. Por favor, utiliza otro.",
            });
        }
      }

      const sql =
        "INSERT INTO user (name, surname, nick, email, password, city, country, edad, estudios, idiomas, linkedin, hobbies, conocimiento_extra, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      await dbConnection.query(sql, [
        name,
        surname,
        nick,
        email,
        hashedPassword,
        city,
        country,
        edad,
        estudios,
        idiomas,
        linkedin,
        hobbies,
        conocimiento_extra,
        image,
      ]);
      console.log("Usuario registrado correctamente");
      res.json({ message: "El usuario ha sido registrado correctamente." });
    } catch (error) {
      console.error("Error al insertar usuario:", error);
      res
        .status(500)
        .json({
          message:
            "Ha ocurrido un error al insertar el usuario en la base de datos. Por favor, intenta más tarde.",
        });
    }
  });
});

/////////////Ruta de Login////////////
app.post('/user/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const dbConnection = await connection();
    const getUserSql = 'SELECT * FROM user WHERE email = ?';
    const [userResult] = await dbConnection.query(getUserSql, [email]);

    if (userResult.length === 0) {
      return res.status(401).json({ message: 'El correo electrónico o la contraseña son incorrectos.' });
    }

    const user = userResult[0];

    // Comparar la contraseña ingresada con la contraseña hasheada almacenada
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'El correo electrónico o la contraseña son incorrectos.' });
    }

    // Generar el token de autenticación JWT
    const token = jwt.sign({ userId: user.id }, 'secreto', { expiresIn: '24h' });

   
    res.json({
      status: 'success',
      token,
      user: {
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
        image: user.image,
        conocimiento_extra: user.conocimiento_extra,
      },
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Ha ocurrido un error en el servidor' });
  }
});

////////////////Ruta Profile///////////////////
app.get('/user/profile/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const dbConnection = await connection();
    const getUserSql = 'SELECT * FROM user WHERE id = ?';
    const [userResult] = await dbConnection.query(getUserSql, [id]);

    if (userResult.length === 0) {
      return res.status(404).json({ message: 'El perfil no existe.' });
    }

    const user = userResult[0];

    res.json({
      status: 'success',
      user: {
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
        image: user.image,
        conocimiento_extra: user.conocimiento_extra,
      },
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Ha ocurrido un error en el servidor' });
  }
});


///////////////// Ruta para actualizar el perfil de usuario////////////
app.put("/user/update/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedUser = req.body;

  try {
    const dbConnection = await connection();

    const updateUserSql = "UPDATE user SET ? WHERE id = ?";
    await dbConnection.query(updateUserSql, [updatedUser, id]);

    res.json({ message: "Perfil actualizado correctamente." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
  }
});

////////// Ruta para obtener los contadores de un usuario//////////////////
app.get('/user/counters/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const dbConnection = await connection();
    
    ////////// Obtener el número de publicaciones del usuario////////////////
    const getPublicationsSql = 'SELECT COUNT(*) AS publicationCount FROM publication WHERE user_id = ?';
    const [publicationsResult] = await dbConnection.query(getPublicationsSql, [id]);
    const publicationCount = publicationsResult[0].publicationCount;

    /////////// Obtener el número de seguidores del usuario/////////////
    const getFollowersSql = 'SELECT COUNT(*) AS followerCount FROM follow WHERE followed_id = ?';
    const [followersResult] = await dbConnection.query(getFollowersSql, [id]);
    const followerCount = followersResult[0].followerCount;

    ////// Obtener el número de usuarios seguidos por el usuario/////////
    const getFollowingSql = 'SELECT COUNT(*) AS followingCount FROM follow WHERE user_id = ?';
    const [followingResult] = await dbConnection.query(getFollowingSql, [id]);
    const followingCount = followingResult[0].followingCount;

    const counters = {
      publications: publicationCount,
      following: followingCount,
      followed: followerCount,
    };

    res.json({
      status: 'success',
      counters,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Ha ocurrido un error en el servidor' });
  }
});


/////////////// Ruta para seguir a un usuario////////////////////////////
app.post('/user/follow/:id', async (req, res) => {
  const { id } = req.params;
  const { followed } = req.body;

  try {
    const dbConnection = await connection();
    const followUserSql = 'INSERT INTO follow (user_id, followed_id) VALUES (?, ?)';
    await dbConnection.query(followUserSql, [followed, id]);

    res.json({ message: 'Has seguido al usuario correctamente.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Ha ocurrido un error en el servidor' });
  }
});

///////////// Ruta para dejar de seguir a un usuario///////////////////
app.delete('/user/unfollow/:userId', async (req, res) => {
  const { userId } = req.params;
  const { followerId } = req.body;

  try {
    const dbConnection = await connection();
    const unfollowUserSql = 'DELETE FROM follow WHERE user_id = ? AND followed_id = ?';
    await dbConnection.query(unfollowUserSql, [followerId, userId]);

    res.json({ message: 'Has dejado de seguir al usuario correctamente.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Ha ocurrido un error en el servidor' });
  }
});

/////////// Ruta para obtener la lista de usuarios/////////////////
// app.get('/user/list/:page', async (req, res) => {
//   try {
//     const dbConnection = await connection();
//     const getUsersSql = 'SELECT * FROM user';
//     const [users] = await dbConnection.query(getUsersSql);
//     res.json(users);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Ha ocurrido un error en el servidor' });
//   }
// });

// app.get('/user/list/:page', async (req, res) => {
//   try {
//     const { page } = req.params;
//     const pageSize = 5; // Tamaño de la página, puedes ajustarlo según tus necesidades

//     const dbConnection = await connection();
//     const offset = (page - 1) * pageSize;
//     const getUsersSql = `SELECT * FROM user LIMIT ${offset}, ${pageSize}`;
//     const [users] = await dbConnection.query(getUsersSql);

//     res.json(users);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Ha ocurrido un error en el servidor' });
//   }
// });

app.get('/user/list/:page', async (req, res) => {
  try {
    const dbConnection = await connection();
    const getUsersSql = 'SELECT * FROM user';
    const [users] = await dbConnection.query(getUsersSql);
    res.json(users);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Ha ocurrido un error en el servidor' });
  }
});





app.listen(port, function () {
  console.log(`Servidor NODE en el puerto ${port}`);
});
